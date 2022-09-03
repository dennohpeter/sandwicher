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
  CONTRACT_ADDRESS: '0x0000000000000000000000000000000000000000',

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
};
