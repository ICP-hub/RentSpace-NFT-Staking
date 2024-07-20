import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NFTsData } from '../../../../Constants/useNFTsData';
import './NFTsComp.css';
import Card from '../../../Card/Card';
import FallbackUI from '../../../FallbackUI/FallbackUI';
import FallbackUI_NFTs from '../../../FallbackUI/FallbackUI_NFTs';
// import { useAuth } from '../../../utils/useAuthClient';

const ImportedNFTs = () => {
  const { NFTs } = NFTsData();
  const [importedNFTs, setImportedNFTs] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  // const { actors } = useAuth();

  const navigate = useNavigate();

  // Function to filter imported NFTs
  const filterImportedNFTs = () => {
    const importedNFTs = NFTs.filter((data) => data.isImported);
    return importedNFTs;
  };

  // Effect hook to filter imported NFTs and delay used for testing FallbackUI
  useEffect(() => {
    const timeoutId = setTimeout(getAllImportedNFTs, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  // Event handler for viewing NFT details
  const nftDetailsHandle = (id, name, img) => {
    navigate('/StakNftDetails', { state: { id, name, img } });
  };

  // Fetch all imported NFTs
  const getAllImportedNFTs = async () => {
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
    //     setImportedNFTs(arr);
    //   }
    // });

    // Example placeholder:
    const mockData = filterImportedNFTs();
    setImportedNFTs(mockData.reverse());
    setIsLoading(false); // Set loading state to false after fetching data
  };

 

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
                  name={NFT.metadata.name}
                  imgURL={NFT.metadata.url}
                  desc={NFT.metadata.description}
                  isStaked={NFT.isStaked}
                  isImported={NFT.isImported}
                  onClick={() => nftDetailsHandle(NFT.id, NFT.metadata.name, NFT.metadata.url)} // Add onClick handler
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
