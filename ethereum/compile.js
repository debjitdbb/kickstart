const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname,'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol')
const source = fs.readFileSync(campaignPath,'utf8');
// const output = solc.compile(source,1).contracts;
const obj = JSON.parse(
  solc.compile(
    JSON.stringify({
      language: "Solidity",
      sources: {
        "Campaign.sol": {
          content: source,
        },
      },
      settings: {
        outputSelection: {
          "*": {
            "*": ["evm", "abi"],
          },
        },
      },
    })
  )
);

fs.ensureDirSync(buildPath);


for(let contract in obj.contracts['Campaign.sol']){
    fs.outputJSONSync(
      path.resolve(buildPath, contract + ".json"),
      obj.contracts["Campaign.sol"][contract]
    );
}