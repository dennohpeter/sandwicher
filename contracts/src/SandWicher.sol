// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

// External imports from openzeppelin
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

interface IPancakeRouter02 {
    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external;

    function getAmountsOut(uint256 amountIn, address[] calldata path)
        external
        view
        returns (uint256[] memory amounts);
}

interface ISandWicher {
    struct SimulationResult {
        uint256 expectedBuy;
        uint256 balanceBeforeBuy;
        uint256 balanceAfterBuy;
        uint256 balanceBeforeSell;
        uint256 balanceAfterSell;
        uint256 expectedSell;
    }
}

contract SandWicher is AccessControl, ISandWicher {
    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    /**
     * @dev Buys tokens
     */
    function buyToken(bytes calldata _data)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _buy(_data);
    }

    /**
     * Sells  tokens
     * Balance of tokens we are selling to be gt > 0
     */
    function sellToken(bytes calldata _data)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _sell(_data);
    }

    function simulate(bytes calldata _buydata, bytes calldata _selldata)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
        returns (SimulationResult memory result)
    {
        address[] memory path;
        address router;
        uint256 amountIn;
        // Buy
        (router, amountIn, , path) = abi.decode(
            _buydata,
            (address, uint256, uint256, address[])
        );

        IERC20 toToken = IERC20(path[path.length - 1]);

        uint256 balanceBeforeBuy = toToken.balanceOf(address(this));

        uint256 expectedBuy = getAmountsOut(router, amountIn, path);

        _buy(_buydata);

        uint256 balanceAfterBuy = toToken.balanceOf(address(this));

        // Sell

        (router, path, ) = abi.decode(_selldata, (address, address[], uint256));

        IERC20 fromToken = IERC20(path[path.length - 1]);

        uint256 balanceBeforeSell = fromToken.balanceOf(address(this));

        amountIn = IERC20(path[0]).balanceOf(address(this));

        uint256 expectedSell = getAmountsOut(router, amountIn, path);

        _sell(_selldata);

        uint256 balanceAfterSell = fromToken.balanceOf(address(this));

        return
            SimulationResult({
                expectedBuy: expectedBuy,
                balanceBeforeBuy: balanceBeforeBuy,
                balanceAfterBuy: balanceAfterBuy,
                balanceBeforeSell: balanceBeforeSell,
                balanceAfterSell: balanceAfterSell,
                expectedSell: expectedSell
            });
    }

    function _buy(bytes calldata _data) internal {
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

    function _sell(bytes calldata _data) internal {
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

    function getAmountsOut(
        address router,
        uint256 amountIn,
        address[] memory path
    ) internal view returns (uint256) {
        uint256[] memory amounts = IPancakeRouter02(router).getAmountsOut(
            amountIn,
            path
        );
        return amounts[amounts.length - 1];
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
