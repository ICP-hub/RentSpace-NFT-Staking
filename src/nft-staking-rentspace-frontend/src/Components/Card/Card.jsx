import React from 'react'
import "./Card.css"
import { add_ImportNfts } from '../../utils/Redux-Config/ImportNfts_Slice';
import { useDispatch } from 'react-redux';
import { tokenIndexToTokenIdentifier } from '../../utils/utils';
import { useAuth } from '../../utils/useAuthClient';
import { Principal } from '@dfinity/principal';


const Card = ({id, name, imgURL, desc, isStaked, purpose }) => {

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

  const handleStaking = async () => {
    try {
      const tokenIdentifier = tokenIndexToTokenIdentifier(id)
      console.log("Token Identifier : ", tokenIdentifier)

      const backendCanister = Principal.fromText("yr432-oqaaa-aaaao-a3phq-cai")

      const _approveTransferReq = await actors.EXTActor.approve({
        token : tokenIdentifier,
        spender : backendCanister,
        allowance : 1,
        subaccount : []
      })

      console.log("Approve Transfer Req : ", _approveTransferReq)

      const stakeNFTReq = await actors.userActor.stakeNFT(tokenIdentifier);

      if(stakeNFTReq.ok) {
        alert('NFT staked successfully')
      } else {
        alert('NFT stake failed : '+ stakeNFTReq.err)
      }
    } catch(err) {
      console.log(err)
    }
  }

  const handleUnStake = async () => {
    const tokenIdentifier = tokenIndexToTokenIdentifier(id)
    //Transfer NFT from owner to platform
    const unStakeNFTReq = await actors.userActor.unstakeNFT(tokenIdentifier);

    if(unStakeNFTReq.ok) {
      alert('NFT unstaked successfully');
    }
    else {
      alert('Error unstaking NFT : '+ unStakeNFTReq.err);
    }

  }

  function handle_CheckNfts(){
   // logic for select nft
      dispatch(add_ImportNfts(id))
  }

  return (
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
      { purpose === 'import'  ?   ''
      :
       <button className='card-btn' onClick={handleClick} > { isStaked ? 'Unstake' : 'Stake' }</button> 
       }
      </div>
    </div>
  );
};

export default Card;
