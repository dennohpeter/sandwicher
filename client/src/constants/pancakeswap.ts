export const PANCAKESWAP_ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_factory",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_WETH",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "WETH",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "tokenA",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "tokenB",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amountADesired",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountBDesired",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountAMin",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountBMin",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "addLiquidity",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amountA",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountB",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "liquidity",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amountTokenDesired",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountTokenMin",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountETHMin",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "addLiquidityETH",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amountToken",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountETH",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "liquidity",
                "type": "uint256"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "factory",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountOut",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "reserveIn",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "reserveOut",
                "type": "uint256"
            }
        ],
        "name": "getAmountIn",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "reserveIn",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "reserveOut",
                "type": "uint256"
            }
        ],
        "name": "getAmountOut",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amountOut",
                "type": "uint256"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountOut",
                "type": "uint256"
            },
            {
                "internalType": "address[]",
                "name": "path",
                "type": "address[]"
            }
        ],
        "name": "getAmountsIn",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
            },
            {
                "internalType": "address[]",
                "name": "path",
                "type": "address[]"
            }
        ],
        "name": "getAmountsOut",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountA",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "reserveA",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "reserveB",
                "type": "uint256"
            }
        ],
        "name": "quote",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amountB",
                "type": "uint256"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "tokenA",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "tokenB",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "liquidity",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountAMin",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountBMin",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "removeLiquidity",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amountA",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountB",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "liquidity",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountTokenMin",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountETHMin",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "removeLiquidityETH",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amountToken",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountETH",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "liquidity",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountTokenMin",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountETHMin",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "removeLiquidityETHSupportingFeeOnTransferTokens",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amountETH",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "liquidity",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountTokenMin",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountETHMin",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "approveMax",
                "type": "bool"
            },
            {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
            },
            {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            }
        ],
        "name": "removeLiquidityETHWithPermit",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amountToken",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountETH",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "liquidity",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountTokenMin",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountETHMin",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "approveMax",
                "type": "bool"
            },
            {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
            },
            {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            }
        ],
        "name": "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amountETH",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "tokenA",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "tokenB",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "liquidity",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountAMin",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountBMin",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "approveMax",
                "type": "bool"
            },
            {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
            },
            {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            }
        ],
        "name": "removeLiquidityWithPermit",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amountA",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountB",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountOut",
                "type": "uint256"
            },
            {
                "internalType": "address[]",
                "name": "path",
                "type": "address[]"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "swapETHForExactTokens",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountOutMin",
                "type": "uint256"
            },
            {
                "internalType": "address[]",
                "name": "path",
                "type": "address[]"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "swapExactETHForTokens",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountOutMin",
                "type": "uint256"
            },
            {
                "internalType": "address[]",
                "name": "path",
                "type": "address[]"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "swapExactETHForTokensSupportingFeeOnTransferTokens",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountOutMin",
                "type": "uint256"
            },
            {
                "internalType": "address[]",
                "name": "path",
                "type": "address[]"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "swapExactTokensForETH",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountOutMin",
                "type": "uint256"
            },
            {
                "internalType": "address[]",
                "name": "path",
                "type": "address[]"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "swapExactTokensForETHSupportingFeeOnTransferTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountOutMin",
                "type": "uint256"
            },
            {
                "internalType": "address[]",
                "name": "path",
                "type": "address[]"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "swapExactTokensForTokens",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountOutMin",
                "type": "uint256"
            },
            {
                "internalType": "address[]",
                "name": "path",
                "type": "address[]"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "swapExactTokensForTokensSupportingFeeOnTransferTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountOut",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountInMax",
                "type": "uint256"
            },
            {
                "internalType": "address[]",
                "name": "path",
                "type": "address[]"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "swapTokensForExactETH",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountOut",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountInMax",
                "type": "uint256"
            },
            {
                "internalType": "address[]",
                "name": "path",
                "type": "address[]"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "swapTokensForExactTokens",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
]

