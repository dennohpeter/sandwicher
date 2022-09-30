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
   * @description PUBLIC_KEY is the public key of the account that will be used to sign transactions
   */
  PUBLIC_KEY: process.env.PUBLIC_KEY!,

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
  CONTRACT_ADDRESS: '0xfE27fE46F0d96E94eC89b64a00f8BAd0A7F4256D',

  /**
   * STABLE TOKENS addresses e.g BUSD, USDT, USDC, etc
   */
  STABLE_TOKENS: [''],

  /**
   * @description Explorer URL
   */
  EXPLORER_URL: 'https://bscscan.com',

  /**
   * @description Telegram Bot Token
   */

  BOT_TOKEN: process.env.BOT_TOKEN!,

  /**
   * @description Telegram Chat IDs for users to receive notifications
   * @type {string[]}
   */
  WHITELISTED_USERS: ['1891092799', '1610178949', '251669027'],

  ////////////// FALLBACK VALUES /////////////////

  /**
   * @description DEFAULT_GAS_LIMIT that we use in transactions
   */
  DEFAULT_GAS_LIMIT: 400_000,

  /**
   * @description ADDITIONAL_BUY_GAS that we use in front-running the target
   */
  ADDITIONAL_BUY_GAS: 1.500014292,

  //////////////// TRADE CONFIG /////////////////

  /**
   * BNB amount you will spend
   */
  BNB_BUY_AMOUNT: 0.01,

  /**
   * USD/C/T you will spend if target method was
   * swapExactTokensForTokensSupportingFeeOnTransferTokens
   */
  USD_BUY_AMOUNT: 1000,

  /**
   * @description WBNB address
   * @type {string}
   * @default 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
   */
  WBNB_ADDRESS: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',

  /**
   * @description PancakeSwap Router address
   * @type {string}
   * @default 0x10ED43C718714eb63d5aA57B78B54704E256024E
   */
  PANCAKE_ROUTER_ADDRESS: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
};
