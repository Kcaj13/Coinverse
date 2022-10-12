const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledCoinverse = require("./contracts-build/Coinverse.json");
const abi = compiledCoinverse.abi
const bytecode = compiledCoinverse.evm.bytecode.object

const provider = new HDWalletProvider(
  'story dose case pave come catalog example fade follow coffee senior chalk',
  'https://rinkeby.infura.io/v3/13286bba5f1a4119807bd2950c0bc603'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: '0x' + bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop()
};
deploy();


