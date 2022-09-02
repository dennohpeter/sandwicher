import { Contract, providers, utils, Wallet } from 'ethers';
import { config } from '../config';

export class ContractWrapper {
  contract: Contract;

  constructor(signer: Wallet) {
    // initialize provider
    this.contract = new Contract(config.CONTRACT_ADDRESS, [], signer);
  }
}
