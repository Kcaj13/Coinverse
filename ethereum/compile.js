const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, 'contracts-build');

fs.removeSync(buildPath);
fs.ensureDirSync(buildPath);

const contractsFolderPath = path.resolve(__dirname, 'contracts', 'Coinverse.sol');
const source = fs.readFileSync(contractsFolderPath, "utf8");

const input = {
	language: 'Solidity',
	sources: {
	  'Coinverse.sol': {
		content: source,
	  },
	},
	settings: {
	  outputSelection: {
		'*': {
		  '*': ['*'],
		},
	  },
	},
  };
   
output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Coinverse.sol']

fs.ensureDirSync(buildPath);
console.log(output);

for (let contract in output) {
	console.log(contract);
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(/:/g,'')+'.json'),
        output[contract]
    );
}


	