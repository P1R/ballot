import { ethers } from "hardhat";
import { Ballot__factory } from "../typechain-types";
import * as dotenv from 'dotenv';
import { Signer } from "ethers";
dotenv.config();

async function main() {
  
  const provider = new ethers.providers.InfuraProvider(
      "goerli",
      process.env.INFURA_API_KEY
  );

  console.log({ provider });
  const pkey = process.env.PRIVATE_KEY_VOTE;
  console.log({ pkey });
  const lastBlock = await provider.getBlock("latest");
  console.log({ lastBlock });
  const wallet = new ethers.Wallet(`${pkey}`);
  const signer = wallet.connect(provider);

  const ballotFactory = await new Ballot__factory(signer);
  const ballotContract = await ballotFactory.attach(
    "0xaf5bd48C8dd8F733697e148F952c62868A701b71"
  );
  console.log(
    `attached contract address is ${ballotContract.address}` 
  );
  const vote = await ballotContract.vote("2")
  console.log(vote)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
