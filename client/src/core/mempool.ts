import { ethers, providers, utils, Wallet } from 'ethers';

/// Internal Imports
import { config } from '../config';
import { ContractWrapper } from './contract';

import { PANCAKESWAP_ABI } from '../constants';

/**
 * @file mempool.ts
 * @description mempool class is a singleton class that manages  interactions
 * with the mempool including monitoring, processing and executing transactions
 * @author @Henry Kariuki
 *
 */
class Mempool {

  private _wsprovider: providers.WebSocketProvider;
  private _provider: providers.JsonRpcProvider;
  private _inter: ethers.utils.Interface;
  private signer;


  constructor() {
    // initialize some variables i.e provider, signers, interface
    this._wsprovider = new providers.WebSocketProvider(config.WSS_URL);
    this._inter = new ethers.utils.Interface(PANCAKESWAP_ABI);
    this._provider = new providers.JsonRpcProvider(config.JSON_RPC);
    this.signer = new Wallet(config.PRIVATE_KEY, this._wsprovider);

  }

  /**
   *  Monitor mempool for transactions
   */
  public monitor = async () => {
    // implement mempool monitoring
    this._wsprovider.on('pending', async (txHash: string) => {
      let receipt = await this._wsprovider.getTransaction(txHash);

      receipt?.hash && this._process(receipt);
    });
  };

  /**
   * Process transactions
   * @param receipt - transaction receipt
   */

  private _process = async (receipt: providers.TransactionResponse) => {
    // implement transaction processing
    if (receipt?.to) {

      if (
        config.SUPPORTED_ROUTERS.some(
          (router) => router.toLowerCase() === receipt?.to?.toLowerCase()
        )
      ) {

        // process transaction decoding the data
        try {
          const decoded_data = this._inter.parseTransaction({
            data: receipt.data,
          });

          //instatiate the contract wrapper class

          const contractWrapper = new ContractWrapper(this.signer);

          let targetBNBAmount = utils.formatEther(receipt.value);

          let targetMethodName = decoded_data.name;

          let targetGasPrice = parseInt(utils.formatUnits(receipt?.gasPrice || '0', 9)); // targetGasPrice will be 0 when target is using maxPriorityFeePerGas and maxFeePerGas

          let targetGasLimit = parseInt(utils.formatUnits(receipt.gasLimit));

          let targetGasFee = targetGasLimit * targetGasPrice;

          let path = decoded_data.args.path;



          let nonce = await contractWrapper.getWalletNonce()


          //TODO write a cron job to fetch this gasPrice every 20 secs

          let gasPrice: any = await this._provider.getGasPrice();

          console.log("GasPrice", utils.formatUnits(gasPrice.toString()))

          //Check if the transaction is a buy transaction

          if (config.SUPPORTED_BUY_METHODS.includes(targetMethodName)) {
            /**
             * check if transaction meets clients criteria/ thresholds
             * if yes, execute transaction
             * if no, ignore transaction
             * 
             */

            console.log({
              targetBNBAmount,
              targetMethodName,
              targetGasPrice,
              targetGasLimit,
              targetGasFee,
              path,

            });



            if (
              receipt.value.gt(
                utils.parseUnits(config.MINIMUM_AMOUNT.toString())
              )
            ) {
              console.log(
                `\n Target ${targetBNBAmount} and method is \n ${targetMethodName}`
              );
              console.log('********WE ARE ABOUT TO  EXECUTE TRANSACTION*******');

              let token = path[path.length - 1];


              let pair = await contractWrapper.getTokenPair(token, 18);

              let pairAddress = pair!.liquidityToken.address;


              let bnbToken;

              if (pair!.token1.address.toLowerCase() == config.WBNB_ADDRESS.toLowerCase()) {
                bnbToken = pair!.token1
              } else {
                bnbToken = pair!.token0
              }

              const pooledWBNB = parseInt(pair!.reserveOf(bnbToken).toFixed(2))

              console.log({
                bnbToken,
                pairAddress,
                pooledWBNB
              })

              /**
               * zone to checkk for profit calculations
               */

              const check = await contractWrapper.checkProfit({
                bnbToken: config.WBNB_ADDRESS,
                token: token,
                bnbBuyAmount: utils.parseEther(config.BNB_BUY_AMOUNT.toString()),
                pancakeRouter: config.PANCAKE_SWAP_ROUTER
              })

              console.log("Check", check)

              let profit = check[0];


              if (profit > 0) {

                /**
                * zone to execute buy and calculate estimations of gases
                */


                let buyTransaction = await contractWrapper.buy({
                  amountIn: utils.parseUnits(config.BNB_BUY_AMOUNT.toString()),
                  amountOutMin: 0,
                  path: path,
                  pairAddress: pairAddress,
                  pooledWBNB: pooledWBNB,
                  gasPrice: (targetGasPrice += config.ADDITIONAL_BUY_GAS),
                  nonce: nonce
                })


                let estimateGas: any;

                try {

                  //estimating the gas of the transaction 
                  estimateGas = await this._provider.estimateGas(buyTransaction!)
                } catch (error) {
                  console.log("Error", error)
                }

                //   const myGasPrice = gasPrice * config.DEFAULT_GAS_LIMIT;

                //   const txCostBNB = estimateGas * myGasPrice;

                //   const profitMinusFee = profit - txCostBNB

                //   if (profitMinusFee > 0) {


                //     // final execution zone transaction .1 buy 2. sell
                //   }

              }



            }
          }
        } catch (error) {
          console.error(`Error: ${error}`);
        }
      }
    }
  };

  /**
   * Execute transactions
   * @param txs
   */
  private _execute = async (tx: any) => {
    // TODO: implement transaction execution

    // TODO: build transaction data

    let signer = new Wallet(config.PRIVATE_KEY, this._wsprovider);

    const contractWrapper = new ContractWrapper(signer);



  };
}

export const mempoolWrapper = new Mempool();
