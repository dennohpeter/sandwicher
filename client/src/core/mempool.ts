import { Contract, Provider } from 'ethers-multicall';

import { BigNumber, constants, ethers, providers, utils, Wallet } from 'ethers';

/// Internal Imports
import { config } from '../config';

import { PANCAKESWAP_ABI, TOKENS_TO_MONITOR } from '../constants';

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
  private contract: ethers.Contract;
  private _broadcastedTx: boolean;

  constructor() {
    // initialize some variables i.e provider, signers, interface
    this._wsprovider = new providers.WebSocketProvider(config.WSS_URL);
    this._pancakeSwap = new ethers.utils.Interface(PANCAKESWAP_ABI);
    this._provider = new providers.JsonRpcProvider(config.JSON_RPC);

    this.contract = new ethers.Contract(
      config.CONTRACT_ADDRESS, //smartcontract address
      [`function buy(bytes) payable`, `function sell(bytes) payable`],
      new Wallet(config.PRIVATE_KEY, this._wsprovider) //signer
    );

    this._broadcastedTx = false;
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
        console.error(error);
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
      timestamp: targetTimestamp,
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

        let { path, amountOutMin: targetAmountOutMin } = targetArgs;

        //if the path is undefined stop execution and return
        if (!path) return;

        // Check if target method is in the supported list of buy methods
        if (
          config.SUPPORTED_BUY_METHODS.includes(targetMethodName) &&
          Object.values(config.SUPPORTED_BUY_TOKENS).some(
            (t) => t.address.toLowerCase() === path[0].toLowerCase()
          )
        ) {
          let [targetFromToken, targetToToken] = await this.fetchTokens([
            path[0],
            path[path.length - 1],
          ]);

          // Check if tx value  is > clients threshold
          if (
            this.isStableToken(targetFromToken.address)
              ? targetAmountInWei.gt(
                  utils.parseUnits(
                    config.MIN_USD_AMOUNT.toString(),
                    targetFromToken.decimals
                  )
                )
              : targetAmountInWei.gt(
                  utils.parseUnits(config.MIN_BNB_AMOUNT.toString())
                )
          ) {
            // get execution price from sdk
            let [_, executionPrice] = await this.getAmountsOut(
              router,
              path,
              targetAmountInWei
            );

            console.log('***************************************');

            /**
             * zone to execute buy and calculate estimations of gases
             */

            let { slippage: targetSlippage, amountIn: targetAmountIn } =
              this.getSlippage({
                targetFromToken,
                executionPrice,
                targetAmountOutMin,
                targetMethodName,
              });

            let profitInTargetToToken = executionPrice.sub(targetAmountOutMin);

            let newExecutionPrice = utils.parseUnits(
              (
                parseFloat(
                  utils.formatUnits(executionPrice, targetToToken.decimals)
                ) *
                (targetSlippage + 1)
              ).toFixed(6),
              targetToToken.decimals
            );

            let profitInTargetFromToken = utils.parseUnits(
              (
                parseFloat(
                  utils.formatUnits(targetAmountInWei, targetFromToken.decimals)
                ) * targetSlippage
              ).toFixed(6),
              targetFromToken.decimals
            );

            // let buyAttackAmount = targetAmountInWei.mul(100 - targetSlippage);
            let amountIn = utils.parseUnits(
              (
                parseFloat(
                  utils.formatUnits(targetAmountInWei, targetFromToken.decimals)
                ) *
                (1 - targetSlippage)
              ).toFixed(6),
              targetFromToken.decimals
            );

            amountIn = utils.parseUnits('0.01', targetFromToken.decimals);

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
                !TOKENS_TO_MONITOR.some(
                  (token) =>
                    token.toLowerCase() === targetToToken.address.toLowerCase()
                )
              ) {
                console.log(
                  `${targetToToken.address} is not in the list of tokens to monitor`
                );
                return;
              }

              let amountOutMin = constants.Zero;

              // targetGasPrice will be 0 when target is using maxPriorityFeePerGas and maxFeePerGas
              targetGasPriceInWei =
                targetGasPriceInWei || ethers.constants.Zero;

              let nonce = await this._provider.getTransactionCount(
                config.PUBLIC_KEY
              );

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
                let { success, msg } = await this.sell(
                  router,
                  amountOutMin,
                  path,
                  {
                    gasLimit: config.DEFAULT_GAS_LIMIT,
                    nonce,
                  }
                );

                console.log({ success, msg: msg || `Sell tx sent` });
              }
              // this._broadcastedTx = false;
            }

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
              amountIn2: utils.parseUnits('0.01', targetFromToken.decimals),
              timestamp: new Date(targetTimestamp || 0 * 1000).toISOString(),
            });
          }
        }
      } catch (error) {
        console.error(error);
        // this._broadcastedTx = false;
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
      console.error(error);
      let msg =
        JSON.parse(JSON.parse(JSON.stringify(error))?.error?.error?.response)
          ?.error?.message || error;
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
      path = [...path].reverse();
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
      let msg =
        JSON.parse(JSON.parse(JSON.stringify(error))?.error?.error?.response)
          ?.error?.message || error;
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

  public fetchTokens = async (addresses: string[]) => {
    let provider = new Provider(this._provider, 56);

    return (
      await provider.all(
        addresses.map((address) => {
          let contract = new Contract(address, [
            'function decimals() view returns (uint8)',
            'function symbol() view returns (string)',
            'function name() view returns (string)',
          ]);
          return contract.decimals();
        })
      )
    ).map((decimals, i) => {
      return {
        decimals,
        address: addresses[i],
      };
    });
  };
  private getAmountsOut = async (
    router: string,
    path: string[],
    amountIn: BigNumber
  ): Promise<[amountIn: BigNumber, amountOut: BigNumber]> => {
    let contract = new ethers.Contract(
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
      let contract = new ethers.Contract(
        token,
        ['function balanceOf(address) view returns (uint)'],
        this._provider
      );
      amount = await contract.balanceOf(config.CONTRACT_ADDRESS);
    }

    let contract = new ethers.Contract(
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
    targetFromToken: {
      decimals: number;
      address: string;
    };
    targetMethodName: string;
    executionPrice: any;
    targetAmountOutMin: any;
  }): {
    slippage: number;
    amountIn: BigNumber;
  } => {
    let slippage: any = 0; // target is not willing to lose any amountOut tokens
    let amountIn = constants.Zero;

    let {
      targetFromToken,
      targetMethodName,
      executionPrice,
      targetAmountOutMin,
    } = _params;

    if (targetMethodName.startsWith('swapExactETHFor')) {
      slippage = (executionPrice - targetAmountOutMin) / executionPrice;
    } else if (
      targetMethodName.startsWith(
        'swapExactTokensForTokensSupportingFeeOnTransferTokens'
      )
    ) {
      amountIn = utils.parseUnits(
        (this.isStableToken(targetFromToken.address)
          ? config.USD_BUY_AMOUNT
          : config.BNB_BUY_AMOUNT
        ).toString(),
        targetFromToken.decimals
      );

      slippage = targetAmountOutMin / executionPrice;
    }
    // TODO: add support for swapETHForExactTokens
    else {
      throw new Error(`Unsupported Buy Method: ${targetMethodName}`);
    }

    return {
      slippage,
      amountIn,
    };
  };
}

export const mempoolWrapper = new Mempool();
