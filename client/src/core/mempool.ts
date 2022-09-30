import {
  Multicall,
  ContractCallResults,
  ContractCallContext,
} from 'ethereum-multicall';

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

import { PANCAKESWAP_ABI, TOKENS_TO_MONITOR } from '../constants';
import { sleep } from '../helpers';

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

  private tokensToMonitor: Map<
    string,
    {
      decimals: number;
      name: string;
      address: string;
      symbol: string;
    }
  >;

  private supportedRouters: Map<string, string>;

  constructor() {
    // initialize some variables i.e provider, signers, interface
    this._wsprovider = new providers.WebSocketProvider(config.WSS_URL);
    this._pancakeSwap = new utils.Interface(PANCAKESWAP_ABI);
    this._provider = new providers.JsonRpcProvider(config.JSON_RPC);

    this.contract = new Contract(
      config.CONTRACT_ADDRESS, //smartcontract address
      [`function buy(bytes) payable`, `function sell(bytes) payable`],
      new Wallet(config.PRIVATE_KEY, this._wsprovider) //signer
    );

    this._broadcastedTx = false;

    this.supported_buy_methods = new Map();
    this.supported_buy_tokens = new Map();
    this.tokensToMonitor = new Map();
    this.supportedRouters = new Map();
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

    // setup tokens to monitor
    (await this.fetchTokenData(TOKENS_TO_MONITOR)).forEach((token) => {
      this.tokensToMonitor.set(token.address.toLowerCase(), token);
    });

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
    let {
      value: targetAmountInWei,
      to: router,
      gasPrice: targetGasPriceInWei,
      gasLimit: targetGasLimit,
      hash: targetHash,
      from: targetFrom,
      timestamp: targetTimestamp,
    } = receipt;

    if (router && this.supportedRouters.has(router?.toLowerCase() || '')) {
      try {
        // decode tx data
        const tx = this._pancakeSwap.parseTransaction({
          data: receipt.data,
        });

        let { name: targetMethodName, args: targetArgs } = tx;

        let { path, amountOutMin: targetAmountOutMin } = targetArgs;

        //if the path is undefined stop execution and return
        if (!path) return;

        // Check if target method is in the supported list of buy methods
        if (
          this.supported_buy_methods.has(targetMethodName) &&
          this.supported_buy_tokens.has(path[0].toLowerCase())
        ) {
          let [targetFromToken, targetToToken] = await this.fetchTokenData([
            path[0],
            path[path.length - 1],
          ]);

          // Check if target amountIn value  is > clients amountIn
          if (
            targetAmountInWei.lt(
              utils.parseUnits(config.BNB_BUY_AMOUNT.toString())
            )
          ) {
            console.log(
              `Target Amount In: ${utils.formatUnits(
                targetAmountInWei,
                targetFromToken.decimals
              )} ${targetFromToken.symbol} is < Our BNB Buy Amount: ${
                config.BNB_BUY_AMOUNT
              } ${targetFromToken.symbol} `
            );
            return;
          }
          // get execution price from sdk
          let amounts = await this.getAmountsOut(
            router,
            path,
            targetAmountInWei
          );
          let executionPrice = amounts[amounts.length - 1];

          console.log('***************************************');

          /**
           * zone to execute buy and calculate estimations of gases
           */

          let { slippage: targetSlippage } = this.getSlippage({
            executionPrice,
            targetAmountOutMin,
            targetMethodName,
          });

          if (targetSlippage < 0.001) {
            //~ 0.1%
            console.log(
              `Skipping: Tx ${targetHash} Target slippage ${targetSlippage.toFixed(
                4
              )} is < 0.1%`
            );
            return;
          }

          let profitInTargetToToken = executionPrice.sub(targetAmountOutMin);

          let newExecutionPrice = executionPrice
            .mul((targetSlippage * 10_000).toFixed(0) + 10_000)
            .div(10_000);

          let profitInTargetFromToken = targetAmountInWei
            .mul((targetSlippage * 10_000).toFixed(0))
            .div(10_000);

          let buyAttackAmount = targetAmountInWei.sub(profitInTargetFromToken);

          let amountIn = utils.parseUnits(
            config.BNB_BUY_AMOUNT.toString(),
            targetFromToken.decimals
          );

          if (buyAttackAmount.lt(amountIn)) {
            console.info(
              `Updating our amount In from ${utils.formatUnits(
                amountIn,
                targetFromToken.decimals
              )} ${targetFromToken.symbol} to ${utils.formatUnits(
                buyAttackAmount,
                targetFromToken.decimals
              )} ${targetFromToken.symbol},
              Tx: ${targetHash}`
            );

            amountIn = buyAttackAmount;
          }

          if (
            profitInTargetFromToken.gt(0)
            //  &&
            // (await this.isSafe({
            //   path,
            //   router,
            //   amountIn,
            // }))
          ) {
            if (
              !this.tokensToMonitor.has(targetToToken.address.toLowerCase())
            ) {
              console.log(
                `Skipping: Token ${targetToToken.address} is not in the list of tokens to monitor`
              );
              return;
            }

            let amountOutMin = constants.Zero;

            // targetGasPrice will be 0 when target is using maxPriorityFeePerGas and maxFeePerGas
            targetGasPriceInWei = targetGasPriceInWei || constants.Zero;

            let nonce = await this._provider.getTransactionCount(
              config.PUBLIC_KEY
            );

            if (!this._broadcastedTx) {
              this._broadcastedTx = true;
              // broadcast buy tx
              let { success, msg } = await this.buy(
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
                  gasLimit: config.DEFAULT_GAS_LIMIT,
                  nonce,
                }
              );

              console.log({ success, msg: msg || `Buy tx sent` });
              if (success) {
                nonce += 1;
                // broadcast sell tx
                await sleep(200);
                let sell_route = [...path].reverse();
                let { success, msg } = await this.sell(
                  router,
                  amountOutMin,
                  sell_route,
                  {
                    gasLimit: config.DEFAULT_GAS_LIMIT,
                    nonce,
                  }
                );

                console.log({ success, msg: msg || `Sell tx sent` });
                await sleep(9000);
                this._broadcastedTx = false;
              }
            } else {
              console.info(`Skipping: Tx ${targetHash} already broadcasted`);
            }

            let targetGasFeeInBNB = utils.formatEther(
              targetGasLimit.mul(targetGasPriceInWei || constants.Zero)
            );

            console.log({
              router,
              targetHash,
              targetFrom,
              targetAmount: parseFloat(
                utils.formatUnits(targetAmountInWei, targetFromToken.decimals)
              ),
              path,
              targetFromToken,
              targetToToken,
              targetMethodName,
              targetGasLimit: targetGasLimit.toNumber(),
              targetGasPriceInGwei: `${parseFloat(
                utils.formatUnits(targetGasPriceInWei || constants.Zero, 'gwei')
              ).toString()} gwei`,
              targetGasFeeInBNB: parseFloat(targetGasFeeInBNB),
              targetAmountOutMin: targetAmountOutMin.toString(),
              executionPrice: executionPrice.toString(),
              newExecutionPrice: newExecutionPrice.toString(),
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
              amountIn2: utils.formatUnits(
                buyAttackAmount,
                targetFromToken.decimals
              ),
              timestamp: new Date(targetTimestamp || 0 * 1000).toISOString(),
            });
          }
        }
      } catch (error) {
        let msg = this.decodeError(error);
        console.error({ msg });
        await sleep(6000);
        this._broadcastedTx = false;
      }
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
    msg?: string;
  }> => {
    try {
      console.log('EXECUTING BUY TRANSACTION', new Date().toISOString());

      //buy
      let _data = utils.defaultAbiCoder.encode(
        ['address', 'uint256', 'uint256', 'address[]'],
        [data.router, data.amountIn, data.amountOutMin, data.path]
      );
      await this.contract.buy(_data, overloads);

      return {
        success: true,
      };
    } catch (error: any) {
      let msg = this.decodeError(error);

      return {
        success: false,
        msg,
      };
    }
  };

  public sell = async (
    router: string,
    amountOutMin: BigNumber,
    path: string[],
    overloads: {
      gasLimit?: number | string;
      nonce?: number;
      gasPrice?: BigNumber;
    } = {}
  ): Promise<{
    success: boolean;
    msg?: string;
  }> => {
    try {
      console.log('EXECUTING SELL TRANSACTION', new Date().toISOString());

      let _data = utils.defaultAbiCoder.encode(
        ['address', 'address[]', 'uint256'],
        [router, path, amountOutMin]
      );
      // sell
      await this.contract.sell(_data, overloads);

      return {
        success: true,
      };
    } catch (error: any) {
      console.error(error);
      let msg = this.decodeError(error);
      return {
        success: false,
        msg,
      };
    }
  };

  public isSafe = async (
    params: {
      router: string;
      amountIn: BigNumber;
      path: string[];
    },
    overloads: {
      gasLimit?: number | string;
      nonce?: number;
    } = {
      gasLimit: config.DEFAULT_GAS_LIMIT,
    }
  ): Promise<boolean> => {
    let token = params.path[params.path.length - 1];

    try {
      let amountOutMin = 0;

      let buy_data = utils.defaultAbiCoder.encode(
        ['address', 'uint256', 'uint256', 'address[]'],
        [params.router, params.amountIn, amountOutMin, params.path]
      );

      let sell_route = [...params.path].reverse();

      let sell_data = utils.defaultAbiCoder.encode(
        ['address', 'address[]', 'uint256'],
        [params.router, sell_route, amountOutMin]
      );

      await this.contract.callStatic.multicall(
        [buy_data, sell_data],
        overloads
      );

      console.log(`Token ${token} is safe`);
      return true;
    } catch (error: any) {
      console.error(error);
      console.log(`Token ${token} is not safe`);
    }
    return false;
  };

  private isStableToken = (address: string) =>
    config.STABLE_TOKENS.some((t) => t.toLowerCase() === address.toLowerCase());

  public fetchTokenData = async (tokens: string[]) => {
    let multicall = new Multicall({
      ethersProvider: this._provider,
      tryAggregate: true,
    });

    let contractCallContext: ContractCallContext[] = tokens.map(
      (contractAddress) => ({
        reference: contractAddress,
        contractAddress,
        abi: [
          {
            constant: true,
            inputs: [],
            name: 'decimals',
            outputs: [{ name: '', type: 'uint8' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
          {
            constant: true,
            inputs: [],
            name: 'symbol',
            outputs: [{ name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
          {
            constant: true,
            inputs: [],
            name: 'name',
            outputs: [{ name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
        ],
        calls: [
          {
            reference: 'decimals',
            methodName: 'decimals',
            methodParameters: [],
          },
          {
            reference: 'symbol',
            methodName: 'symbol',
            methodParameters: [],
          },
          {
            reference: 'name',
            methodName: 'name',
            methodParameters: [],
          },
        ],
      })
    );

    let { results } = await multicall.call(contractCallContext);

    return tokens.map((token) => {
      let { originalContractCallContext, callsReturnContext } = results[token];
      return {
        decimals: callsReturnContext?.find((i) => i.methodName === 'decimals')
          ?.returnValues[0],
        symbol: callsReturnContext.find((i) => i.methodName == 'symbol')
          ?.returnValues[0],
        name: callsReturnContext.find((i) => i.methodName == 'name')
          ?.returnValues[0],
        address: originalContractCallContext.contractAddress.toLowerCase(),
      };
    });
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

  public withdrawToken = async (token: string, amount?: BigNumber) => {
    if (!amount) {
      let contract = new Contract(
        token,
        ['function balanceOf(address) view returns (uint)'],
        this._provider
      );
      amount = await contract.balanceOf(config.CONTRACT_ADDRESS);
    }

    let contract = new Contract(
      config.CONTRACT_ADDRESS,
      [
        {
          inputs: [
            {
              internalType: 'contract IERC20',
              name: '_token',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256',
            },
          ],
          name: 'withdrawToken',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      new Wallet(config.PRIVATE_KEY, this._provider)
    );

    return contract.withdrawToken(token, amount);
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

  private decodeError = (error: any) => {
    let msg = '';
    try {
      error = JSON.parse(JSON.stringify(error));
      console.log({ error });

      msg =
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
