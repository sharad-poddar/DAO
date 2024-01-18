import sdk from './1-initilize-sdk.js'
import { ethers } from 'ethers';

(async()=>{

    try{
        const tokenContract = await sdk.getContract('0x0668fee0cCf3CC9593C1468056997ABd75d89012'); 
        console.log('tokenContract ::: ',tokenContract);

        const totalSupply_1 = await tokenContract.erc20.totalSupply();
        console.log('tokensupply ::: ',totalSupply_1)
        console.log('tokensupply ::: ',Number(totalSupply_1.value));
        
        // 18 decimal place will automatically set
        const amount = 1000000;
        // const amountInDecimal = ethers.utils.parseUnits(amount.toString(), 18);
        // console.log(Number(amountInDecimal));
        const myAddress = await sdk.signer.address;
        console.log('myAddress ::: ',myAddress);
        await tokenContract.erc20.mint(amount);

        const totalSupply_end = await tokenContract.erc20.totalSupply();
        console.log('tokensupply ::: ',totalSupply_end)
        console.log('tokensupply ::: ',Number(totalSupply_end.value));
    }catch(error){
        console.log(error);
    }
})();