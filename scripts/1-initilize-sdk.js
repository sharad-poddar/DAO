import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import dotenv from 'dotenv';
dotenv.config();


// checking for private_key
if(!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY == ''){
    console.log('private key is not found!!');
}else{
    console.log('private_key ::: ',process.env.PRIVATE_KEY);
}
if(!process.env.API_KEY || process.env.API_KEY == ''){
    console.log('api key is not found!!');
}else{
    console.log('API_KEY ::: ',process.env.API_KEY);
}

// connect with backened or authentication
const clientPrivateKey = 'iYfHzWrNUbB0IdA8w1gowY__U-Nbp7daWik_k1OXdFuiiSg58PG1uTlbZHjWkxFZRbggHMPj7D7l2xkefvKXAA';


// Read/Write mode SDK
const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, process.env.API_KEY, { secretKey: clientPrivateKey});
console.log('sdk ::: ',sdk);

// Getting info from initlize SDK
(async()=>{
    const signer = await sdk.signer;
    console.log('signer ::: ',signer);
    console.log('signer address ::: ',signer.address);
})();

export default sdk;