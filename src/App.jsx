import React from 'react';
import {ConnectWallet, ThirdwebNftMedia, Web3Button, useContract, useNFT, useNFTBalance, useContractWrite} from '@thirdweb-dev/react';
import { useState, useEffect, useMemo } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import "./App.css";

export default function App(){

  // getting useAddress
  const address = useAddress();
  
  // getting contract
  const {contract} = useContract('0x15ed17d7Bc0C4Fc80643EcFB037276f5Eb00aac8');
  console.log(contract);

  // getting the balance of NFT
  const {data: NFTbalance} = useNFTBalance(
    contract,
    address,
    "0",
  );

  // simillar as of useEffect
  const hasClaimedNFT = useMemo(() => {
    return Number(NFTbalance);
  }, [NFTbalance])



     

  // for not connected wallet
  if(!address){
    return(
      <div className='rhome'>
        <h1>welcome to artist Dao</h1>
        <ConnectWallet/>
      </div>
    )
  }

  if(!hasClaimedNFT){
    return(
      <div className='home'>
          <nav>
            <div className='account'>Account: {address.slice(0,3)}.....{address.slice(address.length-4, address.length)}</div>
          </nav>
          <div>
            <h1>mint nft</h1>
            <Web3Button contractAddress={'0x15ed17d7Bc0C4Fc80643EcFB037276f5Eb00aac8'} 
              action={(contract) => contract.erc1155.claim(0, 1)}
              onSuccess={()=>{
                console.log('nft has been minted')}}
              onError={()=>{
                console.log('nft has not been minted')}}>    
              mint nft
            </Web3Button>
          </div>
      </div>
    )
  }


  // render mint nft
  return(
    <div className='home'>
      <nav>
        <div className='account'>Account: {address.slice(0,3)}.....{address.slice(address.length-4, address.length)}</div>
      </nav>
      <div>
        <h1>user current balance: {hasClaimedNFT}</h1>
        <h3>congrulation! your are the member of this community</h3>
      </div>
    </div>
  )
}




///Minting an ERC721 costs 96,073 gas. Minting an ERC1155 costs 51,935 gas.
///Why? Because everyone is sharing the same NFT data. We don't have to 
///copy new data for each user.