import { ethers } from "hardhat";
import { Ballot__factory } from "../typechain-types";
import * as dotenv from 'dotenv';
import { Signer } from "ethers";
dotenv.config();

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

async function main() {
  
  const provider = new ethers.providers.InfuraProvider(
      "goerli",
      process.env.INFURA_API_KEY
  );

  console.log({ provider });
  const pkey = process.env.PRIVATE_KEY;
  console.log({ pkey });
  const lastBlock = await provider.getBlock("latest");
  console.log({ lastBlock });
  const wallet = new ethers.Wallet(`${pkey}`);
  const signer = wallet.connect(provider);


  console.log("Deploying Ballot contract");
  console.log("Proposals: ");
  PROPOSALS.forEach((element, index) => {
    console.log(`Proposal N. ${index + 1}: ${element}`);
  });
  const ballotFactory = await new Ballot__factory(signer);
  const ballotContract = await ballotFactory.deploy(
    convertStringArrayToBytes32(PROPOSALS)
  );
  await ballotContract.deployTransaction.wait();
  console.log(
    `the Ballot contract was deployed at the address ${ballotContract.address}` 
  );
  // await ballotContract.deployed();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});