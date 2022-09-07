import { Contract, providers, utils, Wallet } from 'ethers';
import { config } from '../config';
import { SMART_CONTRACT_ABI } from '../constants';

export class ContractWrapper {
  private contract: Contract;
  private _provider: providers.JsonRpcProvider;

  constructor(signer: Wallet) {

    // initialize provider
    this.contract = new Contract(config.SMART_CONTRACT_ADDRESS, SMART_CONTRACT_ABI, signer);
    this._provider = new providers.JsonRpcProvider(config.JSON_RPC);
    signer = new Wallet(config.PRIVATE_KEY, this._provider)
  }


  /**
   * 
   * @param _params 
   * @returns a transaction hash after successful buy
   */
  buy = async (_params:
    {
      amountIn: number,
      amountOutMin: number,
      path: string[],
      pairAddress: string,
      pooledWBNB: number,
      gasPrice: number,
      nonce: number
    }) => {

    let {
      amountIn,
      amountOutMin,
      path,
      pairAddress,
      pooledWBNB,
      gasPrice,
      nonce,
    } = _params;

    try {

      const overLoads = {
        gasPrice: gasPrice += config.ADDITIONAL_BUY_GAS,
        gasLimit: config.DEFAULT_GAS_LIMIT,
        nonce: nonce
      }

      const deadline = Math.floor(Date.now() / 1000) + 60 * 2;

      const buyTransactionData = await this.contract.buy(
        this.toHex(amountIn),
        this.toHex(amountOutMin),
        path,
        deadline,
        config.PANCAKE_SWAP_ROUTER,
        pairAddress,
        pooledWBNB,
        overLoads

      )


      console.info(
        amountIn,
        amountOutMin,
        path,
        pairAddress,
        pooledWBNB,
        overLoads
      )


      return { success: true, data: `${buyTransactionData.hash}` };


    } catch (error) {
      console.log("Error", error)
    }

  }


  /**
   * 
   * @param  
   * @returns a transaction hash after a successful sell
   */

  sell = async (_params: {
    amountOutMin: number,
    path: string[],
    gasPrice: number,
    nonce: number
  }) => {

    let { amountOutMin, path, gasPrice, nonce } = _params;

    try {

      let overLoads = {
        gasPrice,
        gasLimit: config.DEFAULT_GAS_LIMIT,
        nonce,
      };

      let deadline = Math.floor(Date.now() / 1000) + 60 * 2;

      let sellTransactionData = await this.contract.sell(
        this.toHex(amountOutMin),
        path,
        deadline,
        config.PANCAKE_SWAP_ROUTER,
        overLoads
      );


      return { success: true, data: `${sellTransactionData.hash}` };


    } catch (error) {
      console.log("Error", error)
    }
  }



  /**
     * This is used to covert amount to hexadecimal
     * @param currencyAmount 
     * @returns 
     */
  toHex = async (currencyAmount: any) => {
    try {

      if (currencyAmount.toString().includes("e")) {
        let hexedAmount = currencyAmount.toString(16);
        return `0x${hexedAmount}`;
      } else {
        let parsedAmount = parseInt(currencyAmount);
        let hexedAmount = parsedAmount.toString(16);
        return `0x${hexedAmount}`;
      }

    } catch (error) {
      console.log("Error", error)
    }

  }


}
