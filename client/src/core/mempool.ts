import {
  ChainId,
  Fetcher,
  Route,
  TokenAmount,
  Trade,
  TradeType,
} from '@pancakeswap/sdk';
import {
  BigNumber,
  constants,
  Contract,
  ethers,
  providers,
  utils,
  Wallet,
} from 'ethers';

/// Internal Imports
import { config } from '../config';

import { PANCAKESWAP_ABI } from '../constants';

/**
 * @file mempool.ts
 * @description mempool class is a singleton class that manages  interactions
 * with the mempool including monitoring, processing and executing transactions
 * @author Henry Kariuki
 *
 */
class Mempool {
  private _wsprovider: providers.WebSocketProvider;
  private _provider: providers.JsonRpcProvider;
  private _pancakeSwap: ethers.utils.Interface;
  private contract: Contract;

  constructor() {
    // initialize some variables i.e provider, signers, interface
    this._wsprovider = new providers.WebSocketProvider(config.WSS_URL);
    this._pancakeSwap = new ethers.utils.Interface(PANCAKESWAP_ABI);
    this._provider = new providers.JsonRpcProvider(config.JSON_RPC);

    this.contract = new Contract(
      config.CONTRACT_ADDRESS, //smartcontract address
      [`function buy(bytes) payable`, `function sell(bytes) payable`],
      new Wallet(config.PRIVATE_KEY, this._wsprovider) //signer
    );
  }

  /**
   *  Monitor mempool for transactions
   */
  public monitor = async () => {
    // implement mempool monitoring
    this._wsprovider.on('pending', async (txHash: string) => {
      try {
        let receipt = await this._wsprovider.getTransaction(txHash);

        receipt?.hash && this._process(receipt);
      } catch (error) {
        console.error(`Error`, error);
      }
    });
  };

  /**
   * Process transactions
   * @param receipt - transaction receipt
   */

