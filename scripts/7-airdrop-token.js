import sdk from "./1-initilize-sdk.js";

(async()=>{
    try{
        // getting an ERC1155 contract
        // here edition-drop is neccessary, provides functionality
        const NFTontract = await sdk.getContract('0x15ed17d7Bc0C4Fc80643EcFB037276f5Eb00aac8', "edition-drop");
        console.log('nft-contract ::: ',NFTontract);
        
        // getting the token contract
        // here token provides functionality
        const tokenContract = await sdk.getContract('0x0668fee0cCf3CC9593C1468056997ABd75d89012', "token");
        console.log('token-contract ::: ',tokenContract);

        // getting all wallet address as in array
        const walletAddress = await NFTontract.history.getAllClaimerAddresses(0);
        console.log(walletAddress);

        if(walletAddress.length == 0){
            console.log('there is no one who has community NFT');
            process.exit(0);
        }

        // getting the address and amount
        const airdropTargets = walletAddress.map((address)=>{
            // getting the token from 1000 to 10000 approx
            const airdropAmount = Math.floor(Math.random() * (10000-1000 + 1) + 1000);
            // here name must be the same
            const airdrop = {
                toAddress: address,
                amount: airdropAmount,
            }
            console.log('airdropping ::: ',airdrop.toAddress, airdrop.amount);
            return airdrop;
        })
        console.log(airdropTargets);

        // Call transferBatch on all our airdrop targets.
        // transferBatch will automatically loop through all the targets, and send the token!
        await tokenContract.transferBatch(airdropTargets);
        console.log('airdroping is done');
    }catch(error){
        console.log(error);
    }
})();