<div className='home'>
      <nav>
        <div className='account'>Account: {address.slice(0,3)}.....{address.slice(address.length-4, address.length)}</div>
      </nav>
      <div className='main-content'>
        <h3 className='box'>user current balance: {hasClaimedNFT}</h3>
        <h3>congrulation! your are the member of this community</h3>
        <div>
          <h2>Members: </h2>
          
          <table className='table'>
            <thead>
              <tr>
                <th>Holders</th>
                <th>Power(H)</th>
              </tr>
            </thead>
            <tbody>
              {membersDetail?.map((e, index)=>{
                return(
                  <tr key={index}>
                    <td>{e.address.slice(0,3)}...{e.address.slice(address.length-4,address.length)}</td>
                    <td>{e.amount} (H)</td>
                  </tr>
                )
              })}
            </tbody>
          </table>        
        </div>
        <h3>NFT of the community</h3>
        {nft && nft.metadata && <ThirdwebNftMedia metadata={nft.metadata} className='nft-image'/>}   
      </div>
    </div>