import { BigNumber, Contract, providers, utils, Wallet } from 'ethers';
import { config } from '../config';
import { SMART_CONTRACT_ABI, } from '../constants';
import { ChainId, Fetcher, Token } from "@pancakeswap/sdk"

export class ContractWrapper {

  private contract: Contract;
  private _provider: providers.JsonRpcProvider;

  constructor(signer: Wallet) {

    // initialize some values i.e provider, contract, signer
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
      amountIn: BigNumber,
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
        gasPrice: (gasPrice += config.ADDITIONAL_BUY_GAS),
        gasLimit: config.DEFAULT_GAS_LIMIT,
        nonce: nonce
      }

      const deadline = Math.floor(Date.now() / 1000) + 60 * 2;

      const buyTransactionData = await this.contract.buy(
        utils.hexlify(amountIn),
        utils.hexlify(amountOutMin),
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


      //TODO check the balance passed here on the sell function

      let sellTransactionData = await this.contract.sell(
        utils.hexlify(amountOutMin),
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
   * 
   * @param token 
   * @param tokenDecimals 
   * @description 
     * Fetch information for a given token on the given chain, using the given  provider.
   */
  getTokenPair = async (token: string, tokenDecimals: number) => {
    try {
      // //TODO check 
      let newToken = new Token(ChainId.MAINNET, token, tokenDecimals);
      let pair = await Fetcher.fetchPairData(
        newToken,
        config.WBNB_TOKEN,
        this._provider
      )


      return pair;

    } catch (error) {
      console.log("Error", error)
    }
  }


  /**
   * chech profit of our trades
   */

  checkProfit = async (_params: {
    token: string,
    bnbToken: string,
    bnbBuyAmount: BigNumber,
    pancakeRouter: string

  }) => {

    const { token, bnbToken, bnbBuyAmount, pancakeRouter } = _params;
    try {

      let profit = await this.contract.check(
        token,
        bnbToken,
        bnbBuyAmount,
        pancakeRouter
      )

      return profit;


    } catch (error) {
      console.log("Error", error)
    }
  }

  /**
   * 
   * @returns the nonce of a given wallet
   */
  getWalletNonce = async () => {
    return await this._provider.getTransactionCount(config.WALLET_ADDRESS);
  };




}
