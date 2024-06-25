import React from 'react';
import { useLocation } from 'react-router-dom';
import { NFTsData } from '../../../Constants/useNFTsData';
import './NFTsDetails.css';
import { tokenIndexToTokenIdentifier } from '../../../utils/utils';
import { useAuth } from '../../../utils/useAuthClient';

const StakNftDetails = () => {
    // Hooks
    const { NFTs, setNFTs } = NFTsData();
    const {actors} = useAuth();
    const location = useLocation();

    // Data
    const nftData = location.state && location.state;

    // Event Handlers
    const handleUnstake = async(id) => {
        // Convert the token index to token identifier
        const tokenIdentifier = tokenIndexToTokenIdentifier(id)
        console.log("TokenID : ",tokenIdentifier)
        //Transfer NFT from owner to platform
        const stakeNFTReq = await actors.userActor.unstakeNFT(tokenIdentifier);
        if(stakeNFTReq.ok) {
          // Update the NFTs state with the new array
          // setNFTs(NFTs.map(nft => {
          //   if(nft.id === id) {
          //     return {...nft, staked: false}
          //   }
          //   return nft;
          // }));
          alert('NFT unstaked successfully');
        }
        else {
          alert('Error unstaking NFT : '+ stakeNFTReq.err);
        }
      };

    // Rendering
    return (
        <div className='nftDetails-Cont'>
            <div className='nft-img'>
                <img src={nftData ? nftData.img : ''} alt={nftData ? nftData.name : ''} />
            </div>
            <div className='nftDetails-cont'>
                <div className='nftDetails'>
                    <h1>{nftData ? nftData.name : 'Loading...'}</h1>
                    <p>Other Details</p>
                    <p>{nftData ? nftData.desc : 'Lorem Ipsum'}</p>
                    <div className='btn-cont'>
                        <h2 className='Claim-btn'>Claim reward</h2>
                        <h2 onClick={() => handleUnstake(nftData.id)} className='unstake-btn'>Unstake</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StakNftDetails;
