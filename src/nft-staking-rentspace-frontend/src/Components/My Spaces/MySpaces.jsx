import React from 'react'
import './mySpaces.css'
import StakeInfo from './StakeInfo'
import StakeDasboard from './StakeDasboard'

const MySpaces = () => {
  return (
    <div className='mySpaces-cont'>
      <StakeInfo/>
      <StakeDasboard/>
    </div>
  )
}

export default MySpaces