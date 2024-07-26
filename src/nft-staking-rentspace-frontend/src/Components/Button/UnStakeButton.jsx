import React, { useState } from 'react'
import UnstakeNFT from '../Modals/UnstakeNFT';
import { useNavigate } from 'react-router-dom';

const UnStakeButton = ({id}) => {
  const navigate = useNavigate();
  const [showUnstake, setShowUnstake] = useState(false);

  return (
    <>
    {showUnstake && <UnstakeNFT redeemPoints={0} id={id} setShow={setShowUnstake}/>}
    <button className='btn' onClick={()=>setShowUnstake(true)}>Unstake</button>
    </>
  )
}

export default UnStakeButton