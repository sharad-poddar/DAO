import sdk from './1-initilize-sdk.js'
import { MaxUint256 } from "@ethersproject/constants";

(async()=>{
    try{
        const contract = await sdk.getContract('0x15ed17d7Bc0C4Fc80643EcFB037276f5Eb00aac8', 'edition-drop');
        const claimConditions = [{
            // When people are gonna be able to start claiming the NFTs (now)
            startTime: new Date(),
            // The maximum number of NFTs that can be claimed.
            maxClaimable: 50_000,
            // price of nft
            price: 0,
            // maximum claimable per wallet
            maxClaimablePerWallet: 1,
            // unlimited time
            waitInSeconds: MaxUint256,
        }]

        await contract.claimConditions.set("0", claimConditions);
        console.log("✅ Sucessfully set claim condition!");
    }catch(error){
        console.error("Failed to set claim condition", error);
    }
})();