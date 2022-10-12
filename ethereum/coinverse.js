import web3 from "./web3";

const address = "0x93306cE262442f9cBbF5442efD4b937ABf9cF0b8";

const abi = [
  {
    inputs: [],
    name: "convertToCoins",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "coins", type: "uint256" }],
    name: "convertToEth",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address payable", name: "_to", type: "address" }],
    name: "sendEth",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

export default new web3.eth.Contract(abi, address);
