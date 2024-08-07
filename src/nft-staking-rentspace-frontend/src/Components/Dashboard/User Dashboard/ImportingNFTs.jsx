import React, { useEffect, useState, useCallback } from 'react';
import CheckCard from '../../Card/CheckBoxCard';
import Modal from "../../Modals/Modal";
import { FaChevronLeft } from 'react-icons/fa';
import { useAuth } from '../../../utils/useAuthClient';
import { convertPrincipalToAccountIdentifier, formatMetadata } from '../../../utils/utils';
import { createPortal } from 'react-dom';
import { Oval } from 'react-loader-spinner';
import { useSelector } from 'react-redux';

const ImportingNFTs = ({ isImportModule, setImportModule }) => {
  const { actors, principal } = useAuth();
  const [NFTList, setNFTList] = useState([]);
  const [checkedCards, setCheckedCards] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({ status: "", message: "" });
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isImporting, setIsImporting] = useState(false)
  const backendActor = actors.userActor;
  const userImportedNFTs = useSelector((state) => state.user.importedNFTs)

  useEffect(() => {
    const getAllUserTokens = async () => {
      setIsLoading(true);
      try {
        const userAccountId = await convertPrincipalToAccountIdentifier(principal);
        const userTokens = await backendActor.getAllUserTokens(userAccountId);

        if (userTokens.ok) {
          setNFTList(userTokens.ok.map(({ tid, metadata }) => ({
            tid,
            metadata: formatMetadata(metadata),
          })));
        } else {
          console.error("Error in fetching user tokens:", userTokens.err);
          setNFTList([]);
        }
      } catch (error) {
        console.error("Error fetching user tokens:", error);
        setNFTList([]);
      } finally {
        setIsLoading(false);
      }
    };

    getAllUserTokens();
  }, [principal, backendActor]);

  const displayDialog = useCallback(() => {
    setShowDialog(true);
    const timer = setTimeout(() => {
      setShowDialog(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleCheckChange = (isChecked, id) => {
    setCheckedCards((prev) => isChecked
      ? [...prev, id]
      : prev.filter((cardId) => cardId !== id)
    );
  };

  const handleImport = async () => {
    setIsImporting(true);
    const selectedCards = NFTList.filter((NFT) => checkedCards.includes(NFT.tid)).map((nft) => {
      return { ...nft, metadata: JSON.stringify(nft.metadata) }
    });
    console.log(selectedCards)
    try {
      const importNFTReq = await backendActor.importNFTs(selectedCards);

      setDialogInfo({
        status: importNFTReq.ok ? 'success' : 'error',
        message: importNFTReq.ok ? 'NFTs imported successfully' : 'Error importing NFTs'
      });
      displayDialog();
      setCheckedCards([])
    } catch (error) {
      console.error("Error importing NFTs:", error);
      setDialogInfo({ status: 'error', message: 'Error importing NFTs' });
      displayDialog();
    } finally {
      setIsImporting(false);
      // setImportModule(false)
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setImportModule(false);
    }, 250);
  };

  const isBtnDisabled = !(checkedCards.length > 0);

  return createPortal(
    <div className={`importNfts-mainCont ${!isVisible ? 'fade-out' : ''}`}>
      {showDialog && (
        <Modal
          status={dialogInfo.status}
          message={dialogInfo.message}
          closeModal={() => setShowDialog(false)}
          setImportModule={setImportModule}
        />
      )}
      <div className='header-cont'>
        <FaChevronLeft className='favIcon' size={25} onClick={handleClose} />
        <div><h1>Your NFTs</h1></div>
      </div>
      <div className='importNfts-OuterCont no-scrollbar'>
        <div className='importNfts-InnerCont'>
          {isLoading && <Oval visible={dialogInfo.isExecuting} color='#0285e3' secondaryColor='#fff' strokeWidth={5} width={75} height={75} ariaLabel="oval-loading" wrapperStyle={{}} />}
          {NFTList.map(({ tid, metadata }) => (
            <div className='nft-cont' key={tid}>
              <CheckCard
                id={tid}
                name={metadata.name}
                imgURL={metadata.url}
                desc={metadata.description}
                handleChange={handleCheckChange}
                isImported={userImportedNFTs.includes(tid)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className='ImportBtn'>
        <button className={`import-btn ${isBtnDisabled ? 'disabled' : ''}`} disabled={isBtnDisabled} onClick={isBtnDisabled ? null : handleImport}>{isImporting ? <Oval visible={isImporting} strokeWidth={3} height={20} width={20} color='#fff' secondaryColor='#0285e3' ariaLabel="oval-loading" /> : 'Import NFTs'}</button>
      </div>
    </div>,
    document.getElementById('root')
  );
};

export default ImportingNFTs;
