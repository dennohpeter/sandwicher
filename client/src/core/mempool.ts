import {
  BigNumber,
  constants,
  Contract,
  providers,
  utils,
  Wallet,
} from 'ethers';

/// Internal Imports
import { config } from '../config';

import { ROUTER_ABI, SANDWICHER_ABI, TOKENS_TO_MONITOR } from '../constants';
import {
  binarySearch,
  fetchTokenData,
  getTokenBalance,
  sleep,
} from '../helpers';
import { sendMessage } from './telegram';

/**
 * @file mempool.ts
 * @description mempool class is a singleton class that manages  interactions
 * with the mempool including monitoring, processing and executing transactions
 * @author Dennoh Peter
 *
 */
class Mempool {
  private _wsprovider: providers.WebSocketProvider;
  private _provider: providers.JsonRpcProvider;
  private _pancakeSwap: utils.Interface;
  private contract: Contract;
  private _broadcastedTx: boolean;
  private supported_buy_methods: Map<string, string>;
  private supported_buy_tokens: Map<
    string,
    {
      decimals: number;
      name: string;
      address: string;
    }
  >;

  private supportedRouters: Map<string, string>;
  private signer: Wallet;
  private PUBLIC_KEY: string;

  constructor() {
    // initialize some variables i.e provider, signers, interface
    this._wsprovider = new providers.WebSocketProvider(config.WSS_URL);
    this._pancakeSwap = new utils.Interface(ROUTER_ABI);
    this._provider = new providers.JsonRpcProvider(config.JSON_RPC);
    this.signer = new Wallet(config.PRIVATE_KEY, this._wsprovider);

    this.contract = new Contract(
      config.CONTRACT_ADDRESS, //smartcontract address
      SANDWICHER_ABI, //smartcontract abi
      this.signer
    );

    this._broadcastedTx = false;

    this.supported_buy_methods = new Map();
    this.supported_buy_tokens = new Map();
    this.supportedRouters = new Map();

    this.PUBLIC_KEY = '';
  }

  /**
   *  Monitor mempool for transactions
   */
  public monitor = async () => {
    // setup defaults
    console.info(`Setting up defaults`);
    await this.setup();
    console.info(`- - - `);
    console.info(`Defaults set`);

    // implement mempool monitoring
    this._wsprovider.on('pending', async (txHash: string) => {
      try {
        let receipt = await this._wsprovider.getTransaction(txHash);

        receipt?.hash && this._process(receipt);
      } catch (error) {
        console.error(error);
      }
    });
  };

  private setup = async () => {
    // get the public key
    this.PUBLIC_KEY = await this.signer.getAddress();

    // setup supported buy methods
    // this.supported_buy_methods.set(
    //   'swapETHForExactTokens',
    //   'swapETHForExactTokens'
    // );
    this.supported_buy_methods.set(
      'swapExactETHForTokensSupportingFeeOnTransferTokens',
      'swapExactETHForTokensSupportingFeeOnTransferTokens'
    );
    this.supported_buy_methods.set(
      'swapExactETHForTokens',
      'swapExactETHForTokens'
    );
    this.supported_buy_methods.set(
      'swapExactTokensForTokensSupportingFeeOnTransferTokens',
      'swapExactTokensForTokensSupportingFeeOnTransferTokens'
    );

    // setup supported buy tokens
    this.supported_buy_tokens.set(
      '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'.toLowerCase(),
      {
        decimals: 18,
        name: 'WBNB',
        address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      }
    );

    // setup supported routers
    this.supportedRouters.set(
      '0x10ED43C718714eb63d5aA57B78B54704E256024E'.toLowerCase(),
      '0x10ED43C718714eb63d5aA57B78B54704E256024E'
    );
  };

  /**
   * Process transactions
   * @param receipt - transaction receipt
   */

