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

  constructor() {
    // initialize provider
    this._wsprovider = new providers.WebSocketProvider(config.WSS_URL);
    this._inter = new ethers.utils.Interface(PANCAKESWAP_ABI);
    this._provider = new providers.JsonRpcProvider(config.JSON_RPC);
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
      console.log('Router address is:', receipt?.to);

      if (
        config.SUPPORTED_ROUTERS.some(
          (router) => router.toLowerCase() === receipt?.to?.toLowerCase()
        )
      ) {
        console.log('we are here');

        // process transaction
        try {
          const decoded_data = this._inter.parseTransaction({
            data: receipt.data,
          });

          let targetBNBAmount = utils.formatEther(receipt.value);

          let targetMethodName = decoded_data.name;

          let targetGasPrice = parseInt(utils.formatUnits(receipt?.gasPrice || '0', 9)); // targetGasPrice will be 0 when target is using maxPriorityFeePerGas and maxFeePerGas
          let targetGasLimit = parseInt(utils.formatUnits(receipt.gasLimit));

          let targetGasFee = targetGasLimit * targetGasPrice;

          console.log({
            targetBNBAmount,
            targetMethodName,
            targetGasPrice,
            targetGasLimit,
            targetGasFee,
          });

          /// Check if the transaction is a buy transaction
          if (config.SUPPORTED_BUY_METHODS.includes(targetMethodName)) {
            /**
             * check if transaction meets clients criteria/ thresholds
             * if yes, execute transaction
             * if no, ignore transaction
             */

            if (
              receipt.value.gt(
                utils.parseUnits(config.MINIMUM_AMOUNT.toString())
              )
            ) {
              console.log(
                `\n Target ${targetBNBAmount} and method is \n ${targetMethodName}`
              );
              console.log('WE ARE ABOUT TO SLASH A NIGGA');

              // exec transaction, 1. for buy 2. for sell
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
    // call contract methods
  };
}

export const mempoolWrapper = new Mempool();
