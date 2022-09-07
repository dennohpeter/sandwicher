import { ChainId, Token } from '@pancakeswap/sdk';
import 'dotenv/config';

if (!process.env.PRIVATE_KEY) {
  throw new Error(
    'PRIVATE_KEY is not defined and must be set in the .env file'
  );
}

export const config = {
  /**
   * @description PRIVATE_KEY is the private key of the account that will be used to sign transactions
   */
  PRIVATE_KEY: process.env.PRIVATE_KEY!,
  /**
   * @description JSON RPC endpoint
   * @type {string}
   */
  JSON_RPC: process.env.JSON_RPC!,

  /**
   * @description WSS_URL is the websocket endpoint of the WSS  endpoint
   */

  WSS_URL: process.env.WSS_URL!,

  /**
   * @description Contract address
   * @type {string}
   */
  SMART_CONTRACT_ADDRESS: '0x0C40867BE119a0E8De576240F5d2a31bE45c7b67',

  WALLET_ADDRESS: process.env.WALLET_ADDRESS,

  PANCAKE_SWAP_ROUTER: "0x10ED43C718714eb63d5aA57B78B54704E256024E",

  WBNB_ADDRESS: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",

  WBNB_TOKEN: new Token(
    ChainId.BSC,
    "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    18
  ),


  /**
   * @description List of supported routers on BSC
   * @type {string[]}
   */
  SUPPORTED_ROUTERS: ['0x10ed43c718714eb63d5aa57b78b54704e256024e'],

  /**
   * @description List of supported  buy methods on BSC
   * @type {string[]}
   */

  SUPPORTED_BUY_METHODS: [
    'swapETHForExactTokens',
    'swapExactETHForTokensSupportingFeeOnTransferTokens',
    'swapExactETHForTokens',
  ],





  /**
   * @description MINIMUM_AMOUNT is the minimum amount of BNB that can be swapped
   */
  MINIMUM_AMOUNT: 0.1,

  /**
   * @description DEFAULT_GAS_LIMIT that we use in transactions
   */
  DEFAULT_GAS_LIMIT: 300000,

  DEFAULT_GAS_PRICE: 10,

  /**
   * @description ADDITIONAL_BUY_GAS that we use in front-running the traget
   */
  ADDITIONAL_BUY_GAS: 10


};
