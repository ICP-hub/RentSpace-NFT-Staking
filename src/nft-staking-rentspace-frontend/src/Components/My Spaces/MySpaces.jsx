import React from 'react'
import './mySpaces.css'
import StakeInfo from './StakeInfo'
import StakeDashboard from './StakeDashboard'

const MySpaces = () => {
  return (
    <div className='mySpaces-cont'>
      <StakeInfo/>
      <StakeDashboard/>
    </div>
  )
}

export default MySpaces