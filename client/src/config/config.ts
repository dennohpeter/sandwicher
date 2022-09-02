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
  JSON_RPC: 'https://mainnet.infura.io/v3/your-infura-project-id',

  /**
   * @description Contract address
   * @type {string}
   */
  CONTRACT_ADDRESS: '0x0000000000000000000000000000000000000000',
};
