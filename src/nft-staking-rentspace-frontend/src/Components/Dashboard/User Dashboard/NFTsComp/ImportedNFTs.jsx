import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NFTsData } from '../../../../Constants/useNFTsData';
import './NFTsComp.css';
import Card from '../../../Card/Card';
import FallbackUI from '../../../FallbackUI/FallbackUI';
import { useSelector } from 'react-redux';
import { useAuth } from '../../../../utils/useAuthClient';
import { formatMetadata } from '../../../../utils/utils';
import FallbackUI_NFTs from '../../../FallbackUI/FallbackUI_NFTs';
// import { useAuth } from '../../../utils/useAuthClient';

const ImportedNFTs = () => {
 
  const [importedNFTs, setImportedNFTs] = useState([]);

  const { actors, principal } = useAuth();
  
  const [isLoading, setIsLoading] = useState(true); // Loading state
  // const { actors } = useAuth();

  const navigate = useNavigate();
  
  // Function to filter staked NFTs
  const filterStakedNFTs = async () => {
    const backendActor = actors.userActor;
    const importedNFTDetails = await backendActor.getUserImportedNFTs();
    console.log("Req : ",importedNFTDetails.ok);
    if (importedNFTDetails.ok) {
      setImportedNFTs(importedNFTDetails.ok);
    }
  };

  // Effect hook to filter imported NFTs and delay used for testing FallbackUI
  useEffect(() => {
    const timeoutId = setTimeout(filterStakedNFTs, 2000);
    return () => clearTimeout(timeoutId);
  }, [principal]);

  // Event handler for viewing NFT details
  const nftDetailsHandle = (id, name, img) => {
    navigate('/StakNftDetails', { state: { id, name, img } });
  };

  // // write this backend logic for importedNfts
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
  //       setImportedNFTs(arr);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   getAllStakedNFTs();
  // }, []);

  console.log(importedNFTs)

 
  return (
    <>
      {isLoading ? (
        <FallbackUI_NFTs /> // Render this during loading
      ) : importedNFTs.length > 0 ? (
        <div className='nft-Maincont'>
          <h1>Imported NFT</h1>
          <div className='nftOuter-Cont'>
            {importedNFTs.map((NFT, ind) => (
              <div key={ind}>
                <Card
                  id={NFT[0].id}
                  name={formatMetadata(NFT[0].metadata).name}
                  imgURL={formatMetadata(NFT[0].metadata).thumb}
                  desc={formatMetadata(NFT[0].metadata).description}
                  isStaked={NFT[0].isStaked}
                  isImported={!NFT[0].isStaked}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <FallbackUI purpose='Imported' />
      )}
    </>
  );
};

export default ImportedNFTs;
