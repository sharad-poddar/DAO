import React from 'react';
import {ThirdwebNftMedia, Web3Button, useContract, useNFT, useNFTBalance, useContractWrite} from '@thirdweb-dev/react';
import { useState, useEffect, useMemo } from 'react';
import { useAddress, useTokenBalance } from '@thirdweb-dev/react';
import "./App.css";
import Connect from './components/Connect';
import MintNFT from './components/MintNFT';
import User from './components/User';
import NFT from './components/NFT';
import Community from './components/Community';

export default function App(){

  const [members, setMembers] = React.useState([]);
  const [balance, setBalance] = React.useState([]);
  const [proposals, setProposals] = React.useState([]);
  const [isVoting, setIsVoting] = React.useState(false);
  const [hasVoted, setHasVoted] = React.useState(false);

  // getting useAddress
  const address = useAddress();
  
  // getting contract
  const {contract: NFTpass} = useContract('0x15ed17d7Bc0C4Fc80643EcFB037276f5Eb00aac8', 'edition-drop');
  const {contract: token} = useContract('0x0668fee0cCf3CC9593C1468056997ABd75d89012', 'token');
  const {contract: Vote} = useContract('0x7910c448922Df07E58FD502D1188217c7b853Af1', 'vote');
  const {data: nft} = useNFT(NFTpass, "0");

  // getting the balance of NFT
  const {data: NFTbalance} = useNFTBalance(
    NFTpass,
    address,
    "0",
  );

  // async function getAllHolderAddress(){
  //   try{
  //     const membersAddress = await NFTpass?.history.getAllClaimerAddresses(0);
  //     setMembers(membersAddress);
  //     console.log('gets all address');
  //   }catch(error){
  //     console.log('problem in getting address of holder',error);
  //   }
  // }

  // async function getAllHolderBalance(){
  //   try{
  //     const memberBalance = await token?.history.getAllHolderBalances(0);
  //     setBalance(memberBalance);
  //     console.log('gets all balances');
  //   }catch(error){
  //     console.log('problem in getting balances of holder',error);
  //   }
  // }

  // simillar as of useEffect
  const hasClaimedNFT = useMemo(() => {
    return Number(NFTbalance);
  }, [NFTbalance])


     
  // useEffect(()=>{
  //   getAllHolderAddress();
  //   getAllHolderBalance();
  //   getAllProposals();
  //   userHasVotedOrNot();
  // },[hasClaimedNFT, NFTpass?.history, token?.history])

  // only run when this changes
  // const membersDetail = useMemo(()=>{
  //   return(members?.map((e,index)=>{
  //     const ownerOfBalance = balance?.find(({holder})=>{return(holder == e)})
  //     const detail = {
  //       key: index,
  //       address: e,
  //       amount: ownerOfBalance?.balance?.displayValue,
  //     }
  //     return(detail)
  //   }))
  // },[balance, members]);


  // const getAllProposals = async()=>{
  //   const proposals = await Vote?.getAll();
  //   setProposals(proposals);
  //   console.log(proposals);
  // }

  // const userHasVotedOrNot = async()=>{
  //   const isVoted = await Vote?.hasVoted(proposals[0]?.proposalId, address);
  //   setHasVoted(isVoted);
  //   console.log(isVoted);
  //   if(isVoted){
  //     alert('user has already voted');
  //   }else{
  //     alert('user has not voted yet');
  //   }
  // }


  React.useEffect(()=>{


  },[address, NFTbalance])

  //1. connecting to the wallet
  //1. we have refresh the page on behalf of address
  if(!address){
    return <Connect/>
  }

  //2. checking for NFT, user should have NFT for dashboard
  //2. refreshing the balance of NFT on minting NFT
  if(NFTbalance == 0){
    return(
      <MintNFT/>
    )
  }

  //3. renders information
  return(
    <div>
      <User/>
      <NFT/>
      <Community/>
    </div>
  )
}




///Minting an ERC721 costs 96,073 gas. Minting an ERC1155 costs 51,935 gas.
///Why? Because everyone is sharing the same NFT data. We don't have to 
///copy new data for each user.