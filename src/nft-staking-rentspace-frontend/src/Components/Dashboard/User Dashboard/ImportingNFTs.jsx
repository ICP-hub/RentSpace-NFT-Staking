import React, { useEffect, useState } from 'react';
import CheckCard from '../../Card/CheckBoxCard';
import Modal from "../../Modals/Modal"
import { FaChevronLeft } from 'react-icons/fa';
import { useAuth } from '../../../utils/useAuthClient';
import { convertPrincipalToAccountIdentifier, formatMetadata } from '../../../utils/utils';
import { createPortal } from 'react-dom';

const ImportingNFTs = ({ setImportModule }) => {
  const { actors, principal } = useAuth();
  const [NFTList, setNFTList] = useState([]);
  const [checkedCards, setCheckedCards] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({ status: "", message: "" });
  const backendActor = actors.userActor;

  useEffect(() => {

    const getAllUserTokens = async () => {
      const userAccountId = await convertPrincipalToAccountIdentifier(principal);
      const userTokens = await backendActor.getAllUserTokens(userAccountId);

      if (userTokens.ok) {
        console.log("User Tokens : ", userTokens.ok);
        setNFTList(userTokens.ok.map((token) => ({
          tid: token.tid,
          metadata: token.metadata,
        })));
        console.log("NFT List : ", NFTList);
      } else {
        console.log("Error in fetching user tokens : ", userTokens.err);
        setNFTList([]);
      }
    };

    getAllUserTokens();
  }, []);

  const displayDialog = () => {
    setShowDialog(true);
    setTimeout(() => {
      setShowDialog(false);
    }, 5000)
  }

  const handleCheckChange = (isChecked, id) => {
    if (isChecked) {
      setCheckedCards((prev) => [...prev, id]);
    } else {
      setCheckedCards((prev) => prev.filter((cardId) => cardId !== id));
    }
  };

  const handleImport = async () => {
    const selectedCards = NFTList.filter((NFT) => checkedCards.includes(NFT.tid));
    // Processing selected cards to convert metadata from JSON to String

    console.log("Selected : ", selectedCards)

    const importNFTReq = await backendActor.importNFTs(selectedCards);

    if (importNFTReq.ok) {
      // Show Success Dialog
      console.log(importNFTReq)
      // alert('NFTs imported successfully');
      setDialogInfo({ status: 'success', message: 'NFTs imported successfully' });
      displayDialog();
    }
    else {
      // Show Error Dialog
      // alert('Error in importing NFTs');
      console.log(importNFTReq)
      setDialogInfo({ status: 'error', message: 'Error importing NFTs' });
      displayDialog();
    }
  };

  return createPortal(
    <div className='importNfts-mainCont'>
      {showDialog && <Modal status={dialogInfo.status} message={dialogInfo.message} closeModal={setShowDialog} setImportModule={setImportModule} />}
      <div className='header-cont'>
        <FaChevronLeft className='favIcon' size={25} onClick={() => setImportModule(false)} />
        <div><h1>Your NFTs</h1></div>
      </div>
      <div className='importNfts-OuterCont no-scrollbar'>
        <div className='importNfts-InnerCont'>
          {NFTList.map((NFT) => (
            <div className='nft-cont' key={NFT.tid}>
              <CheckCard
                id={NFT.tid}
                name={formatMetadata(NFT.metadata).name}
                imgURL={formatMetadata(NFT.metadata).url}
                desc={formatMetadata(NFT.metadata).description}
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
    , document.getElementById('root')
  )
};

export default ImportingNFTs;
