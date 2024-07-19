import React from 'react'
import './mySpaces.css'
import StakeInfo from './StakeInfo'
import StakeDasboard from './StakeDasboard'
import MyWorlds from './MyWorlds'

const MySpaces = () => {
  return (
    <div className='mySpaces-cont'>
      <StakeInfo/>
      <StakeDasboard/>
      <MyWorlds/>
    </div>
  )
}

export default MySpaces