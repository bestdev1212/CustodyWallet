//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import './Wallet.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
contract Custody is Ownable{
    address[] public wallets;
    mapping(address => bool) walletExists;

    constructor()  {
    }

    function createWallet() public{
        Wallet  wallet = new Wallet();
        walletExists[address(wallet)] = true;
        wallets.push(address(wallet));
    }

    function transferToken(address Tokenaddress, address from, address to, uint256 amount) onlyOwner public returns (bool)
    {
        require(walletExists[from] == true, "You can only transfer from custodial wallet");
        return Wallet(from).transferToken(Tokenaddress, to, amount);
    }
}