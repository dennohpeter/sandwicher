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
  CONTRACT_ADDRESS: '0x0C40867BE119a0E8De576240F5d2a31bE45c7b67',

  PUBLIC_KEY: process.env.PUBLIC_KEY!,

  /**
   * @description List of supported routers on BSC
   * @type {string[]}
   */
  SUPPORTED_ROUTERS: ['0x10ED43C718714eb63d5aA57B78B54704E256024E'],

  /**
   * @description List of supported  buy methods on BSC
   * @type {string[]}
   */

  SUPPORTED_BUY_METHODS: [
    'swapETHForExactTokens',
    'swapExactETHForTokensSupportingFeeOnTransferTokens',
    'swapExactETHForTokens',
    'swapExactTokensForTokensSupportingFeeOnTransferTokens',
  ],

  /**
   * STABLE TOKENS addresses e.g BUSD, USDT, USDC, etc
   */
  STABLE_TOKENS: [''],

  /**
   * List of supported Buy Tokens that targets can use to buy
   * e.g WBNB, and ALL Stable Tokens
   */
  SUPPORTED_BUY_TOKENS: {
    USDC: {
      decimals: 6,
      name: 'USDC',
      address: '',
    },
    BUSD: {
      decimals: 18,
      name: 'BUSD',
      address: '',
    },
    USDT: {
      decimals: 6,
      name: 'USDT',
      address: '',
    },

    WBNB: {
      decimals: 18,
      name: 'WBNB',
      address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    },
  },

  ////////////// PRICE IMPACT CONFIGs ////////////
  /**
   * @description MIN_BNB_AMOUNT is the min amount of BNB that can be swapped
   *
   */
  MIN_BNB_AMOUNT: 1,

  /**
   * @description MIN_USD_AMOUNT is the min amount of USDT that will trigger price impact check/
   */
  MIN_USD_AMOUNT: 100,

  ////////////// FALLBACK VALUES /////////////////

  /**
   * @description DEFAULT_GAS_LIMIT that we use in transactions
   */
  DEFAULT_GAS_LIMIT: 300000,

  DEFAULT_GAS_PRICE: 10,

  /**
   * @description ADDITIONAL_BUY_GAS that we use in front-running the target
   */
  ADDITIONAL_BUY_GAS: 10,

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
   * @description MIN_PRICE_IMPACT is the min price impact that we will accept
   * @type {number}
   * @default 0.5
   */
  MIN_PRICE_IMPACT: 0.1,
};
