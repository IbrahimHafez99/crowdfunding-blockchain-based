require('colors');
const dotenv = require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const contractFile = require('./build/CampaignFactory.json');

const bytecode = contractFile.evm.bytecode.object;
const interface = contractFile.abi;

const provider = new HDWalletProvider({
  mnemonic: process.env.MNEMONIC, // private key
  providerOrUrl: process.env.INFURA_API_KEY // public API interface to ethereum network
});

const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account ' + accounts[0].yellow);

    const contract = await new web3.eth.Contract(interface)
      .deploy({ data: bytecode })
      .send(
        { gas: '10000000', from: accounts[0] },
        (error, transactionHash) => {
          console.log('ℹ️ ~ deploy ~ error', error);
          console.log('ℹ️ ~ deploy ~ transactionHash', transactionHash);
        }
      )
      .on('error', (error) => {
        console.error('ℹ️ ~ .on ~ error', error);
      })
      .on('transactionHash', (transactionHash) => {
        console.log('ℹ️ ~ .on ~ transactionHash', transactionHash);
      })
      .on('receipt', (receipt) => {
        console.log('ℹ️ ~ .on ~ receipt ~ Address', receipt.contractAddress); // contains the new contract address
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        console.log('ℹ️ ~ .on ~ confirmationNumber', confirmationNumber);
        console.log('ℹ️ ~ .on ~ receipt', receipt);
      });

    console.log(
      `✅ Contract deployed to ${contract.options.address.bold}`.green.inverse
    );
  } catch (err) {
    console.error(`🛑 ${err.message}`.red.inverse, err);
  }
};
deploy();
