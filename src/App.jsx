import React from 'react';
import {ConnectWallet, ThirdwebNftMedia, Web3Button, useContract, useNFT, useNFTBalance, useContractWrite} from '@thirdweb-dev/react';
import { useState, useEffect, useMemo } from 'react';
import { useAddress, useTokenBalance } from '@thirdweb-dev/react';
import "./App.css";

export default function App(){

  const [members, setMembers] = React.useState([]);
  const [balance, setBalance] = React.useState([]);


  // getting useAddress
  const address = useAddress();
  
  // getting contract
  const {contract: NFTpass} = useContract('0x15ed17d7Bc0C4Fc80643EcFB037276f5Eb00aac8', 'edition-drop');
  const {contract: token} = useContract('0x0668fee0cCf3CC9593C1468056997ABd75d89012', 'token');

  // getting the balance of NFT
  const {data: NFTbalance} = useNFTBalance(
    NFTpass,
    address,
    "0",
  );

  async function getAllHolderAddress(){
    try{
      const membersAddress = await NFTpass?.history.getAllClaimerAddresses(0);
      setMembers(membersAddress);
      console.log('gets all address');
    }catch(error){
      console.log('problem in getting address of holder',error);
    }
  }

  async function getAllHolderBalance(){
    try{
      const memberBalance = await token?.history.getAllHolderBalances(0);
      setBalance(memberBalance);
      console.log('gets all balances');
    }catch(error){
      console.log('problem in getting balances of holder',error);
    }
  }

  // simillar as of useEffect
  const hasClaimedNFT = useMemo(() => {
    return Number(NFTbalance);
  }, [NFTbalance])


     
  useEffect(()=>{
    getAllHolderAddress();
    getAllHolderBalance();
  },[hasClaimedNFT, NFTpass?.history, token?.history])

  // only run when this changes
  const membersDetail = useMemo(()=>{
    return(members?.map((e,index)=>{
      const ownerOfBalance = balance?.find(({holder})=>{return(holder == e)})
      const detail = {
        key: index,
        address: e,
        amount: ownerOfBalance?.balance?.displayValue,
      }
      return(detail)
    }))
  },[balance, members]);

  // for not connected wallet
  if(!address){
    return(
      <div className='rhome'>
        <h1>welcome to artist Dao</h1>
        <ConnectWallet/>
      </div>
    )
  }

  
  // render mint nft
  return(
    <div className='home'>
      <nav>
        <div className='account'>Account: {address.slice(0,3)}.....{address.slice(address.length-4, address.length)}</div>
      </nav>
      <div className='main-content'>
        <h3 className='box'>user current balance: {hasClaimedNFT}</h3>
        <h3>congrulation! your are the member of this community</h3>
        <div>
          <h2>Members: </h2>
          
          <table className='table'>
            <thead>
              <tr>
                <th>Holders</th>
                <th>Power(H)</th>
              </tr>
            </thead>
            <tbody>
              {membersDetail?.map((e, index)=>{
                return(
                  <tr key={index}>
                    <td>{e.address.slice(0,3)}...{e.address.slice(address.length-4,address.length)}</td>
                    <td>{e.amount} (H)</td>
                  </tr>
                )
              })}
            </tbody>
          </table>

        </div>
        
      </div>
    </div>
  )
}




///Minting an ERC721 costs 96,073 gas. Minting an ERC1155 costs 51,935 gas.
///Why? Because everyone is sharing the same NFT data. We don't have to 
///copy new data for each user.