  private _process = async (receipt: providers.TransactionResponse) => {
    // implement transaction processing
    let {
      value: targetAmountInWei,
      to: router,
      gasPrice: targetGasPriceInWei,
      gasLimit: targetGasLimit,
      hash: targetHash,
      from: targetFrom,
    } = receipt;
    if (
      router &&
      config.SUPPORTED_ROUTERS.some(
        (router) => router.toLowerCase() === receipt?.to?.toLowerCase()
      )
    ) {
      try {
        // decode tx data
        const tx = this._pancakeSwap.parseTransaction({
          data: receipt.data,
        });

        let { name: targetMethodName, args: targetArgs } = tx;

        let targetGasFeeInBNB = utils.formatEther(
          targetGasLimit.mul(targetGasPriceInWei || constants.Zero)
        );

        // let gasPrice = await this._provider.getGasPrice();

        let { path, amountOutMin: targetAmountOutMin } = targetArgs;

        //if the path is undefined stop execution and return
        if (!path) return;

        let targetFromToken = path[0];
        let targetToToken = path[path.length - 1];

        // Check if target method is in the supported list of buy methods
        if (
          config.SUPPORTED_BUY_METHODS.includes(targetMethodName) &&
          Object.values(config.SUPPORTED_BUY_TOKENS).some(
            (t) => t.address.toLowerCase() === path[0].toLowerCase()
          )
        ) {
          // Check if tx value  is > clients threshold
          if (
            this.isStableToken(targetFromToken)
              ? targetAmountInWei.gt(
                  utils.parseUnits(
                    config.MIN_USD_AMOUNT.toString(),
                    this.decimals(targetFromToken)
                  )
                )
              : targetAmountInWei.gt(
                  utils.parseUnits(config.MIN_BNB_AMOUNT.toString())
                )
          ) {
            console.log({
              router,
              targetHash,
              targetFrom,
              targetAmountInBNB: parseFloat(
                utils.formatEther(targetAmountInWei)
              ),
              path,
              targetFromToken,
              targetToToken,
              targetMethodName,
              targetGasLimit: targetGasLimit.toNumber(),
              targetGasPrice: parseFloat(
                utils.formatUnits(targetGasPriceInWei || constants.Zero, 'gwei')
              ),
              targetGasFeeInBNB: parseFloat(targetGasFeeInBNB),
              targetAmountOutMin,
            });

            console.log('********WE ARE ABOUT TO  EXECUTE TRANSACTION*******');

            // get execution price from sdk
            let [_, executionPrice] = await this.getAmountsOut(
              router,
              path,
              targetAmountInWei
            );

            console.log({
              executionPrice,
              executionPrice2: utils.formatEther(executionPrice),
            });

            console.log('***************************************');

            /**
             * zone to execute buy and calculate estimations of gases
             */

            let { slippage: targetSlippage } = this.getSlippage({
              targetFromToken,
              executionPrice,
              targetAmountOutMin,
              targetMethodName,
            });

            console.log({
              targetSlippage,
              slippage: targetSlippage.toString(),
              targetAmountOutMin,
            });
            // let profitInTargetToToken = executionPrice - targetAmountOutMin;

            // let newExecutionPrice = (targetSlippage + 1) * executionPrice;

            // let profitInTargetFromToken = newExecutionPrice * profitInTargetToToken

            // if (targetSlippage > config.MINIMUM_SLIPPAGE_AMOUNT) {
            //   let opts: {
            //     amountOutMin?: BigNumber;
            //     amountIn?: BigNumber;
            //   } = {};

            //   let args = {
            //     ...opts,
            //     path,
            //     router,
            //     deadline: Math.floor(Date.now() / 1000) + 60 * 2, // 2 minutes from the current Unix time
            //   };

            //   // targetGasPrice will be 0 when target is using maxPriorityFeePerGas and maxFeePerGas
            //   targetGasPriceInWei =
            //     targetGasPriceInWei || ethers.constants.Zero;

            //   let data = this._pancakeSwap.encodeFunctionData(
            //     targetMethodName,
            //     Object.values(args)
            //   );

            //   let nonce = await this._provider.getTransactionCount(
            //     config.PUBLIC_KEY
            //   );

            //   // broadcast buy tx
            //   this.buy(data, 'buy', router, {
            //     gasPrice: targetGasPriceInWei.add(
            //       utils.parseUnits(config.ADDITIONAL_BUY_GAS.toString(), 'gwei')
            //     ),
            //     nonce,
            //   });

            //   let sellToken = path[path.length - 1];

            //   // broadcast sell tx
            //   this.sell(sellToken, 'sell', router, {
            //     gasPrice: targetGasPriceInWei.add(
            //       utils.parseUnits(config.ADDITIONAL_BUY_GAS.toString(), 'gwei')
            //     ),
            //     nonce: nonce + 1,
            //   });
            // }
          }
        }
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    }
  };

  // TODO: update doc strings
  private buy = async (
    router: string,
    path: string[],
    amountIn: BigNumber,
    amountOutMin: BigNumber,
    overloads?: {
      gasLimit?: number | string;
      nonce?: number;
      gasPrice: BigNumber;
    }
  ): Promise<{
    success: boolean;
    msg?: string;
  }> => {
    try {
      console.log('EXECUTING BUY TRANSACTION');
      //buy
      let _data = utils.defaultAbiCoder.encode(
        ['address', 'uint256', 'uint256'].concat(
          [...Array(path.length).keys()].map((i, _i) => 'address')
        ),
        [router, amountIn, amountOutMin, path]
      );
      await this.contract.buy(_data, overloads);

      return {
        success: true,
      };
    } catch (error: any) {
      console.error(error);
      return {
        success: false,
        msg: error,
      };
    }
  };

  // TODO: update doc strings
  private sell = async (
    router: string,
    amountOutMin: BigNumber,
    targetToToken: string,
    overloads?: {
      gasLimit?: number | string;
      nonce?: number;
      gasPrice: BigNumber;
    }
  ): Promise<{
    success: boolean;
    msg?: string;
  }> => {
    try {
      console.log('EXECUTING SELL TRANSACTION');

      let _data = utils.defaultAbiCoder.encode(
        ['address', 'address', 'uint256'],
        [router, targetToToken, amountOutMin]
      );
      // sell
      await this.contract.sell(_data, overloads);

      return {
        success: true,
      };
    } catch (error: any) {
      console.error(error);
      return {
        success: false,
        msg: error,
      };
    }
  };

  private isStableToken = (address: string) =>
    config.STABLE_TOKENS.some((t) => t.toLowerCase() === address.toLowerCase());

  private decimals = (address: string) =>
    this.isStableToken(address)
      ? Object.values(config.SUPPORTED_BUY_TOKENS).find(
          (t) => t.address.toLowerCase() === address.toLowerCase()
        )?.decimals || 6 // fallback to 6 decimals
      : 18;

  private getAmountsOut = async (
    router: string,
    path: string[],
    amountIn: BigNumber
  ): Promise<[amountIn: BigNumber, amountOut: BigNumber]> => {
    // try {
    //   // Fetch information for a given token on the given chain, using the given ethers provider.
    //   let _fromToken = await Fetcher.fetchTokenData(
    //     ChainId.MAINNET,
    //     fromToken,
    //     this._provider
    //   );
    //   let _toToken = await Fetcher.fetchTokenData(
    //     ChainId.MAINNET,
    //     toToken,
    //     this._provider
    //   );

    //   //Fetches information about a pair and constructs a pair from the given two tokens.
    //   let pair = await Fetcher.fetchPairData(_fromToken, _toToken);

    //   let route = new Route([pair], _toToken);

    //   let trade = new Trade(
    //     route,
    //     new TokenAmount(_fromToken, amount.toString()),
    //     TradeType.EXACT_INPUT
    //   );

    //   console.log('**********PAIR********', trade);

    //   return trade.executionPrice;
    // } catch (error) {
    //   console.error;
    // }

    let contract = new Contract(
      router,
      [
        'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
      ],
      this._provider
    );

    return contract.getAmountsOut(amountIn, path);
  };

  private getSlippage = (_params: {
    targetFromToken: string;
    targetMethodName: string;
    executionPrice: any;
    targetAmountOutMin: any;
  }): {
    slippage: number;
    amountOutMin: BigNumber;
    amountIn: BigNumber;
  } => {
    let slippage: any = 0; // not willing to lose any amountOut tokens
    let amountOutMin = constants.Zero;
    let amountIn = constants.Zero;

    let {
      targetFromToken,
      targetMethodName,
      executionPrice,
      targetAmountOutMin,
    } = _params;

    if (targetMethodName.startsWith('swapExactETHFor')) {
      amountOutMin = constants.Zero;

      let targetTokensPerBNB: number;
      //calc target token amounts

      //calculate target's tokens per BNB if target is using the above methods
      // targetTokensPerBNB = utils.formatEther(targetAmountOutMin.div(targetAmountInWei))

      // // calculate the target slippage amount
      // slippage = (executionPrice - targetTokensPerBNB) / executionPrice
      // TODO: ask Jayden about this

      slippage = (executionPrice - targetAmountOutMin) / executionPrice;
    } else if (
      targetMethodName.startsWith(
        'swapExactTokensForTokensSupportingFeeOnTransferTokens'
      )
    ) {
      let decimals = this.decimals(targetFromToken);

      amountIn = utils.parseUnits(
        (this.isStableToken(targetFromToken)
          ? config.USD_BUY_AMOUNT
          : config.BNB_BUY_AMOUNT
        ).toString(),
        decimals
      );

      // opts.amountOutMin = constants.Zero;
      slippage = targetAmountOutMin / executionPrice;
    }
    // TODO: add support for swapETHForExactTokens
    else {
      throw new Error(`Unsupported Buy Method: ${targetMethodName}`);
    }

    return {
      slippage,
      amountOutMin,
      amountIn,
    };
  };
}

export const mempoolWrapper = new Mempool();
