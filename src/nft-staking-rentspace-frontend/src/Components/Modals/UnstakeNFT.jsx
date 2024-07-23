import React, { useState } from 'react'
import "./UnstakeNFT.css"
import Modal from '../Modals/Modal';
import { tokenIndexToTokenIdentifier } from '../../utils/utils';
import { useAuth } from '../../utils/useAuthClient';

const UnstakeNFT = ({redeemPoints=0, id, setShow}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({status: "", message: ""});
  const {actors} = useAuth()

  const displayDialog=() => {
    setShowDialog(true);
    setTimeout(()=> {
      setShowDialog(false);
      setShow(false);

    },5000)
  }

  const handleUnStake = async () => {
    const tokenIdentifier = tokenIndexToTokenIdentifier(id)
    //Transfer NFT from owner to platform
    const unStakeNFTReq = await actors.userActor.unstakeNFT(tokenIdentifier);
    if(unStakeNFTReq.ok) {
      setDialogInfo({status:'success',message: 'NFT Unstaked successfully'});
      displayDialog();
    }
    else {
      setDialogInfo({status:'error',message: 'Error while Unstaking NFT'});
      displayDialog();
    }

  }
  return (
    <>
    {showDialog && <Modal status={dialogInfo.status} message={dialogInfo.message} closeModal={setShowDialog}/>}
    <div className='unstake-cont' style={showDialog ? {display: 'none'}: {}}>
      <h1 className='unstake-heading'>Unstake NFT!</h1>
      <div className='points-awarded'>
        <div>Total Points Awarded!</div>
        <div>{redeemPoints}</div>
      </div>
      <p className='unstake-confirm'>Are you sure you want to unstake the NFT?</p>
      <div className='btn-cont'>
        <button onClick={()=>setShow(false)} className='btn cancel-btn'>Cancel</button>
        <button onClick={handleUnStake} className='unstake-btn btn'>Unstake</button>
      </div>
    </div>
    </>
  )
}

export default UnstakeNFT