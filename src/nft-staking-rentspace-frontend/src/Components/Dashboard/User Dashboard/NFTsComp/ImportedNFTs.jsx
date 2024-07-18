import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NFTsData } from '../../../../Constants/useNFTsData';
import './NFTsComp.css';
import Card from '../../../Card/Card';
import FallbackUI from '../../../FallbackUI/FallbackUI';
// import { useAuth } from '../../../utils/useAuthClient';

const ImportedNFTs = () => {
 
  const { NFTs } = NFTsData();
  const [importedNFTs, setImportedNFTs] = useState([]);
  // const { actors } = useAuth();

  const navigate = useNavigate();

  // Function to filter staked NFTs
  const filterStakedNFTs = () => {
    const importedNFTs = NFTs.filter((data) => data.isImported);
    setImportedNFTs(importedNFTs);
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


  // write this backend logic for importedNfts
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
        setImportedNFTs(arr);
      }
    });
  };

  useEffect(() => {
    getAllStakedNFTs();
  }, []);

 
  return (
    <>
      {importedNFTs.length > 0 ? (
        <div className='nft-Maincont'>
          <h1>Imported NFT</h1>
          <div className='nftOuter-Cont'>
            {importedNFTs?.map((NFT, ind) => (
              <div key={ind}>
                <Card
                  name={NFT.metadata.name}
                  imgURL={NFT.metadata.url}
                  desc={NFT.metadata.description}
                  isStaked={NFT.isStaked}
                  isImported={NFT.isImported}
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
