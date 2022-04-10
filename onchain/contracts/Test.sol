//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Test {
    string public name;
    event NameCreated(address indexed add, string name);

    constructor(string memory _name) {
        name = _name;
    }

    function setName(string memory _name) public {
        name = _name;
        emit NameCreated(msg.sender, _name);
    }

    function getName() public view returns (string memory) {
        return name;
    }
}
