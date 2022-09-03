import { ethers, providers, Wallet } from 'ethers';

/// Internal Imports
import { config } from '../config';
import { ITransaction } from '../types';
import { ContractWrapper } from './contract';

import ABI from '../ABI/pancakeswapABI.json';

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
    this._inter = new ethers.utils.Interface(ABI);
    this._provider = new providers.JsonRpcProvider(config.JSON_RPC);
  }

  /**
   *  Monitor mempool for transactions
   */
  public monitor = async () => {
    // implement mempool monitoring
    this._wsprovider.on('pending', async (txHash: string) => {
      const txReceipt = await this._wsprovider.getTransaction(txHash);

      if (txReceipt) {
        const txDetails: ITransaction = {
          from: txReceipt.from,
          to: txReceipt.to,
          value: txReceipt.value,
          nonce: txReceipt.nonce,
          gasPrice: txReceipt.gasPrice,
          gasLimit: txReceipt.gasLimit,
          hash: txReceipt.hash,
          data: txReceipt.data,
        };

        this._process(txDetails);
      }
    });
  };

  /**
   * Process transactions
   * @param tx
   */

  private _process = async (txDetails: ITransaction) => {
    // implement transaction processing

    let router = txDetails.to;

    if (router) {
      console.log('Router address is ', router);

      if (router.toLowerCase() == config.ROUTER_ADDRESS.toLowerCase()) {
        console.log('we are here');

        // process transaction
        const decoded_data = this._inter.parseTransaction({
          data: txDetails.data,
        });

        let targetBNBAmount = parseInt(txDetails.value._hex, 16) / 1e18;
        let methodName = decoded_data.name;
        let gasPrice = parseInt(txDetails.gasPrice._hex, 16) / 1e9;
        let gasLimit = parseInt(txDetails.gasLimit._hex, 16);

        console.log('targetBNBAmount is ', targetBNBAmount);
        console.log('methodName is ', methodName);
        console.log('gasPrice is ', gasPrice);
        console.log('gasLimit is ', gasLimit);

        if (
          methodName == 'swapETHForExactTokens' ||
          methodName == 'swapExactETHForTokensSupportingFeeOnTransferTokens' ||
          methodName == 'swapExactETHForTokens'
        ) {
          /**
           * check if transaction meets clients criteria/ thresholds
            if yes, execute transaction
            if no, ignore transaction

           */

          if (targetBNBAmount > config.MIN_BNB_AMOUNT) {
            console.log(
              `\n Target ${targetBNBAmount} and method is \n ${methodName}`
            );
            console.log('WE ARE ABOUT TO SLASH A NIGGA');
          }
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
