//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract Wallet is Ownable{
    

    function transferToken(address Tokenaddress, address to, uint256 amount) onlyOwner public returns (bool) 
    {
       return IERC20(Tokenaddress).transfer(to, amount);        
    }

}