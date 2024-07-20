import React from 'react'
import { useNavigate } from 'react-router-dom'


const HeroPage = () => {
  const navigate= useNavigate();
  return (
   <div className='Hero-MainCont'> 
    
     <div className='Hero-innerCont'>
     <div className=' Hero-cont'>
        <div className='heading1'> <h1 className=''> RentSpace </h1>  </div>
        <div className='heading2'> <h1 > Where Your NFTs Work For You. </h1> </div>
       <div className='Explore-btn'>
       <button onClick={()=> navigate('/myWorlds') } > Explore World </button>
        </div> 
     </div>
     </div>
    </div>
  )
}

export default HeroPage