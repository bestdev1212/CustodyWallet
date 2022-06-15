const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TEST", function () {
  it("test start", async function () {
    const signers = ethers.getSigners();
    const admin = signers[0];
    const user1 = signers[1];
    const Token = await ethers.getContractFactory("Token");
    const token1 = await Token.deploy("Token1", "TK1");
    await token1.deployed();
    const token1_address = token1.address;
    console.log(`token1 is deployed at ${token1_address}`);
    const token2 = await Token.deploy("Token1", "TK1");
    await token2.deployed();
    const token2_address = token2.address;
    console.log(`token2 is deployed at ${token2_address}`);

    const Custody = await ethers.getContractFactory("Custody");
    const custody = await Custody.deploy();
    console.log(`Custody Factory Contract is deployed at ${custody.address}`);
    var Tx = await custody.createWallet();
    await Tx.wait();
    var Tx = await custody.createWallet();
    await Tx.wait();
    const custodyWalletAddress1 = await custody.wallets(0);
    const custodyWalletAddress2 = await custody.wallets(1);
    console.log(`Custody wallet1 is generated at ${custodyWalletAddress1}`);
    console.log(`Custody wallet2 is generated at ${custodyWalletAddress2}`);
    console.log(`Token1 balance of Custody address 1 is ${await token1.balanceOf(custodyWalletAddress1)}`);
    console.log(`Token2 balance of Custody address 1 is ${await token2.balanceOf(custodyWalletAddress1)}`);
    console.log(`Token1 balance of Custody address 2 is ${await token1.balanceOf(custodyWalletAddress2)}`);
    console.log(`Token2 balance of Custody address 2 is ${await token2.balanceOf(custodyWalletAddress2)}`);
    console.log(`~~~ Transfer Tokens to each custody wallets ~~~`);
    await token1.transfer(custodyWalletAddress1, 10000);
    await token2.transfer(custodyWalletAddress2, 10000);
    console.log(`Token1 balance of Custody address 1 is ${await token1.balanceOf(custodyWalletAddress1)}`);
    console.log(`Token2 balance of Custody address 1 is ${await token2.balanceOf(custodyWalletAddress1)}`);
    console.log(`Token1 balance of Custody address 2 is ${await token1.balanceOf(custodyWalletAddress2)}`);
    console.log(`Token2 balance of Custody address 2 is ${await token2.balanceOf(custodyWalletAddress2)}`);
    console.log(`~~~ Transfer Tokens via custody factory ~~~`);
    await custody.transferToken(token1.address, custodyWalletAddress1, custodyWalletAddress2, 100);
    await custody.transferToken(token2.address, custodyWalletAddress2, custodyWalletAddress1, 100);
    console.log(`Token1 balance of Custody address 1 is ${await token1.balanceOf(custodyWalletAddress1)}`);
    console.log(`Token2 balance of Custody address 1 is ${await token2.balanceOf(custodyWalletAddress1)}`);
    console.log(`Token1 balance of Custody address 2 is ${await token1.balanceOf(custodyWalletAddress2)}`);
    console.log(`Token2 balance of Custody address 2 is ${await token2.balanceOf(custodyWalletAddress2)}`);
    // expect(await greeter.greet()).to.equal("Hello, world!");

    // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // // wait until the transaction is mined
    // await setGreetingTx.wait();

    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
