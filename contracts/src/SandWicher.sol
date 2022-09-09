// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

//this are internal imports from uniswap
import {IUniswapV2Router02} from "./interfaces/IUniswapV2Router02.sol";
import {IUniswapV2Pair} from "./interfaces/IUniswapV2Pair.sol";

//these are external imports from openzeppelin
import "@openzeppelin/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/access/Ownable.sol";
import "@openzeppelin/token/ERC20/IERC20.sol";

contract SandWicher is Ownable {

    /**
        * @dev Errors
        Insufficient Balance : 001
        Insuffcient amount to withdraw : 002
        not enough bnb in the pool : 003
     */

    /** Events to emit to tract logs **/
    event Reserves(
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
    ) external returns (bool) {
        uint112 wbnbReserves;
        (uint112 _reserve0, uint112 _reserve1, ) = pairAddress.getReserves();

        if(pairAddress.token0.address == path[0]) {

            wbnbReserves = _reserve0;

        } else {
            wbnbReserves = _reserve1;
        }

        emit Reserves(wbnbReserves, _reserve0, _reserve1, currentPooledBNB);

         require(wbnbReserves <= currentPooledBNB, "Error 003");

        uniswapRouterAddress.swapExactTokensForTokensSupportingFeeOnTransferTokens(
            amountIn,
             amountOutMin,
              path,
               address(this),
                deadline);

                return true;
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

        require(balance > 0, "Error 001");

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
         require( amount <= address(this).balance, "Error 002");
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

/**
 this function is used to calculate profitability of our trade to be carried out
 */
    function checkProfit(
        address _tokenPay, //source currency we will get: example: BNB
        address _tokenSwap, //swapped currency with the source currency; example BUSD
        uint _amoutTokenPay, // example: BNB => 10 * 1e18
        address _sourceRouter //pancakeswap router address

    ) public view returns (uint, uint){

        IUniswapV2Router02 _router = IUniswapV2Router02(_sourceRouter);

        address[] memory path1 = new address[](2);
         address[] memory path2 = new address[](2);

          // path1 represents the forwarding exchange from source currency [bNB] to swapped currency [BUSD]
        path1[0] = path2[1] = _tokenPay;
        // path2 represents the backward exchange from swapeed currency [BUSD] to source currency [BNB]
        path1[1] = path2[0] = _tokenSwap;



        uint amountOut = _router.getAmountsOut(_amoutTokenPay, path1)[1];// amountsOut BUSD
        uint amountRepay = _router.getAmountsOut(amountOut, path2)[1]; //amountsOut BNB

        return (
            (amountRepay - _amoutTokenPay), //our profit or loss; example output: BNB
             amountOut // the amount we get from our input "_amountTokenPay"; example: BUSD amount
        );
    }

    
}

