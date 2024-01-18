import address from '@ethersproject/constants'
import {ethers} from 'ethers'
import sdk from './1-initilize-sdk.js'
import fs from 'fs'

///@dev Null address
const constantAddress = address.AddressZero;
///@dev we can get constant null address from here also
console.log(ethers.constants.AddressZero);


///@notice The Edition Drop contract is best used when you want to release many NFTs based 
///on the same asset and uses the ERC1155 Standard, also known as "Semi-Fungible Tokens".
(async()=>{
    try{

        ///@notice deploying pre built smart contract
        const address = await sdk.deployer.deployBuiltInContract('edition-drop',{
            name: 'artist_dao',
            symbol: 'artsdao',
            description: 'dao related to popular artists',
            ///@dev The other thing we did here is thirdweb automatically uploaded and 
            ///pinned our collection's image to IPFS.
            image: fs.readFileSync('scripts/assets/img.svg'),
            primary_sale_recipient: constantAddress,
        })

        console.log('address of deployed contract ::: ',address);

        /// Connect to your smart contract using the contract address
        const contract = await sdk.getContract(address, "edition-drop");
        console.log('contract ::: ',contract);
        const metadata = await contract.metadata.get();
        console.log('metadata ::: ',metadata);

        console.log('contract susscessfully deployed ::: ',address);
    }catch(error){
        console.log("failed to deploy editionDrop contract", error)
    }
})();


///@dev contract deployed address: 0x15ed17d7Bc0C4Fc80643EcFB037276f5Eb00aac8
