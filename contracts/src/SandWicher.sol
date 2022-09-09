// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

// External imports from openzeppelin
import "@openzeppelin/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/access/Ownable.sol";
import "@openzeppelin/token/ERC20/IERC20.sol";
import "@openzeppelin/security/ReentrancyGuard.sol";

contract SandWicher is Ownable, ReentrancyGuard {
    /**
     * @dev Buys tokens
     */
    function buy(address router, bytes calldata data)
        external
        payable
        nonReentrant
    {
        (bool success, ) = router.call{value: msg.value}(data);

        require(success, "buy failed");
    }

    /**
     * Sells  tokens
     * Balance of tokens we are selling to be gt > 0
     */
    function sell(bytes calldata _data) external payable nonReentrant {
        (address router, address token, bytes memory data) = abi.decode(
            _data,
            (address, address, bytes)
        );
        IERC20 sellToken = IERC20(token);
        uint256 balance = sellToken.balanceOf(address(this));

        require(balance > 0, "!BAL");

        if (sellToken.allowance(address(this), router) < balance) {
            // approving the tokens to be sold in the same SELL transaction
            SafeERC20.safeApprove(sellToken, router, balance);
        }

        (bool success, ) = router.call{value: msg.value}(data);

        require(success, "sell failed");
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
