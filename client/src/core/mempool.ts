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
import {
  binarySearch,
  calcSandwichStates,
  getUniv2DataGivenAmountIn,
  sleep,
} from '../helpers';
import { sendMessage } from './telegram';

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
    try {
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
          if (deadline.toNumber() < Date.now() / 1000) {
            console.info(`Transaction deadline has passed`, { targetHash });
            return;
          }

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
            console.log(`- - - `.repeat(10));

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
              !this.tokensToMonitor.has(targetToToken.address.toLowerCase())
            ) {
              console.log(
                `Skipping: Token ${targetToToken.address} is not in the list of tokens to monitor`
              );
              return;
            }

            if (
              parseFloat(targetSlippage.toFixed(5)) <
              config.MIN_SLIPPAGE_THRESHOLD / 100 //~ 1%
            ) {
              console.log(
                `Skipping: Tx ${targetHash} Target slippage ${targetSlippage.toFixed(
                  4
                )} is < ${config.MIN_SLIPPAGE_THRESHOLD}%`
              );
              return;
            }

            let profitInTargetToToken = executionPrice.sub(targetAmountOutMin);

            if (
              parseFloat(
                utils.formatUnits(profitInTargetToToken, targetToToken.decimals)
              ) < 0.02
            ) {
              console.log(
                `Skipping: Profit in ${targetToToken.symbol} is < 0.02 ${targetToToken.symbol}`
              );
              return;
            }

            let newExecutionPrice = executionPrice
              .mul((targetSlippage * 10_000).toFixed(0) + 10_000)
              .div(10_000);

            let profitInTargetFromToken = targetAmountInWei
              .mul((targetSlippage * 10_000).toFixed(0))
              .div(10_000);

            // let buyAttackAmount = targetAmountInWei.sub(profitInTargetFromToken);

            // 2. let amountIn = targetAmountInWei.div(2);

            let tokenBalance = await this.getTokenBalance(
              targetFromToken.address
            );

            let { reserveBNB, reserveToken } = await this.getReserves(
              path,
              router
            );

            console.log({
              reserveBNB: utils.formatUnits(
                reserveBNB,
                targetFromToken.decimals
              ),
              reserveToken: utils.formatUnits(
                reserveToken,
                targetToToken.decimals
              ),
              path,
              targetHash,
              amountIn: utils.formatUnits(
                targetAmountInWei,
                targetFromToken.decimals
              ),
              token: targetToToken.symbol,
              address: targetToToken.address,
            });
            let amountIn = constants.Zero;
            // let k = reserveBNB.mul(reserveToken);
            // let amountIn = await this.getAmountIn(
            //   targetAmountInWei,
            //   targetAmountOutMin,
            //   k
            // );
            // let amountIn = await this.calcOptimalAmountIn({
            //   router,
            //   path,
            //   executionPrice,
            //   reserveBNB,
            //   reserveToken,
            //   targetAmountInWei,
            //   fromTokenBal: tokenBalance,
            //   targetMinRecvToken: targetAmountOutMin,
            // });

            // const sandwichStates = calcSandwichStates(
            //   amountIn,
            //   targetAmountOutMin,
            //   reserveBNB,
            //   reserveToken,
            //   amountIn
            // );

            // if (sandwichStates === null) {
            //   console.log('Victim receives less than minimum amount');
            //   return;
            // }

            // /* First profitability check */
            // const rawProfits =
            //   sandwichStates.backrunState.amountOut.sub(amountIn);
            // console.log(
            //   'Profits before gas costs: ',
            //   utils.formatEther(rawProfits).toString()
            // );

            // if (rawProfits < 0) {
            // console.log("Not profitable to sandwich before transaction costs");
            // return;
            // }

            if (amountIn.lte(0)) {
              console.log(
                `Skipping: Buy attack amount is <= 0, Token: ${targetToToken.symbol}`
              );
              return;
            }

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

            if (
              profitInTargetFromToken.gt(0) &&
              amountIn.gt(0)
              //  &&
              // (await this.isSafe({
              //   path,
              //   router,
              //   amountIn,
              // }))
            ) {
              let [_, amountOutMin] = await this.getAmountsOut(
                router,
                path,
                amountIn
              );

              amountOutMin = amountOutMin.mul(900).div(1000);

              // targetGasPrice will be 0 when target is using maxPriorityFeePerGas and maxFeePerGas
              targetGasPriceInWei = targetGasPriceInWei || constants.Zero;

              let nonce = await this._provider.getTransactionCount(
                config.PUBLIC_KEY
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

                  console.log({
                    router,
                    targetHash,
                    targetFrom,
                    targetAmount,
                    path,
                    targetFromToken,
                    targetToToken,
                    targetMethodName,
                    targetGasLimit: targetGasLimit.toNumber(),
                    targetGasPriceInGwei,
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
                    amountIn: utils.formatUnits(
                      amountIn,
                      targetFromToken.decimals
                    ),

                    timestamp: new Date(
                      targetTimestamp || 0 * 1000
                    ).toISOString(),
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
            }
          }
        } catch (error) {
          let msg = this.recoverError(error);
          console.error({ msg, path });
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
      let { hash } = await this.contract.buy(_data, overloads);

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
      let { hash } = await this.contract.sell(_data, overloads);

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

  private getTokenBalance = async (token: string) => {
    let contract = new Contract(
      token,
      ['function balanceOf(address account) public view returns (uint256)'],
      this._provider
    );

    return contract.balanceOf(config.CONTRACT_ADDRESS);
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

  private priceImpact = async (_params: {
    path: string[];
    router: string;
    amountIn: BigNumber;
  }) => {
    let { path, amountIn } = _params;

    let routerContract = new Contract(
      _params.router,
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

    let bnbReserves =
      token0 === (await pairContract.token0()) ? reserve0 : reserve1;

    console.log({ bnbReserves });

    let newBnbReserves = bnbReserves.add(amountIn);

    console.log({ newBnbReserves });

    // let priceImpact = newBnbReserves.sub(bnbReserves).div(bnbReserves);
    let priceImpact = ((amountIn as any) / newBnbReserves) * 100;

    console.log({ priceImpact });

    return priceImpact;
  };

  private getAmountIn = async (
    amountIn: BigNumber,
    amountOut: BigNumber,
    k: BigNumber,
    fee = BigNumber.from(9975)
  ) => {
    let negb = fee.mul(amountIn).mul(-1);

    let fourac = BigNumber.from(40000)
      .mul(fee)
      .mul(amountIn)
      .mul(k)
      .div(amountOut);

    let b = fee.mul(amountIn).pow(2).add(fourac);
    console.log({ b });
    let squareroot = Math.sqrt(b.toNumber());
    console.log({ squareroot });

    let worstRIn = negb.add(squareroot).div(20000);
    return worstRIn;
    // , k / worstRIn;
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
    path: string[];
    router: string;
    targetAmountInWei: BigNumber;
    executionPrice: BigNumber;
    fromTokenBal: BigNumber;
    targetMinRecvToken: BigNumber;
    reserveBNB: BigNumber;
    reserveToken: BigNumber;
  }) => {
    let { targetAmountInWei, targetMinRecvToken, reserveBNB, reserveToken } =
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
      targetAmountInWei,
      targetMinRecvToken,
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
      console.log({ error });

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