export const SMART_CONTRACT_ABI = [
    {
        "abi": [
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "previousOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnershipTransferred",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "_wbnbReserves",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "_reserve0",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "_reserve1",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "_currentPooledWBNB",
                        "type": "uint256"
                    }
                ],
                "name": "Rseserves",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "contract IERC20",
                        "name": "bnb",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "uniswapRouterAddress",
                        "type": "address"
                    }
                ],
                "name": "approve",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "amountIn",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amountOutMin",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address[]",
                        "name": "path",
                        "type": "address[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "deadline",
                        "type": "uint256"
                    },
                    {
                        "internalType": "contract IUniswapV2Router02",
                        "name": "uniswapRouterAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "contract IUniswapV2Pair",
                        "name": "pairAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "currentPooledBNB",
                        "type": "uint256"
                    }
                ],
                "name": "buy",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address payable",
                        "name": "_to",
                        "type": "address"
                    }
                ],
                "name": "destroySmartContract",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "amountOutMin",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address[]",
                        "name": "path",
                        "type": "address[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "deadline",
                        "type": "uint256"
                    },
                    {
                        "internalType": "contract IUniswapV2Router02",
                        "name": "uniswapRouterAddress",
                        "type": "address"
                    }
                ],
                "name": "sell",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "contract IERC20",
                        "name": "tokenContractAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "withdrawToken",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "stateMutability": "payable",
                "type": "receive"
            }
        ],
        "bytecode": {
            "object": "0x608060405234801561001057600080fd5b5061001a3361001f565b61006f565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b610d638061007e6000396000f3fe6080604052600436106100595760003560e01c80632d6d998d1461006557806339df43ff146100875780637e5465ba146100a75780638da5cb5b146100dc5780639e281a9814610104578063f2e016b51461012457600080fd5b3661006057005b600080fd5b34801561007157600080fd5b50610085610080366004610a15565b610144565b005b34801561009357600080fd5b506100856100a2366004610aa0565b61030c565b3480156100b357600080fd5b506100c76100c2366004610abd565b610372565b60405190151581526020015b60405180910390f35b3480156100e857600080fd5b506000546040516001600160a01b0390911681526020016100d3565b34801561011057600080fd5b506100c761011f366004610af6565b6103f4565b34801561013057600080fd5b506100c761013f366004610b22565b6104c4565b6000806000846001600160a01b0316630902f1ac6040518163ffffffff1660e01b8152600401606060405180830381865afa158015610187573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101ab9190610b9c565b5091509150876000815181106101c3576101c3610bec565b60200260200101516001600160a01b0316856001600160a01b03166001600160a01b031614156101f5578192506101f9565b8092505b604080516001600160701b03858116825284811660208301528316818301526060810186905290517f6e03ac4aacf87a885d56af1fb1e5eea6e7d9559b846d9ea8905415251573ffdc9181900360800190a183836001600160701b0316111561029a5760405162461bcd60e51b815260206004820152600e60248201526d4572726f7220636f64652030303160901b60448201526064015b60405180910390fd5b604051635c11d79560e01b81526001600160a01b03871690635c11d795906102ce908d908d908d9030908e90600401610c02565b600060405180830381600087803b1580156102e857600080fd5b505af11580156102fc573d6000803e3d6000fd5b5050505050505050505050505050565b6000546001600160a01b031633146103665760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610291565b806001600160a01b0316ff5b60405163095ea7b360e01b81526001600160a01b03828116600483015260001960248301526000919084169063095ea7b3906044016020604051808303816000875af11580156103c6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103ea9190610c73565b5060019392505050565b600080546001600160a01b0316331461044f5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610291565b4782111561049f5760405162461bcd60e51b815260206004820152601e60248201527f496e737566666369656e7420616d6f756e7420746f20776974686472617700006044820152606401610291565b6104bb836104b56000546001600160a01b031690565b8461069d565b50600192915050565b600080846000815181106104da576104da610bec565b60209081029190910101516040516370a0823160e01b81523060048201526001600160a01b03909116906370a0823190602401602060405180830381865afa15801561052a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061054e9190610c95565b9050600081116105975760405162461bcd60e51b8152602060048201526014602482015273496e73756666696369656e742042616c616e636560601b6044820152606401610291565b846000815181106105aa576105aa610bec565b602090810291909101015160405163095ea7b360e01b81526001600160a01b03858116600483015260001960248301529091169063095ea7b3906044016020604051808303816000875af1158015610606573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061062a9190610c73565b50604051635c11d79560e01b81526001600160a01b03841690635c11d7959061065f9084908a908a9030908b90600401610c02565b600060405180830381600087803b15801561067957600080fd5b505af115801561068d573d6000803e3d6000fd5b5060019998505050505050505050565b604080516001600160a01b038416602482015260448082018490528251808303909101815260649091019091526020810180516001600160e01b031663a9059cbb60e01b1790526106ef9084906106f4565b505050565b6000610749826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b03166107c69092919063ffffffff16565b8051909150156106ef57808060200190518101906107679190610c73565b6106ef5760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b6064820152608401610291565b60606107d584846000856107df565b90505b9392505050565b6060824710156108405760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b6064820152608401610291565b843b61088e5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610291565b600080866001600160a01b031685876040516108aa9190610cde565b60006040518083038185875af1925050503d80600081146108e7576040519150601f19603f3d011682016040523d82523d6000602084013e6108ec565b606091505b50915091506108fc828286610907565b979650505050505050565b606083156109165750816107d8565b8251156109265782518084602001fd5b8160405162461bcd60e51b81526004016102919190610cfa565b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461096b57600080fd5b50565b803561097981610956565b919050565b600082601f83011261098f57600080fd5b8135602067ffffffffffffffff808311156109ac576109ac610940565b8260051b604051601f19603f830116810181811084821117156109d1576109d1610940565b6040529384528581018301938381019250878511156109ef57600080fd5b83870191505b848210156108fc57610a068261096e565b835291830191908301906109f5565b600080600080600080600060e0888a031215610a3057600080fd5b8735965060208801359550604088013567ffffffffffffffff811115610a5557600080fd5b610a618a828b0161097e565b955050606088013593506080880135610a7981610956565b925060a0880135610a8981610956565b8092505060c0880135905092959891949750929550565b600060208284031215610ab257600080fd5b81356107d881610956565b60008060408385031215610ad057600080fd5b8235610adb81610956565b91506020830135610aeb81610956565b809150509250929050565b60008060408385031215610b0957600080fd5b8235610b1481610956565b946020939093013593505050565b60008060008060808587031215610b3857600080fd5b84359350602085013567ffffffffffffffff811115610b5657600080fd5b610b628782880161097e565b935050604085013591506060850135610b7a81610956565b939692955090935050565b80516001600160701b038116811461097957600080fd5b600080600060608486031215610bb157600080fd5b610bba84610b85565b9250610bc860208501610b85565b9150604084015163ffffffff81168114610be157600080fd5b809150509250925092565b634e487b7160e01b600052603260045260246000fd5b600060a082018783526020878185015260a0604085015281875180845260c086019150828901935060005b81811015610c525784516001600160a01b031683529383019391830191600101610c2d565b50506001600160a01b03969096166060850152505050608001529392505050565b600060208284031215610c8557600080fd5b815180151581146107d857600080fd5b600060208284031215610ca757600080fd5b5051919050565b60005b83811015610cc9578181015183820152602001610cb1565b83811115610cd8576000848401525b50505050565b60008251610cf0818460208701610cae565b9190910192915050565b6020815260008251806020840152610d19816040850160208701610cae565b601f01601f1916919091016040019291505056fea2646970667358221220f61c441a57b27b021595ca6d8c90ea6ebfde7a06cbd7e5ddb5fda55c1ea25e5764736f6c634300080c0033",
            "sourceMap": "352:3239:7:-:0;;;;;;;;;;;;-1:-1:-1;606:23:8;176:10;606:9;:23::i;:::-;352:3239:7;;1008:169:8;1063:16;1082:6;;-1:-1:-1;;;;;1098:17:8;;;-1:-1:-1;;;;;;1098:17:8;;;;;;1130:40;;1082:6;;;;;;;1130:40;;1063:16;1130:40;1053:124;1008:169;:::o;352:3239:7:-;;;;;;;",
            "linkReferences": {}
        },
        "deployedBytecode": {
            "object": "0x6080604052600436106100595760003560e01c80632d6d998d1461006557806339df43ff146100875780637e5465ba146100a75780638da5cb5b146100dc5780639e281a9814610104578063f2e016b51461012457600080fd5b3661006057005b600080fd5b34801561007157600080fd5b50610085610080366004610a15565b610144565b005b34801561009357600080fd5b506100856100a2366004610aa0565b61030c565b3480156100b357600080fd5b506100c76100c2366004610abd565b610372565b60405190151581526020015b60405180910390f35b3480156100e857600080fd5b506000546040516001600160a01b0390911681526020016100d3565b34801561011057600080fd5b506100c761011f366004610af6565b6103f4565b34801561013057600080fd5b506100c761013f366004610b22565b6104c4565b6000806000846001600160a01b0316630902f1ac6040518163ffffffff1660e01b8152600401606060405180830381865afa158015610187573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101ab9190610b9c565b5091509150876000815181106101c3576101c3610bec565b60200260200101516001600160a01b0316856001600160a01b03166001600160a01b031614156101f5578192506101f9565b8092505b604080516001600160701b03858116825284811660208301528316818301526060810186905290517f6e03ac4aacf87a885d56af1fb1e5eea6e7d9559b846d9ea8905415251573ffdc9181900360800190a183836001600160701b0316111561029a5760405162461bcd60e51b815260206004820152600e60248201526d4572726f7220636f64652030303160901b60448201526064015b60405180910390fd5b604051635c11d79560e01b81526001600160a01b03871690635c11d795906102ce908d908d908d9030908e90600401610c02565b600060405180830381600087803b1580156102e857600080fd5b505af11580156102fc573d6000803e3d6000fd5b5050505050505050505050505050565b6000546001600160a01b031633146103665760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610291565b806001600160a01b0316ff5b60405163095ea7b360e01b81526001600160a01b03828116600483015260001960248301526000919084169063095ea7b3906044016020604051808303816000875af11580156103c6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103ea9190610c73565b5060019392505050565b600080546001600160a01b0316331461044f5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610291565b4782111561049f5760405162461bcd60e51b815260206004820152601e60248201527f496e737566666369656e7420616d6f756e7420746f20776974686472617700006044820152606401610291565b6104bb836104b56000546001600160a01b031690565b8461069d565b50600192915050565b600080846000815181106104da576104da610bec565b60209081029190910101516040516370a0823160e01b81523060048201526001600160a01b03909116906370a0823190602401602060405180830381865afa15801561052a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061054e9190610c95565b9050600081116105975760405162461bcd60e51b8152602060048201526014602482015273496e73756666696369656e742042616c616e636560601b6044820152606401610291565b846000815181106105aa576105aa610bec565b602090810291909101015160405163095ea7b360e01b81526001600160a01b03858116600483015260001960248301529091169063095ea7b3906044016020604051808303816000875af1158015610606573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061062a9190610c73565b50604051635c11d79560e01b81526001600160a01b03841690635c11d7959061065f9084908a908a9030908b90600401610c02565b600060405180830381600087803b15801561067957600080fd5b505af115801561068d573d6000803e3d6000fd5b5060019998505050505050505050565b604080516001600160a01b038416602482015260448082018490528251808303909101815260649091019091526020810180516001600160e01b031663a9059cbb60e01b1790526106ef9084906106f4565b505050565b6000610749826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b03166107c69092919063ffffffff16565b8051909150156106ef57808060200190518101906107679190610c73565b6106ef5760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b6064820152608401610291565b60606107d584846000856107df565b90505b9392505050565b6060824710156108405760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b6064820152608401610291565b843b61088e5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610291565b600080866001600160a01b031685876040516108aa9190610cde565b60006040518083038185875af1925050503d80600081146108e7576040519150601f19603f3d011682016040523d82523d6000602084013e6108ec565b606091505b50915091506108fc828286610907565b979650505050505050565b606083156109165750816107d8565b8251156109265782518084602001fd5b8160405162461bcd60e51b81526004016102919190610cfa565b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461096b57600080fd5b50565b803561097981610956565b919050565b600082601f83011261098f57600080fd5b8135602067ffffffffffffffff808311156109ac576109ac610940565b8260051b604051601f19603f830116810181811084821117156109d1576109d1610940565b6040529384528581018301938381019250878511156109ef57600080fd5b83870191505b848210156108fc57610a068261096e565b835291830191908301906109f5565b600080600080600080600060e0888a031215610a3057600080fd5b8735965060208801359550604088013567ffffffffffffffff811115610a5557600080fd5b610a618a828b0161097e565b955050606088013593506080880135610a7981610956565b925060a0880135610a8981610956565b8092505060c0880135905092959891949750929550565b600060208284031215610ab257600080fd5b81356107d881610956565b60008060408385031215610ad057600080fd5b8235610adb81610956565b91506020830135610aeb81610956565b809150509250929050565b60008060408385031215610b0957600080fd5b8235610b1481610956565b946020939093013593505050565b60008060008060808587031215610b3857600080fd5b84359350602085013567ffffffffffffffff811115610b5657600080fd5b610b628782880161097e565b935050604085013591506060850135610b7a81610956565b939692955090935050565b80516001600160701b038116811461097957600080fd5b600080600060608486031215610bb157600080fd5b610bba84610b85565b9250610bc860208501610b85565b9150604084015163ffffffff81168114610be157600080fd5b809150509250925092565b634e487b7160e01b600052603260045260246000fd5b600060a082018783526020878185015260a0604085015281875180845260c086019150828901935060005b81811015610c525784516001600160a01b031683529383019391830191600101610c2d565b50506001600160a01b03969096166060850152505050608001529392505050565b600060208284031215610c8557600080fd5b815180151581146107d857600080fd5b600060208284031215610ca757600080fd5b5051919050565b60005b83811015610cc9578181015183820152602001610cb1565b83811115610cd8576000848401525b50505050565b60008251610cf0818460208701610cae565b9190910192915050565b6020815260008251806020840152610d19816040850160208701610cae565b601f01601f1916919091016040019291505056fea2646970667358221220f61c441a57b27b021595ca6d8c90ea6ebfde7a06cbd7e5ddb5fda55c1ea25e5764736f6c634300080c0033",
            "sourceMap": "352:3239:7:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;702:894;;;;;;;;;;-1:-1:-1;702:894:7;;;;;:::i;:::-;;:::i;:::-;;3378:102;;;;;;;;;;-1:-1:-1;3378:102:7;;;;;:::i;:::-;;:::i;2660:235::-;;;;;;;;;;-1:-1:-1;2660:235:7;;;;;:::i;:::-;;:::i;:::-;;;3125:14:16;;3118:22;3100:41;;3088:2;3073:18;2660:235:7;;;;;;;;712:85:8;;;;;;;;;;-1:-1:-1;758:7:8;784:6;712:85;;-1:-1:-1;;;;;784:6:8;;;3298:51:16;;3286:2;3271:18;712:85:8;3152:203:16;2971:288:7;;;;;;;;;;-1:-1:-1;2971:288:7;;;;;:::i;:::-;;:::i;1714:804::-;;;;;;;;;;-1:-1:-1;1714:804:7;;;;;:::i;:::-;;:::i;702:894::-;972:20;1003:17;1022;1045:11;-1:-1:-1;;;;;1045:23:7;;:25;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;1002:68;;;;;1114:4;1119:1;1114:7;;;;;;;;:::i;:::-;;;;;;;-1:-1:-1;;;;;1084:37:7;:11;-1:-1:-1;;;;;1084:18:7;-1:-1:-1;;;;;1084:37:7;;1081:148;;;1153:9;1138:24;;1081:148;;;1209:9;1194:24;;1081:148;1244:63;;;-1:-1:-1;;;;;5427:15:16;;;5409:34;;5479:15;;;5474:2;5459:18;;5452:43;5531:15;;5511:18;;;5504:43;5578:2;5563:18;;5556:34;;;1244:63:7;;;;;;;5347:3:16;1244:63:7;;;1343:16;1327:12;-1:-1:-1;;;;;1327:32:7;;;1319:59;;;;-1:-1:-1;;;1319:59:7;;5803:2:16;1319:59:7;;;5785:21:16;5842:2;5822:18;;;5815:30;-1:-1:-1;;;5861:18:16;;;5854:44;5915:18;;1319:59:7;;;;;;;;;1389:200;;-1:-1:-1;;;1389:200:7;;-1:-1:-1;;;;;1389:74:7;;;;;:200;;1477:8;;1500:12;;1528:4;;1557;;1580:8;;1389:200;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;962:634;;;702:894;;;;;;;:::o;3378:102::-;758:7:8;784:6;-1:-1:-1;;;;;784:6:8;176:10;924:23;916:68;;;;-1:-1:-1;;;916:68:8;;7123:2:16;916:68:8;;;7105:21:16;;;7142:18;;;7135:30;7201:34;7181:18;;;7174:62;7253:18;;916:68:8;6921:356:16;916:68:8;3468:3:7::1;-1:-1:-1::0;;;;;3455:17:7::1;;2660:235:::0;2752:113;;-1:-1:-1;;;2752:113:7;;-1:-1:-1;;;;;7559:32:16;;;2752:113:7;;;7541:51:16;-1:-1:-1;;7608:18:16;;;7601:34;2737:4:7;;2752:11;;;;;;7514:18:16;;2752:113:7;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;-1:-1:-1;2883:4:7;;2660:235;-1:-1:-1;;;2660:235:7:o;2971:288::-;3066:4;784:6:8;;-1:-1:-1;;;;;784:6:8;176:10;924:23;916:68;;;;-1:-1:-1;;;916:68:8;;7123:2:16;916:68:8;;;7105:21:16;;;7142:18;;;7135:30;7201:34;7181:18;;;7174:62;7253:18;;916:68:8;6921:356:16;916:68:8;3102:21:7::1;3092:6;:31;;3083:75;;;::::0;-1:-1:-1;;;3083:75:7;;8130:2:16;3083:75:7::1;::::0;::::1;8112:21:16::0;8169:2;8149:18;;;8142:30;8208:32;8188:18;;;8181:60;8258:18;;3083:75:7::1;7928:354:16::0;3083:75:7::1;3168:61;3191:20;3213:7;758::8::0;784:6;-1:-1:-1;;;;;784:6:8;;712:85;3213:7:7::1;3222:6;3168:22;:61::i;:::-;-1:-1:-1::0;3246:4:7::1;2971:288:::0;;;;:::o;1714:804::-;1881:4;1897:15;1922:4;1927:1;1922:7;;;;;;;;:::i;:::-;;;;;;;;;;;1915:40;;-1:-1:-1;;;1915:40:7;;1949:4;1915:40;;;3298:51:16;-1:-1:-1;;;;;1915:25:7;;;;;;3271:18:16;;1915:40:7;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;1897:58;;1984:1;1974:7;:11;1966:44;;;;-1:-1:-1;;;1966:44:7;;8678:2:16;1966:44:7;;;8660:21:16;8717:2;8697:18;;;8690:30;-1:-1:-1;;;8736:18:16;;;8729:50;8796:18;;1966:44:7;8476:344:16;1966:44:7;2123:4;2128:1;2123:7;;;;;;;;:::i;:::-;;;;;;;;;;;2116:168;;-1:-1:-1;;;2116:168:7;;-1:-1:-1;;;;;7559:32:16;;;2116:168:7;;;7541:51:16;-1:-1:-1;;7608:18:16;;;7601:34;2116:23:7;;;;;;7514:18:16;;2116:168:7;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;-1:-1:-1;2295:191:7;;-1:-1:-1;;;2295:191:7;;-1:-1:-1;;;;;2295:74:7;;;;;:191;;2383:7;;2404:12;;2430:4;;2457;;2477:8;;2295:191;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2505:4:7;;1714:804;-1:-1:-1;;;;;;;;;1714:804:7:o;210:239:14:-;374:58;;;-1:-1:-1;;;;;7559:32:16;;374:58:14;;;7541:51:16;7608:18;;;;7601:34;;;374:58:14;;;;;;;;;;7514:18:16;;;;374:58:14;;;;;;;;-1:-1:-1;;;;;374:58:14;-1:-1:-1;;;374:58:14;;;322:120;;355:5;;322:19;:120::i;:::-;210:239;;;:::o;1113:786::-;1532:23;1558:103;1599:4;1558:103;;;;;;;;;;;;;;;;;1566:5;-1:-1:-1;;;;;1558:27:14;;;:103;;;;;:::i;:::-;1675:17;;1532:129;;-1:-1:-1;1675:21:14;1671:222;;1787:10;1776:30;;;;;;;;;;;;:::i;:::-;1751:131;;;;-1:-1:-1;;;1751:131:14;;9306:2:16;1751:131:14;;;9288:21:16;9345:2;9325:18;;;9318:30;9384:34;9364:18;;;9357:62;-1:-1:-1;;;9435:18:16;;;9428:40;9485:19;;1751:131:14;9104:406:16;3488:223:13;3621:12;3652:52;3674:6;3682:4;3688:1;3691:12;3652:21;:52::i;:::-;3645:59;;3488:223;;;;;;:::o;4665:555::-;4830:12;4900:5;4875:21;:30;;4854:115;;;;-1:-1:-1;;;4854:115:13;;9717:2:16;4854:115:13;;;9699:21:16;9756:2;9736:18;;;9729:30;9795:34;9775:18;;;9768:62;-1:-1:-1;;;9846:18:16;;;9839:36;9892:19;;4854:115:13;9515:402:16;4854:115:13;973:20;;4979:60;;;;-1:-1:-1;;;4979:60:13;;10124:2:16;4979:60:13;;;10106:21:16;10163:2;10143:18;;;10136:30;10202:31;10182:18;;;10175:59;10251:18;;4979:60:13;9922:353:16;4979:60:13;5051:12;5065:23;5092:6;-1:-1:-1;;;;;5092:11:13;5111:5;5131:4;5092:53;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;5050:95;;;;5162:51;5179:7;5188:10;5200:12;5162:16;:51::i;:::-;5155:58;4665:555;-1:-1:-1;;;;;;;4665:555:13:o;7530:692::-;7676:12;7704:7;7700:516;;;-1:-1:-1;7734:10:13;7727:17;;7700:516;7845:17;;:21;7841:365;;8039:10;8033:17;8099:15;8086:10;8082:2;8078:19;8071:44;7841:365;8178:12;8171:20;;-1:-1:-1;;;8171:20:13;;;;;;;;:::i;14:127:16:-;75:10;70:3;66:20;63:1;56:31;106:4;103:1;96:15;130:4;127:1;120:15;146:131;-1:-1:-1;;;;;221:31:16;;211:42;;201:70;;267:1;264;257:12;201:70;146:131;:::o;282:134::-;350:20;;379:31;350:20;379:31;:::i;:::-;282:134;;;:::o;421:908::-;475:5;528:3;521:4;513:6;509:17;505:27;495:55;;546:1;543;536:12;495:55;582:6;569:20;608:4;631:18;668:2;664;661:10;658:36;;;674:18;;:::i;:::-;720:2;717:1;713:10;752:2;746:9;815:2;811:7;806:2;802;798:11;794:25;786:6;782:38;870:6;858:10;855:22;850:2;838:10;835:18;832:46;829:72;;;881:18;;:::i;:::-;917:2;910:22;967:18;;;1043:15;;;1039:24;;;1001:15;;;;-1:-1:-1;1075:15:16;;;1072:35;;;1103:1;1100;1093:12;1072:35;1139:2;1131:6;1127:15;1116:26;;1151:148;1167:6;1162:3;1159:15;1151:148;;;1233:23;1252:3;1233:23;:::i;:::-;1221:36;;1277:12;;;;1184;;;;1151:148;;1334:952;1524:6;1532;1540;1548;1556;1564;1572;1625:3;1613:9;1604:7;1600:23;1596:33;1593:53;;;1642:1;1639;1632:12;1593:53;1678:9;1665:23;1655:33;;1735:2;1724:9;1720:18;1707:32;1697:42;;1790:2;1779:9;1775:18;1762:32;1817:18;1809:6;1806:30;1803:50;;;1849:1;1846;1839:12;1803:50;1872:61;1925:7;1916:6;1905:9;1901:22;1872:61;:::i;:::-;1862:71;;;1980:2;1969:9;1965:18;1952:32;1942:42;;2034:3;2023:9;2019:19;2006:33;2048:31;2073:5;2048:31;:::i;:::-;2098:5;-1:-1:-1;2155:3:16;2140:19;;2127:33;2169;2127;2169;:::i;:::-;2221:7;2211:17;;;2275:3;2264:9;2260:19;2247:33;2237:43;;1334:952;;;;;;;;;;:::o;2291:255::-;2358:6;2411:2;2399:9;2390:7;2386:23;2382:32;2379:52;;;2427:1;2424;2417:12;2379:52;2466:9;2453:23;2485:31;2510:5;2485:31;:::i;2551:404::-;2635:6;2643;2696:2;2684:9;2675:7;2671:23;2667:32;2664:52;;;2712:1;2709;2702:12;2664:52;2751:9;2738:23;2770:31;2795:5;2770:31;:::i;:::-;2820:5;-1:-1:-1;2877:2:16;2862:18;;2849:32;2890:33;2849:32;2890:33;:::i;:::-;2942:7;2932:17;;;2551:404;;;;;:::o;3360:331::-;3444:6;3452;3505:2;3493:9;3484:7;3480:23;3476:32;3473:52;;;3521:1;3518;3511:12;3473:52;3560:9;3547:23;3579:31;3604:5;3579:31;:::i;:::-;3629:5;3681:2;3666:18;;;;3653:32;;-1:-1:-1;;;3360:331:16:o;3696:648::-;3835:6;3843;3851;3859;3912:3;3900:9;3891:7;3887:23;3883:33;3880:53;;;3929:1;3926;3919:12;3880:53;3965:9;3952:23;3942:33;;4026:2;4015:9;4011:18;3998:32;4053:18;4045:6;4042:30;4039:50;;;4085:1;4082;4075:12;4039:50;4108:61;4161:7;4152:6;4141:9;4137:22;4108:61;:::i;:::-;4098:71;;;4216:2;4205:9;4201:18;4188:32;4178:42;;4270:2;4259:9;4255:18;4242:32;4283:31;4308:5;4283:31;:::i;:::-;3696:648;;;;-1:-1:-1;3696:648:16;;-1:-1:-1;;3696:648:16:o;4349:188::-;4428:13;;-1:-1:-1;;;;;4470:42:16;;4460:53;;4450:81;;4527:1;4524;4517:12;4542:450;4629:6;4637;4645;4698:2;4686:9;4677:7;4673:23;4669:32;4666:52;;;4714:1;4711;4704:12;4666:52;4737:40;4767:9;4737:40;:::i;:::-;4727:50;;4796:49;4841:2;4830:9;4826:18;4796:49;:::i;:::-;4786:59;;4888:2;4877:9;4873:18;4867:25;4932:10;4925:5;4921:22;4914:5;4911:33;4901:61;;4958:1;4955;4948:12;4901:61;4981:5;4971:15;;;4542:450;;;;;:::o;4997:127::-;5058:10;5053:3;5049:20;5046:1;5039:31;5089:4;5086:1;5079:15;5113:4;5110:1;5103:15;5944:972;6198:4;6246:3;6235:9;6231:19;6277:6;6266:9;6259:25;6303:2;6341:6;6336:2;6325:9;6321:18;6314:34;6384:3;6379:2;6368:9;6364:18;6357:31;6408:6;6443;6437:13;6474:6;6466;6459:22;6512:3;6501:9;6497:19;6490:26;;6551:2;6543:6;6539:15;6525:29;;6572:1;6582:195;6596:6;6593:1;6590:13;6582:195;;;6661:13;;-1:-1:-1;;;;;6657:39:16;6645:52;;6752:15;;;;6717:12;;;;6693:1;6611:9;6582:195;;;-1:-1:-1;;;;;;;6833:32:16;;;;6828:2;6813:18;;6806:60;-1:-1:-1;;;6897:3:16;6882:19;6875:35;6794:3;5944:972;-1:-1:-1;;;5944:972:16:o;7646:277::-;7713:6;7766:2;7754:9;7745:7;7741:23;7737:32;7734:52;;;7782:1;7779;7772:12;7734:52;7814:9;7808:16;7867:5;7860:13;7853:21;7846:5;7843:32;7833:60;;7889:1;7886;7879:12;8287:184;8357:6;8410:2;8398:9;8389:7;8385:23;8381:32;8378:52;;;8426:1;8423;8416:12;8378:52;-1:-1:-1;8449:16:16;;8287:184;-1:-1:-1;8287:184:16:o;10280:258::-;10352:1;10362:113;10376:6;10373:1;10370:13;10362:113;;;10452:11;;;10446:18;10433:11;;;10426:39;10398:2;10391:10;10362:113;;;10493:6;10490:1;10487:13;10484:48;;;10528:1;10519:6;10514:3;10510:16;10503:27;10484:48;;10280:258;;;:::o;10543:274::-;10672:3;10710:6;10704:13;10726:53;10772:6;10767:3;10760:4;10752:6;10748:17;10726:53;:::i;:::-;10795:16;;;;;10543:274;-1:-1:-1;;10543:274:16:o;10822:383::-;10971:2;10960:9;10953:21;10934:4;11003:6;10997:13;11046:6;11041:2;11030:9;11026:18;11019:34;11062:66;11121:6;11116:2;11105:9;11101:18;11096:2;11088:6;11084:15;11062:66;:::i;:::-;11189:2;11168:15;-1:-1:-1;;11164:29:16;11149:45;;;;11196:2;11145:54;;10822:383;-1:-1:-1;;10822:383:16:o",
            "linkReferences": {}
        },
        "methodIdentifiers": {
            "approve(address,address)": "7e5465ba",
            "buy(uint256,uint256,address[],uint256,address,address,uint256)": "2d6d998d",
            "destroySmartContract(address)": "39df43ff",
            "owner()": "8da5cb5b",
            "sell(uint256,address[],uint256,address)": "f2e016b5",
            "withdrawToken(address,uint256)": "9e281a98"
        },
        "rawMetadata": "{\"compiler\":{\"version\":\"0.8.12+commit.f00d7308\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"_wbnbReserves\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"_reserve0\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"_reserve1\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"_currentPooledWBNB\",\"type\":\"uint256\"}],\"name\":\"Rseserves\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"contract IERC20\",\"name\":\"bnb\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"uniswapRouterAddress\",\"type\":\"address\"}],\"name\":\"approve\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"amountIn\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amountOutMin\",\"type\":\"uint256\"},{\"internalType\":\"address[]\",\"name\":\"path\",\"type\":\"address[]\"},{\"internalType\":\"uint256\",\"name\":\"deadline\",\"type\":\"uint256\"},{\"internalType\":\"contract IUniswapV2Router02\",\"name\":\"uniswapRouterAddress\",\"type\":\"address\"},{\"internalType\":\"contract IUniswapV2Pair\",\"name\":\"pairAddress\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"currentPooledBNB\",\"type\":\"uint256\"}],\"name\":\"buy\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address payable\",\"name\":\"_to\",\"type\":\"address\"}],\"name\":\"destroySmartContract\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"amountOutMin\",\"type\":\"uint256\"},{\"internalType\":\"address[]\",\"name\":\"path\",\"type\":\"address[]\"},{\"internalType\":\"uint256\",\"name\":\"deadline\",\"type\":\"uint256\"},{\"internalType\":\"contract IUniswapV2Router02\",\"name\":\"uniswapRouterAddress\",\"type\":\"address\"}],\"name\":\"sell\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"contract IERC20\",\"name\":\"tokenContractAddress\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"withdrawToken\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"stateMutability\":\"payable\",\"type\":\"receive\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{\"owner()\":{\"details\":\"Returns the address of the current owner.\"}},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"approve(address,address)\":{\"notice\":\"approve function allows spender to approve tokens on your behalf: we approvea MAX amount in order to do it once\"},\"buy(uint256,uint256,address[],uint256,address,address,uint256)\":{\"notice\":\"this is a buy function for ERC20 tokens: checks that the bnb in a pool to be gt > our buy bnb before buying\"},\"destroySmartContract(address)\":{\"notice\":\"selfdestruct sends all remaining Ether stored in the contract to a designated address.\"},\"sell(uint256,address[],uint256,address)\":{\"notice\":\"this is a sell function: checks the balance of tokens we are selling to be gt > 0\"},\"withdrawToken(address,uint256)\":{\"notice\":\"allows owner of contract to withdraw tokens\"}},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/SandWicher.sol\":\"SandWicher\"},\"evmVersion\":\"london\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[\":@contracts/=src/\",\":@openzeppelin/contracts/=lib/openzeppelin-contracts/\",\":ds-test/=lib/forge-std/lib/ds-test/src/\",\":forge-std/=lib/forge-std/src/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"]},\"sources\":{\"src/SandWicher.sol\":{\"keccak256\":\"0xe242528166297a820f90c088160bda2ddca213fd00e4afa7f74f88643fd63bcc\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://2160e54e0e0353929ba0fa45f285d8f534438b0a2767ab038511e0f7318d4c00\",\"dweb:/ipfs/QmQ1jvKEVGugApKjVkKnkZTeQBgqddwUHmZucYGFVDLMjg\"]},\"src/abstract/Context.sol\":{\"keccak256\":\"0xbc9c833eb2ef635a64bfc00eaac38cfecd8e1029fdb660725ab501310d8c9194\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://5c50a2e1b9f651221ea9008215885c8292ae9a1129c94df97257ccbca5000e62\",\"dweb:/ipfs/Qmbeq7BrZkAANaL82oAFQDxm27xEEBBtGPs1u4tbhmmKbp\"]},\"src/interfaces/IERC20.sol\":{\"keccak256\":\"0x960f3957c5f15dd37f76fff144c6cbe623a58e29bf5fb86860e0a7c4aafe64ec\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://42a3a692fc3992333a36eaf791669aedc22c606bba828e548e1f7a69091aca8b\",\"dweb:/ipfs/QmNLy1SzWAZTUGXmktuiQo8M97u1qmZg5t3bE3nzQTPQhZ\"]},\"src/interfaces/IUniswapV2Pair.sol\":{\"keccak256\":\"0xa21400ebf49923768591088439ce2673d2d6ac7045acc6b431fbd33db3519ba3\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://570e2aa77d13385d27831112ddbd9bbbdd4f775bc39a01fecafdcba7f69c27ba\",\"dweb:/ipfs/QmRDRggtTJsfNTU52xQCyiCRuQcuWm6Su2tf4hRZPizx17\"]},\"src/interfaces/IUniswapV2Router01.sol\":{\"keccak256\":\"0xcae7ed6228fd0182f20feb5bc3355ac563f50ac293deab97c421a31e70814ee0\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://94cf0f28ec4df4998fdeaea238eaf2a0acd8dcfeb81a0ec085d477ee5c94ffc5\",\"dweb:/ipfs/QmYk8q7KcNay2Y6UP1QZEA42urGtNFnzD4bkULyEtRa7Nt\"]},\"src/interfaces/IUniswapV2Router02.sol\":{\"keccak256\":\"0x7b5f2752201df02e9e523b16df2b23d07ab3b81843d1028e5812581547c8738a\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://3a221d9db6fe8517331e92919ee8749e01a9a0cb292a6ce77cea94a8de4edd8d\",\"dweb:/ipfs/QmWaj1Z6MjaHggXETp3E7UrpZqcc7EriKVoSWi2X82Bzjq\"]},\"src/libraries/Address.sol\":{\"keccak256\":\"0x7b7347b9c022203912205c3449bfa4db4a65baae6216a707ce41951ea079287b\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://252fed0f11183cbed389320cf906affc9918629a8b238af66569c54a56eb5b53\",\"dweb:/ipfs/QmS2YY2PzTtm8yX537VJwANVKbUEYWQcjADXAevNf93Ekj\"]},\"src/libraries/SafeERC20.sol\":{\"keccak256\":\"0xdfd944709ee23ab151a070db9198e4f7ad1d1595909c40d0b707adb664d28c26\",\"license\":\"UNLICENSED\",\"urls\":[\"bzz-raw://b1f0fad77ddd2afab54db99ef05a66a0b7309a7baec6babd9a421ab8347f2695\",\"dweb:/ipfs/QmdBA59j4YWBiVdeGwxicwrvpdX2mspuWJZjzWMM1ee3tb\"]}},\"version\":1}",
        "metadata": {
            "compiler": {
                "version": "0.8.12+commit.f00d7308"
            },
            "language": "Solidity",
            "output": {
                "abi": [
                    {
                        "inputs": [
                            {
                                "internalType": "address",
                                "name": "previousOwner",
                                "type": "address",
                                "indexed": true
                            },
                            {
                                "internalType": "address",
                                "name": "newOwner",
                                "type": "address",
                                "indexed": true
                            }
                        ],
                        "type": "event",
                        "name": "OwnershipTransferred",
                        "anonymous": false
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "uint256",
                                "name": "_wbnbReserves",
                                "type": "uint256",
                                "indexed": false
                            },
                            {
                                "internalType": "uint256",
                                "name": "_reserve0",
                                "type": "uint256",
                                "indexed": false
                            },
                            {
                                "internalType": "uint256",
                                "name": "_reserve1",
                                "type": "uint256",
                                "indexed": false
                            },
                            {
                                "internalType": "uint256",
                                "name": "_currentPooledWBNB",
                                "type": "uint256",
                                "indexed": false
                            }
                        ],
                        "type": "event",
                        "name": "Rseserves",
                        "anonymous": false
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "contract IERC20",
                                "name": "bnb",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "uniswapRouterAddress",
                                "type": "address"
                            }
                        ],
                        "stateMutability": "nonpayable",
                        "type": "function",
                        "name": "approve",
                        "outputs": [
                            {
                                "internalType": "bool",
                                "name": "",
                                "type": "bool"
                            }
                        ]
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "uint256",
                                "name": "amountIn",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "amountOutMin",
                                "type": "uint256"
                            },
                            {
                                "internalType": "address[]",
                                "name": "path",
                                "type": "address[]"
                            },
                            {
                                "internalType": "uint256",
                                "name": "deadline",
                                "type": "uint256"
                            },
                            {
                                "internalType": "contract IUniswapV2Router02",
                                "name": "uniswapRouterAddress",
                                "type": "address"
                            },
                            {
                                "internalType": "contract IUniswapV2Pair",
                                "name": "pairAddress",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "currentPooledBNB",
                                "type": "uint256"
                            }
                        ],
                        "stateMutability": "nonpayable",
                        "type": "function",
                        "name": "buy"
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "address payable",
                                "name": "_to",
                                "type": "address"
                            }
                        ],
                        "stateMutability": "nonpayable",
                        "type": "function",
                        "name": "destroySmartContract"
                    },
                    {
                        "inputs": [],
                        "stateMutability": "view",
                        "type": "function",
                        "name": "owner",
                        "outputs": [
                            {
                                "internalType": "address",
                                "name": "",
                                "type": "address"
                            }
                        ]
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "uint256",
                                "name": "amountOutMin",
                                "type": "uint256"
                            },
                            {
                                "internalType": "address[]",
                                "name": "path",
                                "type": "address[]"
                            },
                            {
                                "internalType": "uint256",
                                "name": "deadline",
                                "type": "uint256"
                            },
                            {
                                "internalType": "contract IUniswapV2Router02",
                                "name": "uniswapRouterAddress",
                                "type": "address"
                            }
                        ],
                        "stateMutability": "nonpayable",
                        "type": "function",
                        "name": "sell",
                        "outputs": [
                            {
                                "internalType": "bool",
                                "name": "",
                                "type": "bool"
                            }
                        ]
                    },
                    {
                        "inputs": [
                            {
                                "internalType": "contract IERC20",
                                "name": "tokenContractAddress",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "amount",
                                "type": "uint256"
                            }
                        ],
                        "stateMutability": "nonpayable",
                        "type": "function",
                        "name": "withdrawToken",
                        "outputs": [
                            {
                                "internalType": "bool",
                                "name": "",
                                "type": "bool"
                            }
                        ]
                    },
                    {
                        "inputs": [],
                        "stateMutability": "payable",
                        "type": "receive"
                    }
                ],
                "devdoc": {
                    "kind": "dev",
                    "methods": {
                        "owner()": {
                            "details": "Returns the address of the current owner."
                        }
                    },
                    "version": 1
                },
                "userdoc": {
                    "kind": "user",
                    "methods": {
                        "approve(address,address)": {
                            "notice": "approve function allows spender to approve tokens on your behalf: we approvea MAX amount in order to do it once"
                        },
                        "buy(uint256,uint256,address[],uint256,address,address,uint256)": {
                            "notice": "this is a buy function for ERC20 tokens: checks that the bnb in a pool to be gt > our buy bnb before buying"
                        },
                        "destroySmartContract(address)": {
                            "notice": "selfdestruct sends all remaining Ether stored in the contract to a designated address."
                        },
                        "sell(uint256,address[],uint256,address)": {
                            "notice": "this is a sell function: checks the balance of tokens we are selling to be gt > 0"
                        },
                        "withdrawToken(address,uint256)": {
                            "notice": "allows owner of contract to withdraw tokens"
                        }
                    },
                    "version": 1
                }
            },
            "settings": {
                "remappings": [
                    ":@contracts/=src/",
                    ":@openzeppelin/contracts/=lib/openzeppelin-contracts/",
                    ":ds-test/=lib/forge-std/lib/ds-test/src/",
                    ":forge-std/=lib/forge-std/src/",
                    ":openzeppelin-contracts/=lib/openzeppelin-contracts/"
                ],
                "optimizer": {
                    "enabled": true,
                    "runs": 200
                },
                "metadata": {
                    "bytecodeHash": "ipfs"
                },
                "compilationTarget": {
                    "src/SandWicher.sol": "SandWicher"
                },
                "libraries": {}
            },
            "sources": {
                "src/SandWicher.sol": {
                    "keccak256": "0xe242528166297a820f90c088160bda2ddca213fd00e4afa7f74f88643fd63bcc",
                    "urls": [
                        "bzz-raw://2160e54e0e0353929ba0fa45f285d8f534438b0a2767ab038511e0f7318d4c00",
                        "dweb:/ipfs/QmQ1jvKEVGugApKjVkKnkZTeQBgqddwUHmZucYGFVDLMjg"
                    ],
                    "license": "UNLICENSED"
                },
                "src/abstract/Context.sol": {
                    "keccak256": "0xbc9c833eb2ef635a64bfc00eaac38cfecd8e1029fdb660725ab501310d8c9194",
                    "urls": [
                        "bzz-raw://5c50a2e1b9f651221ea9008215885c8292ae9a1129c94df97257ccbca5000e62",
                        "dweb:/ipfs/Qmbeq7BrZkAANaL82oAFQDxm27xEEBBtGPs1u4tbhmmKbp"
                    ],
                    "license": "UNLICENSED"
                },
                "src/interfaces/IERC20.sol": {
                    "keccak256": "0x960f3957c5f15dd37f76fff144c6cbe623a58e29bf5fb86860e0a7c4aafe64ec",
                    "urls": [
                        "bzz-raw://42a3a692fc3992333a36eaf791669aedc22c606bba828e548e1f7a69091aca8b",
                        "dweb:/ipfs/QmNLy1SzWAZTUGXmktuiQo8M97u1qmZg5t3bE3nzQTPQhZ"
                    ],
                    "license": "UNLICENSED"
                },
                "src/interfaces/IUniswapV2Pair.sol": {
                    "keccak256": "0xa21400ebf49923768591088439ce2673d2d6ac7045acc6b431fbd33db3519ba3",
                    "urls": [
                        "bzz-raw://570e2aa77d13385d27831112ddbd9bbbdd4f775bc39a01fecafdcba7f69c27ba",
                        "dweb:/ipfs/QmRDRggtTJsfNTU52xQCyiCRuQcuWm6Su2tf4hRZPizx17"
                    ],
                    "license": "UNLICENSED"
                },
                "src/interfaces/IUniswapV2Router01.sol": {
                    "keccak256": "0xcae7ed6228fd0182f20feb5bc3355ac563f50ac293deab97c421a31e70814ee0",
                    "urls": [
                        "bzz-raw://94cf0f28ec4df4998fdeaea238eaf2a0acd8dcfeb81a0ec085d477ee5c94ffc5",
                        "dweb:/ipfs/QmYk8q7KcNay2Y6UP1QZEA42urGtNFnzD4bkULyEtRa7Nt"
                    ],
                    "license": "UNLICENSED"
                },
                "src/interfaces/IUniswapV2Router02.sol": {
                    "keccak256": "0x7b5f2752201df02e9e523b16df2b23d07ab3b81843d1028e5812581547c8738a",
                    "urls": [
                        "bzz-raw://3a221d9db6fe8517331e92919ee8749e01a9a0cb292a6ce77cea94a8de4edd8d",
                        "dweb:/ipfs/QmWaj1Z6MjaHggXETp3E7UrpZqcc7EriKVoSWi2X82Bzjq"
                    ],
                    "license": "UNLICENSED"
                },
                "src/libraries/Address.sol": {
                    "keccak256": "0x7b7347b9c022203912205c3449bfa4db4a65baae6216a707ce41951ea079287b",
                    "urls": [
                        "bzz-raw://252fed0f11183cbed389320cf906affc9918629a8b238af66569c54a56eb5b53",
                        "dweb:/ipfs/QmS2YY2PzTtm8yX537VJwANVKbUEYWQcjADXAevNf93Ekj"
                    ],
                    "license": "UNLICENSED"
                },
                "src/libraries/SafeERC20.sol": {
                    "keccak256": "0xdfd944709ee23ab151a070db9198e4f7ad1d1595909c40d0b707adb664d28c26",
                    "urls": [
                        "bzz-raw://b1f0fad77ddd2afab54db99ef05a66a0b7309a7baec6babd9a421ab8347f2695",
                        "dweb:/ipfs/QmdBA59j4YWBiVdeGwxicwrvpdX2mspuWJZjzWMM1ee3tb"
                    ],
                    "license": "UNLICENSED"
                }
            },
            "version": 1
        },
        "ast": {
            "absolutePath": "src/SandWicher.sol",
            "id": 23359,
            "exportedSymbols": {
                "IERC20": [
                    23511
                ],
                "IUniswapV2Pair": [
                    23753
                ],
                "IUniswapV2Router02": [
                    23858
                ],
                "Ownable": [
                    23442
                ],
                "SafeERC20": [
                    24251
                ],
                "SandWicher": [
                    23358
                ]
            },
            "nodeType": "SourceUnit",
            "src": "39:3554:7",
            "nodes": [
                {
                    "id": 23116,
                    "nodeType": "PragmaDirective",
                    "src": "39:24:7",
                    "literals": [
                        "solidity",
                        "^",
                        "0.8",
                        ".12"
                    ]
                },
                {
                    "id": 23118,
                    "nodeType": "ImportDirective",
                    "src": "66:47:7",
                    "absolutePath": "src/abstract/Context.sol",
                    "file": "./abstract/Context.sol",
                    "nameLocation": "-1:-1:-1",
                    "scope": 23359,
                    "sourceUnit": 23443,
                    "symbolAliases": [
                        {
                            "foreign": {
                                "id": 23117,
                                "name": "Ownable",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 23442,
                                "src": "74:7:7",
                                "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_contract$_Ownable_$23442_$",
                                    "typeString": "type(contract Ownable)"
                                }
                            },
                            "nameLocation": "-1:-1:-1"
                        }
                    ],
                    "unitAlias": ""
                },
                {
                    "id": 23120,
                    "nodeType": "ImportDirective",
                    "src": "114:71:7",
                    "absolutePath": "src/interfaces/IUniswapV2Router02.sol",
                    "file": "./interfaces/IUniswapV2Router02.sol",
                    "nameLocation": "-1:-1:-1",
                    "scope": 23359,
                    "sourceUnit": 23859,
                    "symbolAliases": [
                        {
                            "foreign": {
                                "id": 23119,
                                "name": "IUniswapV2Router02",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 23858,
                                "src": "122:18:7",
                                "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_contract$_IUniswapV2Router02_$23858_$",
                                    "typeString": "type(contract IUniswapV2Router02)"
                                }
                            },
                            "nameLocation": "-1:-1:-1"
                        }
                    ],
                    "unitAlias": ""
                },
                {
                    "id": 23122,
                    "nodeType": "ImportDirective",
                    "src": "186:63:7",
                    "absolutePath": "src/interfaces/IUniswapV2Pair.sol",
                    "file": "./interfaces/IUniswapV2Pair.sol",
                    "nameLocation": "-1:-1:-1",
                    "scope": 23359,
                    "sourceUnit": 23754,
                    "symbolAliases": [
                        {
                            "foreign": {
                                "id": 23121,
                                "name": "IUniswapV2Pair",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 23753,
                                "src": "194:14:7",
                                "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_contract$_IUniswapV2Pair_$23753_$",
                                    "typeString": "type(contract IUniswapV2Pair)"
                                }
                            },
                            "nameLocation": "-1:-1:-1"
                        }
                    ],
                    "unitAlias": ""
                },
                {
                    "id": 23124,
                    "nodeType": "ImportDirective",
                    "src": "250:47:7",
                    "absolutePath": "src/interfaces/IERC20.sol",
                    "file": "./interfaces/IERC20.sol",
                    "nameLocation": "-1:-1:-1",
                    "scope": 23359,
                    "sourceUnit": 23512,
                    "symbolAliases": [
                        {
                            "foreign": {
                                "id": 23123,
                                "name": "IERC20",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 23511,
                                "src": "258:6:7",
                                "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_contract$_IERC20_$23511_$",
                                    "typeString": "type(contract IERC20)"
                                }
                            },
                            "nameLocation": "-1:-1:-1"
                        }
                    ],
                    "unitAlias": ""
                },
                {
                    "id": 23126,
                    "nodeType": "ImportDirective",
                    "src": "298:52:7",
                    "absolutePath": "src/libraries/SafeERC20.sol",
                    "file": "./libraries/SafeERC20.sol",
                    "nameLocation": "-1:-1:-1",
                    "scope": 23359,
                    "sourceUnit": 24252,
                    "symbolAliases": [
                        {
                            "foreign": {
                                "id": 23125,
                                "name": "SafeERC20",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 24251,
                                "src": "306:9:7",
                                "typeDescriptions": {
                                    "typeIdentifier": "t_type$_t_contract$_SafeERC20_$24251_$",
                                    "typeString": "type(library SafeERC20)"
                                }
                            },
                            "nameLocation": "-1:-1:-1"
                        }
                    ],
                    "unitAlias": ""
                },
                {
                    "id": 23358,
                    "nodeType": "ContractDefinition",
                    "src": "352:3239:7",
                    "nodes": [
                        {
                            "id": 23138,
                            "nodeType": "EventDefinition",
                            "src": "424:143:7",
                            "anonymous": false,
                            "name": "Rseserves",
                            "nameLocation": "430:9:7",
                            "parameters": {
                                "id": 23137,
                                "nodeType": "ParameterList",
                                "parameters": [
                                    {
                                        "constant": false,
                                        "id": 23130,
                                        "indexed": false,
                                        "mutability": "mutable",
                                        "name": "_wbnbReserves",
                                        "nameLocation": "457:13:7",
                                        "nodeType": "VariableDeclaration",
                                        "scope": 23138,
                                        "src": "449:21:7",
                                        "stateVariable": false,
                                        "storageLocation": "default",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        },
                                        "typeName": {
                                            "id": 23129,
                                            "name": "uint256",
                                            "nodeType": "ElementaryTypeName",
                                            "src": "449:7:7",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "visibility": "internal"
                                    },
                                    {
                                        "constant": false,
                                        "id": 23132,
                                        "indexed": false,
                                        "mutability": "mutable",
                                        "name": "_reserve0",
                                        "nameLocation": "488:9:7",
                                        "nodeType": "VariableDeclaration",
                                        "scope": 23138,
                                        "src": "480:17:7",
                                        "stateVariable": false,
                                        "storageLocation": "default",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        },
                                        "typeName": {
                                            "id": 23131,
                                            "name": "uint256",
                                            "nodeType": "ElementaryTypeName",
                                            "src": "480:7:7",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "visibility": "internal"
                                    },
                                    {
                                        "constant": false,
                                        "id": 23134,
                                        "indexed": false,
                                        "mutability": "mutable",
                                        "name": "_reserve1",
                                        "nameLocation": "515:9:7",
                                        "nodeType": "VariableDeclaration",
                                        "scope": 23138,
                                        "src": "507:17:7",
                                        "stateVariable": false,
                                        "storageLocation": "default",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        },
                                        "typeName": {
                                            "id": 23133,
                                            "name": "uint256",
                                            "nodeType": "ElementaryTypeName",
                                            "src": "507:7:7",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "visibility": "internal"
                                    },
                                    {
                                        "constant": false,
                                        "id": 23136,
                                        "indexed": false,
                                        "mutability": "mutable",
                                        "name": "_currentPooledWBNB",
                                        "nameLocation": "542:18:7",
                                        "nodeType": "VariableDeclaration",
                                        "scope": 23138,
                                        "src": "534:26:7",
                                        "stateVariable": false,
                                        "storageLocation": "default",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        },
                                        "typeName": {
                                            "id": 23135,
                                            "name": "uint256",
                                            "nodeType": "ElementaryTypeName",
                                            "src": "534:7:7",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "visibility": "internal"
                                    }
                                ],
                                "src": "439:127:7"
                            }
                        },
                        {
                            "id": 23216,
                            "nodeType": "FunctionDefinition",
                            "src": "702:894:7",
                            "body": {
                                "id": 23215,
                                "nodeType": "Block",
                                "src": "962:634:7",
                                "statements": [
                                    {
                                        "assignments": [
                                            23160
                                        ],
                                        "declarations": [
                                            {
                                                "constant": false,
                                                "id": 23160,
                                                "mutability": "mutable",
                                                "name": "wbnbReserves",
                                                "nameLocation": "980:12:7",
                                                "nodeType": "VariableDeclaration",
                                                "scope": 23215,
                                                "src": "972:20:7",
                                                "stateVariable": false,
                                                "storageLocation": "default",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_uint112",
                                                    "typeString": "uint112"
                                                },
                                                "typeName": {
                                                    "id": 23159,
                                                    "name": "uint112",
                                                    "nodeType": "ElementaryTypeName",
                                                    "src": "972:7:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_uint112",
                                                        "typeString": "uint112"
                                                    }
                                                },
                                                "visibility": "internal"
                                            }
                                        ],
                                        "id": 23161,
                                        "nodeType": "VariableDeclarationStatement",
                                        "src": "972:20:7"
                                    },
                                    {
                                        "assignments": [
                                            23163,
                                            23165,
                                            null
                                        ],
                                        "declarations": [
                                            {
                                                "constant": false,
                                                "id": 23163,
                                                "mutability": "mutable",
                                                "name": "_reserve0",
                                                "nameLocation": "1011:9:7",
                                                "nodeType": "VariableDeclaration",
                                                "scope": 23215,
                                                "src": "1003:17:7",
                                                "stateVariable": false,
                                                "storageLocation": "default",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_uint112",
                                                    "typeString": "uint112"
                                                },
                                                "typeName": {
                                                    "id": 23162,
                                                    "name": "uint112",
                                                    "nodeType": "ElementaryTypeName",
                                                    "src": "1003:7:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_uint112",
                                                        "typeString": "uint112"
                                                    }
                                                },
                                                "visibility": "internal"
                                            },
                                            {
                                                "constant": false,
                                                "id": 23165,
                                                "mutability": "mutable",
                                                "name": "_reserve1",
                                                "nameLocation": "1030:9:7",
                                                "nodeType": "VariableDeclaration",
                                                "scope": 23215,
                                                "src": "1022:17:7",
                                                "stateVariable": false,
                                                "storageLocation": "default",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_uint112",
                                                    "typeString": "uint112"
                                                },
                                                "typeName": {
                                                    "id": 23164,
                                                    "name": "uint112",
                                                    "nodeType": "ElementaryTypeName",
                                                    "src": "1022:7:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_uint112",
                                                        "typeString": "uint112"
                                                    }
                                                },
                                                "visibility": "internal"
                                            },
                                            null
                                        ],
                                        "id": 23169,
                                        "initialValue": {
                                            "arguments": [],
                                            "expression": {
                                                "argumentTypes": [],
                                                "expression": {
                                                    "id": 23166,
                                                    "name": "pairAddress",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 23154,
                                                    "src": "1045:11:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_contract$_IUniswapV2Pair_$23753",
                                                        "typeString": "contract IUniswapV2Pair"
                                                    }
                                                },
                                                "id": 23167,
                                                "isConstant": false,
                                                "isLValue": false,
                                                "isPure": false,
                                                "lValueRequested": false,
                                                "memberName": "getReserves",
                                                "nodeType": "MemberAccess",
                                                "referencedDeclaration": 23695,
                                                "src": "1045:23:7",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_function_external_view$__$returns$_t_uint112_$_t_uint112_$_t_uint32_$",
                                                    "typeString": "function () view external returns (uint112,uint112,uint32)"
                                                }
                                            },
                                            "id": 23168,
                                            "isConstant": false,
                                            "isLValue": false,
                                            "isPure": false,
                                            "kind": "functionCall",
                                            "lValueRequested": false,
                                            "names": [],
                                            "nodeType": "FunctionCall",
                                            "src": "1045:25:7",
                                            "tryCall": false,
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_tuple$_t_uint112_$_t_uint112_$_t_uint32_$",
                                                "typeString": "tuple(uint112,uint112,uint32)"
                                            }
                                        },
                                        "nodeType": "VariableDeclarationStatement",
                                        "src": "1002:68:7"
                                    },
                                    {
                                        "condition": {
                                            "commonType": {
                                                "typeIdentifier": "t_address",
                                                "typeString": "address"
                                            },
                                            "id": 23176,
                                            "isConstant": false,
                                            "isLValue": false,
                                            "isPure": false,
                                            "lValueRequested": false,
                                            "leftExpression": {
                                                "expression": {
                                                    "expression": {
                                                        "id": 23170,
                                                        "name": "pairAddress",
                                                        "nodeType": "Identifier",
                                                        "overloadedDeclarations": [],
                                                        "referencedDeclaration": 23154,
                                                        "src": "1084:11:7",
                                                        "typeDescriptions": {
                                                            "typeIdentifier": "t_contract$_IUniswapV2Pair_$23753",
                                                            "typeString": "contract IUniswapV2Pair"
                                                        }
                                                    },
                                                    "id": 23171,
                                                    "isConstant": false,
                                                    "isLValue": false,
                                                    "isPure": false,
                                                    "lValueRequested": false,
                                                    "memberName": "token0",
                                                    "nodeType": "MemberAccess",
                                                    "referencedDeclaration": 23681,
                                                    "src": "1084:18:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_function_external_view$__$returns$_t_address_$",
                                                        "typeString": "function () view external returns (address)"
                                                    }
                                                },
                                                "id": 23172,
                                                "isConstant": false,
                                                "isLValue": false,
                                                "isPure": false,
                                                "lValueRequested": false,
                                                "memberName": "address",
                                                "nodeType": "MemberAccess",
                                                "src": "1084:26:7",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_address",
                                                    "typeString": "address"
                                                }
                                            },
                                            "nodeType": "BinaryOperation",
                                            "operator": "==",
                                            "rightExpression": {
                                                "baseExpression": {
                                                    "id": 23173,
                                                    "name": "path",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 23146,
                                                    "src": "1114:4:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                                                        "typeString": "address[] memory"
                                                    }
                                                },
                                                "id": 23175,
                                                "indexExpression": {
                                                    "hexValue": "30",
                                                    "id": 23174,
                                                    "isConstant": false,
                                                    "isLValue": false,
                                                    "isPure": true,
                                                    "kind": "number",
                                                    "lValueRequested": false,
                                                    "nodeType": "Literal",
                                                    "src": "1119:1:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_rational_0_by_1",
                                                        "typeString": "int_const 0"
                                                    },
                                                    "value": "0"
                                                },
                                                "isConstant": false,
                                                "isLValue": true,
                                                "isPure": false,
                                                "lValueRequested": false,
                                                "nodeType": "IndexAccess",
                                                "src": "1114:7:7",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_address",
                                                    "typeString": "address"
                                                }
                                            },
                                            "src": "1084:37:7",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_bool",
                                                "typeString": "bool"
                                            }
                                        },
                                        "falseBody": {
                                            "id": 23186,
                                            "nodeType": "Block",
                                            "src": "1180:49:7",
                                            "statements": [
                                                {
                                                    "expression": {
                                                        "id": 23184,
                                                        "isConstant": false,
                                                        "isLValue": false,
                                                        "isPure": false,
                                                        "lValueRequested": false,
                                                        "leftHandSide": {
                                                            "id": 23182,
                                                            "name": "wbnbReserves",
                                                            "nodeType": "Identifier",
                                                            "overloadedDeclarations": [],
                                                            "referencedDeclaration": 23160,
                                                            "src": "1194:12:7",
                                                            "typeDescriptions": {
                                                                "typeIdentifier": "t_uint112",
                                                                "typeString": "uint112"
                                                            }
                                                        },
                                                        "nodeType": "Assignment",
                                                        "operator": "=",
                                                        "rightHandSide": {
                                                            "id": 23183,
                                                            "name": "_reserve1",
                                                            "nodeType": "Identifier",
                                                            "overloadedDeclarations": [],
                                                            "referencedDeclaration": 23165,
                                                            "src": "1209:9:7",
                                                            "typeDescriptions": {
                                                                "typeIdentifier": "t_uint112",
                                                                "typeString": "uint112"
                                                            }
                                                        },
                                                        "src": "1194:24:7",
                                                        "typeDescriptions": {
                                                            "typeIdentifier": "t_uint112",
                                                            "typeString": "uint112"
                                                        }
                                                    },
                                                    "id": 23185,
                                                    "nodeType": "ExpressionStatement",
                                                    "src": "1194:24:7"
                                                }
                                            ]
                                        },
                                        "id": 23187,
                                        "nodeType": "IfStatement",
                                        "src": "1081:148:7",
                                        "trueBody": {
                                            "id": 23181,
                                            "nodeType": "Block",
                                            "src": "1123:51:7",
                                            "statements": [
                                                {
                                                    "expression": {
                                                        "id": 23179,
                                                        "isConstant": false,
                                                        "isLValue": false,
                                                        "isPure": false,
                                                        "lValueRequested": false,
                                                        "leftHandSide": {
                                                            "id": 23177,
                                                            "name": "wbnbReserves",
                                                            "nodeType": "Identifier",
                                                            "overloadedDeclarations": [],
                                                            "referencedDeclaration": 23160,
                                                            "src": "1138:12:7",
                                                            "typeDescriptions": {
                                                                "typeIdentifier": "t_uint112",
                                                                "typeString": "uint112"
                                                            }
                                                        },
                                                        "nodeType": "Assignment",
                                                        "operator": "=",
                                                        "rightHandSide": {
                                                            "id": 23178,
                                                            "name": "_reserve0",
                                                            "nodeType": "Identifier",
                                                            "overloadedDeclarations": [],
                                                            "referencedDeclaration": 23163,
                                                            "src": "1153:9:7",
                                                            "typeDescriptions": {
                                                                "typeIdentifier": "t_uint112",
                                                                "typeString": "uint112"
                                                            }
                                                        },
                                                        "src": "1138:24:7",
                                                        "typeDescriptions": {
                                                            "typeIdentifier": "t_uint112",
                                                            "typeString": "uint112"
                                                        }
                                                    },
                                                    "id": 23180,
                                                    "nodeType": "ExpressionStatement",
                                                    "src": "1138:24:7"
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "eventCall": {
                                            "arguments": [
                                                {
                                                    "id": 23189,
                                                    "name": "wbnbReserves",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 23160,
                                                    "src": "1254:12:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_uint112",
                                                        "typeString": "uint112"
                                                    }
                                                },
                                                {
                                                    "id": 23190,
                                                    "name": "_reserve0",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 23163,
                                                    "src": "1268:9:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_uint112",
                                                        "typeString": "uint112"
                                                    }
                                                },
                                                {
                                                    "id": 23191,
                                                    "name": "_reserve1",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 23165,
                                                    "src": "1279:9:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_uint112",
                                                        "typeString": "uint112"
                                                    }
                                                },
                                                {
                                                    "id": 23192,
                                                    "name": "currentPooledBNB",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 23156,
                                                    "src": "1290:16:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    }
                                                }
                                            ],
                                            "expression": {
                                                "argumentTypes": [
                                                    {
                                                        "typeIdentifier": "t_uint112",
                                                        "typeString": "uint112"
                                                    },
                                                    {
                                                        "typeIdentifier": "t_uint112",
                                                        "typeString": "uint112"
                                                    },
                                                    {
                                                        "typeIdentifier": "t_uint112",
                                                        "typeString": "uint112"
                                                    },
                                                    {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    }
                                                ],
                                                "id": 23188,
                                                "name": "Rseserves",
                                                "nodeType": "Identifier",
                                                "overloadedDeclarations": [],
                                                "referencedDeclaration": 23138,
                                                "src": "1244:9:7",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_function_event_nonpayable$_t_uint256_$_t_uint256_$_t_uint256_$_t_uint256_$returns$__$",
                                                    "typeString": "function (uint256,uint256,uint256,uint256)"
                                                }
                                            },
                                            "id": 23193,
                                            "isConstant": false,
                                            "isLValue": false,
                                            "isPure": false,
                                            "kind": "functionCall",
                                            "lValueRequested": false,
                                            "names": [],
                                            "nodeType": "FunctionCall",
                                            "src": "1244:63:7",
                                            "tryCall": false,
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_tuple$__$",
                                                "typeString": "tuple()"
                                            }
                                        },
                                        "id": 23194,
                                        "nodeType": "EmitStatement",
                                        "src": "1239:68:7"
                                    },
                                    {
                                        "expression": {
                                            "arguments": [
                                                {
                                                    "commonType": {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    },
                                                    "id": 23198,
                                                    "isConstant": false,
                                                    "isLValue": false,
                                                    "isPure": false,
                                                    "lValueRequested": false,
                                                    "leftExpression": {
                                                        "id": 23196,
                                                        "name": "wbnbReserves",
                                                        "nodeType": "Identifier",
                                                        "overloadedDeclarations": [],
                                                        "referencedDeclaration": 23160,
                                                        "src": "1327:12:7",
                                                        "typeDescriptions": {
                                                            "typeIdentifier": "t_uint112",
                                                            "typeString": "uint112"
                                                        }
                                                    },
                                                    "nodeType": "BinaryOperation",
                                                    "operator": "<=",
                                                    "rightExpression": {
                                                        "id": 23197,
                                                        "name": "currentPooledBNB",
                                                        "nodeType": "Identifier",
                                                        "overloadedDeclarations": [],
                                                        "referencedDeclaration": 23156,
                                                        "src": "1343:16:7",
                                                        "typeDescriptions": {
                                                            "typeIdentifier": "t_uint256",
                                                            "typeString": "uint256"
                                                        }
                                                    },
                                                    "src": "1327:32:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_bool",
                                                        "typeString": "bool"
                                                    }
                                                },
                                                {
                                                    "hexValue": "4572726f7220636f646520303031",
                                                    "id": 23199,
                                                    "isConstant": false,
                                                    "isLValue": false,
                                                    "isPure": true,
                                                    "kind": "string",
                                                    "lValueRequested": false,
                                                    "nodeType": "Literal",
                                                    "src": "1361:16:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_stringliteral_6cb9c511c7115b0d8f22108581b5bedb40afa130296478df77f82f3cce846efd",
                                                        "typeString": "literal_string \"Error code 001\""
                                                    },
                                                    "value": "Error code 001"
                                                }
                                            ],
                                            "expression": {
                                                "argumentTypes": [
                                                    {
                                                        "typeIdentifier": "t_bool",
                                                        "typeString": "bool"
                                                    },
                                                    {
                                                        "typeIdentifier": "t_stringliteral_6cb9c511c7115b0d8f22108581b5bedb40afa130296478df77f82f3cce846efd",
                                                        "typeString": "literal_string \"Error code 001\""
                                                    }
                                                ],
                                                "id": 23195,
                                                "name": "require",
                                                "nodeType": "Identifier",
                                                "overloadedDeclarations": [
                                                    -18,
                                                    -18
                                                ],
                                                "referencedDeclaration": -18,
                                                "src": "1319:7:7",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                                                    "typeString": "function (bool,string memory) pure"
                                                }
                                            },
                                            "id": 23200,
                                            "isConstant": false,
                                            "isLValue": false,
                                            "isPure": false,
                                            "kind": "functionCall",
                                            "lValueRequested": false,
                                            "names": [],
                                            "nodeType": "FunctionCall",
                                            "src": "1319:59:7",
                                            "tryCall": false,
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_tuple$__$",
                                                "typeString": "tuple()"
                                            }
                                        },
                                        "id": 23201,
                                        "nodeType": "ExpressionStatement",
                                        "src": "1319:59:7"
                                    },
                                    {
                                        "expression": {
                                            "arguments": [
                                                {
                                                    "id": 23205,
                                                    "name": "amountIn",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 23141,
                                                    "src": "1477:8:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    }
                                                },
                                                {
                                                    "id": 23206,
                                                    "name": "amountOutMin",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 23143,
                                                    "src": "1500:12:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    }
                                                },
                                                {
                                                    "id": 23207,
                                                    "name": "path",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 23146,
                                                    "src": "1528:4:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                                                        "typeString": "address[] memory"
                                                    }
                                                },
                                                {
                                                    "arguments": [
                                                        {
                                                            "id": 23210,
                                                            "name": "this",
                                                            "nodeType": "Identifier",
                                                            "overloadedDeclarations": [],
                                                            "referencedDeclaration": -28,
                                                            "src": "1557:4:7",
                                                            "typeDescriptions": {
                                                                "typeIdentifier": "t_contract$_SandWicher_$23358",
                                                                "typeString": "contract SandWicher"
                                                            }
                                                        }
                                                    ],
                                                    "expression": {
                                                        "argumentTypes": [
                                                            {
                                                                "typeIdentifier": "t_contract$_SandWicher_$23358",
                                                                "typeString": "contract SandWicher"
                                                            }
                                                        ],
                                                        "id": 23209,
                                                        "isConstant": false,
                                                        "isLValue": false,
                                                        "isPure": true,
                                                        "lValueRequested": false,
                                                        "nodeType": "ElementaryTypeNameExpression",
                                                        "src": "1549:7:7",
                                                        "typeDescriptions": {
                                                            "typeIdentifier": "t_type$_t_address_$",
                                                            "typeString": "type(address)"
                                                        },
                                                        "typeName": {
                                                            "id": 23208,
                                                            "name": "address",
                                                            "nodeType": "ElementaryTypeName",
                                                            "src": "1549:7:7",
                                                            "typeDescriptions": {}
                                                        }
                                                    },
                                                    "id": 23211,
                                                    "isConstant": false,
                                                    "isLValue": false,
                                                    "isPure": false,
                                                    "kind": "typeConversion",
                                                    "lValueRequested": false,
                                                    "names": [],
                                                    "nodeType": "FunctionCall",
                                                    "src": "1549:13:7",
                                                    "tryCall": false,
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_address",
                                                        "typeString": "address"
                                                    }
                                                },
                                                {
                                                    "id": 23212,
                                                    "name": "deadline",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 23148,
                                                    "src": "1580:8:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    }
                                                }
                                            ],
                                            "expression": {
                                                "argumentTypes": [
                                                    {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    },
                                                    {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    },
                                                    {
                                                        "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                                                        "typeString": "address[] memory"
                                                    },
                                                    {
                                                        "typeIdentifier": "t_address",
                                                        "typeString": "address"
                                                    },
                                                    {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    }
                                                ],
                                                "expression": {
                                                    "id": 23202,
                                                    "name": "uniswapRouterAddress",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 23151,
                                                    "src": "1389:20:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_contract$_IUniswapV2Router02_$23858",
                                                        "typeString": "contract IUniswapV2Router02"
                                                    }
                                                },
                                                "id": 23204,
                                                "isConstant": false,
                                                "isLValue": false,
                                                "isPure": false,
                                                "lValueRequested": false,
                                                "memberName": "swapExactTokensForTokensSupportingFeeOnTransferTokens",
                                                "nodeType": "MemberAccess",
                                                "referencedDeclaration": 23857,
                                                "src": "1389:74:7",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_function_external_nonpayable$_t_uint256_$_t_uint256_$_t_array$_t_address_$dyn_memory_ptr_$_t_address_$_t_uint256_$returns$__$",
                                                    "typeString": "function (uint256,uint256,address[] memory,address,uint256) external"
                                                }
                                            },
                                            "id": 23213,
                                            "isConstant": false,
                                            "isLValue": false,
                                            "isPure": false,
                                            "kind": "functionCall",
                                            "lValueRequested": false,
                                            "names": [],
                                            "nodeType": "FunctionCall",
                                            "src": "1389:200:7",
                                            "tryCall": false,
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_tuple$__$",
                                                "typeString": "tuple()"
                                            }
                                        },
                                        "id": 23214,
                                        "nodeType": "ExpressionStatement",
                                        "src": "1389:200:7"
                                    }
                                ]
                            },
                            "documentation": {
                                "id": 23139,
                                "nodeType": "StructuredDocumentation",
                                "src": "573:124:7",
                                "text": "this is a buy function for ERC20 tokens: checks that the bnb in a pool to be gt > our buy bnb before buying"
                            },
                            "functionSelector": "2d6d998d",
                            "implemented": true,
                            "kind": "function",
                            "modifiers": [],
                            "name": "buy",
                            "nameLocation": "711:3:7",
                            "parameters": {
                                "id": 23157,
                                "nodeType": "ParameterList",
                                "parameters": [
                                    {
                                        "constant": false,
                                        "id": 23141,
                                        "mutability": "mutable",
                                        "name": "amountIn",
                                        "nameLocation": "732:8:7",
                                        "nodeType": "VariableDeclaration",
                                        "scope": 23216,
                                        "src": "724:16:7",
                                        "stateVariable": false,
                                        "storageLocation": "default",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        },
                                        "typeName": {
                                            "id": 23140,
                                            "name": "uint256",
                                            "nodeType": "ElementaryTypeName",
                                            "src": "724:7:7",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "visibility": "internal"
                                    },
                                    {
                                        "constant": false,
                                        "id": 23143,
                                        "mutability": "mutable",
                                        "name": "amountOutMin",
                                        "nameLocation": "758:12:7",
                                        "nodeType": "VariableDeclaration",
                                        "scope": 23216,
                                        "src": "750:20:7",
                                        "stateVariable": false,
                                        "storageLocation": "default",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        },
                                        "typeName": {
                                            "id": 23142,
                                            "name": "uint256",
                                            "nodeType": "ElementaryTypeName",
                                            "src": "750:7:7",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "visibility": "internal"
                                    },
                                    {
                                        "constant": false,
                                        "id": 23146,
                                        "mutability": "mutable",
                                        "name": "path",
                                        "nameLocation": "797:4:7",
                                        "nodeType": "VariableDeclaration",
                                        "scope": 23216,
                                        "src": "780:21:7",
                                        "stateVariable": false,
                                        "storageLocation": "memory",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                                            "typeString": "address[]"
                                        },
                                        "typeName": {
                                            "baseType": {
                                                "id": 23144,
                                                "name": "address",
                                                "nodeType": "ElementaryTypeName",
                                                "src": "780:7:7",
                                                "stateMutability": "nonpayable",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_address",
                                                    "typeString": "address"
                                                }
                                            },
                                            "id": 23145,
                                            "nodeType": "ArrayTypeName",
                                            "src": "780:9:7",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                                                "typeString": "address[]"
                                            }
                                        },
                                        "visibility": "internal"
                                    },
                                    {
                                        "constant": false,
                                        "id": 23148,
                                        "mutability": "mutable",
                                        "name": "deadline",
                                        "nameLocation": "819:8:7",
                                        "nodeType": "VariableDeclaration",
                                        "scope": 23216,
                                        "src": "811:16:7",
                                        "stateVariable": false,
                                        "storageLocation": "default",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        },
                                        "typeName": {
                                            "id": 23147,
                                            "name": "uint256",
                                            "nodeType": "ElementaryTypeName",
                                            "src": "811:7:7",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "visibility": "internal"
                                    },
                                    {
                                        "constant": false,
                                        "id": 23151,
                                        "mutability": "mutable",
                                        "name": "uniswapRouterAddress",
                                        "nameLocation": "856:20:7",
                                        "nodeType": "VariableDeclaration",
                                        "scope": 23216,
                                        "src": "837:39:7",
                                        "stateVariable": false,
                                        "storageLocation": "default",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_contract$_IUniswapV2Router02_$23858",
                                            "typeString": "contract IUniswapV2Router02"
                                        },
                                        "typeName": {
                                            "id": 23150,
                                            "nodeType": "UserDefinedTypeName",
                                            "pathNode": {
                                                "id": 23149,
                                                "name": "IUniswapV2Router02",
                                                "nodeType": "IdentifierPath",
                                                "referencedDeclaration": 23858,
                                                "src": "837:18:7"
                                            },
                                            "referencedDeclaration": 23858,
                                            "src": "837:18:7",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_contract$_IUniswapV2Router02_$23858",
                                                "typeString": "contract IUniswapV2Router02"
                                            }
                                        },
                                        "visibility": "internal"
                                    },
                                    {
                                        "constant": false,
                                        "id": 23154,
                                        "mutability": "mutable",
                                        "name": "pairAddress",
                                        "nameLocation": "901:11:7",
                                        "nodeType": "VariableDeclaration",
                                        "scope": 23216,
                                        "src": "886:26:7",
                                        "stateVariable": false,
                                        "storageLocation": "default",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_contract$_IUniswapV2Pair_$23753",
                                            "typeString": "contract IUniswapV2Pair"
                                        },
                                        "typeName": {
                                            "id": 23153,
                                            "nodeType": "UserDefinedTypeName",
                                            "pathNode": {
                                                "id": 23152,
                                                "name": "IUniswapV2Pair",
                                                "nodeType": "IdentifierPath",
                                                "referencedDeclaration": 23753,
                                                "src": "886:14:7"
                                            },
                                            "referencedDeclaration": 23753,
                                            "src": "886:14:7",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_contract$_IUniswapV2Pair_$23753",
                                                "typeString": "contract IUniswapV2Pair"
                                            }
                                        },
                                        "visibility": "internal"
                                    },
                                    {
                                        "constant": false,
                                        "id": 23156,
                                        "mutability": "mutable",
                                        "name": "currentPooledBNB",
                                        "nameLocation": "930:16:7",
                                        "nodeType": "VariableDeclaration",
                                        "scope": 23216,
                                        "src": "922:24:7",
                                        "stateVariable": false,
                                        "storageLocation": "default",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        },
                                        "typeName": {
                                            "id": 23155,
                                            "name": "uint256",
                                            "nodeType": "ElementaryTypeName",
                                            "src": "922:7:7",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "visibility": "internal"
                                    }
                                ],
                                "src": "714:238:7"
                            },
                            "returnParameters": {
                                "id": 23158,
                                "nodeType": "ParameterList",
                                "parameters": [],
                                "src": "962:0:7"
                            },
                            "scope": 23358,
                            "stateMutability": "nonpayable",
                            "virtual": false,
                            "visibility": "external"
                        },
                        {
                            "id": 23282,
                            "nodeType": "FunctionDefinition",
                            "src": "1714:804:7",
                            "body": {
                                "id": 23281,
                                "nodeType": "Block",
                                "src": "1886:632:7",
                                "statements": [
                                    {
                                        "assignments": [
                                            23233
                                        ],
                                        "declarations": [
                                            {
                                                "constant": false,
                                                "id": 23233,
                                                "mutability": "mutable",
                                                "name": "balance",
                                                "nameLocation": "1905:7:7",
                                                "nodeType": "VariableDeclaration",
                                                "scope": 23281,
                                                "src": "1897:15:7",
                                                "stateVariable": false,
                                                "storageLocation": "default",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_uint256",
                                                    "typeString": "uint256"
                                                },
                                                "typeName": {
                                                    "id": 23232,
                                                    "name": "uint256",
                                                    "nodeType": "ElementaryTypeName",
                                                    "src": "1897:7:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    }
                                                },
                                                "visibility": "internal"
                                            }
                                        ],
                                        "id": 23245,
                                        "initialValue": {
                                            "arguments": [
                                                {
                                                    "arguments": [
                                                        {
                                                            "id": 23242,
                                                            "name": "this",
                                                            "nodeType": "Identifier",
                                                            "overloadedDeclarations": [],
                                                            "referencedDeclaration": -28,
                                                            "src": "1949:4:7",
                                                            "typeDescriptions": {
                                                                "typeIdentifier": "t_contract$_SandWicher_$23358",
                                                                "typeString": "contract SandWicher"
                                                            }
                                                        }
                                                    ],
                                                    "expression": {
                                                        "argumentTypes": [
                                                            {
                                                                "typeIdentifier": "t_contract$_SandWicher_$23358",
                                                                "typeString": "contract SandWicher"
                                                            }
                                                        ],
                                                        "id": 23241,
                                                        "isConstant": false,
                                                        "isLValue": false,
                                                        "isPure": true,
                                                        "lValueRequested": false,
                                                        "nodeType": "ElementaryTypeNameExpression",
                                                        "src": "1941:7:7",
                                                        "typeDescriptions": {
                                                            "typeIdentifier": "t_type$_t_address_$",
                                                            "typeString": "type(address)"
                                                        },
                                                        "typeName": {
                                                            "id": 23240,
                                                            "name": "address",
                                                            "nodeType": "ElementaryTypeName",
                                                            "src": "1941:7:7",
                                                            "typeDescriptions": {}
                                                        }
                                                    },
                                                    "id": 23243,
                                                    "isConstant": false,
                                                    "isLValue": false,
                                                    "isPure": false,
                                                    "kind": "typeConversion",
                                                    "lValueRequested": false,
                                                    "names": [],
                                                    "nodeType": "FunctionCall",
                                                    "src": "1941:13:7",
                                                    "tryCall": false,
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_address",
                                                        "typeString": "address"
                                                    }
                                                }
                                            ],
                                            "expression": {
                                                "argumentTypes": [
                                                    {
                                                        "typeIdentifier": "t_address",
                                                        "typeString": "address"
                                                    }
                                                ],
                                                "expression": {
                                                    "arguments": [
                                                        {
                                                            "baseExpression": {
                                                                "id": 23235,
                                                                "name": "path",
                                                                "nodeType": "Identifier",
                                                                "overloadedDeclarations": [],
                                                                "referencedDeclaration": 23222,
                                                                "src": "1922:4:7",
                                                                "typeDescriptions": {
                                                                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                                                                    "typeString": "address[] memory"
                                                                }
                                                            },
                                                            "id": 23237,
                                                            "indexExpression": {
                                                                "hexValue": "30",
                                                                "id": 23236,
                                                                "isConstant": false,
                                                                "isLValue": false,
                                                                "isPure": true,
                                                                "kind": "number",
                                                                "lValueRequested": false,
                                                                "nodeType": "Literal",
                                                                "src": "1927:1:7",
                                                                "typeDescriptions": {
                                                                    "typeIdentifier": "t_rational_0_by_1",
                                                                    "typeString": "int_const 0"
                                                                },
                                                                "value": "0"
                                                            },
                                                            "isConstant": false,
                                                            "isLValue": true,
                                                            "isPure": false,
                                                            "lValueRequested": false,
                                                            "nodeType": "IndexAccess",
                                                            "src": "1922:7:7",
                                                            "typeDescriptions": {
                                                                "typeIdentifier": "t_address",
                                                                "typeString": "address"
                                                            }
                                                        }
                                                    ],
                                                    "expression": {
                                                        "argumentTypes": [
                                                            {
                                                                "typeIdentifier": "t_address",
                                                                "typeString": "address"
                                                            }
                                                        ],
                                                        "id": 23234,
                                                        "name": "IERC20",
                                                        "nodeType": "Identifier",
                                                        "overloadedDeclarations": [],
                                                        "referencedDeclaration": 23511,
                                                        "src": "1915:6:7",
                                                        "typeDescriptions": {
                                                            "typeIdentifier": "t_type$_t_contract$_IERC20_$23511_$",
                                                            "typeString": "type(contract IERC20)"
                                                        }
                                                    },
                                                    "id": 23238,
                                                    "isConstant": false,
                                                    "isLValue": false,
                                                    "isPure": false,
                                                    "kind": "typeConversion",
                                                    "lValueRequested": false,
                                                    "names": [],
                                                    "nodeType": "FunctionCall",
                                                    "src": "1915:15:7",
                                                    "tryCall": false,
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_contract$_IERC20_$23511",
                                                        "typeString": "contract IERC20"
                                                    }
                                                },
                                                "id": 23239,
                                                "isConstant": false,
                                                "isLValue": false,
                                                "isPure": false,
                                                "lValueRequested": false,
                                                "memberName": "balanceOf",
                                                "nodeType": "MemberAccess",
                                                "referencedDeclaration": 23456,
                                                "src": "1915:25:7",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_function_external_view$_t_address_$returns$_t_uint256_$",
                                                    "typeString": "function (address) view external returns (uint256)"
                                                }
                                            },
                                            "id": 23244,
                                            "isConstant": false,
                                            "isLValue": false,
                                            "isPure": false,
                                            "kind": "functionCall",
                                            "lValueRequested": false,
                                            "names": [],
                                            "nodeType": "FunctionCall",
                                            "src": "1915:40:7",
                                            "tryCall": false,
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "nodeType": "VariableDeclarationStatement",
                                        "src": "1897:58:7"
                                    },
                                    {
                                        "expression": {
                                            "arguments": [
                                                {
                                                    "commonType": {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    },
                                                    "id": 23249,
                                                    "isConstant": false,
                                                    "isLValue": false,
                                                    "isPure": false,
                                                    "lValueRequested": false,
                                                    "leftExpression": {
                                                        "id": 23247,
                                                        "name": "balance",
                                                        "nodeType": "Identifier",
                                                        "overloadedDeclarations": [],
                                                        "referencedDeclaration": 23233,
                                                        "src": "1974:7:7",
                                                        "typeDescriptions": {
                                                            "typeIdentifier": "t_uint256",
                                                            "typeString": "uint256"
                                                        }
                                                    },
                                                    "nodeType": "BinaryOperation",
                                                    "operator": ">",
                                                    "rightExpression": {
                                                        "hexValue": "30",
                                                        "id": 23248,
                                                        "isConstant": false,
                                                        "isLValue": false,
                                                        "isPure": true,
                                                        "kind": "number",
                                                        "lValueRequested": false,
                                                        "nodeType": "Literal",
                                                        "src": "1984:1:7",
                                                        "typeDescriptions": {
                                                            "typeIdentifier": "t_rational_0_by_1",
                                                            "typeString": "int_const 0"
                                                        },
                                                        "value": "0"
                                                    },
                                                    "src": "1974:11:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_bool",
                                                        "typeString": "bool"
                                                    }
                                                },
                                                {
                                                    "hexValue": "496e73756666696369656e742042616c616e6365",
                                                    "id": 23250,
                                                    "isConstant": false,
                                                    "isLValue": false,
                                                    "isPure": true,
                                                    "kind": "string",
                                                    "lValueRequested": false,
                                                    "nodeType": "Literal",
                                                    "src": "1987:22:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_stringliteral_b80e76e4c9dd95c0a6a7ab97569124291f4757bb9e5ff42d1e95905b42144c82",
                                                        "typeString": "literal_string \"Insufficient Balance\""
                                                    },
                                                    "value": "Insufficient Balance"
                                                }
                                            ],
                                            "expression": {
                                                "argumentTypes": [
                                                    {
                                                        "typeIdentifier": "t_bool",
                                                        "typeString": "bool"
                                                    },
                                                    {
                                                        "typeIdentifier": "t_stringliteral_b80e76e4c9dd95c0a6a7ab97569124291f4757bb9e5ff42d1e95905b42144c82",
                                                        "typeString": "literal_string \"Insufficient Balance\""
                                                    }
                                                ],
                                                "id": 23246,
                                                "name": "require",
                                                "nodeType": "Identifier",
                                                "overloadedDeclarations": [
                                                    -18,
                                                    -18
                                                ],
                                                "referencedDeclaration": -18,
                                                "src": "1966:7:7",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                                                    "typeString": "function (bool,string memory) pure"
                                                }
                                            },
                                            "id": 23251,
                                            "isConstant": false,
                                            "isLValue": false,
                                            "isPure": false,
                                            "kind": "functionCall",
                                            "lValueRequested": false,
                                            "names": [],
                                            "nodeType": "FunctionCall",
                                            "src": "1966:44:7",
                                            "tryCall": false,
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_tuple$__$",
                                                "typeString": "tuple()"
                                            }
                                        },
                                        "id": 23252,
                                        "nodeType": "ExpressionStatement",
                                        "src": "1966:44:7"
                                    },
                                    {
                                        "documentation": "approving the tokens to be sold in the same SELL transaction ",
                                        "expression": {
                                            "arguments": [
                                                {
                                                    "arguments": [
                                                        {
                                                            "id": 23261,
                                                            "name": "uniswapRouterAddress",
                                                            "nodeType": "Identifier",
                                                            "overloadedDeclarations": [],
                                                            "referencedDeclaration": 23227,
                                                            "src": "2161:20:7",
                                                            "typeDescriptions": {
                                                                "typeIdentifier": "t_contract$_IUniswapV2Router02_$23858",
                                                                "typeString": "contract IUniswapV2Router02"
                                                            }
                                                        }
                                                    ],
                                                    "expression": {
                                                        "argumentTypes": [
                                                            {
                                                                "typeIdentifier": "t_contract$_IUniswapV2Router02_$23858",
                                                                "typeString": "contract IUniswapV2Router02"
                                                            }
                                                        ],
                                                        "id": 23260,
                                                        "isConstant": false,
                                                        "isLValue": false,
                                                        "isPure": true,
                                                        "lValueRequested": false,
                                                        "nodeType": "ElementaryTypeNameExpression",
                                                        "src": "2153:7:7",
                                                        "typeDescriptions": {
                                                            "typeIdentifier": "t_type$_t_address_$",
                                                            "typeString": "type(address)"
                                                        },
                                                        "typeName": {
                                                            "id": 23259,
                                                            "name": "address",
                                                            "nodeType": "ElementaryTypeName",
                                                            "src": "2153:7:7",
                                                            "typeDescriptions": {}
                                                        }
                                                    },
                                                    "id": 23262,
                                                    "isConstant": false,
                                                    "isLValue": false,
                                                    "isPure": false,
                                                    "kind": "typeConversion",
                                                    "lValueRequested": false,
                                                    "names": [],
                                                    "nodeType": "FunctionCall",
                                                    "src": "2153:29:7",
                                                    "tryCall": false,
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_address",
                                                        "typeString": "address"
                                                    }
                                                },
                                                {
                                                    "hexValue": "313135373932303839323337333136313935343233353730393835303038363837393037383533323639393834363635363430353634303339343537353834303037393133313239363339393335",
                                                    "id": 23263,
                                                    "isConstant": false,
                                                    "isLValue": false,
                                                    "isPure": true,
                                                    "kind": "number",
                                                    "lValueRequested": false,
                                                    "nodeType": "Literal",
                                                    "src": "2196:78:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_rational_115792089237316195423570985008687907853269984665640564039457584007913129639935_by_1",
                                                        "typeString": "int_const 1157...(70 digits omitted)...9935"
                                                    },
                                                    "value": "115792089237316195423570985008687907853269984665640564039457584007913129639935"
                                                }
                                            ],
                                            "expression": {
                                                "argumentTypes": [
                                                    {
                                                        "typeIdentifier": "t_address",
                                                        "typeString": "address"
                                                    },
                                                    {
                                                        "typeIdentifier": "t_rational_115792089237316195423570985008687907853269984665640564039457584007913129639935_by_1",
                                                        "typeString": "int_const 1157...(70 digits omitted)...9935"
                                                    }
                                                ],
                                                "expression": {
                                                    "arguments": [
                                                        {
                                                            "baseExpression": {
                                                                "id": 23254,
                                                                "name": "path",
                                                                "nodeType": "Identifier",
                                                                "overloadedDeclarations": [],
                                                                "referencedDeclaration": 23222,
                                                                "src": "2123:4:7",
                                                                "typeDescriptions": {
                                                                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                                                                    "typeString": "address[] memory"
                                                                }
                                                            },
                                                            "id": 23256,
                                                            "indexExpression": {
                                                                "hexValue": "30",
                                                                "id": 23255,
                                                                "isConstant": false,
                                                                "isLValue": false,
                                                                "isPure": true,
                                                                "kind": "number",
                                                                "lValueRequested": false,
                                                                "nodeType": "Literal",
                                                                "src": "2128:1:7",
                                                                "typeDescriptions": {
                                                                    "typeIdentifier": "t_rational_0_by_1",
                                                                    "typeString": "int_const 0"
                                                                },
                                                                "value": "0"
                                                            },
                                                            "isConstant": false,
                                                            "isLValue": true,
                                                            "isPure": false,
                                                            "lValueRequested": false,
                                                            "nodeType": "IndexAccess",
                                                            "src": "2123:7:7",
                                                            "typeDescriptions": {
                                                                "typeIdentifier": "t_address",
                                                                "typeString": "address"
                                                            }
                                                        }
                                                    ],
                                                    "expression": {
                                                        "argumentTypes": [
                                                            {
                                                                "typeIdentifier": "t_address",
                                                                "typeString": "address"
                                                            }
                                                        ],
                                                        "id": 23253,
                                                        "name": "IERC20",
                                                        "nodeType": "Identifier",
                                                        "overloadedDeclarations": [],
                                                        "referencedDeclaration": 23511,
                                                        "src": "2116:6:7",
                                                        "typeDescriptions": {
                                                            "typeIdentifier": "t_type$_t_contract$_IERC20_$23511_$",
                                                            "typeString": "type(contract IERC20)"
                                                        }
                                                    },
                                                    "id": 23257,
                                                    "isConstant": false,
                                                    "isLValue": false,
                                                    "isPure": false,
                                                    "kind": "typeConversion",
                                                    "lValueRequested": false,
                                                    "names": [],
                                                    "nodeType": "FunctionCall",
                                                    "src": "2116:15:7",
                                                    "tryCall": false,
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_contract$_IERC20_$23511",
                                                        "typeString": "contract IERC20"
                                                    }
                                                },
                                                "id": 23258,
                                                "isConstant": false,
                                                "isLValue": false,
                                                "isPure": false,
                                                "lValueRequested": false,
                                                "memberName": "approve",
                                                "nodeType": "MemberAccess",
                                                "referencedDeclaration": 23483,
                                                "src": "2116:23:7",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$returns$_t_bool_$",
                                                    "typeString": "function (address,uint256) external returns (bool)"
                                                }
                                            },
                                            "id": 23264,
                                            "isConstant": false,
                                            "isLValue": false,
                                            "isPure": false,
                                            "kind": "functionCall",
                                            "lValueRequested": false,
                                            "names": [],
                                            "nodeType": "FunctionCall",
                                            "src": "2116:168:7",
                                            "tryCall": false,
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_bool",
                                                "typeString": "bool"
                                            }
                                        },
                                        "id": 23265,
                                        "nodeType": "ExpressionStatement",
                                        "src": "2116:168:7"
                                    },
                                    {
                                        "expression": {
                                            "arguments": [
                                                {
                                                    "id": 23269,
                                                    "name": "balance",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 23233,
                                                    "src": "2383:7:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    }
                                                },
                                                {
                                                    "id": 23270,
                                                    "name": "amountOutMin",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 23219,
                                                    "src": "2404:12:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    }
                                                },
                                                {
                                                    "id": 23271,
                                                    "name": "path",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 23222,
                                                    "src": "2430:4:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                                                        "typeString": "address[] memory"
                                                    }
                                                },
                                                {
                                                    "arguments": [
                                                        {
                                                            "id": 23274,
                                                            "name": "this",
                                                            "nodeType": "Identifier",
                                                            "overloadedDeclarations": [],
                                                            "referencedDeclaration": -28,
                                                            "src": "2457:4:7",
                                                            "typeDescriptions": {
                                                                "typeIdentifier": "t_contract$_SandWicher_$23358",
                                                                "typeString": "contract SandWicher"
                                                            }
                                                        }
                                                    ],
                                                    "expression": {
                                                        "argumentTypes": [
                                                            {
                                                                "typeIdentifier": "t_contract$_SandWicher_$23358",
                                                                "typeString": "contract SandWicher"
                                                            }
                                                        ],
                                                        "id": 23273,
                                                        "isConstant": false,
                                                        "isLValue": false,
                                                        "isPure": true,
                                                        "lValueRequested": false,
                                                        "nodeType": "ElementaryTypeNameExpression",
                                                        "src": "2449:7:7",
                                                        "typeDescriptions": {
                                                            "typeIdentifier": "t_type$_t_address_$",
                                                            "typeString": "type(address)"
                                                        },
                                                        "typeName": {
                                                            "id": 23272,
                                                            "name": "address",
                                                            "nodeType": "ElementaryTypeName",
                                                            "src": "2449:7:7",
                                                            "typeDescriptions": {}
                                                        }
                                                    },
                                                    "id": 23275,
                                                    "isConstant": false,
                                                    "isLValue": false,
                                                    "isPure": false,
                                                    "kind": "typeConversion",
                                                    "lValueRequested": false,
                                                    "names": [],
                                                    "nodeType": "FunctionCall",
                                                    "src": "2449:13:7",
                                                    "tryCall": false,
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_address",
                                                        "typeString": "address"
                                                    }
                                                },
                                                {
                                                    "id": 23276,
                                                    "name": "deadline",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 23224,
                                                    "src": "2477:8:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    }
                                                }
                                            ],
                                            "expression": {
                                                "argumentTypes": [
                                                    {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    },
                                                    {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    },
                                                    {
                                                        "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                                                        "typeString": "address[] memory"
                                                    },
                                                    {
                                                        "typeIdentifier": "t_address",
                                                        "typeString": "address"
                                                    },
                                                    {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    }
                                                ],
                                                "expression": {
                                                    "id": 23266,
                                                    "name": "uniswapRouterAddress",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 23227,
                                                    "src": "2295:20:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_contract$_IUniswapV2Router02_$23858",
                                                        "typeString": "contract IUniswapV2Router02"
                                                    }
                                                },
                                                "id": 23268,
                                                "isConstant": false,
                                                "isLValue": false,
                                                "isPure": false,
                                                "lValueRequested": false,
                                                "memberName": "swapExactTokensForTokensSupportingFeeOnTransferTokens",
                                                "nodeType": "MemberAccess",
                                                "referencedDeclaration": 23857,
                                                "src": "2295:74:7",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_function_external_nonpayable$_t_uint256_$_t_uint256_$_t_array$_t_address_$dyn_memory_ptr_$_t_address_$_t_uint256_$returns$__$",
                                                    "typeString": "function (uint256,uint256,address[] memory,address,uint256) external"
                                                }
                                            },
                                            "id": 23277,
                                            "isConstant": false,
                                            "isLValue": false,
                                            "isPure": false,
                                            "kind": "functionCall",
                                            "lValueRequested": false,
                                            "names": [],
                                            "nodeType": "FunctionCall",
                                            "src": "2295:191:7",
                                            "tryCall": false,
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_tuple$__$",
                                                "typeString": "tuple()"
                                            }
                                        },
                                        "id": 23278,
                                        "nodeType": "ExpressionStatement",
                                        "src": "2295:191:7"
                                    },
                                    {
                                        "expression": {
                                            "hexValue": "74727565",
                                            "id": 23279,
                                            "isConstant": false,
                                            "isLValue": false,
                                            "isPure": true,
                                            "kind": "bool",
                                            "lValueRequested": false,
                                            "nodeType": "Literal",
                                            "src": "2505:4:7",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_bool",
                                                "typeString": "bool"
                                            },
                                            "value": "true"
                                        },
                                        "functionReturnParameters": 23231,
                                        "id": 23280,
                                        "nodeType": "Return",
                                        "src": "2498:11:7"
                                    }
                                ]
                            },
                            "documentation": {
                                "id": 23217,
                                "nodeType": "StructuredDocumentation",
                                "src": "1609:99:7",
                                "text": "this is a sell function: checks the balance of tokens we are selling to be gt > 0"
                            },
                            "functionSelector": "f2e016b5",
                            "implemented": true,
                            "kind": "function",
                            "modifiers": [],
                            "name": "sell",
                            "nameLocation": "1723:4:7",
                            "parameters": {
                                "id": 23228,
                                "nodeType": "ParameterList",
                                "parameters": [
                                    {
                                        "constant": false,
                                        "id": 23219,
                                        "mutability": "mutable",
                                        "name": "amountOutMin",
                                        "nameLocation": "1743:12:7",
                                        "nodeType": "VariableDeclaration",
                                        "scope": 23282,
                                        "src": "1735:20:7",
                                        "stateVariable": false,
                                        "storageLocation": "default",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        },
                                        "typeName": {
                                            "id": 23218,
                                            "name": "uint256",
                                            "nodeType": "ElementaryTypeName",
                                            "src": "1735:7:7",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "visibility": "internal"
                                    },
                                    {
                                        "constant": false,
                                        "id": 23222,
                                        "mutability": "mutable",
                                        "name": "path",
                                        "nameLocation": "1780:4:7",
                                        "nodeType": "VariableDeclaration",
                                        "scope": 23282,
                                        "src": "1763:21:7",
                                        "stateVariable": false,
                                        "storageLocation": "memory",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                                            "typeString": "address[]"
                                        },
                                        "typeName": {
                                            "baseType": {
                                                "id": 23220,
                                                "name": "address",
                                                "nodeType": "ElementaryTypeName",
                                                "src": "1763:7:7",
                                                "stateMutability": "nonpayable",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_address",
                                                    "typeString": "address"
                                                }
                                            },
                                            "id": 23221,
                                            "nodeType": "ArrayTypeName",
                                            "src": "1763:9:7",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                                                "typeString": "address[]"
                                            }
                                        },
                                        "visibility": "internal"
                                    },
                                    {
                                        "constant": false,
                                        "id": 23224,
                                        "mutability": "mutable",
                                        "name": "deadline",
                                        "nameLocation": "1800:8:7",
                                        "nodeType": "VariableDeclaration",
                                        "scope": 23282,
                                        "src": "1792:16:7",
                                        "stateVariable": false,
                                        "storageLocation": "default",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        },
                                        "typeName": {
                                            "id": 23223,
                                            "name": "uint256",
                                            "nodeType": "ElementaryTypeName",
                                            "src": "1792:7:7",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "visibility": "internal"
                                    },
                                    {
                                        "constant": false,
                                        "id": 23227,
                                        "mutability": "mutable",
                                        "name": "uniswapRouterAddress",
                                        "nameLocation": "1835:20:7",
                                        "nodeType": "VariableDeclaration",
                                        "scope": 23282,
                                        "src": "1816:39:7",
                                        "stateVariable": false,
                                        "storageLocation": "default",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_contract$_IUniswapV2Router02_$23858",
                                            "typeString": "contract IUniswapV2Router02"
                                        },
                                        "typeName": {
                                            "id": 23226,
                                            "nodeType": "UserDefinedTypeName",
                                            "pathNode": {
                                                "id": 23225,
                                                "name": "IUniswapV2Router02",
                                                "nodeType": "IdentifierPath",
                                                "referencedDeclaration": 23858,
                                                "src": "1816:18:7"
                                            },
                                            "referencedDeclaration": 23858,
                                            "src": "1816:18:7",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_contract$_IUniswapV2Router02_$23858",
                                                "typeString": "contract IUniswapV2Router02"
                                            }
                                        },
                                        "visibility": "internal"
                                    }
                                ],
                                "src": "1727:135:7"
                            },
                            "returnParameters": {
                                "id": 23231,
                                "nodeType": "ParameterList",
                                "parameters": [
                                    {
                                        "constant": false,
                                        "id": 23230,
                                        "mutability": "mutable",
                                        "name": "",
                                        "nameLocation": "-1:-1:-1",
                                        "nodeType": "VariableDeclaration",
                                        "scope": 23282,
                                        "src": "1881:4:7",
                                        "stateVariable": false,
                                        "storageLocation": "default",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_bool",
                                            "typeString": "bool"
                                        },
                                        "typeName": {
                                            "id": 23229,
                                            "name": "bool",
                                            "nodeType": "ElementaryTypeName",
                                            "src": "1881:4:7",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_bool",
                                                "typeString": "bool"
                                            }
                                        },
                                        "visibility": "internal"
                                    }
                                ],
                                "src": "1880:6:7"
                            },
                            "scope": 23358,
                            "stateMutability": "nonpayable",
                            "virtual": false,
                            "visibility": "external"
                        },
                        {
                            "id": 23303,
                            "nodeType": "FunctionDefinition",
                            "src": "2660:235:7",
                            "body": {
                                "id": 23302,
                                "nodeType": "Block",
                                "src": "2742:153:7",
                                "statements": [
                                    {
                                        "expression": {
                                            "arguments": [
                                                {
                                                    "id": 23296,
                                                    "name": "uniswapRouterAddress",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 23288,
                                                    "src": "2764:20:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_address",
                                                        "typeString": "address"
                                                    }
                                                },
                                                {
                                                    "hexValue": "313135373932303839323337333136313935343233353730393835303038363837393037383533323639393834363635363430353634303339343537353834303037393133313239363339393335",
                                                    "id": 23297,
                                                    "isConstant": false,
                                                    "isLValue": false,
                                                    "isPure": true,
                                                    "kind": "number",
                                                    "lValueRequested": false,
                                                    "nodeType": "Literal",
                                                    "src": "2786:78:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_rational_115792089237316195423570985008687907853269984665640564039457584007913129639935_by_1",
                                                        "typeString": "int_const 1157...(70 digits omitted)...9935"
                                                    },
                                                    "value": "115792089237316195423570985008687907853269984665640564039457584007913129639935"
                                                }
                                            ],
                                            "expression": {
                                                "argumentTypes": [
                                                    {
                                                        "typeIdentifier": "t_address",
                                                        "typeString": "address"
                                                    },
                                                    {
                                                        "typeIdentifier": "t_rational_115792089237316195423570985008687907853269984665640564039457584007913129639935_by_1",
                                                        "typeString": "int_const 1157...(70 digits omitted)...9935"
                                                    }
                                                ],
                                                "expression": {
                                                    "id": 23293,
                                                    "name": "bnb",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 23286,
                                                    "src": "2752:3:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_contract$_IERC20_$23511",
                                                        "typeString": "contract IERC20"
                                                    }
                                                },
                                                "id": 23295,
                                                "isConstant": false,
                                                "isLValue": false,
                                                "isPure": false,
                                                "lValueRequested": false,
                                                "memberName": "approve",
                                                "nodeType": "MemberAccess",
                                                "referencedDeclaration": 23483,
                                                "src": "2752:11:7",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$returns$_t_bool_$",
                                                    "typeString": "function (address,uint256) external returns (bool)"
                                                }
                                            },
                                            "id": 23298,
                                            "isConstant": false,
                                            "isLValue": false,
                                            "isPure": false,
                                            "kind": "functionCall",
                                            "lValueRequested": false,
                                            "names": [],
                                            "nodeType": "FunctionCall",
                                            "src": "2752:113:7",
                                            "tryCall": false,
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_bool",
                                                "typeString": "bool"
                                            }
                                        },
                                        "id": 23299,
                                        "nodeType": "ExpressionStatement",
                                        "src": "2752:113:7"
                                    },
                                    {
                                        "expression": {
                                            "hexValue": "74727565",
                                            "id": 23300,
                                            "isConstant": false,
                                            "isLValue": false,
                                            "isPure": true,
                                            "kind": "bool",
                                            "lValueRequested": false,
                                            "nodeType": "Literal",
                                            "src": "2883:4:7",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_bool",
                                                "typeString": "bool"
                                            },
                                            "value": "true"
                                        },
                                        "functionReturnParameters": 23292,
                                        "id": 23301,
                                        "nodeType": "Return",
                                        "src": "2876:11:7"
                                    }
                                ]
                            },
                            "documentation": {
                                "id": 23283,
                                "nodeType": "StructuredDocumentation",
                                "src": "2527:127:7",
                                "text": "approve function allows spender to approve tokens on your behalf: we approvea MAX amount in order to do it once"
                            },
                            "functionSelector": "7e5465ba",
                            "implemented": true,
                            "kind": "function",
                            "modifiers": [],
                            "name": "approve",
                            "nameLocation": "2669:7:7",
                            "parameters": {
                                "id": 23289,
                                "nodeType": "ParameterList",
                                "parameters": [
                                    {
                                        "constant": false,
                                        "id": 23286,
                                        "mutability": "mutable",
                                        "name": "bnb",
                                        "nameLocation": "2684:3:7",
                                        "nodeType": "VariableDeclaration",
                                        "scope": 23303,
                                        "src": "2677:10:7",
                                        "stateVariable": false,
                                        "storageLocation": "default",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_contract$_IERC20_$23511",
                                            "typeString": "contract IERC20"
                                        },
                                        "typeName": {
                                            "id": 23285,
                                            "nodeType": "UserDefinedTypeName",
                                            "pathNode": {
                                                "id": 23284,
                                                "name": "IERC20",
                                                "nodeType": "IdentifierPath",
                                                "referencedDeclaration": 23511,
                                                "src": "2677:6:7"
                                            },
                                            "referencedDeclaration": 23511,
                                            "src": "2677:6:7",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_contract$_IERC20_$23511",
                                                "typeString": "contract IERC20"
                                            }
                                        },
                                        "visibility": "internal"
                                    },
                                    {
                                        "constant": false,
                                        "id": 23288,
                                        "mutability": "mutable",
                                        "name": "uniswapRouterAddress",
                                        "nameLocation": "2697:20:7",
                                        "nodeType": "VariableDeclaration",
                                        "scope": 23303,
                                        "src": "2689:28:7",
                                        "stateVariable": false,
                                        "storageLocation": "default",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_address",
                                            "typeString": "address"
                                        },
                                        "typeName": {
                                            "id": 23287,
                                            "name": "address",
                                            "nodeType": "ElementaryTypeName",
                                            "src": "2689:7:7",
                                            "stateMutability": "nonpayable",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_address",
                                                "typeString": "address"
                                            }
                                        },
                                        "visibility": "internal"
                                    }
                                ],
                                "src": "2676:42:7"
                            },
                            "returnParameters": {
                                "id": 23292,
                                "nodeType": "ParameterList",
                                "parameters": [
                                    {
                                        "constant": false,
                                        "id": 23291,
                                        "mutability": "mutable",
                                        "name": "",
                                        "nameLocation": "-1:-1:-1",
                                        "nodeType": "VariableDeclaration",
                                        "scope": 23303,
                                        "src": "2737:4:7",
                                        "stateVariable": false,
                                        "storageLocation": "default",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_bool",
                                            "typeString": "bool"
                                        },
                                        "typeName": {
                                            "id": 23290,
                                            "name": "bool",
                                            "nodeType": "ElementaryTypeName",
                                            "src": "2737:4:7",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_bool",
                                                "typeString": "bool"
                                            }
                                        },
                                        "visibility": "internal"
                                    }
                                ],
                                "src": "2736:6:7"
                            },
                            "scope": 23358,
                            "stateMutability": "nonpayable",
                            "virtual": false,
                            "visibility": "external"
                        },
                        {
                            "id": 23339,
                            "nodeType": "FunctionDefinition",
                            "src": "2971:288:7",
                            "body": {
                                "id": 23338,
                                "nodeType": "Block",
                                "src": "3072:187:7",
                                "statements": [
                                    {
                                        "expression": {
                                            "arguments": [
                                                {
                                                    "commonType": {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    },
                                                    "id": 23323,
                                                    "isConstant": false,
                                                    "isLValue": false,
                                                    "isPure": false,
                                                    "lValueRequested": false,
                                                    "leftExpression": {
                                                        "id": 23317,
                                                        "name": "amount",
                                                        "nodeType": "Identifier",
                                                        "overloadedDeclarations": [],
                                                        "referencedDeclaration": 23309,
                                                        "src": "3092:6:7",
                                                        "typeDescriptions": {
                                                            "typeIdentifier": "t_uint256",
                                                            "typeString": "uint256"
                                                        }
                                                    },
                                                    "nodeType": "BinaryOperation",
                                                    "operator": "<=",
                                                    "rightExpression": {
                                                        "expression": {
                                                            "arguments": [
                                                                {
                                                                    "id": 23320,
                                                                    "name": "this",
                                                                    "nodeType": "Identifier",
                                                                    "overloadedDeclarations": [],
                                                                    "referencedDeclaration": -28,
                                                                    "src": "3110:4:7",
                                                                    "typeDescriptions": {
                                                                        "typeIdentifier": "t_contract$_SandWicher_$23358",
                                                                        "typeString": "contract SandWicher"
                                                                    }
                                                                }
                                                            ],
                                                            "expression": {
                                                                "argumentTypes": [
                                                                    {
                                                                        "typeIdentifier": "t_contract$_SandWicher_$23358",
                                                                        "typeString": "contract SandWicher"
                                                                    }
                                                                ],
                                                                "id": 23319,
                                                                "isConstant": false,
                                                                "isLValue": false,
                                                                "isPure": true,
                                                                "lValueRequested": false,
                                                                "nodeType": "ElementaryTypeNameExpression",
                                                                "src": "3102:7:7",
                                                                "typeDescriptions": {
                                                                    "typeIdentifier": "t_type$_t_address_$",
                                                                    "typeString": "type(address)"
                                                                },
                                                                "typeName": {
                                                                    "id": 23318,
                                                                    "name": "address",
                                                                    "nodeType": "ElementaryTypeName",
                                                                    "src": "3102:7:7",
                                                                    "typeDescriptions": {}
                                                                }
                                                            },
                                                            "id": 23321,
                                                            "isConstant": false,
                                                            "isLValue": false,
                                                            "isPure": false,
                                                            "kind": "typeConversion",
                                                            "lValueRequested": false,
                                                            "names": [],
                                                            "nodeType": "FunctionCall",
                                                            "src": "3102:13:7",
                                                            "tryCall": false,
                                                            "typeDescriptions": {
                                                                "typeIdentifier": "t_address",
                                                                "typeString": "address"
                                                            }
                                                        },
                                                        "id": 23322,
                                                        "isConstant": false,
                                                        "isLValue": false,
                                                        "isPure": false,
                                                        "lValueRequested": false,
                                                        "memberName": "balance",
                                                        "nodeType": "MemberAccess",
                                                        "src": "3102:21:7",
                                                        "typeDescriptions": {
                                                            "typeIdentifier": "t_uint256",
                                                            "typeString": "uint256"
                                                        }
                                                    },
                                                    "src": "3092:31:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_bool",
                                                        "typeString": "bool"
                                                    }
                                                },
                                                {
                                                    "hexValue": "496e737566666369656e7420616d6f756e7420746f207769746864726177",
                                                    "id": 23324,
                                                    "isConstant": false,
                                                    "isLValue": false,
                                                    "isPure": true,
                                                    "kind": "string",
                                                    "lValueRequested": false,
                                                    "nodeType": "Literal",
                                                    "src": "3125:32:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_stringliteral_d39f970a57968df19ad0b505b5e064de4d3d279083a10a648ed6c8c8900d7d5f",
                                                        "typeString": "literal_string \"Insuffcient amount to withdraw\""
                                                    },
                                                    "value": "Insuffcient amount to withdraw"
                                                }
                                            ],
                                            "expression": {
                                                "argumentTypes": [
                                                    {
                                                        "typeIdentifier": "t_bool",
                                                        "typeString": "bool"
                                                    },
                                                    {
                                                        "typeIdentifier": "t_stringliteral_d39f970a57968df19ad0b505b5e064de4d3d279083a10a648ed6c8c8900d7d5f",
                                                        "typeString": "literal_string \"Insuffcient amount to withdraw\""
                                                    }
                                                ],
                                                "id": 23316,
                                                "name": "require",
                                                "nodeType": "Identifier",
                                                "overloadedDeclarations": [
                                                    -18,
                                                    -18
                                                ],
                                                "referencedDeclaration": -18,
                                                "src": "3083:7:7",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                                                    "typeString": "function (bool,string memory) pure"
                                                }
                                            },
                                            "id": 23325,
                                            "isConstant": false,
                                            "isLValue": false,
                                            "isPure": false,
                                            "kind": "functionCall",
                                            "lValueRequested": false,
                                            "names": [],
                                            "nodeType": "FunctionCall",
                                            "src": "3083:75:7",
                                            "tryCall": false,
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_tuple$__$",
                                                "typeString": "tuple()"
                                            }
                                        },
                                        "id": 23326,
                                        "nodeType": "ExpressionStatement",
                                        "src": "3083:75:7"
                                    },
                                    {
                                        "expression": {
                                            "arguments": [
                                                {
                                                    "id": 23330,
                                                    "name": "tokenContractAddress",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 23307,
                                                    "src": "3191:20:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_contract$_IERC20_$23511",
                                                        "typeString": "contract IERC20"
                                                    }
                                                },
                                                {
                                                    "arguments": [],
                                                    "expression": {
                                                        "argumentTypes": [],
                                                        "id": 23331,
                                                        "name": "owner",
                                                        "nodeType": "Identifier",
                                                        "overloadedDeclarations": [],
                                                        "referencedDeclaration": 23408,
                                                        "src": "3213:5:7",
                                                        "typeDescriptions": {
                                                            "typeIdentifier": "t_function_internal_view$__$returns$_t_address_$",
                                                            "typeString": "function () view returns (address)"
                                                        }
                                                    },
                                                    "id": 23332,
                                                    "isConstant": false,
                                                    "isLValue": false,
                                                    "isPure": false,
                                                    "kind": "functionCall",
                                                    "lValueRequested": false,
                                                    "names": [],
                                                    "nodeType": "FunctionCall",
                                                    "src": "3213:7:7",
                                                    "tryCall": false,
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_address",
                                                        "typeString": "address"
                                                    }
                                                },
                                                {
                                                    "id": 23333,
                                                    "name": "amount",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 23309,
                                                    "src": "3222:6:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    }
                                                }
                                            ],
                                            "expression": {
                                                "argumentTypes": [
                                                    {
                                                        "typeIdentifier": "t_contract$_IERC20_$23511",
                                                        "typeString": "contract IERC20"
                                                    },
                                                    {
                                                        "typeIdentifier": "t_address",
                                                        "typeString": "address"
                                                    },
                                                    {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    }
                                                ],
                                                "expression": {
                                                    "id": 23327,
                                                    "name": "SafeERC20",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 24251,
                                                    "src": "3168:9:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_type$_t_contract$_SafeERC20_$24251_$",
                                                        "typeString": "type(library SafeERC20)"
                                                    }
                                                },
                                                "id": 23329,
                                                "isConstant": false,
                                                "isLValue": false,
                                                "isPure": false,
                                                "lValueRequested": false,
                                                "memberName": "safeTransfer",
                                                "nodeType": "MemberAccess",
                                                "referencedDeclaration": 24186,
                                                "src": "3168:22:7",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_function_internal_nonpayable$_t_contract$_IERC20_$23511_$_t_address_$_t_uint256_$returns$__$",
                                                    "typeString": "function (contract IERC20,address,uint256)"
                                                }
                                            },
                                            "id": 23334,
                                            "isConstant": false,
                                            "isLValue": false,
                                            "isPure": false,
                                            "kind": "functionCall",
                                            "lValueRequested": false,
                                            "names": [],
                                            "nodeType": "FunctionCall",
                                            "src": "3168:61:7",
                                            "tryCall": false,
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_tuple$__$",
                                                "typeString": "tuple()"
                                            }
                                        },
                                        "id": 23335,
                                        "nodeType": "ExpressionStatement",
                                        "src": "3168:61:7"
                                    },
                                    {
                                        "expression": {
                                            "hexValue": "74727565",
                                            "id": 23336,
                                            "isConstant": false,
                                            "isLValue": false,
                                            "isPure": true,
                                            "kind": "bool",
                                            "lValueRequested": false,
                                            "nodeType": "Literal",
                                            "src": "3246:4:7",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_bool",
                                                "typeString": "bool"
                                            },
                                            "value": "true"
                                        },
                                        "functionReturnParameters": 23315,
                                        "id": 23337,
                                        "nodeType": "Return",
                                        "src": "3239:11:7"
                                    }
                                ]
                            },
                            "documentation": {
                                "id": 23304,
                                "nodeType": "StructuredDocumentation",
                                "src": "2902:62:7",
                                "text": "allows owner of contract to withdraw tokens"
                            },
                            "functionSelector": "9e281a98",
                            "implemented": true,
                            "kind": "function",
                            "modifiers": [
                                {
                                    "id": 23312,
                                    "kind": "modifierInvocation",
                                    "modifierName": {
                                        "id": 23311,
                                        "name": "onlyOwner",
                                        "nodeType": "IdentifierPath",
                                        "referencedDeclaration": 23422,
                                        "src": "3047:9:7"
                                    },
                                    "nodeType": "ModifierInvocation",
                                    "src": "3047:9:7"
                                }
                            ],
                            "name": "withdrawToken",
                            "nameLocation": "2980:13:7",
                            "parameters": {
                                "id": 23310,
                                "nodeType": "ParameterList",
                                "parameters": [
                                    {
                                        "constant": false,
                                        "id": 23307,
                                        "mutability": "mutable",
                                        "name": "tokenContractAddress",
                                        "nameLocation": "3001:20:7",
                                        "nodeType": "VariableDeclaration",
                                        "scope": 23339,
                                        "src": "2994:27:7",
                                        "stateVariable": false,
                                        "storageLocation": "default",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_contract$_IERC20_$23511",
                                            "typeString": "contract IERC20"
                                        },
                                        "typeName": {
                                            "id": 23306,
                                            "nodeType": "UserDefinedTypeName",
                                            "pathNode": {
                                                "id": 23305,
                                                "name": "IERC20",
                                                "nodeType": "IdentifierPath",
                                                "referencedDeclaration": 23511,
                                                "src": "2994:6:7"
                                            },
                                            "referencedDeclaration": 23511,
                                            "src": "2994:6:7",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_contract$_IERC20_$23511",
                                                "typeString": "contract IERC20"
                                            }
                                        },
                                        "visibility": "internal"
                                    },
                                    {
                                        "constant": false,
                                        "id": 23309,
                                        "mutability": "mutable",
                                        "name": "amount",
                                        "nameLocation": "3031:6:7",
                                        "nodeType": "VariableDeclaration",
                                        "scope": 23339,
                                        "src": "3023:14:7",
                                        "stateVariable": false,
                                        "storageLocation": "default",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        },
                                        "typeName": {
                                            "id": 23308,
                                            "name": "uint256",
                                            "nodeType": "ElementaryTypeName",
                                            "src": "3023:7:7",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "visibility": "internal"
                                    }
                                ],
                                "src": "2993:45:7"
                            },
                            "returnParameters": {
                                "id": 23315,
                                "nodeType": "ParameterList",
                                "parameters": [
                                    {
                                        "constant": false,
                                        "id": 23314,
                                        "mutability": "mutable",
                                        "name": "",
                                        "nameLocation": "-1:-1:-1",
                                        "nodeType": "VariableDeclaration",
                                        "scope": 23339,
                                        "src": "3066:4:7",
                                        "stateVariable": false,
                                        "storageLocation": "default",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_bool",
                                            "typeString": "bool"
                                        },
                                        "typeName": {
                                            "id": 23313,
                                            "name": "bool",
                                            "nodeType": "ElementaryTypeName",
                                            "src": "3066:4:7",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_bool",
                                                "typeString": "bool"
                                            }
                                        },
                                        "visibility": "internal"
                                    }
                                ],
                                "src": "3065:6:7"
                            },
                            "scope": 23358,
                            "stateMutability": "nonpayable",
                            "virtual": false,
                            "visibility": "external"
                        },
                        {
                            "id": 23352,
                            "nodeType": "FunctionDefinition",
                            "src": "3378:102:7",
                            "body": {
                                "id": 23351,
                                "nodeType": "Block",
                                "src": "3445:35:7",
                                "statements": [
                                    {
                                        "expression": {
                                            "arguments": [
                                                {
                                                    "id": 23348,
                                                    "name": "_to",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 23342,
                                                    "src": "3468:3:7",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_address_payable",
                                                        "typeString": "address payable"
                                                    }
                                                }
                                            ],
                                            "expression": {
                                                "argumentTypes": [
                                                    {
                                                        "typeIdentifier": "t_address_payable",
                                                        "typeString": "address payable"
                                                    }
                                                ],
                                                "id": 23347,
                                                "name": "selfdestruct",
                                                "nodeType": "Identifier",
                                                "overloadedDeclarations": [],
                                                "referencedDeclaration": -21,
                                                "src": "3455:12:7",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_function_selfdestruct_nonpayable$_t_address_payable_$returns$__$",
                                                    "typeString": "function (address payable)"
                                                }
                                            },
                                            "id": 23349,
                                            "isConstant": false,
                                            "isLValue": false,
                                            "isPure": false,
                                            "kind": "functionCall",
                                            "lValueRequested": false,
                                            "names": [],
                                            "nodeType": "FunctionCall",
                                            "src": "3455:17:7",
                                            "tryCall": false,
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_tuple$__$",
                                                "typeString": "tuple()"
                                            }
                                        },
                                        "id": 23350,
                                        "nodeType": "ExpressionStatement",
                                        "src": "3455:17:7"
                                    }
                                ]
                            },
                            "documentation": {
                                "id": 23340,
                                "nodeType": "StructuredDocumentation",
                                "src": "3268:104:7",
                                "text": "selfdestruct sends all remaining Ether stored in the contract to a designated address."
                            },
                            "functionSelector": "39df43ff",
                            "implemented": true,
                            "kind": "function",
                            "modifiers": [
                                {
                                    "id": 23345,
                                    "kind": "modifierInvocation",
                                    "modifierName": {
                                        "id": 23344,
                                        "name": "onlyOwner",
                                        "nodeType": "IdentifierPath",
                                        "referencedDeclaration": 23422,
                                        "src": "3436:9:7"
                                    },
                                    "nodeType": "ModifierInvocation",
                                    "src": "3436:9:7"
                                }
                            ],
                            "name": "destroySmartContract",
                            "nameLocation": "3387:20:7",
                            "parameters": {
                                "id": 23343,
                                "nodeType": "ParameterList",
                                "parameters": [
                                    {
                                        "constant": false,
                                        "id": 23342,
                                        "mutability": "mutable",
                                        "name": "_to",
                                        "nameLocation": "3424:3:7",
                                        "nodeType": "VariableDeclaration",
                                        "scope": 23352,
                                        "src": "3408:19:7",
                                        "stateVariable": false,
                                        "storageLocation": "default",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_address_payable",
                                            "typeString": "address payable"
                                        },
                                        "typeName": {
                                            "id": 23341,
                                            "name": "address",
                                            "nodeType": "ElementaryTypeName",
                                            "src": "3408:15:7",
                                            "stateMutability": "payable",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_address_payable",
                                                "typeString": "address payable"
                                            }
                                        },
                                        "visibility": "internal"
                                    }
                                ],
                                "src": "3407:21:7"
                            },
                            "returnParameters": {
                                "id": 23346,
                                "nodeType": "ParameterList",
                                "parameters": [],
                                "src": "3445:0:7"
                            },
                            "scope": 23358,
                            "stateMutability": "nonpayable",
                            "virtual": false,
                            "visibility": "public"
                        },
                        {
                            "id": 23357,
                            "nodeType": "FunctionDefinition",
                            "src": "3559:29:7",
                            "body": {
                                "id": 23356,
                                "nodeType": "Block",
                                "src": "3586:2:7",
                                "statements": []
                            },
                            "documentation": {
                                "id": 23353,
                                "nodeType": "StructuredDocumentation",
                                "src": "3488:65:7",
                                "text": "Lets the contract receive native tokens from."
                            },
                            "implemented": true,
                            "kind": "receive",
                            "modifiers": [],
                            "name": "",
                            "nameLocation": "-1:-1:-1",
                            "parameters": {
                                "id": 23354,
                                "nodeType": "ParameterList",
                                "parameters": [],
                                "src": "3566:2:7"
                            },
                            "returnParameters": {
                                "id": 23355,
                                "nodeType": "ParameterList",
                                "parameters": [],
                                "src": "3586:0:7"
                            },
                            "scope": 23358,
                            "stateMutability": "payable",
                            "virtual": false,
                            "visibility": "external"
                        }
                    ],
                    "abstract": false,
                    "baseContracts": [
                        {
                            "baseName": {
                                "id": 23127,
                                "name": "Ownable",
                                "nodeType": "IdentifierPath",
                                "referencedDeclaration": 23442,
                                "src": "375:7:7"
                            },
                            "id": 23128,
                            "nodeType": "InheritanceSpecifier",
                            "src": "375:7:7"
                        }
                    ],
                    "canonicalName": "SandWicher",
                    "contractDependencies": [],
                    "contractKind": "contract",
                    "fullyImplemented": true,
                    "linearizedBaseContracts": [
                        23358,
                        23442,
                        23379
                    ],
                    "name": "SandWicher",
                    "nameLocation": "361:10:7",
                    "scope": 23359,
                    "usedErrors": []
                }
            ],
            "license": "UNLICENSED"
        },
        "id": 7
    }
]