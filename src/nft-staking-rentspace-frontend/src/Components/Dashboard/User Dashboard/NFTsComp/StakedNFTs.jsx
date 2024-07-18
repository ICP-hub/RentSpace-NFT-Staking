import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NFTsData } from '../../../../Constants/useNFTsData';
import './NFTsComp.css';
import Card from '../../../Card/Card';
import FallbackUI from '../../../FallbackUI/FallbackUI';
// import { useAuth } from '../../../utils/useAuthClient';

const StakedNFTs = () => {
 
  const { NFTs } = NFTsData();
  const [stakedNFTs, setStakedNFTs] = useState([]);
  // const { actors } = useAuth();

  const navigate = useNavigate();

  // Function to filter staked NFTs
  const filterStakedNFTs = () => {
    const stakedNFTs = NFTs.filter((data) => data.isStaked);
    setStakedNFTs(stakedNFTs);
  };

   // Effect hook to filter staked NFTs and delay used for testing FallbackUI
  useEffect(() => {
    const timeoutId = setTimeout(filterStakedNFTs, 2000);
    return () => clearTimeout(timeoutId);
  }, [NFTs]);

  // Event handler for viewing NFT details
  function nftDetailsHandle(id, name, img) {
    navigate('/StakNftDetails', { state: { id, name, img } });
  }

  const getAllStakedNFTs = async () => {
    await actors.userActor.getAllUserStakedNFTs().then(async (res) => {
      const arr = [];
      console.log(res);
      if (res.ok?.length > 0) {
        for (let i = 0; i < res.length; i++) {
          let resp = await actors.userActor.getStakedNFTDetails(res[i][0]);
          if (resp.err != undefined) continue;
          arr.push(resp.ok);
        }
        setStakedNFTs(arr);
      }
    });
  };

  useEffect(() => {
    getAllStakedNFTs();
  }, []);

  // Render Method
  return (
    <>
      {stakedNFTs.length > 0 ? (
        <div className='nft-Maincont'>
          <h1>Stacked NFT</h1>
          <div className='nftOuter-Cont'>
            {stakedNFTs?.map((NFT, ind) => (
              <div key={ind}>
                <Card
                  name={NFT.metadata.name}
                  imgURL={NFT.metadata.url}
                  desc={NFT.metadata.description}
                  isStaked={NFT.isStaked}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <FallbackUI purpose='Stacked' />
      )}
    </>
  );
};

export default StakedNFTs;
