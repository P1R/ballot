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
  const pkey = process.env.PRIVATE_KEY;
  console.log({ pkey });
  const lastBlock = await provider.getBlock("latest");
  console.log({ lastBlock });
  const wallet = new ethers.Wallet(`${pkey}`);
  const signer = wallet.connect(provider);

  const ballotFactory = await new Ballot__factory(signer);
  const ballotContract = await ballotFactory.attach(
    "0x906D466Db831B2C2F375Ee05A2E8AEfeC4696723"
  );
  console.log(
    `attached contract address is ${ballotContract.address}` 
  );
  //const giveRightsToVote1 = await ballotContract.giveRightToVote("0xDDd93CEC5843f471Eb2b8B2886b2Be32555B5209")
  //console.log(giveRightsToVote1)
  const giveRightsToVote2 = await ballotContract.giveRightToVote("0xD64258a33E7AC0294a9fdE8e4C9A76674bD33A23")
  console.log(giveRightsToVote2)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
