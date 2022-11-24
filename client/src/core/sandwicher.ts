import {
  BigNumber,
  constants,
  Contract,
  providers,
  utils,
  Wallet,
} from 'ethers';

import { config } from '../config';

import { ROUTER_ABI, SANDWICHER_ABI } from '../constants';

import {
  calcSandwichStates,
  fetchTokenData,
  getTokenBalance,
  parseError,
  sleep,
} from '../helpers';
import { Token } from '../types';
import { sendMessage } from './telegram';

class Sandwicher {
  private _provider: providers.JsonRpcProvider;
  private _pancakeSwap: utils.Interface;
  private contract: Contract;
  private _broadcastedTx: boolean;

  private signer: Wallet;
  private PUBLIC_KEY: string;

  constructor() {
    // initialize some variables i.e provider, signers, interface

    this._pancakeSwap = new utils.Interface(ROUTER_ABI);
    this._provider = new providers.JsonRpcProvider(config.JSON_RPC);
    this.signer = new Wallet(config.PRIVATE_KEY, this._provider);

    this.contract = new Contract(
      config.CONTRACT_ADDRESS,
      SANDWICHER_ABI,
      this.signer
    );

    this._broadcastedTx = false;

    this.PUBLIC_KEY = '';
  }

  init = async () => {
    // setup defaults
    console.info(`Setting up defaults`);
    await this.#setDefaults();
    console.info(`- - - `);
    console.info(`Defaults set ✔️\n`);

    // start monitoring
    console.info(`Monitoring mempool...`);
    await this.#monitor();
  };

