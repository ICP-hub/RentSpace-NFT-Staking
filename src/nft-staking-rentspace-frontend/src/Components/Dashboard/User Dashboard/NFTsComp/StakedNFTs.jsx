import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NFTsData } from '../../../../Constants/useNFTsData';
import './NFTsComp.css';
import Card from '../../../Card/Card';
import FallbackUI from '../../../FallbackUI/FallbackUI';
import { useAuth } from '../../../../utils/useAuthClient';
import { formatMetadata } from '../../../../utils/utils';
import FallbackUI_NFTs from '../../../FallbackUI/FallbackUI_NFTs';

const StakedNFTs = () => {
  const [stakedNFTs, setStakedNFTs] = useState([]);
  const { actors, principal } = useAuth();
  const [isLoading, setIsLoading] = useState(true); // Loading state
  // const { actors } = useAuth();

  const navigate = useNavigate();

  // Function to filter staked NFTs
  const filterStakedNFTs = async () => {
    const backendActor = actors?.userActor;
    const stakedNFTDetails = await backendActor.getUserStakedNFTs();
    console.log("Req : ",stakedNFTDetails.ok);
    if (stakedNFTDetails.ok) {
      setStakedNFTs(stakedNFTDetails.ok);
    } else {
      console.log("Error in fetching staked NFTs ", err);
    } 
  };

   // Effect hook to filter staked NFTs and delay used for testing FallbackUI
  useEffect(() => {
    const timeoutId = setTimeout(filterStakedNFTs, 2000);
    return () => clearTimeout(timeoutId);
  }, [actors, principal]);

  // Event handler for viewing NFT details
  function nftDetailsHandle(id, name, img) {
    navigate('/StakNftDetails', { state: { id, name, img } });
  }

  // const getAllStakedNFTs = async () => {
  //   await actors.userActor.getAllUserStakedNFTs().then(async (res) => {
  //     const arr = [];
  //     console.log(res);
  //     if (res.ok?.length > 0) {
  //       for (let i = 0; i < res.length; i++) {
  //         let resp = await actors.userActor.getStakedNFTDetails(res[i][0]);
  //         if (resp.err != undefined) continue;
  //         arr.push(resp.ok);
  //       }
  //       setStakedNFTs(arr);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   getAllStakedNFTs();
  // }, []);

  // Render Method

  console.log(stakedNFTs)
  
  return (
    <>
      {isLoading ? (
        <FallbackUI_NFTs purpose='Loading' /> // Render this during loading
      ) : stakedNFTs.length > 0 ? (
        <div className='nft-Maincont'>
          <h1>Staked NFT</h1>
          <div className='nftOuter-Cont'>
            {stakedNFTs.map((NFT, ind) => (
              <div key={ind}>
                {NFT[0]?.id && <Card
                  id={NFT[0].id}
                  name={formatMetadata(NFT[0].metadata).name}
                  imgURL={formatMetadata(NFT[0].metadata).url}
                  desc={formatMetadata(NFT[0].metadata).description}
                  isStaked={NFT[0].isStaked}
                />}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <FallbackUI purpose='Staked' />
      )}
    </>
  );
};

export default StakedNFTs;
