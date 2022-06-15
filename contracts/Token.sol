//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    uint256 _totalSupply = 100000000000;
    constructor(string memory name_, string memory symbol_) ERC20(name_, symbol_){
        _mint(msg.sender, _totalSupply*decimals());
    }

    function decimals() public pure override returns (uint8) {
        return 18;
    }

}