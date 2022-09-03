import { providers, Wallet } from 'ethers';

/// Internal Imports
import { config } from '../config';
import { ITransaction } from '../types';
import { ContractWrapper } from './contract';

/**
 * @file mempool.ts
 * @description mempool class is a singleton class that manages  interactions
 * with the mempool including monitoring, processing and executing transactions
 * @author @Henry Kariuki
 *
 */
class Mempool {
  provider: providers.JsonRpcProvider;
  constructor(public JSON_RPC: string = config.JSON_RPC) {
    // initialize provider
    this.provider = new providers.JsonRpcProvider(JSON_RPC);
  }

  /**
   *  Monitor mempool for transactions
   */
  public monitor = async () => {
    // TODO: implement mempool monitoring
  };

  /**
   * Process transactions
   * @param tx
   */

  private _process = async (tx: ITransaction) => {
    // TODO: implement transaction processing
    // check if transaction meets clients criteria/ thresholds
    // if yes, execute transaction
    // if no, ignore transaction
  };

  /**
   * Execute transactions
   * @param txs
   */
  private _execute = async (tx: any) => {
    // TODO: implement transaction execution
    // TODO: build transaction data

    let signer = new Wallet(config.PRIVATE_KEY, this.provider);
    const contractWrapper = new ContractWrapper(signer);
    // call contract methods
  };
}

export const mempoolWrapper = new Mempool();
