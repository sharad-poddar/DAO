import React from 'react'
import { useAddress, useContract, useNFTBalance } from '@thirdweb-dev/react';

export default function User(){

    const [tokenbalance, setTokenBalance] = React.useState(0);

    const address = useAddress();

    const {contract: NFTpass} = useContract('0x15ed17d7Bc0C4Fc80643EcFB037276f5Eb00aac8', 'edition-drop');
    const {contract: token} = useContract('0x0668fee0cCf3CC9593C1468056997ABd75d89012', 'token');

    const {data: NFTbalance} = useNFTBalance(NFTpass, address, 0);

    const getTokensBalance = async()=>{
        const tokens = await token?.balanceOf(address);
        setTokenBalance(tokens?.displayValue);
    }

    React.useEffect(()=>{
        getTokensBalance();
    },[token?.balanceOf])

    return(
        <div className='user--info'>
            <h2>User Account</h2>
            <div>user communtiy NFT balance: {Number(NFTbalance)}</div>
            <div>community (H) tokens balance: {tokenbalance}</div>
        </div>
    )

}