// Setup
//import { Network, Alchemy } from 'alchemy-sdk';
const { Alchemy, Network, Wallet, Utils } = require('alchemy-sdk');
//require('dotenv').config();

//const { TEST_API_KEY, TEST_PRIVATE_KEY } = process.env;


const settings = {
    apiKey: "4OwtEJoKoCLjm0T5myGkeMtrgd6-DJcL",
    network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(settings);
// Get the latest block
const latestBlock = alchemy.core.getBlockNumber().then(console.log);
//console.log(latestBlock.then())
//console.log('latest block', latestBlock)
//return latestBlock

// Get all outbound transfers for a provided address
alchemy.core
    .getTokenBalances('0xd5ce2f6e93362ef43fe348bf2f97610e378b0128')
    .then(console.log);

// Get all the NFTs owned by an address
const nfts = alchemy.nft.getNftsForOwner("0xd5ce2f6e93362ef43fe348bf2f97610e378b0128").then(console.log)
//console.log(nfts)
// Listen to all new pending transactions
alchemy.ws.on(
    { method: "alchemy_pendingTransactions",
    fromAddress: "0xd5ce2f6e93362ef43fe348bf2f97610e378b0128" },
    (res) => console.log(res)
);
