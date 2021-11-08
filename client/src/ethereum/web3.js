import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import ScratchCollective from "./build/ScratchCollective.json";

import {
  scratchcollective_mainnet,
  scratchcollective_ropsten,
  scratchcollective_rinkeby,
  scratchcollective_goerli,
  scratchcollective_kovan,
} from "../config";

let provider;
let web3;
let contract;

const setProvider = async () => {
  provider = await detectEthereumProvider();

  const web3ClientSetup = async () => {
    console.log("WEB3 SET UP ***************");
    web3 = new Web3(provider);

    const currentChainId = await web3.eth.net.getId();
    console.log(`web3ClientSetup is: ${currentChainId}`);

    if (currentChainId === 1) {
      // mainnet - CHANGE
      console.log("web3ClientSetup. Got Mainnet?");
      contract = new web3.eth.Contract(
        ScratchCollective.abi,
        scratchcollective_mainnet
      );
    } else if (currentChainId === 3) {
      // Ropsten
      console.log("web3ClientSetup. Got Ropsten?");
      contract = new web3.eth.Contract(
        ScratchCollective.abi,
        scratchcollective_ropsten
      );
    } else if (currentChainId === 4) {
      // Rinkeby
      console.log("web3ClientSetup. Got Rinkeby?");
      contract = new web3.eth.Contract(
        ScratchCollective.abi,
        scratchcollective_rinkeby
      );
    } else if (currentChainId === 5) {
      // Goerli - CHANGE
      console.log("web3ClientSetup. Got Goerli?");
      contract = new web3.eth.Contract(
        ScratchCollective.abi,
        scratchcollective_goerli
      );
    } else if (currentChainId === 42) {
      // Kovan - CHANGE
      console.log("web3ClientSetup. Got Kovan?");
      contract = new web3.eth.Contract(
        ScratchCollective.abi,
        scratchcollective_kovan
      );
    }
    console.log("contract set");
  };

  if (typeof window.ethereum === "undefined") {
    console.log("web3.js - no web3 plugin in browser");
  } else {
    console.log("web3js - HAS web3 plugin in browser");
    web3ClientSetup();
  }
};

setProvider();

export { web3, contract, provider };
