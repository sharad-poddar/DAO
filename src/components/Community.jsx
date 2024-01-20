import React from 'react'
import { useContract } from '@thirdweb-dev/react';
export default function Community(){
    
    const [balance, setBalance] = React.useState(0);
    const [balanceHolders, setBalanceHolders] = React.useState([]);

    const {contract: token} = useContract('0x0668fee0cCf3CC9593C1468056997ABd75d89012', 'token');

    const getCommunityBalance = async()=>{
        const bal = await token?.balanceOf('0x7910c448922Df07E58FD502D1188217c7b853Af1');
        setBalance(bal?.displayValue);
    }

    const communtiyBalanceHolders = async()=>{
        const balanceHolders = await token?.history?.getAllHolderBalances();
        setBalanceHolders(balanceHolders);
    }

    const getShortAddress =(x)=>{
        return `${x.slice(0,4)}...${x.slice(x.length-4, x.length)}`
    }

    
    React.useEffect(()=>{
        getCommunityBalance();
        communtiyBalanceHolders();
    },[token?.balanceOf, token?.history])

    return(
        <div className='community'>
            <h2>community info</h2>
            {balance && <p>community balance: {balance} HORARE(H)</p>}
            <div community--table>
                <h3>Holders of community</h3>
                <ul>{balanceHolders && balanceHolders.map(({holder, balance}, index)=>{
                    return<li key={index}>{getShortAddress(holder)} -- {balance.displayValue}(H)</li>
                })}</ul>
            </div>
        </div>
    )
}