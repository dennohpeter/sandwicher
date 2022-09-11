// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

// External imports from openzeppelin
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract SandWicher is Ownable, ReentrancyGuard {
    address private constant WBNB = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c;

    /**
     * @dev Buys tokens
     */
    function buy(bytes calldata _data, address router)
        external
        payable
        nonReentrant
    {
        (bool success, ) = router.call{value: msg.value}(_data);

        require(success, "buy failed");
    }

    /**
     * Sells  tokens
     * Balance of tokens we are selling to be gt > 0
     */
    function sell(address router, address _fromToken)
        external
        payable
        nonReentrant
    {
        IERC20 fromToken = IERC20(_fromToken);
        uint256 balance = fromToken.balanceOf(address(this));

        require(balance > 0, "!BAL");

        if (fromToken.allowance(address(this), router) < balance) {
            // approving the tokens to be sold in the same SELL transaction
            SafeERC20.safeApprove(fromToken, router, balance);
        }

        address[] memory path = new address[](2);
        path[0] = _fromToken;
        path[1] = WBNB;

        (bool success, ) = router.call{value: msg.value}(
            abi.encodeWithSignature(
                "swapExactTokensForETHSupportingFeeOnTransferTokens(uint,uint,address[],address,uint)",
                balance,
                0,
                path,
                msg.sender,
                block.timestamp
            )
        );

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
