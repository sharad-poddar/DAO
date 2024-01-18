import {AddressZero} from '@ethersproject/constants'
import sdk from './1-initilize-sdk.js'

(async()=>{
    try{

        // Deploy a standard ERC-20 contract.
        const tokenAddress = await sdk.deployer.deployToken({
            name: 'Harore',
            symbol: 'H',
            primary_sale_recipient: AddressZero,
        });
    
        console.log('token-contract deployed susscrfully');
        console.log('token-contract address -> ',tokenAddress);        
    }catch(error){
        console.log(error);
    }
})();


// token-contract address -> 0x0668fee0cCf3CC9593C1468056997ABd75d89012

