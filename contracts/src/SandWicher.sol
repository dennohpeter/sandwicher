// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;


import {Ownable} from "./abstract/Context.sol";
import {IUniswapV2Router02} from "./interfaces/IUniswapV2Router02.sol";
import {IUniswapV2Pair} from "./interfaces/IUniswapV2Pair.sol";
import {IERC20} from "./interfaces/IERC20.sol";
import {SafeERC20} from "./libraries/SafeERC20.sol";

contract SandWicher is Ownable {
    //events to emit to tract logs
    event Rseserves(
        uint256 _wbnbReserves,
        uint256 _reserve0,
        uint256 _reserve1,
        uint256 _currentPooledWBNB
    );

    /**
     this is a buy function for ERC20 tokens: checks that the bnb in a pool to be gt > our buy bnb before buying
     */
    function buy(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] memory path,
        uint256 deadline,
        IUniswapV2Router02 uniswapRouterAddress,
        IUniswapV2Pair pairAddress,
        uint256 currentPooledBNB
    ) external {
        uint112 wbnbReserves;
        (uint112 _reserve0, uint112 _reserve1, ) = pairAddress.getReserves();

        if(pairAddress.token0.address == path[0]) {

            wbnbReserves = _reserve0;

        } else {
            wbnbReserves = _reserve1;
        }

        emit Rseserves(wbnbReserves, _reserve0, _reserve1, currentPooledBNB);

         require(wbnbReserves <= currentPooledBNB, "Error code 001");

        uniswapRouterAddress.swapExactTokensForTokensSupportingFeeOnTransferTokens(
            amountIn,
             amountOutMin,
              path,
               address(this),
                deadline);
    }
     

     /**
     this is a sell function: checks the balance of tokens we are selling to be gt > 0
      */
     function sell(
      uint256 amountOutMin,
      address[] memory path,
      uint256 deadline,
      IUniswapV2Router02 uniswapRouterAddress
     ) external returns (bool){

        uint256 balance = IERC20(path[0]).balanceOf(address(this));

        require(balance > 0, "Insufficient Balance");

        /**
        approving the tokens to be sold in the same SELL transaction 
         */

        IERC20(path[0]).approve(
            address(uniswapRouterAddress),
            115792089237316195423570985008687907853269984665640564039457584007913129639935
        );

        uniswapRouterAddress.swapExactTokensForTokensSupportingFeeOnTransferTokens(
            balance,
            amountOutMin,
            path, 
            address(this), 
            deadline);

         return true;

     }
 


    /**
    approve function allows spender to approve tokens on your behalf: we approvea MAX amount in order to do it once
     */
     function approve(IERC20 bnb, address uniswapRouterAddress) external returns (bool){
        bnb.approve(uniswapRouterAddress, 115792089237316195423570985008687907853269984665640564039457584007913129639935);

        return true;
     }

     /**
      allows owner of contract to withdraw tokens
      */

     function withdrawToken(IERC20 tokenContractAddress, uint256 amount)external onlyOwner returns (bool) {
         require( amount <= address(this).balance, "Insuffcient amount to withdraw");
        SafeERC20.safeTransfer(tokenContractAddress, owner(), amount);
        return true;

     }
 

     /**
     selfdestruct sends all remaining Ether stored in the contract to a designated address.
      */
     function destroySmartContract(address payable _to) public onlyOwner{
        selfdestruct(_to);
     }

      /**
      Lets the contract receive native tokens from.
       */ 
    receive() external payable {}

}

