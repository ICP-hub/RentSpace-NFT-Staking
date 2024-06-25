import React, { useEffect, useState } from 'react';
import './NFTsComp.css';
import { useNavigate } from 'react-router-dom';
import { NFTsData } from '../../../Constants/useNFTsData';
import { useAuth } from '../../../utils/useAuthClient';
import {formatMetadata} from '../../../utils/utils'
import { HashLoader } from 'react-spinners';

const ImportedNFTs = () => {
  // State variables
  const { NFTs } = NFTsData();
  const [importedNFTs, setImportedNFTs] = useState([]);
  const { actors } = useAuth()
  const [isLoading,setLoading] = useState(true)

  // Hooks
  const navigate = useNavigate();


  const getUserImportedNFTs = async () => {
    try {
      // Fetch all imported NFT IDs
      const importedNFTs = await actors.userActor.getAllUserImportedNFTs();
      console.log("Imported NFTs : ",importedNFTs)
      const importedNFTIDs = await importedNFTs?.ok;

      // Fetch details of each imported NFT
      const importedNFTDetailsPromises = importedNFTIDs.map(id => {

        const _nftDetail = actors.userActor.getImportedNFTDetails(id).then(res =>{
          if(res.ok){
            const nftDetail = res.ok;
            nftDetail.metadata = formatMetadata(nftDetail.metadata);
            return nftDetail;
          }
          else {
            throw new Error('Error fetching imported NFT details');
          }
        })


        return _nftDetail;
      }
      );

      // Wait for all promises to resolve and return the result
      const importedNFTDetails = await Promise.all(importedNFTDetailsPromises);
      // Filter out NFTs that are staked
      const unstakedNFTDetails = importedNFTDetails.filter(nftDetail => !nftDetail.isStaked);
      setLoading(false)
      return unstakedNFTDetails;
    } catch (error) {
      console.error('Error fetching imported NFTs:', error);
      throw error;
    }
  };


  // Effect hook to filter imported NFTs
  useEffect(() => {
    const fetchData = async () => {
      const importedNFTs = await getUserImportedNFTs()
      setImportedNFTs(importedNFTs)
    };
    fetchData();
  }, [NFTs]);

  console.log("Imported NFTs", importedNFTs);

  // Event handler for viewing NFT details
  function nftDetailsHandle(id, name, img, desc) {
    navigate('/ImpNftDetails', { state: { id, name, img, desc } });
  }

  // const getAllImportedNFTs = async () => {
  //   await actors.userActor.getAllUserStakedNFTs().then(async (res) => {
  //     const arr = []
  //     console.log(res)
  //     if (res.ok?.length > 0) {
  //       for (let i = 0; i < res.length; i++) {
  //         let resp = await actors.userActor.getImportedNFTDetails(res[i][0])
  //         if (resp.err != undefined) {
  //           console.log(err)
  //           continue
  //         }
  //         arr.push(resp.ok)
  //       }
  //       setImportedNFTs(arr)
  //     }
  //   })
  // }

  // useEffect(()=>{
  //   getAllImportedNFTs()
  // },[])

  // Render Method
  return (
    <div className='nft-Maincont'>
      {isLoading && <HashLoader color="#fff"/>}
        {(!isLoading && importedNFTs.length>0) && importedNFTs.map((nft, ind) => (
          <div className='nftCont' key={ind} onClick={() => nftDetailsHandle(nft.id, nft.metadata.name, nft.metadata.thumb,nft.metadata.description)}>
            <div className='nftImg-cont'>
              <img src={nft.metadata.thumb} alt='nft-image' />
            </div>
            <h1>{nft.metadata.name}</h1>
          </div>
        ))}
        {(!isLoading && importedNFTs.length===0) && <h1>You don't have any NFT yet. Try Importing them.</h1>}
    </div>
  );
};

export default ImportedNFTs;
