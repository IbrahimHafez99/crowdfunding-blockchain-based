require('colors');
const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

try {
  const contractPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
  const source = fs.readFileSync(contractPath, 'utf8');
  const input = {
    language: 'Solidity',
    sources: {
      'Campaign.sol': { content: source }
    },
    settings: {
      outputSelection: {
        '*': { '*': ['*'] }
      }
    }
  };
  const output = JSON.parse(solc.compile(JSON.stringify(input)));

  fs.ensureDirSync(buildPath);

  for (let contract in output.contracts['Campaign.sol']) {
    const filename = `${contract}.json`;
    fs.outputJSONSync(
      path.resolve(buildPath, filename),
      output.contracts['Campaign.sol'][contract]
    );
  }

  console.log('✅ Contracts compiled successfully'.green.inverse);
} catch (err) {
  console.error(`🛑 ${err.message}`.red.inverse, err);
}
