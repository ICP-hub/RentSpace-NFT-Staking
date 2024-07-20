import React, { useEffect, useState } from 'react';
import CheckCard from '../../Card/CheckBoxCard';
import { NFTsData } from '../../../Constants/useNFTsData';
import { FaChevronLeft } from 'react-icons/fa';
import { useAuth } from '../../../utils/useAuthClient';
import { convertPrincipalToAccountIdentifier, formatMetadata } from '../../../utils/utils';

const ImportingNFTs = ({ setImportModule }) => {
  const { NFTs } = NFTsData();
  const { actors, principal } = useAuth();
  const [NFTList, setNFTList] = useState([]);
  const [checkedCards, setCheckedCards] = useState([]);
  const backendActor = actors.userActor;

  useEffect(() => {

    const getAllUserTokens = async () => {
      const userAccountId = await convertPrincipalToAccountIdentifier(principal);
      const userTokens = await backendActor.getAllUserTokens(userAccountId);

      if (userTokens.ok) {
        setNFTList(userTokens.ok.map((token) => ({
          tid: token.tid,
          metadata: token.metadata,
        })));
      } else {
        setNFTList([]);
      }
    };

    getAllUserTokens();
  }, []);

  const handleCheckChange = (isChecked, id) => {
    if (isChecked) {
      setCheckedCards((prev) => [...prev, id]);
    } else {
      setCheckedCards((prev) => prev.filter((cardId) => cardId !== id));
    }
  };
  
  const handleImport = async() => {
    const selectedCards = NFTList.filter((NFT) => checkedCards.includes(NFT.tid));
    // Processing selected cards to convert metadata from JSON to String

    console.log("Selected : ",selectedCards)

    const importNFTReq = await backendActor.importNFTs(selectedCards);

    if (importNFTReq.ok) {
      // Show Success Dialog
      console.log(importNFTReq)
      alert('NFTs imported successfully');
    }
    else {
      // Show Error Dialog
      alert('Error in importing NFTs');
    }
    };

  return (
    <div className='importNfts-mainCont'>
      <div className='header-cont'>
        <FaChevronLeft className='favIcon' size={25} onClick={() => setImportModule(false)} />
        <div><h1>Your NFTs</h1></div>
      </div>
      <div className='importNfts-OuterCont no-scrollbar'>
        <div className='importNfts-InnerCont'>
          {NFTList.map((NFT) => (
            <div className='nft-cont' key={NFT.id}>
              <CheckCard
                id={NFT.tid}
                name={NFT.metadata.name}
                imgURL={NFT.metadata.url}
                desc={NFT.metadata.description}
                handleChange={handleCheckChange}
              />
            </div>
          ))}
        </div>
      </div>
      <div className='ImportBtn'>
        <button onClick={handleImport}>Import NFTs</button>
      </div>
    </div>
  );
};

export default ImportingNFTs;