  private _process = async (receipt: providers.TransactionResponse) => {
    // implement transaction processing
    try {
      let {
        value: targetAmountInWei,
        to: router,
        gasPrice: targetGasPriceInWei,
        gasLimit: targetGasLimit,
        hash: targetHash,
        from: targetFrom,
      } = receipt;

      if (router && this.supportedRouters.has(router?.toLowerCase() || '')) {
        // decode tx data
        const tx = this._pancakeSwap.parseTransaction({
          data: receipt.data,
        });

        let { name: targetMethodName, args: targetArgs } = tx;

        let {
          path,
          amountOutMin: targetAmountOutMin,
          deadline,
          to,
        } = targetArgs;

        try {
          //if the path is undefined stop execution and return
          if (!path) return;
          console.info(`- - - `);

          // if tx deadline has passed, just ignore it
          // as we cannot sandwich it
          let now = Math.floor(Date.now() / 1000);
          if (deadline.lte(BigNumber.from(now))) {
            console.info(`Transaction deadline has passed`, { targetHash });
            return;
          }

          // Check if target method is in the supported list of buy methods
          if (
            this.supported_buy_methods.has(targetMethodName) &&
            this.supported_buy_tokens.has(path[0].toLowerCase())
          ) {
            let [targetFromToken, targetToToken] = await fetchTokenData(
              this._provider,
              [path[0], path[path.length - 1]]
            );

            // get execution price from sdk
            let amounts = await this.getAmountsOut(
              router,
              path,
              targetAmountInWei
            );

            let executionPrice = amounts[amounts.length - 1];

            // zone to execute buy and calculate estimations of gases
            let { slippage: targetSlippage } = this.getSlippage({
              executionPrice,
              targetAmountOutMin,
              targetMethodName,
            });

            if (
              targetSlippage <
              config.MIN_SLIPPAGE_THRESHOLD / 100 //~ 1%
            ) {
              console.log(
                `Skipping: Tx ${targetHash} Target slippage ${targetSlippage.toFixed(
                  4
                )} is < ${config.MIN_SLIPPAGE_THRESHOLD}%`
              );
              return;
            }

            let tokenBalance = await getTokenBalance(
              this._provider,
              targetFromToken.address
            );

            let { reserveBNB, reserveToken } = await this.getReserves(
              path,
              router
            );

            let amount = parseFloat(
              utils.formatUnits(targetAmountInWei, targetFromToken.decimals)
            );

            let amountOut = parseFloat(
              utils.formatUnits(targetAmountOutMin, targetToToken.decimals)
            );
            // if target amount out is 0; then their slippage is 100 %
            // make their slippage  5%
            if (amountOut === 0) {
              console.info(`Target slippage is 100%, impossing 5% slippage`);
              amountOut = parseFloat(
                utils.formatUnits(
                  executionPrice.mul(9500).div(10000),
                  targetToToken.decimals
                )
              );
            }

            let reserve0 = parseFloat(
              utils.formatUnits(reserveBNB, targetFromToken.decimals)
            );
            let reserve1 = parseFloat(
              utils.formatUnits(reserveToken, targetToToken.decimals)
            );

            let k = reserve0 * reserve1;

            let amountIn = utils.parseUnits(
              Math.abs(
                this.getAmountIn(amount, amountOut, k) - reserve0
              ).toFixed(targetFromToken.decimals),
              targetFromToken.decimals
            );

            let {
              safe,
              profit: profitInTargetFromToken,
              msg,
            } = await this.checkToken({
              path,
              router,
              amountIn,
              token: targetToToken,
            });

            if (safe) {
              if (profitInTargetFromToken.lte(0)) {
                console.log(
                  `Skipping: Profit is ${utils.formatUnits(
                    profitInTargetFromToken,
                    targetFromToken.decimals
                  )}, Token: ${targetToToken.address}`
                );
                return;
              }

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
                  )} ${targetFromToken.symbol}, Token: ${targetToToken.symbol}`,
                  {
                    targetAmountInWei: utils.formatUnits(
                      targetAmountInWei,
                      targetFromToken.decimals
                    ),
                  }
                );
                return;
              }

              if (amountIn.lte(0)) {
                console.log(
                  `Skipping: Buy attack amount is <= 0, Token: ${targetToToken.symbol}`
                );
                return;
              }

              let [_, amountOutMin] = await this.getAmountsOut(
                router,
                path,
                amountIn
              );

              // set our slippage
              amountOutMin = amountOutMin.mul(900).div(1000);

              targetGasPriceInWei = targetGasPriceInWei || constants.Zero;

              let nonce = await this._provider.getTransactionCount(
                this.PUBLIC_KEY
              );

              if (!this._broadcastedTx) {
                this._broadcastedTx = true;
                // broadcast buy tx
                let {
                  success,
                  msg: buyErrorMsg,
                  hash: buyHash,
                } = await this.buy(
                  {
                    router,
                    amountIn,
                    amountOutMin,
                    path,
                  },
                  {
                    gasPrice: targetGasPriceInWei.add(
                      utils.parseUnits(
                        config.ADDITIONAL_BUY_GAS.toString(),
                        'gwei'
                      )
                    ),
                    // gasLimit: config.DEFAULT_GAS_LIMIT,
                    nonce,
                  }
                );
                console.log({ success, msg: buyErrorMsg || `Buy tx sent` });

                if (success) {
                  nonce += 1;
                  // broadcast sell tx
                  await sleep(200);

                  let sell_route = [...path].reverse();

                  let {
                    success,
                    msg: sellErrorMsg,
                    hash: sellHash,
                  } = await this.sell(
                    { router, amountOutMin: constants.Zero, path: sell_route },
                    {
                      gasLimit: config.DEFAULT_GAS_LIMIT,
                      nonce,
                    }
                  );

                  console.log({ success, msg: sellErrorMsg || `Sell tx sent` });

                  let targetGasFeeInBNB = utils.formatEther(
                    targetGasLimit.mul(targetGasPriceInWei || constants.Zero)
                  );

                  let targetAmount = parseFloat(
                    utils.formatUnits(
                      targetAmountInWei,
                      targetFromToken.decimals
                    )
                  );

                  let targetGasPriceInGwei = `${parseFloat(
                    utils.formatUnits(
                      targetGasPriceInWei || constants.Zero,
                      'gwei'
                    )
                  ).toString()} Gwei`;

                  let profitInTargetToToken =
                    executionPrice.sub(targetAmountOutMin);

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
                    amountIn: utils.formatUnits(
                      amountIn,
                      targetFromToken.decimals
                    ),
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
                    buyErrorMsg
                      ?.replaceAll('(', '\\(')
                      .replaceAll(')', '\\)') || '✔️'
                  }`;
                  msg += buyHash
                    ? `\nBuy Hash: ${`[${buyHash.toUpperCase()}](${
                        config.EXPLORER_URL
                      }/tx/${buyHash})`}`
                    : '';

                  msg += `\nGas Price: \`${parseFloat(
                    parseFloat(
                      utils.formatUnits(
                        targetGasPriceInWei.add(
                          utils.parseUnits(
                            config.ADDITIONAL_BUY_GAS.toString(),
                            'gwei'
                          )
                        ),
                        'gwei'
                      )
                    ).toFixed(6)
                  ).toString()} Gwei\``;

                  msg += `\n- - -`;

                  msg += `\n**TARGET TRADE**\n---`;
                  msg += `\nFrom: \`${targetFrom.toUpperCase()}\``;
                  msg += `\nTarget Hash: [${targetHash.toUpperCase()}](${
                    config.EXPLORER_URL
                  }/tx/${targetHash})`;
                  msg += `\nTarget AmountIn: \`${parseFloat(
                    targetAmount.toFixed(6)
                  )} ${targetFromToken.symbol}\``;
                  msg += `\nTarget Slippage: \`${(targetSlippage * 100).toFixed(
                    4
                  )}%\``;

                  msg += `\nTarget Gas Price: \`${targetGasPriceInGwei}\``;

                  msg += `\n- - -`;

                  msg += `\n**SELL TRADE**\n---`;
                  msg += `\nSell Status: ${
                    sellErrorMsg
                      ?.replaceAll('(', '\\(')
                      .replaceAll(')', '\\)') || '✔️'
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

                  msg += `\nEst. Profit in ${
                    targetFromToken.symbol
                  }: \`${parseFloat(
                    parseFloat(
                      utils.formatUnits(
                        profitInTargetFromToken,
                        targetFromToken.decimals
                      )
                    ).toFixed(6)
                  )}\``;
                  msg += `\nEst. Profit in ${
                    targetToToken.symbol
                  }: \`${parseFloat(
                    parseFloat(
                      utils.formatUnits(
                        profitInTargetToToken,
                        targetToToken.decimals
                      )
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
            } else {
              console.info(`Skipping: ${msg}`);
            }
          }
        } catch (error) {
          let msg = this.recoverError(error);
          console.error({ msg, path, error });
          await sleep(6000);
          this._broadcastedTx = false;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  public buy = async (
    data: {
      router: string;
      amountOutMin: BigNumber;
      path: string[];
      amountIn: BigNumber;
    },
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

      //buy
      let _data = utils.defaultAbiCoder.encode(
        ['address', 'uint256', 'uint256', 'address[]'],
        [data.router, data.amountIn, data.amountOutMin, data.path]
      );
      let { hash } = await this.contract.buyToken(_data, overloads);

      return {
        success: true,
        hash,
      };
    } catch (error: any) {
      let msg = this.recoverError(error);

      return {
        success: false,
        msg,
      };
    }
  };

  public sell = async (
    params: {
      router: string;
      amountOutMin: BigNumber;
      path: string[];
    },
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

      let _data = utils.defaultAbiCoder.encode(
        ['address', 'address[]', 'uint256'],
        [params.router, params.path, params.amountOutMin]
      );
      // sell
      let { hash } = await this.contract.sellToken(_data, overloads);

      return {
        success: true,
        hash,
      };
    } catch (error: any) {
      console.error(error);
      let msg = this.recoverError(error);
      return {
        success: false,
        msg,
      };
    }
  };

  public checkToken = async (
    params: {
      router: string;
      path: string[];
      amountIn: BigNumber;
      token: {
        address: string;
        decimals: number;
        symbol: string;
      };
    },
    overloads: {
      gasLimit?: number | string;
      nonce?: number;
    } = {
      gasLimit: config.DEFAULT_GAS_LIMIT,
    }
  ): Promise<{
    safe: boolean;
    profit: BigNumber;
    msg: string;
  }> => {
    let { router, amountIn, path, token } = params;

    try {
      let amountOutMin = 0;

      let buy_data = utils.defaultAbiCoder.encode(
        ['address', 'uint256', 'uint256', 'address[]'],
        [router, amountIn, amountOutMin, path]
      );

      let sell_route = [...params.path].reverse();

      let sell_data = utils.defaultAbiCoder.encode(
        ['address', 'address[]', 'uint256'],
        [router, sell_route, amountOutMin]
      );

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
      } = await this.contract.callStatic.simulate(
        buy_data,
        sell_data,
        overloads
      );

      // calc profit
      let profit = balanceAfterSell.sub(balanceBeforeSell.add(amountIn));

      let actualBought = balanceAfterBuy.sub(balanceBeforeBuy);

      let numerator: any = expectedBuy.sub(actualBought);

      let denominator: any = expectedBuy.add(actualBought).div(2);

      let buyTax = Math.abs(numerator / denominator);

      let actualSold = balanceAfterSell.sub(balanceBeforeSell);

      numerator = expectedSell.sub(actualSold);

      denominator = expectedSell.add(actualSold).div(2);

      let sellTax = Math.abs(numerator / denominator);

      let hasTax = Math.max(buyTax, sellTax) > 0;

      return {
        safe: !hasTax,
        profit,
        msg: hasTax
          ? `Token ${token.symbol}, ${token.address} has a buy tax of ${
              (buyTax * 100).toFixed(2) + '%'
            } and a sell tax of ${(sellTax * 100).toFixed(2) + '%'}`
          : `Token ${token.symbol}, ${token.address} is safe to trade`,
      };

      // return true;
    } catch (error: any) {
      error = this.recoverError(error);
      return {
        safe: false,
        profit: BigNumber.from(0),
        msg: `Token ${token.symbol}, ${token.address} is not safe, ${error}`,
      };
    }
  };

  private getSlippage = (_params: {
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

  private getAmountIn = (
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
  private getAmountsOut = async (
    router: string,
    path: string[],
    amountIn: BigNumber
  ): Promise<[amountIn: BigNumber, amountOut: BigNumber]> => {
    let contract = new Contract(
      router,
      [
        'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
      ],
      this._provider
    );

    return contract.getAmountsOut(amountIn, path);
  };

  /**
   * @note: that target is going from WBNB -> token
   * So, we'll be pushing the price of Token by
   * Swapping WBNB for Token before the target
   *
   * i.e Ideal tx placement:
   * 1: (Ours) Swap WBNB -> Token (pushing price of Token up)
   * 2: (Target) Swap WBNB -> Token (pushes the price up even more)
   * 3: (Ours) Swap Token -> WBNB (Sells token for slight WBNB profit)
   * @param _params
   *
   * @returns
   */
  private calcOptimalAmountIn = async (_params: {
    targetAmountIn: BigNumber;
    targetAmountOutMin: BigNumber;
    reserveBNB: BigNumber;
    reserveToken: BigNumber;
  }) => {
    let { targetAmountIn, targetAmountOutMin, reserveBNB, reserveToken } =
      _params;

    // Lower bound will be 0
    const lowerBound = constants.Zero;
    // Upper bound will be 100 WBNB (hardcoded, or however muchAmount you have on hand)
    const upperBound = utils.parseUnits('100');

    // Optimal Amount in to push reserve to the point where the user
    // _JUST_ receives their min recv
    return binarySearch(
      lowerBound,
      upperBound,
      targetAmountIn,
      targetAmountOutMin,
      reserveBNB,
      reserveToken
    );
  };

  private getReserves = async (path: string[], router: string) => {
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

  private recoverError = (error: any) => {
    let msg = '';
    try {
      error = JSON.parse(JSON.stringify(error));
      msg =
        error?.error?.reason ||
        error?.reason ||
        JSON.parse(error)?.error?.error?.response?.error?.message ||
        error?.response ||
        error?.message ||
        error;
    } catch (_error: any) {
      msg = error;
    }

    return msg;
  };
}

export const mempoolWrapper = new Mempool();
