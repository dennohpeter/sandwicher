import { ContractCallContext, Multicall } from 'ethereum-multicall';
import { BigNumber, Contract, providers, Wallet } from 'ethers';
import { config } from '../config';

export const isStableToken = (address: string) =>
  config.STABLE_TOKENS.some((t) => t.toLowerCase() === address.toLowerCase());

export const fetchTokenData = async (
  provider: providers.JsonRpcProvider,
  tokens: string[]
) => {
  let multicall = new Multicall({
    ethersProvider: provider,
    tryAggregate: true,
  });

  let contractCallContext: ContractCallContext[] = tokens.map(
    (contractAddress) => ({
      reference: contractAddress,
      contractAddress,
      abi: [
        {
          constant: true,
          inputs: [],
          name: 'decimals',
          outputs: [{ name: '', type: 'uint8' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'symbol',
          outputs: [{ name: '', type: 'string' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'name',
          outputs: [{ name: '', type: 'string' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
      ],
      calls: [
        {
          reference: 'decimals',
          methodName: 'decimals',
          methodParameters: [],
        },
        {
          reference: 'symbol',
          methodName: 'symbol',
          methodParameters: [],
        },
        {
          reference: 'name',
          methodName: 'name',
          methodParameters: [],
        },
      ],
    })
  );

  let { results } = await multicall.call(contractCallContext);

  return tokens.map((token) => {
    let { originalContractCallContext, callsReturnContext } = results[token];
    return {
      decimals: callsReturnContext?.find((i) => i.methodName === 'decimals')
        ?.returnValues[0],
      symbol: callsReturnContext.find((i) => i.methodName == 'symbol')
        ?.returnValues[0],
      name: callsReturnContext.find((i) => i.methodName == 'name')
        ?.returnValues[0],
      address: originalContractCallContext.contractAddress.toLowerCase(),
    };
  });
};

export const getTokenBalance = async (
  provider: providers.JsonRpcProvider,
  token: string
) => {
  let contract = new Contract(
    token,
    ['function balanceOf(address account) public view returns (uint256)'],
    provider
  );

  return contract.balanceOf(config.CONTRACT_ADDRESS);
};

export const withdrawToken = async (
  provider: providers.JsonRpcProvider,
  token: string,
  amount?: BigNumber
) => {
  if (!amount) {
    let contract = new Contract(
      token,
      ['function balanceOf(address) view returns (uint)'],
      provider
    );
    amount = await contract.balanceOf(config.CONTRACT_ADDRESS);
  }

  let contract = new Contract(
    config.CONTRACT_ADDRESS,
    [
      {
        inputs: [
          {
            internalType: 'contract IERC20',
            name: '_token',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'withdrawToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    new Wallet(config.PRIVATE_KEY, provider)
  );

  return contract.withdrawToken(token, amount);
};
