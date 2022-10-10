// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

// External imports from openzeppelin
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
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

contract SandWicher is AccessControl, ReentrancyGuard {
    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    /**
     * @dev Buys tokens
     */
    function buyToken(bytes calldata _data)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
        nonReentrant
    {
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
    function sellToken(bytes calldata _data)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
        nonReentrant
    {
        (address router, address[] memory path, uint256 amountOutMin) = abi
            .decode(_data, (address, address[], uint256));

        IERC20 fromToken = IERC20(path[0]);
        uint256 amountIn = fromToken.balanceOf(address(this));

        require(amountIn > 0, "!BAL");

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

    function withdrawToken(IERC20 _token, uint256 amount)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        SafeERC20.safeTransfer(_token, msg.sender, amount);
    }

    function withdrawBNB(uint256 amount) external onlyRole(DEFAULT_ADMIN_ROLE) {
        payable(msg.sender).transfer(amount);
    }

    /**
     * Lets the contract receive native tokens
     */
    receive() external payable {}
}
