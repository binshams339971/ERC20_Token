import { expect } from "chai";
import { utils } from "ethers";
import { ethers } from "hardhat";

describe("DCLToken", function () {
  it("Should return addresses array successfully!", async function () {
    const accounts = await ethers.getSigners();

    const DCL = await ethers.getContractFactory("DCLToken");
    const dcl = await DCL.connect(accounts[1]).deploy("DCL Token", "DCL");
    await dcl.deployed();

    const getAddresses = await dcl.getBuyerAddresses();
    console.log(getAddresses);


    const purchase = await dcl.connect(accounts[0]).purchageToken({ value: utils.parseEther("10"), from: accounts[0].address });

    const getAddresses2 = await dcl.getBuyerAddresses();
    console.log(getAddresses2);
  });
});