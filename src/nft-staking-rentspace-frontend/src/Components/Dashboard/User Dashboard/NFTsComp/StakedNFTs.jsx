import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NFTsData } from '../../../../Constants/useNFTsData';
import './NFTsComp.css';
import Card from '../../../Card/Card';
import FallbackUI from '../../../FallbackUI/FallbackUI';
import FallbackUI_NFTs from '../../../FallbackUI/FallbackUI_NFTs';
// import { useAuth } from '../../../utils/useAuthClient';

const StakedNFTs = () => {
  const { NFTs } = NFTsData();
  const [stakedNFTs, setStakedNFTs] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  // const { actors } = useAuth();

  const navigate = useNavigate();

  // Function to filter staked NFTs
  const filterStakedNFTs = () => {
    const stakedNFTs = NFTs.filter((data) => data.isStaked);
    return stakedNFTs;
  };

  // Fetch all staked NFTs
  const getAllStakedNFTs = async () => {
    // Replace with your actual logic to fetch data
    // await actors.userActor.getAllUserStakedNFTs().then(async (res) => {
    //   const arr = [];
    //   console.log(res);
    //   if (res.ok?.length > 0) {
    //     for (let i = 0; i < res.length; i++) {
    //       let resp = await actors.userActor.getStakedNFTDetails(res[i][0]);
    //       if (resp.err != undefined) continue;
    //       arr.push(resp.ok);
    //     }
    //     setStakedNFTs(arr);
    //   }
    // });

    // Example placeholder:
    const mockData = filterStakedNFTs();
    setStakedNFTs(mockData);
    setIsLoading(false); // Set loading state to false after fetching data
  };

  // Effect hook to fetch staked NFTs and delay used for testing FallbackUI
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getAllStakedNFTs();
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  // Render Method
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
        <FallbackUI purpose='Staked' />
      )}
    </>
  );
};

export default StakedNFTs;
