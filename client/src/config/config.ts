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
  CONTRACT_ADDRESS: '0xfE27fE46F0d96E94eC89b64a00f8BAd0A7F4256D',

  PUBLIC_KEY: process.env.PUBLIC_KEY!,

  /**
   * @description List of supported routers on BSC
   * @type {string[]}
   */
  SUPPORTED_ROUTERS: ['0x10ED43C718714eb63d5aA57B78B54704E256024E'],

  /**
   * STABLE TOKENS addresses e.g BUSD, USDT, USDC, etc
   */
  STABLE_TOKENS: [''],

  /**
   * @description Explorer URL
   */
  EXPLORER_URL: 'https://bscscan.com',

  ///////////////////WHITELISTED_USERS OF THE BOT //////////
  WHITELISTED_USERS: ['1610178949'],

  ////////////////////////BOT TOKEN////////////////////////

  BOT_TOKEN: process.env.BOT_TOKEN!,

  ////////////// PRICE IMPACT CONFIGs ////////////
  /**
   * @description MIN_BNB_AMOUNT is the min amount of BNB that can be swapped
   *
   */
  MIN_BNB_AMOUNT: 10,

  ////////////////// SLIPPAGE CONFIGS ////////////////
  /***
   * @description MINIMUM_SLIPPAGE_AMOUNT is the min slippage amount to consider before execution.
   */
  MINIMUM_SLIPPAGE_AMOUNT: 5,

  /**
   * @description MIN_USD_AMOUNT is the min amount of USDT that will trigger price impact check/
   */
  MIN_USD_AMOUNT: 100,

  ////////////// FALLBACK VALUES /////////////////

  /**
   * @description DEFAULT_GAS_LIMIT that we use in transactions
   */
  DEFAULT_GAS_LIMIT: 400_000,

  DEFAULT_GAS_PRICE: 10,

  /**
   * @description ADDITIONAL_BUY_GAS that we use in front-running the target
   */
  ADDITIONAL_BUY_GAS: 1.500014292,

  //////////////// TRADE CONFIG /////////////////

  /**
   * BNB amount you will spend
   */
  BNB_BUY_AMOUNT: 0.1,

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
};
