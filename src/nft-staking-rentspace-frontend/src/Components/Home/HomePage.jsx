import React from 'react'
import './HomePage.css'
import HeroPage from './HeroPage'
import RentspaceWorlds from './RentspaceWorlds'
import JourneyStart from './JourneyStart'
const HomePage = () => {
  return (
    <div>
        <HeroPage/>
        <RentspaceWorlds/>
        <JourneyStart/>
    </div>
  )
}

export default HomePage