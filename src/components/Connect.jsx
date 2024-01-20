import React from 'react';
import {ConnectWallet} from '@thirdweb-dev/react'

export default function Connect(){
    return(
        <div>
            <h1>Welcome to XYZ company Dao</h1>
            <ConnectWallet/>
        </div>
    )
}