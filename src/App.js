import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
//import {toHex} from Alchemy-SDK
import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [blocks, setBlocks] = useState([])
  const [blockTx, setBlockTx] = useState([])
  const [NFTs, setNFTs] = useState([])

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
      //console.log(getBlockNumber)
    }
    getBlockNumber();
  },[]);

  useEffect(() => {
    async function getBlock() {
      const _block = await alchemy.core.getBlock();
      setBlocks([_block])
    
    }
    getBlock();
  },[]);

   useEffect(() => {
     async function getBlockTx() {
       setBlockTx(await alchemy.core.getBlockWithTransactions());
     }
     getBlockTx();
   },[]);

   useEffect(() => {
    async function getNFTs() {
     const _nfts = await alchemy.nft.getNftsForOwner('davidseto.eth');
     setNFTs([_nfts])
    }
    getNFTs();
  },[]);


  return( 
  <div className="App">

  {
  
  
  /* <div>
    {blocks.map((gas) =>{
    return <div key={gas}> Gas Used: {gas.gasUsed}
    })
    </div>} */}

    <div>
    <h1>Info for Block Number: {blockNumber} </h1>{"\n"}
    </div> 


      <div>{

        blocks.map((block, index)=>{
          //console.log(block.gasUsed._hex)
          let gasusedfloat=parseInt(block.gasUsed._hex,16)
          let gaslimitfloat=parseInt(block.gasLimit._hex,16)
          let blocktransnumber=block.transactions.length
          let basefeegas=parseInt(block.baseFeePerGas._hex,16)
          let gweipertx=basefeegas/blocktransnumber

          let dateObj1 = new Date(block.timestamp * 1000);
          let dateObj = JSON.stringify(dateObj1)
          let block0from = alchemy.core.getTransactionReceipt(block.transactions[0])
          let block0to = alchemy.core.getTransactionReceipt(block.transactions[0])
          console.log('block 0', block0from, block0to)
          //let dateObj2 = new Date(block.timestamp * 1000)
          //let datestring = dateObj2.toDateString()
          //let utcString = dateObj.toUTCString();
          //let time = utcString.slice(-11, -4);
          
          //let time = new Date(block.timestamp).toLocaleString()
          //let time = Date(block.timestamp * 1e3).toString().slice(-13, -5);
          console.log('block timestamp', block.timestamp)
          //console.log(time)
          console.log(dateObj)
          //console.log('utc string', datestring, 'utcstring', utcString)
          //console.log(gasusedfloat)
          //console.log(block.transactions)
          console.log(block)
          //console.log(alchemy.nft.getNftsForOwner('davidseto.eth'))
          //console.log(setNFTs)

        return <div key={index}>  

        <h2>Block Info</h2>
        Block Hash: {block.hash} {"\n"}
        Block timestamp: {block.timestamp} {"\n"}
        Block time: {dateObj}  {"\n"}
        Block Miner: {block.miner} {"\n"}
        Block parentHash: {block.parentHash} {"\n"}
        <h2>Block gas info</h2>
        Block base fee gwei: {basefeegas} {"\n"}
        Block gwei per tx: {gweipertx} {"\n"}
        Block GasUsed: {gasusedfloat} {"\n"}
        Block GasLimit: {gaslimitfloat} {"\n"}
        <h2>Block transaction info</h2>
        Block transactions per block: {blocktransnumber} {"\n"}{"\n"}
        
        <div><h2>Block Transactions</h2>
          Block Trans 1 Hash{block.transactions[0]}{"\n"}
          <h3>to and from (not working)</h3>
          Block Trans 2 Hash{block.transactions[1]}{"\n"}
          Block Trans 3 Hash{block.transactions[2]}{"\n"}
          Block Trans 4 Hash{block.transactions[3]}{"\n"}
          Block Trans 5 Hash{block.transactions[4]}{"\n"}
          Block Trans 6 Hash{block.transactions[5]}{"\n"}
          Block Trans 7 Hash{block.transactions[6]}{"\n"}
          Block Trans 8 Hash{block.transactions[7]}{"\n"}
          Block Trans 9 Hash{block.transactions[8]}{"\n"}

          </div>


          <div>Ask address for NFTs (not working)</div>
          <label for="addressl">NFT address</label>
          <input type="text" id="address" name="address" size="60"></input>

          
        </div>      



      })}
     </div>
    </div>
  )
}

export default App;
