import React from 'react'
import { HashLink as Link } from 'react-router-hash-link'

const StakeInfo = () => {
  
  return (
    <div  className='stakeInfo-mainCont '>
       <h1 className='stakeInfo-heading'>Stake your Villas for Rewards</h1> 
       <div className='stakeInfo-cont'>
        <div className='   stakeInfo-div1'> 
            <div className='inner-div1'>
            <h4>Numbers of Villas Staked</h4>
            </div>
            <div className='inner-div2'>
            <h1> 583 </h1>
            </div>
        </div>
        <div className='stakeInfo-div2'> 
            <div className='inner-div1'>
            <h4> Percenatage of supply stacked </h4>
            </div>
            <div className='inner-div2'>
            <h1> 60% </h1> 
            </div>
        </div>
        <div className='stakeInfo-div3'> 
            <div className='inner-div1'>
            <h4> Total Holders </h4>
            </div>
            <div className='inner-div2'>
            <h1> 420 </h1>
            </div>
        </div>
       </div> 

       <Link to={'#Villas'}> <button> Go stake </button> </Link> 
    </div>
  )
}

export default StakeInfo






