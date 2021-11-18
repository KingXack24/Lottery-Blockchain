import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3";
// import lotteryCompile from "./build/Lottery.json"; //correct path to be given
import lotteryCompile from "./compile.js";
import dotenv from "dotenv";
dotenv.config();

const mnemonicPhrase = process.env.mnemonicPhrase;

console.log(mnemonicPhrase);

// By default, the HDWalletProvider will use the address of the first address that's generated from the mnemonic
const provider = new HDWalletProvider({
  mnemonic: {
    phrase:
      "rebel evoke neglect hub ready jump economy chalk heart similar improve wrist",
  },
  // get from infura api
  providerOrUrl:
    "https://rinkeby.infura.io/v3/5880705fb19a438285cd7f9ec654b3ca",
});

const web3 = new Web3(provider);

// For conncecting with Ganache with the help of Infura API
// const privateKeys = [
//   "638481953d047c2c0406cd0d670a3cfcb08860281b70df371cc718aa625c4e26",
//   "4fb38c1294943427ca4cb88e45b7c79435ff8e2f8090fa3f3241b39634802129",
// ];
// const ganacheProvider = new HDWalletProvider(
//   privateKeys,
//   "http://127.0.0.1:7545",
//   0,
//   2
// );
// const web3 = new Web3(ganacheProvider);

// ---------------------
// Meta Mask - Above

// Ganache CLI - Below

// Either to be used
// ----------------------

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const abi = lotteryCompile.abi;
  const bytecode = lotteryCompile.evm.bytecode.object;

  // data: It is the compiled version of the contract
  // arguments: assign some initial value to the new instance of Inbox contract
  const result = await new web3.eth.Contract(abi)
    .deploy({
      data: bytecode,
    })
    .send({ from: accounts[0], gas: "1000000" });

  console.log(JSON.stringify(abi));
  console.log("Contract deployed to", result.options.address);
};

deploy();
