import React from 'react'

const UnstackNFT = ({redeemPoints}) => {
  return (
    <div>
      <h1>Unstack NFT!</h1>
      <div>
        <div>Total Points Awarded!</div>
        <div>{redeemPoints}</div>
      </div>
      <p>Are you sure you want to unstake the NFT?</p>
      <div>
        <button>Cancel</button>
        <button>Unstake</button>
      </div>
    </div>
  )
}

export default UnstackNFT