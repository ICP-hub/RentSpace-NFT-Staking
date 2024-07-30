import React, { useEffect, useMemo, useState } from 'react'
import "./UnstakeNFT.css"
import Modal from '../Modals/Modal';
import { tokenIndexToTokenIdentifier } from '../../utils/utils';
import { useAuth } from '../../utils/useAuthClient';
import { Hourglass } from 'react-loader-spinner';
import { addPoints } from '../../utils/Redux-Config/UserSlice';
import { removeStakedNFTs, modifyStakedNFTs } from '../../utils/Redux-Config/NftsSlice'
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

const UnstakeNFT = ({ redeemPoints = 0, id, setShow }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({ status: "", message: "" });
  const [isLoading, setIsLoading] = useState(true)
  const [points, setPoints] = useState(0)
  const { actors } = useAuth()
  const dispatch = useDispatch()

  const displayDialog = () => {
    setShowDialog(true);
    setTimeout(() => {
      setShowDialog(false);
      setShow(false);

    }, 5000)
  }


  useEffect(() => {

    const getPoints = async () => {
      const backendActor = actors.userActor;
      const pointsReq = await backendActor.getPointsAccumulated(id)
      console.log("PointsReq", pointsReq)
      if (pointsReq.ok) {
        setPoints(pointsReq.ok.toString())
        setIsLoading(false)
      }
      else {
        console.log('Error while fetching points' + pointsReq.err)
      }
    }

    getPoints()

  }, [id])

  const handleUnStake = async () => {
    const tokenIdentifier = tokenIndexToTokenIdentifier(id)
    //Transfer NFT from owner to platform
    const unStakeNFTReq = await actors.userActor.unstakeNFT(tokenIdentifier);
    if (unStakeNFTReq.ok) {
      dispatch(addPoints(points))
      dispatch(removeStakedNFTs(id))
      dispatch(modifyStakedNFTs(id))
      setDialogInfo({ status: 'success', message: 'NFT Unstaked successfully' });
      displayDialog();
    }
    else {
      setDialogInfo({ status: 'error', message: 'Error while Unstaking NFT' });
      displayDialog();
    }

  }
  return (
    <>
      {showDialog && <Modal status={dialogInfo.status} message={dialogInfo.message} closeModal={setShowDialog} />}
      <motion.div className='unstake-cont' style={showDialog ? { display: 'none' } : {}}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
      >
        <h1 className='unstake-heading'>Unstake NFT!</h1>
        <div className='points-awarded'>
          <div>Total Points Awarded!</div>
          {isLoading ? <Hourglass visible={isLoading} ariaLabel="hourglass-loading" colors={['#fff', 'blue']} width={20} height={20} /> : <p>{points}</p>}
        </div>
        <p className='unstake-confirm'>Are you sure you want to unstake the NFT?</p>
        <div className='btn-cont'>
          <button onClick={() => setShow(false)} className='btn cancel-btn'>Cancel</button>
          <button onClick={handleUnStake} className='unstake-btn btn'>Unstake</button>
        </div>
      </motion.div>
    </>
  )
}

export default UnstakeNFT