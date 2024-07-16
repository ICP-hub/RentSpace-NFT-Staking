import React from 'react'
import './mySpaces.css'
import StakeInfo from './StakeInfo'
import StakeDasboard from './StakeDasboard'
// import Card from '../Card/Card'

const MySpaces = () => {
  return (
    <div className='mySpaces-cont'>
      <StakeInfo/>
      <StakeDasboard/>
      {/* <Card name="Minimalistic Villa #174" imgURL={"https://cdn.yuku.app/BatchMint/Minimalistic/174.png?&url=https%3A%2F%2Fcf-assets.yuku.app%2FBatchMint%2FMinimalistic%2F174.png&width=800"} desc={"Minimalistic Villa #174 with garden, pool and car."}/> */}
    </div>
  )
}

export default MySpaces