  /**
   *  Monitor mempool for transactions
   */
  #monitor = async () => {
    // implement mempool monitoring
    let wsProvider = new providers.WebSocketProvider(config.WSS_URL);
    wsProvider.on('pending', async (hash) => {
      try {
        let receipt = await wsProvider.getTransaction(hash);
        receipt && this.#process(receipt);
      } catch (error) {
        console.error(error);
      }
    });
  };

  #setDefaults = async () => {
    // get the public key
    this.PUBLIC_KEY = await this.signer.getAddress();
  };

  /**
   * Process transactions
   * @note: this is where the magic happens
   * # slippage check
   * # calc optimal amount In
   * # rug check
   * # profitablity check
   * @param receipt - transaction receipt
   */

  #process = async (receipt: providers.TransactionResponse) => {
    let {
      value: targetAmountInWei,
      to: router,
      gasPrice: targetGasPriceInWei,
      gasLimit: targetGasLimit,
      hash: targetHash,
      from: targetFrom,
      data,
    } = receipt;

    let tx: utils.TransactionDescription;
    try {
      // decode tx data
      tx = this._pancakeSwap.parseTransaction({
        data,
      });
    } catch (error) {
      // console.error(error);
      return;
    }

    let { name: targetMethodName, args: targetArgs } = tx;

    let { path, amountOutMin: targetAmountOutMin, deadline } = targetArgs;

    try {
      //if the path or router  is undefined stop execution and return
      if (!path || !router) return;

      // if tx deadline has passed, skip it as we can't sandwich it
      let now = Math.floor(Date.now() / 1000);

      if (deadline.lte(BigNumber.from(now))) {
        console.info(`Transaction deadline has passed`, { targetHash });
        return;
      }

      let [targetFromToken, targetToToken] = await fetchTokenData(
        this._provider,
        [path[0], path[path.length - 1]]
      );

      // ensure target is buying with wbnb or bnb
      if (
        targetFromToken.address.trim().toLowerCase() !=
        config.WBNB_ADDRESS.trim().toLowerCase()
      ) {
        // console.info(
        //   `Skipping: Target is buying with ${targetFromToken.address}`,
        //   {
        //     targetHash,
        //     targetMethodName,
        //   },
        //   '\n'
        // );
        return;
      }

      // get current execution price
      let executionPrice = await this.#getAmountsOut(
        router,
        path,
        targetAmountInWei
      );

      // calc target slippage
      let { slippage: targetSlippage } = this.#calcSlippage({
        executionPrice,
        targetAmountOutMin,
        targetMethodName,
      });

      if (
        targetSlippage <
        config.MIN_SLIPPAGE_THRESHOLD / 100 //~ 1%
      ) {
        console.log(
          `Skipping: Tx ${targetHash} Target slippage ${parseFloat(
            (targetSlippage * 100).toFixed(4)
          )} is < ${config.MIN_SLIPPAGE_THRESHOLD}%`
        );
        return;
      }

      let amountOut = parseFloat(
        utils.formatUnits(targetAmountOutMin, targetToToken.decimals)
      );

      // if target amount out is 0; then their slippage is 100 %
      // make their slippage  5%
      if (amountOut == 0) {
        console.info(
          `Target slippage is 100%, impossing ${parseFloat(
            (config.MIN_SLIPPAGE_THRESHOLD * 3).toFixed(4)
          )}% slippage`
        );
        amountOut =
          parseFloat(
            utils.formatUnits(executionPrice, targetToToken.decimals)
          ) *
          (1 - (config.MIN_SLIPPAGE_THRESHOLD / 100) * 3);
      }

      let { reserveBNB, reserveToken } = await this.#getReserves(path, router);

      let fmtTargetAmountIn = parseFloat(
        utils.formatUnits(targetAmountInWei, targetFromToken.decimals)
      );
      let amountIn = this.#calcOptimalAmountIn({
        targetAmountIn: fmtTargetAmountIn,
        targetAmountOutMin: amountOut,
        targetFromToken,
        reserve0: parseFloat(
          utils.formatUnits(reserveBNB, targetFromToken.decimals)
        ),
        reserve1: parseFloat(
          utils.formatUnits(reserveToken, targetToToken.decimals)
        ),
      });

      let tokenBalance = await getTokenBalance(
        this._provider,
        targetFromToken.address
      );

      // if amountIn is greater than token balance, just ignore it
      if (amountIn.gt(tokenBalance)) {
        console.log(
          `Skipping: Buy attack amount ${utils.formatUnits(
            amountIn,
            targetFromToken.decimals
          )} ${targetFromToken.symbol} is > our ${
            targetFromToken.symbol
          } token balance ${utils.formatUnits(
            tokenBalance,
            targetFromToken.decimals
          )} ${targetFromToken.symbol}, Token: ${targetToToken.symbol}\n`
        );
        return;
      }

      if (amountIn.lte(0)) {
        console.log(
          `Skipping: Buy attack amount is <= 0, Token: ${targetToToken.symbol}`
        );
        return;
      }

      let amountOutMin = await this.#getAmountsOut(router, path, amountIn);

      // calc our buy  slippage
      let fmtAmountOutMin = (
        parseFloat(
          parseFloat(
            utils.formatUnits(amountOutMin, targetToToken.decimals)
          ).toFixed(targetToToken.decimals)
        ) *
        (1 - config.MIN_SLIPPAGE_THRESHOLD / 100)
      ).toFixed(targetToToken.decimals);

      amountOutMin = utils.parseUnits(fmtAmountOutMin, targetToToken.decimals);

      // calc our sell slippage

      let fmtSellAmtOutMin = (
        parseFloat(utils.formatUnits(amountIn, targetFromToken.decimals)) *
        (1 - config.MIN_SLIPPAGE_THRESHOLD / 100)
      ).toFixed(targetToToken.decimals);

      let sellAmountOutMin = utils.parseUnits(
        fmtSellAmtOutMin,
        targetFromToken.decimals
      );

      let { buyData, sellData } = this.prepareBuyAndSellData({
        router,
        path,
        amountIn,
        amountOutMin,
        sellAmountOutMin,
      });

      let { safe, hasTax, buyTax, sellTax, error } = await this.#isSafe({
        buyData,
        sellData,
      });

      // @note currently tokens with tax are considered unsafe
      if (hasTax) {
        console.info(
          `Skipping: Token ${targetToToken.symbol}, ${
            targetToToken.address
          } has a buy tax of ${
            (buyTax * 100).toFixed(2) + '%'
          } and a sell tax of ${(sellTax * 100).toFixed(2) + '%'}`
        );
        return;
      }
      if (!safe) {
        console.info(
          `Skipping: Token ${targetToToken.symbol}, ${targetToToken.address} is not safe, ${error}`
        );
        return;
      }

      // calc profit
      let { rawProfit } = this.#calcProfit({
        amountIn,
        targetAmountIn: targetAmountInWei,
        targetAmountOutMin: utils.parseUnits(
          amountOut.toString(),
          targetToToken.decimals
        ),
        reserve0: reserveBNB,
        reserve1: reserveToken,
      });

      console.log({
        rawProfit: utils.formatUnits(rawProfit, targetFromToken.decimals),
      });
      let gasPrice =
        targetGasPriceInWei?.mul(2) || utils.parseUnits('7', 'gwei');

      let profitInTargetFromToken = constants.Zero;
      let buyHash = '';
      let sellHash = '';
      // if (profitInTargetFromToken < 0.02) {
      //   console.log(
      //     `Skipping: Profit is ${profitInTargetFromToken}, Token: ${targetToToken.symbol}, ${targetToToken.address}`
      //   );
      //   return;
      // }

      targetGasPriceInWei = targetGasPriceInWei || constants.Zero;

      if (!this._broadcastedTx) {
        this._broadcastedTx = true;
        // broadcast buy tx
        let nonce = await this._provider.getTransactionCount(this.PUBLIC_KEY);
        let {
          success,
          msg: buyErrorMsg,
          hash: buyHash,
        } = await this.buyTx(buyData, {
          gasPrice,
          nonce,
        });
        console.log({ success, msg: buyErrorMsg || `Buy tx sent` });
        if (success) {
          nonce += 1;
          // broadcast sell tx after 200ms
          await sleep(200);

          let {
            success,
            msg: sellErrorMsg,
            hash: sellHash,
          } = await this.sellTx(sellData, {
            gasLimit: config.DEFAULT_GAS_LIMIT,
            nonce,
            gasPrice: targetGasPriceInWei,
          });

          console.log({ success, msg: sellErrorMsg || `Sell tx sent` });

          let targetGasFeeInBNB = utils.formatEther(
            targetGasLimit.mul(targetGasPriceInWei || constants.Zero)
          );

          let targetAmount = parseFloat(
            utils.formatUnits(targetAmountInWei, targetFromToken.decimals)
          );

          let targetGasPriceInGwei = `${parseFloat(
            utils.formatUnits(targetGasPriceInWei || constants.Zero, 'gwei')
          ).toString()} Gwei`;

          let profitInTargetToToken = executionPrice.sub(targetAmountOutMin);

          console.log({
            router,
            targetHash,
            targetFrom,
            targetAmount,
            path,
            targetFromToken,
            targetToToken,
            targetMethodName,
            targetGasPriceInGwei,
            targetGasFeeInBNB: parseFloat(targetGasFeeInBNB),
            targetAmountOutMin: utils.formatUnits(
              targetAmountOutMin,
              targetToToken.decimals
            ),
            executionPrice: utils.formatUnits(
              executionPrice,
              targetToToken.decimals
            ),
            profitInTargetFromToken: utils.formatUnits(
              profitInTargetFromToken,
              targetFromToken.decimals
            ),
            profitInTargetToToken: utils.formatUnits(
              profitInTargetToToken,
              targetToToken.decimals
            ),

            targetSlippage,
            amountIn: utils.formatUnits(amountIn, targetFromToken.decimals),
          });

          let msg = `**NEW TRADE NOTIFICATION**\n---`;

          msg += `\nToken: ${targetToToken.name}, ${targetToToken.symbol}, ${targetToToken.decimals}`;
          msg += `\nToken Address: \`${targetToToken.address}\``;
          msg += `\nRouter: \`${targetToToken.address}\``;
          msg += `\n---`;

          msg += `\n**BUY TRADE**\n---`;

          msg += `\nEst. AmountIn: \`${parseFloat(
            utils.formatUnits(amountIn, targetFromToken.decimals)
          ).toString()} ${targetFromToken.symbol}\``;
          msg += `\nAmountIn: \`${parseFloat(
            parseFloat(
              utils.formatUnits(amountIn, targetFromToken.decimals)
            ).toFixed(6)
          )} ${targetFromToken.symbol}\``;
          msg += `\nBuy Status: ${
            buyErrorMsg?.replaceAll('(', '\\(').replaceAll(')', '\\)') || '✔️'
          }`;
          msg += buyHash
            ? `\nBuy Hash: ${`[${buyHash.toUpperCase()}](${
                config.EXPLORER_URL
              }/tx/${buyHash})`}`
            : '';

          msg += `\nGas Price: \`${parseFloat(
            parseFloat(utils.formatUnits(gasPrice, 'gwei')).toFixed(6)
          ).toString()} Gwei\``;

          msg += `\n- - -`;

          msg += `\n**TARGET TRADE**\n---`;
          msg += `\nFrom: \`${targetFrom.toUpperCase()}\``;
          msg += `\nTarget Hash: [${targetHash.toUpperCase()}](${
            config.EXPLORER_URL
          }/tx/${targetHash})`;
          msg += `\nTarget AmountIn: \`${parseFloat(targetAmount.toFixed(6))} ${
            targetFromToken.symbol
          }\``;
          msg += `\nTarget Slippage: \`${(targetSlippage * 100).toFixed(4)}%\``;

          msg += `\nTarget Gas Price: \`${targetGasPriceInGwei}\``;

          msg += `\n- - -`;

          msg += `\n**SELL TRADE**\n---`;
          msg += `\nSell Status: ${
            sellErrorMsg?.replaceAll('(', '\\(').replaceAll(')', '\\)') || '✔️'
          }`;
          msg += sellHash
            ? `\nSell Hash: ${`[${sellHash.toUpperCase()}](${
                config.EXPLORER_URL
              }/tx/${sellHash})`}`
            : '';

          msg += `\n---`;

          msg += `\nExecution Price: \`${parseFloat(
            parseFloat(
              utils.formatUnits(executionPrice, targetToToken.decimals)
            ).toFixed(6)
          )} ${targetToToken.symbol}\``;

          msg += `\nEst. Profit in ${targetFromToken.symbol}: \`${parseFloat(
            parseFloat(
              utils.formatUnits(
                profitInTargetFromToken,
                targetFromToken.decimals
              )
            ).toFixed(6)
          )}\``;
          msg += `\nEst. Profit in ${targetToToken.symbol}: \`${parseFloat(
            parseFloat(
              utils.formatUnits(profitInTargetToToken, targetToToken.decimals)
            ).toFixed(6)
          )}\``;
          msg += `\n---`;

          sendMessage(msg);

          await sleep(9000);
          this._broadcastedTx = false;
        }
      } else {
        console.info(`Skipping: Tx ${targetHash} already broadcasted`);
      }
      console.log(`- - - `.repeat(10));
    } catch (error) {
      let msg = parseError(error);
      console.error({ msg, path });
      await sleep(6000);
      this._broadcastedTx = false;
    }
  };
  #calcSlippage = (_params: {
    targetMethodName: string;
    executionPrice: any;
    targetAmountOutMin: any;
  }): {
    slippage: number;
  } => {
    let slippage: any = 0; // target is not willing to lose any amountOut tokens

    let { targetMethodName, executionPrice, targetAmountOutMin } = _params;

    if (targetMethodName.startsWith('swapExactETHFor')) {
      slippage = (executionPrice - targetAmountOutMin) / executionPrice;
    } else if (
      targetMethodName.startsWith(
        'swapExactTokensForTokensSupportingFeeOnTransferTokens'
      )
    ) {
      slippage = targetAmountOutMin / executionPrice;
    }
    // TODO: add support for swapETHForExactTokens
    else {
      throw new Error(`Unsupported Buy Method: ${targetMethodName}`);
    }

    return {
      slippage,
    };
  };

  #calcOptimalAmountIn = (params: {
    targetAmountIn: number;
    targetAmountOutMin: number;
    targetFromToken: Token;
    reserve0: number;
    reserve1: number;
  }) => {
    let {
      targetAmountIn,
      targetAmountOutMin,
      targetFromToken,
      reserve0,
      reserve1,
    } = params;
    let k = reserve0 * reserve1;
    return utils.parseUnits(
      Math.abs(
        this.#calcWorstReserveIn(targetAmountIn, targetAmountOutMin, k) -
          reserve0
      ).toFixed(targetFromToken.decimals),
      targetFromToken.decimals
    );
  };

  #calcWorstReserveIn = (
    amountIn: number,
    amountOut: number,
    k: number,
    fee = 9975
  ) => {
    let negb = fee * amountIn * -1;

    let fourac = (40000 * fee * amountIn * k) / amountOut;

    let b = (fee * amountIn) ** 2 + fourac;
    let squareroot = Math.sqrt(b);

    let worstRIn = (negb + squareroot) / 20000;

    return worstRIn;
  };

  #getReserves = async (path: string[], router: string) => {
    let routerContract = new Contract(
      router,
      ['function factory() external view returns (address)'],
      this._provider
    );

    let factoryContract = new Contract(
      await routerContract.factory(),
      [
        'function getPair(address tokenA, address tokenB) external view returns (address pair)',
      ],
      this._provider
    );

    let token0 = path[path.length - 2];
    let token1 = path[path.length - 1];
    let pairAddress = await factoryContract.getPair(token0, token1);

    let pairContract = new Contract(
      pairAddress,
      [
        'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)',
        `function token0() external view returns (address)`,
      ],
      this._provider
    );

    let [reserve0, reserve1] = await pairContract.getReserves();

    let token = await pairContract.token0();
    return {
      reserveBNB: token0 === token ? reserve0 : reserve1,
      reserveToken: token0 === token ? reserve1 : reserve0,
    };
  };
  #getAmountsOut = async (
    router: string,
    path: string[],
    amountIn: BigNumber
  ): Promise<BigNumber> => {
    let contract = new Contract(
      router,
      [
        'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
      ],
      this._provider
    );

    let amounts = await contract.getAmountsOut(amountIn, path);

    return amounts[amounts.length - 1];
  };

  #isSafe = async (
    params: {
      buyData: string;
      sellData: string;
    },
    overloads: {
      gasLimit?: number | string;
      nonce?: number;
    } = {
      gasLimit: config.DEFAULT_GAS_LIMIT,
    }
  ): Promise<{
    safe: boolean;
    hasTax: boolean;
    buyTax: number;
    sellTax: number;
    error?: string;
  }> => {
    let { buyData, sellData } = params;

    try {
      let {
        expectedBuy,
        balanceBeforeBuy,
        balanceAfterBuy,
        balanceBeforeSell,
        balanceAfterSell,
        expectedSell,
      }: {
        expectedBuy: BigNumber;
        balanceBeforeBuy: BigNumber;
        balanceAfterBuy: BigNumber;
        balanceBeforeSell: BigNumber;
        balanceAfterSell: BigNumber;
        expectedSell: BigNumber;
      } = await this.contract.callStatic.simulate(buyData, sellData, overloads);

      // cacl buy tax
      let actualBought = balanceAfterBuy.sub(balanceBeforeBuy);

      let numerator: any = expectedBuy.sub(actualBought);

      let denominator: any = expectedBuy.add(actualBought).div(2);

      let buyTax = Math.abs(numerator / denominator);

      // cacl sell tax
      let actualSold = balanceAfterSell.sub(balanceBeforeSell);

      numerator = expectedSell.sub(actualSold);

      denominator = expectedSell.add(actualSold).div(2);

      let sellTax = Math.abs(numerator / denominator);

      // token has tax?
      let hasTax = Math.max(buyTax, sellTax) > 0;

      return {
        safe: true,
        hasTax,
        buyTax,
        sellTax,
      };

      // return true;
    } catch (error: any) {
      error = parseError(error);
      return {
        safe: false,
        hasTax: false,
        buyTax: 0,
        sellTax: 0,
        error,
      };
    }
  };

  prepareBuyAndSellData = (params: {
    router: string;
    path: string[];
    amountIn: BigNumber;
    amountOutMin: BigNumber;
    sellAmountOutMin: BigNumber;
  }) => {
    let { router, amountOutMin, amountIn, sellAmountOutMin, path } = params;
    try {
      let buyData = utils.defaultAbiCoder.encode(
        ['address', 'uint256', 'uint256', 'address[]'],
        [router, amountIn, amountOutMin, path]
      );

      let sell_path = [...params.path].reverse();

      let sellData = utils.defaultAbiCoder.encode(
        ['address', 'address[]', 'uint256'],
        [router, sell_path, sellAmountOutMin]
      );

      return {
        buyData,
        sellData,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  };

  buyTx = async (
    data: string,
    overloads: {
      gasLimit?: number | string;
      nonce?: number;
      gasPrice?: BigNumber;
    } = {}
  ): Promise<{
    success: boolean;
    hash?: string;
    msg?: string;
  }> => {
    try {
      console.log('EXECUTING BUY TRANSACTION', new Date().toISOString());

      let { hash } = await this.contract.buyToken(data, overloads);
      return {
        success: true,
        hash,
      };
    } catch (error: any) {
      let msg = parseError(error);

      return {
        success: false,
        msg,
      };
    }
  };

  sellTx = async (
    data: string,
    overloads: {
      gasLimit?: number | string;
      nonce?: number;
      gasPrice?: BigNumber;
    } = {}
  ): Promise<{
    success: boolean;
    msg?: string;
    hash?: string;
  }> => {
    try {
      console.log('EXECUTING SELL TRANSACTION', new Date().toISOString());
      // sell
      let { hash } = await this.contract.sellToken(data, overloads);

      return {
        success: true,
        hash,
      };
    } catch (error: any) {
      console.error(error);
      let msg = parseError(error);
      return {
        success: false,
        msg,
      };
    }
  };

  #calcProfit = (params: {
    amountIn: BigNumber;
    targetAmountIn: BigNumber;
    reserve0: BigNumber;
    reserve1: BigNumber;
    targetAmountOutMin: BigNumber;
  }): {
    rawProfit: BigNumber;
  } => {
    let { reserve0, reserve1, amountIn, targetAmountIn, targetAmountOutMin } =
      params;

    try {
      let states = calcSandwichStates(
        targetAmountIn,
        targetAmountOutMin,
        reserve0, // Native Token
        reserve1, // Token
        amountIn
      );

      if (!states) {
        throw new Error('Invalid states');
      }

      let rawProfit = states.backrunState.amountOut.sub(amountIn);

      return {
        rawProfit,
      };
    } catch (error: any) {
      console.error({ error });
      error = parseError(error);
      return {
        rawProfit: BigNumber.from(0),
      };
    }
  };

  #isProfitable = async (params: {}): Promise<boolean> => {
    // msg: `Token ${token.symbol}, ${token.address} is not profitable, ${error}`,

    return true;
  };
}

export const sandwicher = new Sandwicher();
