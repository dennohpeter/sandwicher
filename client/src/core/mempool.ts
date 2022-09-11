import { ChainId, Fetcher, Route, TokenAmount, Trade, TradeType } from '@pancakeswap/sdk';
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
      config.CONTRACT_ADDRESS,//smartcontract address
      [
        `function buy(bytes,address) payable`,
        `function sell(address, address) payable`,
      ],
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
      value: targetBNBAmountInWei,
      to: router,
      gasPrice: targetGasPriceInWei,
      gasLimit: targetGasLimit,
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

        // let targetGasLimit = parseInt(utils.formatUnits(receipt.gasLimit));

        // let targetGasFee = targetGasLimit * targetGasPrice;

        // let path = tx.args.path;
        // swaoExactEthForTokens(
        // args
        // )

        // let gasPrice: any = await this._provider.getGasPrice();

        // console.log('GasPrice', utils.formatUnits(gasPrice.toString()));

        let path = targetArgs.path;
        let token = path[path.length - 1]


        //let target = parseInt(targetBNBAmountInWei.toString())

        console.log("TARGET AMOUNT", parseInt(targetBNBAmountInWei.toString()))

        console.log("TOKEN", token)
        // Check if target method is in the supported list of buy methods
        if (
          config.SUPPORTED_BUY_METHODS.includes(targetMethodName) &&
          Object.values(config.SUPPORTED_BUY_TOKENS).some(
            (t) => t.address.toLowerCase() === path[0].toLowerCase()
          )
        ) {
          // Check if tx value  is > clients threshold
          if (
            receipt.value.gt(utils.parseUnits(config.MIN_BNB_AMOUNT.toString()))
          ) {
            console.log('********WE ARE ABOUT TO  EXECUTE TRANSACTION*******');

            // TODO: calc profit
            let profit = 1;

            //let priceImpact = await this._getPriceImpact(token, targetBNBAmountInWei)

            // console.log("PRICE IMPACT", priceImpact)

            if (profit > 0) {
              /**
               * zone to execute buy and calculate estimations of gases
               */

              let opts: {
                amountOutMin?: BigNumber;
                amountIn?: BigNumber;
              } = {};

              switch (targetMethodName) {
                case 'swapExactETHForTokens':
                case 'swapExactETHForTokensSupportingFeeOnTransferTokens':
                  opts.amountOutMin = constants.Zero;
                  break;

                case 'swapExactTokensForTokensSupportingFeeOnTransferTokens':
                  let targetToken = path[0];
                  let decimals = this._getTokenDecimals(targetToken);

                  opts.amountIn = utils.parseUnits(
                    (this._isStableToken(targetToken)
                      ? config.USD_BUY_AMOUNT
                      : config.BNB_BUY_AMOUNT
                    ).toString(),
                    decimals
                  );
                  opts.amountOutMin = constants.Zero;

                  break;
                default:
                  throw new Error('Unsupported Buy Method');
              }

              let args = {
                ...opts,
                path,
                router,
                deadline: Math.floor(Date.now() / 1000) + 60 * 2, // 2 minutes from the current Unix time
              };

              // targetGasPrice will be 0 when target is using maxPriorityFeePerGas and maxFeePerGas
              targetGasPriceInWei =
                targetGasPriceInWei || ethers.constants.Zero;

              let data = this._pancakeSwap.encodeFunctionData(
                targetMethodName,
                Object.values(args)
              );

              // broadcast buy tx
              this._execute(data, 'buy', router, {
                gasPrice: targetGasPriceInWei.add(
                  utils.parseUnits(config.ADDITIONAL_BUY_GAS.toString(), 'gwei')
                ),
              });

              let sellToken = path[path.length - 1];

              // broadcast sell tx
              this._execute(sellToken, 'sell', router, {
                gasPrice: targetGasPriceInWei.add(
                  utils.parseUnits(config.ADDITIONAL_BUY_GAS.toString(), 'gwei')
                ),
              });
            }
          }
        }
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    }
  };

  /**
   * Execute transactions
   * @param txs
   */
  private _execute = async (
    data: string,
    type: 'buy' | 'sell',
    router?: string,
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
      if (type.valueOf() === 'buy') {
        await this.contract.buy(data, router, overloads);
      } else {
        // sell
        await this.contract.sell(data, router, overloads);
      }
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

  private _isStableToken = (address: string) =>
    config.STABLE_TOKENS.some((t) => t.toLowerCase() === address.toLowerCase());

  private _getTokenDecimals = (address: string) =>
    this._isStableToken(address)
      ? Object.values(config.SUPPORTED_BUY_TOKENS).find(
        (t) => t.address.toLowerCase() === address.toLowerCase()
      )?.decimals || 6 // fallback to 6 decimals
      : 18;


  private _getPriceImpact = async (tokenAddress: string, amount: number) => {

    try {
      // Fetch information for a given token on the given chain, using the given ethers provider.
      let newToken = await Fetcher.fetchTokenData(ChainId.MAINNET, tokenAddress, this._provider)
      let WBNB = await Fetcher.fetchTokenData(ChainId.MAINNET, config.WBNB_ADDRESS, this._provider)

      //Fetches information about a pair and constructs a pair from the given two tokens.
      let pair = await Fetcher.fetchPairData(newToken, WBNB)
      let route = new Route([pair], WBNB)

      let trade = new Trade(route, new TokenAmount(newToken, amount), TradeType.EXACT_INPUT)

      console.log("**********PAIR********", trade)

      return trade.priceImpact


    } catch (error) {
      console.error
    }

  }

}




export const mempoolWrapper = new Mempool();
