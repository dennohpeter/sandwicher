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
    address public defaultAdmin = 0x11eDedebF63bef0ea2d2D071bdF88F71543ec6fB; // big WBNB whale
    address public router = 0x10ED43C718714eb63d5aA57B78B54704E256024E;
    address public WBNB = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c;
    address public BSCUSD = 0x55d398326f99059fF775485246999027B3197955;

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

        //assert that the balance of the sandwicher is 0 before transfer od tokens to it
        assertEq(token.balanceOf(address(sandWicher)), 0);
        token.mintTo(address(sandWicher), 1000);

        //assert that after trasfering tokens to the sandwicher the balance is 1000
        assertEq(token.balanceOf(address(sandWicher)), 1000);
        sandWicher.withdrawToken(IERC20(token), 500);

        //assert that after withdrawing 500 tokens the balance is 500 for sandwicher contract
        assertEq(token.balanceOf(address(sandWicher)), 500);
        //assert that the balance of the default admin is 500
        assertEq(token.balanceOf(defaultAdmin), 500);
        vm.stopPrank();
    }

    function testBuy() public {
        vm.startPrank(defaultAdmin);

        IERC20 fromToken = IERC20(WBNB);
        uint256 amount = 10 ether;
        //assert that balance of default admin is greater than the amount we are going to transfer
        assertGt(fromToken.balanceOf(defaultAdmin), amount);

        assertEq(fromToken.balanceOf(address(sandWicher)), 0);

        fromToken.approve(address(sandWicher), amount);

        /// send 10 BNB to the contract
        fromToken.transferFrom(defaultAdmin, address(sandWicher), amount);

        assertEq(fromToken.balanceOf(address(sandWicher)), amount);
        address[] memory path = new address[](2);
        path[0] = WBNB;
        path[1] = BSCUSD;

        uint256 amountIn = 0.5 ether;

        sandWicher.buyToken(
            abi.encode(
                router, // router
                amountIn, // amountIn
                0,
                path
            )
        );

        assertGt(IERC20(BSCUSD).balanceOf(address(sandWicher)), 0);
        vm.stopPrank();
    }

    function testSell() public {
        vm.startPrank(defaultAdmin);

        // BUY TOKEN
        IERC20 fromToken = IERC20(WBNB);
        IERC20 toToken = IERC20(BSCUSD);
        uint256 amount = 10 ether;

        assertGt(fromToken.balanceOf(defaultAdmin), amount);

        assertEq(fromToken.balanceOf(address(sandWicher)), 0);

        fromToken.approve(address(sandWicher), amount);

        /// send 10 BNB to the contract
        fromToken.transferFrom(defaultAdmin, address(sandWicher), amount);

        assertEq(fromToken.balanceOf(address(sandWicher)), amount);
        address[] memory path = new address[](2);
        path[0] = address(fromToken);
        path[1] = address(toToken);

        uint256 amountIn = 0.5 ether;

        sandWicher.buyToken(
            abi.encode(
                router, // router
                amountIn, // amountIn
                0,
                path
            )
        );

        assertGt(toToken.balanceOf(address(sandWicher)), 0);

        // SELL TOKEN

        address[] memory path2 = new address[](2);
        path2[0] = address(toToken);
        path2[1] = address(fromToken);

        sandWicher.sellToken(
            abi.encode(
                router, // router
                path2, // token to sell
                0
            )
        );
        assertEq(toToken.balanceOf(address(sandWicher)), 0);

        vm.stopPrank();
    }

    function testOnlyOwner() public {
        //expect test to pass since the person withdrawing the tokens is not the owner
        vm.expectRevert(
            "AccessControl: account 0xb4c79dab8f259c7aee6e5b2aa729821864227e84 is missing role 0x0000000000000000000000000000000000000000000000000000000000000000"
        );
        sandWicher.withdrawToken(IERC20(token), 1000);

        vm.expectRevert(
            "AccessControl: account 0xb4c79dab8f259c7aee6e5b2aa729821864227e84 is missing role 0x0000000000000000000000000000000000000000000000000000000000000000"
        );
        sandWicher.buyToken("0x0");

        vm.expectRevert(
            "AccessControl: account 0xb4c79dab8f259c7aee6e5b2aa729821864227e84 is missing role 0x0000000000000000000000000000000000000000000000000000000000000000"
        );
        sandWicher.sellToken("0x0");
    }
}
