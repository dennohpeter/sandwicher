// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "forge-std/Test.sol";

import {SandWicher} from "@contracts/SandWicher.sol";
import {TokenERC20} from "./utils/TokenERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ContractTest is Test {
    uint256 mainnetFork;
    string internal constant MAINNET_RPC_URL =
        "https://bsc-dataseed1.ninicoin.io";

    SandWicher sandWicher;
    TokenERC20 token;

    /// Participants
    address public defaultAdmin = address(0x10000);
    address public mainnetDefaultAdmin =
        0x11eDedebF63bef0ea2d2D071bdF88F71543ec6fB; // big WBNB whale
    address public router = 0x10ED43C718714eb63d5aA57B78B54704E256024E;
    address public WBNB = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c;

    function setUp() public {
        vm.createFork(MAINNET_RPC_URL);
        vm.selectFork(mainnetFork);

        vm.startPrank(defaultAdmin);
        sandWicher = new SandWicher();
        token = new TokenERC20("Test", "TST");
        vm.stopPrank();
    }

    function testInMainnetFork() public {
        assertEq(vm.activeFork(), mainnetFork);
    }

    function testwithdrawToken() public {
        vm.startPrank(defaultAdmin);

        assertEq(token.balanceOf(address(sandWicher)), 0);
        token.mintTo(address(sandWicher), 1000);
        assertEq(token.balanceOf(address(sandWicher)), 1000);

        sandWicher.withdrawToken(IERC20(token), 500);

        assertEq(token.balanceOf(address(sandWicher)), 500);
        assertEq(token.balanceOf(defaultAdmin), 500);
        vm.stopPrank();
    }

    function testBuy() public {
        vm.startPrank(mainnetDefaultAdmin);
        IERC20 _token = IERC20(WBNB);
        uint256 amount = 10 ether;

        assertGt(_token.balanceOf(mainnetDefaultAdmin), amount);

        assertEq(_token.balanceOf(address(sandWicher)), 0);

        _token.approve(address(sandWicher), amount);

        /// send 10 BNB to the contract
        _token.transferFrom(mainnetDefaultAdmin, address(sandWicher), amount);

        assertEq(token.balanceOf(address(sandWicher)), amount);
        vm.stopPrank();
        // sandWicher.buy(
        //     abi.encodeWithSignature(
        //         "swapExactETHForTokensSupportingFeeOnTransferTokens(uint,address[],address,uint)",
        //         0,
        //         new address[](2),
        //         address(sandWicher),
        //         block.timestamp
        //     ),
        //     address(sandWicher)
        // );

        // assertEq(token.balanceOf(address(sandWicher)), 0);
        // assertEq(token.balanceOf(mainnetDefaultAdmin), 1000);
        vm.stopPrank();
    }

    function testOnlyOwner() public {
        vm.expectRevert("Ownable: caller is not the owner");
        sandWicher.withdrawToken(IERC20(token), 1000);

        vm.expectRevert("Ownable: caller is not the owner");
        sandWicher.buy("0x0", router);

        vm.expectRevert("Ownable: caller is not the owner");
        sandWicher.sell(router, address(token));
    }
}
