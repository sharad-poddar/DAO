import sdk from './1-initilize-sdk.js'
import ethers from 'ethers';

(async()=>{

    try{
        const voteContract = await sdk.getContract('0x7910c448922Df07E58FD502D1188217c7b853Af1','vote');
        console.log('voteContract -> ',voteContract);

        const tokenContract = await sdk.getContract('0x0668fee0cCf3CC9593C1468056997ABd75d89012','token');
        console.log('tokenContract -> ',tokenContract);

        // proposal for minting 420000 tokens
        const amount = 420000;
        const description = "Should the DAO mint an additional " + amount + " tokens into the treasury?";

        // proposal exections
        const executions = [
            {
                toAddress: tokenContract.getAddress(),
                nativeTokenValue: 0,
                transactionData: tokenContract.encoder.encode(
                    "mintTo", [
                        voteContract.getAddress(),
                        ethers.utils.parseEther(amount.toString(), 18)
                    ]
                )
            }
        ]

        await voteContract.propose(description, executions);
        console.log('👋 propsal has been executed!!');
    }catch(error){
        console.log(error);
        process.exit(1);
    }

    try{
        const voteContract = await sdk.getContract('0x7910c448922Df07E58FD502D1188217c7b853Af1','vote');
        console.log('voteContract -> ',voteContract);

        const tokenContract = await sdk.getContract('0x0668fee0cCf3CC9593C1468056997ABd75d89012','token');
        console.log('tokenContract -> ',tokenContract);

        // proposal for transferring the 10000 tokens into some wallet
        const amount = 10000;
        const description = "Should the DAO tranfer an additional " + amount + " tokens into the my address?";
        
        const executions = [
            {
                toAddress: '0xAe5486C5d4F710ded1Be53E2D6085901507f4A5D',
                nativeTokenValue: 0,
                transactionData: tokenContract.encoder.encode(
                    "transfer", [
                        '0xAe5486C5d4F710ded1Be53E2D6085901507f4A5D',
                        ethers.utils.parseEther(amount.toString(), 18)
                    ]
                )
            }
        ]

        await voteContract.propose(description, executions);
        console.log('transferring of bonus is done');
    }catch(error){
        console.log(error);
        process.exit(1);
    }
})();