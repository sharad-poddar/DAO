import sdk from './1-initilize-sdk.js'


(async()=>{
    try{

        // getting an vote contract
        const voteContract = await sdk.getContract('0x7910c448922Df07E58FD502D1188217c7b853Af1','vote');
        console.log('vote contract -> ', voteContract);

        // getting an token contract
        const tokenContract = await sdk.getContract('0x0668fee0cCf3CC9593C1468056997ABd75d89012', 'token');
        console.log('token contract -> ',tokenContract);

        // getting an vote-contract-balance
        const balance = await tokenContract.balanceOf('0x7910c448922Df07E58FD502D1188217c7b853Af1');
        console.log('vote contract balance -> ',balance.displayValue);

        // changing the roles
        await tokenContract.roles.grant("minter", voteContract.getAddress());
        
        console.log(
            "Successfully gave vote contract permissions to act on token contract"
        );
    }catch(error){
        console.log(error);
        process.exit(1);
    }

    try{

        // getting an vote contract
        const voteContract = await sdk.getContract('0x7910c448922Df07E58FD502D1188217c7b853Af1','vote');
        console.log('vote contract -> ', voteContract);

        // getting an token contract
        const tokenContract = await sdk.getContract('0x0668fee0cCf3CC9593C1468056997ABd75d89012', 'token');
        console.log('token contract -> ',tokenContract);


        // getting an vote-contract-balance
        const balance = await tokenContract.balanceOf('0x7910c448922Df07E58FD502D1188217c7b853Af1');
        console.log('vote contract balance -> ',balance.displayValue);

        // getting my balance
        const ownedTokenBalance = await tokenContract.balanceOf(await sdk.signer.address);
        console.log('how much H tokens i hold',ownedTokenBalance.displayValue);
        console.log(ownedTokenBalance);
        console.log(Number(ownedTokenBalance.value));
        const percent90 = (90 * Number(ownedTokenBalance.displayValue))/100;

        // supply of percent90 tokens
        await tokenContract.transfer(
            voteContract.getAddress(),
            percent90
        )

        // my balance
        const ownedTokenBalance_after_transfer = await tokenContract.balanceOf(await sdk.signer.address);
        console.log('how much H tokens i hold',ownedTokenBalance_after_transfer.displayValue);

        // getting an vote-contract-balance
        const balance_after_transfer = await tokenContract.balanceOf('0x7910c448922Df07E58FD502D1188217c7b853Af1');
        console.log(balance_after_transfer);
        console.log('vote contract balance -> ',balance_after_transfer.displayValue);

    }catch(error){
        console.log(error);
    }   
})();