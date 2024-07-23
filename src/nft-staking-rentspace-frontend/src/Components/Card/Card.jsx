import React, { useState } from 'react'
import "./Card.css"
import { add_ImportNfts } from '../../utils/Redux-Config/ImportNfts_Slice';
import { useDispatch } from 'react-redux';
import { tokenIndexToTokenIdentifier } from '../../utils/utils';
import { useAuth } from '../../utils/useAuthClient';
import { Principal } from '@dfinity/principal';
import Modal from '../Modals/Modal';
import UnStakeButton from '../Button/UnStakeButton';
import StakeButton from '../Button/StakeButton';


const Card = ({id, name, imgURL, desc, isStaked, purpose }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({status: "", message: ""});

  const dispatch= useDispatch();
  const {actors} = useAuth()

  const handleClick = async () => {
    if(isStaked) {
      await handleUnStake()
    }
    else {
      await handleStaking()
    }
  }

  // const handleStaking = async () => {
  //   try {
  //     const tokenIdentifier = tokenIndexToTokenIdentifier(id)
  //     console.log("Token Identifier : ", tokenIdentifier)

      const backendCanister = Principal.fromText("yr432-oqaaa-aaaao-a3phq-cai")

  //     const _approveTransferReq = await actors.EXTActor.approve({
  //       token : tokenIdentifier,
  //       spender : backendCanister,
  //       allowance : 1,
  //       subaccount : []
  //     })

  //     console.log("Approve Transfer Req : ", _approveTransferReq)

  //     const stakeNFTReq = await actors.userActor.stakeNFT(tokenIdentifier);

  //     if(stakeNFTReq.ok) {
  //       setDialogInfo({status:'success',message: 'NFTs staked successfully'});
  //       displayDialog();
  //     } else {
  //       setDialogInfo({status:'error',message:'NFT stake failed : '+ stakeNFTReq.err})
  //     }
  //   } catch(err) {
  //     console.log(err)
  //   }
  // }

  const displayDialog=() => {
    setShowDialog(true);
    setTimeout(()=> {
      setShowDialog(false);

    },5000)
  }

  const handleUnStake = async () => {
    const tokenIdentifier = tokenIndexToTokenIdentifier(id)
    //Transfer NFT from owner to platform
    const unStakeNFTReq = await actors.userActor.unstakeNFT(tokenIdentifier);

    if(unStakeNFTReq.ok) {
      setDialogInfo({status:'success',message: 'NFTs unstaked successfully'});
      displayDialog();
    }
    else {
      setDialogInfo({status:'error',message: 'Error unstaking NFTs'});
      displayDialog();
    }

  }

  function handle_CheckNfts(){
   // logic for select nft
      dispatch(add_ImportNfts(id))
  }

  return (
    <>
    
    {showDialog && <Modal status={dialogInfo.status} message={dialogInfo.message} closeModal={setShowDialog}/>}
    <div className="card">
      {
        purpose === 'import' ? 
         <input onClick={handle_CheckNfts} type='checkbox' className='checkbox' />
        :
        ''
      }
      <img src={imgURL} className='card-image' alt="villa image" width={418}/>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p className="card-content">{desc}</p>
      { isStaked ? <UnStakeButton id={id}/> : <StakeButton id={id}/>}
      </div>
    </div>
    </>
  );
};

export default Card;
