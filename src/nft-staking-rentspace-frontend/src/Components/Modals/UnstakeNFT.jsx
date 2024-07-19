import React from 'react'
import "./UnstakeNFT.css"

const UnstackNFT = ({redeemPoints}) => {
  return (
    <div className='unstake-cont'>
      <h1 className='unstake-heading'>Unstake NFT!</h1>
      
      <div className='points-awarded'>
        <div>Total Points Awarded!</div>
        <div>{redeemPoints}</div>
      </div>
      <p className='unstake-confirm'>Are you sure you want to unstake the NFT?</p>
      <div className='btn-cont'>
        <div className='btn cancel-btn'>Cancel</div>
        <div className='btn unstake-btn'>Unstake</div>
      </div>
    </div>
  )
}

export default UnstackNFT