import React, { useEffect, useState, useTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../../../utils/useAuthClient';
import { formatMetadata } from '../../../../utils/utils';
import FallbackUI from '../../../FallbackUI/DataNotFound_UI';
import { addImportedNFTs } from '../../../../utils/Redux-Config/NftsSlice';
import Card from '../../../Card/Card';
import './NFTsComp.css';
import { Hourglass } from 'react-loader-spinner';

const ImportedNFTs = () => {
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { actors, principal } = useAuth();
  const importedNFTs = useSelector((state) => state.Nfts.importedNFTs);

  // Function to filter imported NFTs
  const filterImportedNFTs = async () => {
    try {
      const backendActor = actors.userActor;
      const importedNFTDetails = await backendActor.getUserImportedNFTs();
      console.log('Req: ', importedNFTDetails.ok);
      if (importedNFTDetails.ok) {
        dispatch(addImportedNFTs(importedNFTDetails.ok));
      }
    } catch (error) {
      console.error('Failed to fetch imported NFTs:', error);
    }
  };

  // Effect hook to filter imported NFTs
  useEffect(() => {
    if (principal) {
      startTransition(() => {
        filterImportedNFTs();
      });
    }
  }, [principal, actors.userActor]);

   // Event handler for viewing NFT details
  // const nftDetailsHandle = (id, name, img) => {
  //   navigate('/ImpNftDetails', { state: { id, name, img } });
  // };

  console.log(importedNFTs);

  return (
    <>
      {isPending ? (
        <Hourglass visible={isPending} ariaLabel='hourglass-loading' height={80} width={80} wrapperClass='loader' colors={['#0288e9', '#00b1fd']} />
      ) : importedNFTs && importedNFTs.length > 0 ? (
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
