import React, { useState } from 'react'
import Modal from '../Modals/Modal';
import { Principal } from '@dfinity/principal';
import { tokenIndexToTokenIdentifier } from '../../utils/utils';
import { useAuth } from '../../utils/useAuthClient';

const StakeButton = ({ id }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({ status: "", message: "" });
  const { actors } = useAuth()


  const displayDialog = () => {
    setShowDialog(true);
    setTimeout(() => {
      setShowDialog(false);

    }, 5000)
  }

  const handleStaking = async () => {
    try {
      const tokenIdentifier = tokenIndexToTokenIdentifier(id)
      console.log("Token Identifier : ", tokenIdentifier)

      const backendCanister = Principal.fromText("bd3sg-teaaa-aaaaa-qaaba-cai")

      const _approveTransferReq = await actors.EXTActor.approve({
        token: tokenIdentifier,
        spender: backendCanister,
        allowance: 1,
        subaccount: []
      })

      console.log("Approve Transfer Req : ", _approveTransferReq)

      const stakeNFTReq = await actors.userActor.stakeNFT(tokenIdentifier);

      if (stakeNFTReq.ok) {
        setDialogInfo({ status: 'success', message: 'NFTs staked successfully' });
        displayDialog();
      } else {
        setDialogInfo({ status: 'error', message: 'Error staking NFTs' });
        displayDialog();
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <button className='btn' onClick={handleStaking}>Stake</button>
      {showDialog && <Modal status={dialogInfo.status} message={dialogInfo.message} closeModal={setShowDialog} />}
    </>
  )
}

export default StakeButton