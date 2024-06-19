import React from 'react';
import './NFTsDetails.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../utils/useAuthClient';
import { NFTsData } from '../../../Constants/useNFTsData';
import { tokenIndexToTokenIdentifier } from '../../../utils/utils';
import { Principal } from '@dfinity/principal';
import { useImportNFTData } from '../../../Context/NFTContext';

const ImpNftDetails = () => {

const Navigate = useNavigate();
console.log("Navigate : ",Navigate)
const {actors,principal} = useAuth();
  // Destructure NFTs and setNFTs from NFTsData hook
  const { NFTs, setNFTs } = useImportNFTData();
  console.log(actors)

  // Get the location object using useLocation hook
  const location = useLocation();

  // Access nftData from location.state if it exists
  const nftData = location.state;

  // Function to handle staking
  const handleStake = async(id) => {
    // Convert the token index to token identifier
    const tokenIdentifier = tokenIndexToTokenIdentifier(id)
    console.log("TokenID : ",tokenIdentifier)

    // Approve Token Transfer
    const approveTransferReq = await actors.EXTActor.approve({
      token : tokenIdentifier,
      spender : Principal.fromText("bkyz2-fmaaa-aaaaa-qaaaq-cai"),
      allowance : 1,
      subaccount : []
    })
    console.log(approveTransferReq)

    //Transfer NFT from owner to platform
    const stakeNFTReq = await actors.userActor.stakeNFT(tokenIdentifier);
    if(stakeNFTReq.ok) {
      // Update the NFTs state with the new array
      setNFTs(NFTs.map(nft => {
        if(nft.id === id) {
          return {...nft, staked: true}
        }
        return nft;
      }));
      alert('NFT staked successfully');
    }
    else {
      alert('Error staking NFT'+ stakeNFTReq.err);
    }
  };

  return (
    <div className='nftDetails-Cont'>
      <div className='nft-img'>
        <img src={nftData.img} alt={nftData.name} onError={'rentspace-nft.png'} />
      </div>
      <div className='nftDetails-cont'>
        <div className='nftDetails'>
          <h1>{nftData.name}</h1>
          <p>Other Details</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, quia?</p>
          {/* Use a button element for better accessibility */}
          <button onClick={() => handleStake(nftData.id)} className='stake-btn'>Stake</button>
        </div>
      </div>
    </div>
  );
}

export default ImpNftDetails;
