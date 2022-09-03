// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

import "forge-std/Test.sol";

import {SandWicher} from "@contracts/SandWicher.sol";

contract ContractTest is Test {
    SandWicher sandWicher;

    function setUp() public {
        sandWicher = new SandWicher();
    }

    function testExample() public {
        assertTrue(true);
    }
}
