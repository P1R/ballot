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
    "0x906D466Db831B2C2F375Ee05A2E8AEfeC4696723"
  );
  console.log(
    `attached contract address is ${ballotContract.address}` 
  );
  const delegate = await ballotContract.delegate("0xDDd93CEC5843f471Eb2b8B2886b2Be32555B5209")
  console.log(delegate)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
