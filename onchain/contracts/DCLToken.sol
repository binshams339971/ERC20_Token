// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DCLToken is ERC20 {
    address payable public owner;
    address[] public buyerAddress;
    mapping(address => bool) public buyers;

    constructor(string memory _name, string memory _symbol)
        ERC20(_name, _symbol)
    {
        owner = payable(msg.sender);
        //This one for finding token owner
        buyerAddress.push(owner);
        buyers[msg.sender] = true;

        uint256 amount = 1000 * 10**decimals(); //18 decimals (10** decimals = 10^18)
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

    function getBuyerAddresses() public view returns (address[] memory) {
        return buyerAddress;
    }

    function purchageToken() public payable {
        require(msg.sender != owner);

        //Logic for buy token
        uint256 amount = msg.value * 100;
        _transfer(owner, msg.sender, amount);

        //Save buyer address
        if (!exists2(msg.sender)) {
            buyers[msg.sender] = true;
            buyerAddress.push(msg.sender);
        }
    }

    //More costly for looping
    // function exists(address add) public view returns (bool) {
    //     for (uint i = 0; i < buyerAddress.length; i++) {
    //         if (buyerAddress[i] == add) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    //Cost effective
    function exists2(address add) public view returns (bool) {
        return buyers[add];
    }
}
