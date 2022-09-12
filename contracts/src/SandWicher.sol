// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

// External imports from openzeppelin
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface IPancakeRouter02 {
    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external;
}

contract SandWicher is Ownable, ReentrancyGuard {
    address private constant WBNB = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c;

    /**
     * @dev Buys tokens
     */
    function buy(bytes calldata _data) external payable onlyOwner nonReentrant {
        (
            address router,
            uint256 amountIn,
            uint256 amountOutMin,
            address[] memory path
        ) = abi.decode(_data, (address, uint256, uint256, address[]));

        IERC20 fromToken = IERC20(path[0]);

        _approve(fromToken, router, amountIn);

        IPancakeRouter02(router)
            .swapExactTokensForTokensSupportingFeeOnTransferTokens(
                amountIn,
                amountOutMin,
                path,
                address(this),
                block.timestamp
            );
    }

    /**
     * Sells  tokens
     * Balance of tokens we are selling to be gt > 0
     */
    function sell(address router, address _fromToken)
        external
        payable
        onlyOwner
        nonReentrant
    {
        IERC20 fromToken = IERC20(_fromToken);
        uint256 amountIn = fromToken.balanceOf(address(this));
        uint256 amountOutMin = 0;

        require(amountIn > 0, "!BAL");

        _approve(fromToken, router, amountIn);

        address[] memory path = new address[](2);
        path[0] = _fromToken;
        path[1] = WBNB;

        IPancakeRouter02(router)
            .swapExactTokensForTokensSupportingFeeOnTransferTokens(
                amountIn,
                amountOutMin,
                path,
                address(this),
                block.timestamp
            );
    }

    function _approve(
        IERC20 token,
        address router,
        uint256 amountIn
    ) internal {
        if (token.allowance(address(this), router) < amountIn) {
            // approving the tokens to be spent by router
            SafeERC20.safeApprove(token, router, amountIn);
        }
    }

    /**
     * allows owner of contract to withdraw tokens
     */

    function withdrawToken(IERC20 _token, uint256 amount) external onlyOwner {
        SafeERC20.safeTransfer(_token, owner(), amount);
    }

    /**
     * Lets the contract receive native tokens
     */
    receive() external payable {}
}
