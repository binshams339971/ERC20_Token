// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DCLToken is ERC20 {
    address public owner;

    constructor(string memory _name, string memory _symbol)
        ERC20(_name, _symbol)
    {
        owner = msg.sender;
        uint256 amount = 1000 * 10**decimals();
        _mint(owner, amount);
    }

    function addToken(uint256 _amount) public {
        require(msg.sender == owner);
        _mint(owner, _amount);
    }

    function burnToken(uint256 _amount) public {
        require(msg.sender == owner);
        _burn(owner, _amount);
    }
}
