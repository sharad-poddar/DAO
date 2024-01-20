import React from 'react'
import { useContract } from '@thirdweb-dev/react';


export default function MintNFT(){
    
    const {contract: NFTpass} = useContract('0x15ed17d7Bc0C4Fc80643EcFB037276f5Eb00aac8', 'edition-drop');
    
    const mintNFT = async()=>{
        await NFTpass.erc1155.claim(0, 1);
        document.querySelector('.mintNFT').insertAdjacentElement(
            <h2>congrulations on minting community NFT!!</h2>
        )
    }

    return(
        <div className='mintNFT'>
            <button onClick={mintNFT}>Mint Your Community NFT</button>
        </div>
    )
}