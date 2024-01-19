import sdk from './1-initilize-sdk.js'

(async()=>{

    // The Vote contract is designed for groups such as DAOs to vote on proposals.
    // for vote we required governance token or ERC20

    try{
        const voteContractAddress = await sdk.deployer.deployVote({
            // contract name
            name: 'my amazing dao',
            // The address of the token that will be used to vote on this contract.
            voting_token_address: '0x0668fee0cCf3CC9593C1468056997ABd75d89012',
            // The number of blocks after a proposal is created that voting on the proposal starts
            voting_delay_in_blocks: 0,
            // The number of blocks that voters have to vote on any new proposal. 
            // 1 day means 6750 blocks
            // it changes day to day
            voting_period_in_blocks: 6750,
            // The minimum number of voting tokens a wallet needs in order to create proposals.
            proposal_token_threshold: 0,
            // token_supply % to be pass of proposal
            voting_quorum_fraction: 0,
        })
        console.log('vote contract deployed succesflly');
        console.log('contract deployed at this address: ',voteContractAddress);
    }catch(error){
        console.log(error);
    }
})();


// vote-contract-address: 0x7910c448922Df07E58FD502D1188217c7b853Af1

