import React from 'react'
import { useContract, useNFT } from '@thirdweb-dev/react';
import { ThirdwebNftMedia } from '@thirdweb-dev/react'

export default function NFT(){

    const [nftHolders, setnftHolders] = React.useState([]);

    const {contract: NFTpass} = useContract('0x15ed17d7Bc0C4Fc80643EcFB037276f5Eb00aac8', 'edition-drop');
    const {data: NFTdata} = useNFT(NFTpass, 0);

    const gettingNftHolder = async()=>{
        const NFTsHolder = await NFTpass?.history?.getAllClaimerAddresses(0);
        setnftHolders(NFTsHolder);
    }

    const getShortAddress =(x)=>{
        return `${x.slice(0,4)}...${x.slice(x.length-4, x.length)}`
    }
    
    React.useEffect(()=>{
        gettingNftHolder();
    },[NFTpass?.history])

    return(
        <div className='nft--info'>
            <h2>community NFT info</h2>
            {NFTdata && <ThirdwebNftMedia metadata={NFTdata?.metadata}/>}
            {NFTdata && <p> community NFT type: {NFTdata.type}</p>}
            {NFTdata && <p> community NFT total-supply: {NFTdata.supply}</p>}

            {nftHolders && <ul className='nft--holders--list'>
                    {nftHolders.map((e, index)=>{
                        return (<li key={index}>{getShortAddress(e)}</li>)
                    })}</ul>
            }
        </div>
    )
}