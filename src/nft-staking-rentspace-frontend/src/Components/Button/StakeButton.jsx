import React, { useState } from 'react'
import Modal from '../Modals/Modal';
import { Principal } from '@dfinity/principal';
import { tokenIndexToTokenIdentifier } from '../../utils/utils';
import { useAuth } from '../../utils/useAuthClient';
import { addStakedNFTs, appendStakedNFTs, modifyImportedNFTs } from '../../utils/Redux-Config/NftsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Oval } from 'react-loader-spinner';

const StakeButton = ({ id }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({ status: "", message: "", isExecuting:false });
  const { actors } = useAuth()
  const dispatch = useDispatch()
  const importedNFTs = useSelector((state) => state.Nfts.importedNFTs);


  const displayDialog = () => {
    setShowDialog(true);
    setTimeout(() => {
      setShowDialog(false);

    }, 5000)
  }

  const handleStaking = async () => {
    try {
      setDialogInfo((prev)=>({...prev, isExecuting:true}))
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
        const stakedNFT = importedNFTs.filter(nft => nft.id === id);
        dispatch(appendStakedNFTs(stakedNFT))
        dispatch(modifyImportedNFTs(id))
        setDialogInfo({ status: 'success', message: 'NFTs staked successfully', isExecuting:false });
        displayDialog();
      } else {
        setDialogInfo({ status: 'error', message: 'Error staking NFTs', isExecuting:false });
        displayDialog();
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <button className='btn' onClick={handleStaking}>
        {dialogInfo.isExecuting===false?<p>Stake</p> : 
        <Oval visible={dialogInfo.isExecuting} color='#fff'strokeWidth={3} width={25} height={25} ariaLabel="oval-loading" wrapperStyle={{}}/>
        }</button>
      {showDialog && <Modal status={dialogInfo.status} message={dialogInfo.message} closeModal={setShowDialog} />}
    </>
  )
}

export default StakeButton