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

  const ballotFactory = await new Ballot__factory(signer);
  const ballotContract = await ballotFactory.attach(
    "0xaf5bd48C8dd8F733697e148F952c62868A701b71"
  );
  //await ballotContract.deployTransaction.wait();
  console.log(
    `attached contract address is ${ballotContract.address}` 
  );
  const giveRightsToVote = await ballotContract.giveRightToVote("0xDDd93CEC5843f471Eb2b8B2886b2Be32555B5209")
  console.log(giveRightsToVote)
  const vote = await ballotContract.vote("1")
  console.log(vote)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
