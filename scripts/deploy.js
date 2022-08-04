const { ethers } = require("hardhat");

async function main() {
    const HighestTokenWithPresaleFactory = await ethers.getContractFactory("HighestTokenWithPresale");
    console.log("Deploying HighestTokenWithPresale...");
    const HighestTokenWithPresale = await HighestTokenWithPresaleFactory.deploy();
    await HighestTokenWithPresale.deployed();
    console.log("HighestTokenWithPresale deployed on ", HighestTokenWithPresale.address);
    await HighestTokenWithPresale.deployTransaction.wait(6);
}



main();