import fs from 'fs';
import sdk from './1-initilize-sdk.js';

(async()=>{
    try{
        const contract = await sdk.getContract('0x15ed17d7Bc0C4Fc80643EcFB037276f5Eb00aac8', 'edition-drop');
        await contract.createBatch([
            {
                name: "Leaf Village Headband",
                description: "This NFT will give you access to ArtistDAO!",
                image: fs.readFileSync("scripts/assets/img.svg"),
            }
        ]);
        console.log("✅ Successfully created a new NFT in the drop!");
    }catch(error){
        console.log("ailed to create the new NFT", error);
    }
})();