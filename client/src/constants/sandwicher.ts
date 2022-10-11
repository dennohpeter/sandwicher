export const SANDWICHER_ABI = [
  {
    inputs: [
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes',
      },
    ],
    name: 'buyToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes',
      },
    ],
    name: 'sellToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: '_buydata',
        type: 'bytes',
      },
      {
        internalType: 'bytes',
        name: '_selldata',
        type: 'bytes',
      },
    ],
    name: 'simulate',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'expectedBuy',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'balanceBeforeBuy',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'balanceAfterBuy',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'balanceBeforeSell',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'balanceAfterSell',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expectedSell',
            type: 'uint256',
          },
        ],
        internalType: 'struct ISandWicher.SimulationResult',
        name: 'result',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
