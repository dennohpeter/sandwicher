// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenERC20 is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function mintTo(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
