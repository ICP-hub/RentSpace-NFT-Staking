import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from '../../utils/useAuthClient';
import IMGComp from '../IMGComp';
import { formatMetadata, tokenIndexToTokenIdentifier } from '../../utils/utils';
import { Principal } from '@dfinity/principal';

const YourVillas = () => {
  const { actors } = useAuth()
  const [NFTs, setNFTs] = useState([]);
  const [selectedVilla, setSelectedVilla] = useState(null);
  const [filteredNFTs, setFilteredNFTs] = useState([]);

  useEffect(() => {
    const backendActor = actors.userActor;
    const getNFTS = async () => {
      const getAllUserNFTs = await backendActor.getUserNFTs();
      if (getAllUserNFTs?.ok) {
        const NFTs = getAllUserNFTs.ok;
        console.log('NFTs', getAllUserNFTs.ok)
        setNFTs(NFTs);
        setFilteredNFTs(NFTs)
      }
    }
    if (backendActor !== null) {
      getNFTS()
    }
  }, []);

  const handleFilterNFTs = (rarity) => {
    if (rarity === '') {
      setFilteredNFTs(NFTs);
    } else {
      const filtered = NFTs.filter((NFT) => {
        return Object.keys(NFT[0].rarity)[0] === rarity
      });
      setFilteredNFTs(filtered);
    }
  };

  // Memoize stake and unstake handlers
  const handleStake = useCallback(async () => {
    if (selectedVilla) {
      try {
        const tokenIdentifier = tokenIndexToTokenIdentifier(selectedVilla)
        console.log("Token Identifier : ", tokenIdentifier)

        const backendCanister = Principal.fromText("bd3sg-teaaa-aaaaa-qaaba-cai")

        const _approveTransferReq = await actors.EXTActor.approve({
          token: tokenIdentifier,
          spender: backendCanister,
          allowance: 1,
          subaccount: []
        })

        console.log("Approve Transfer Req : ", _approveTransferReq)

        const stakeNFTReq = await actors.userActor.stakeNFT(tokenIdentifier);

        if (stakeNFTReq.ok) {
          // const stakedNFT = importedNFTs.filter(nft => nft.id === id);
          // dispatch(appendStakedNFTs(stakedNFT))
          // dispatch(modifyImportedNFTs(id))
          // setDialogInfo({ status: 'success', message: 'NFTs staked successfully', isExecuting: false });
          // displayDialog();
          alert('NFTs staked successfully')
        } else {
          // setDialogInfo({ status: 'error', message: 'Error staking NFTs', isExecuting: false });
          // displayDialog();
          alert('Error staking NFTs')
        }
      } catch (err) {
        console.log(err)
      }
    }
  }, [selectedVilla]);

  const handleUnstake = useCallback(async () => {
    if (selectedVilla) {
      const tokenIdentifier = tokenIndexToTokenIdentifier(selectedVilla)
      //Transfer NFT from owner to platform
      const unStakeNFTReq = await actors.userActor.unstakeNFT(tokenIdentifier);
      if (unStakeNFTReq.ok) {
        // dispatch(addPoints(points))
        // dispatch(removeStakedNFTs(id))
        // dispatch(modifyStakedNFTs(id))
        // setDialogInfo({ status: 'success', message: 'NFT Unstaked successfully' });
        // displayDialog();
        alert('NFT Unstaked successfully')
      }
      else {
        // setDialogInfo({ status: 'error', message: 'Error while Unstaking NFT' });
        // displayDialog();
        alert('Error while Unstaking NFT')
      }
    }
  }, [selectedVilla]);

  const handleSelectVilla = useCallback((id) => {
    console.log(id)
    setSelectedVilla(prev => prev === id ? null : id);
  }, []);

  const handleClickOutside = useCallback((event) => {
    if (!event.target.closest('.villasCard-cont')) {
      setSelectedVilla(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className='Villas-cont' id='Villas'>
      <header className='header'>
        <div className='header-left'>
          <h1>Your Villas</h1>
          <div className='sortBy-cont'>
            <select
              onChange={(e) => handleFilterNFTs(e.target.value)}
              className='bg-white text-gray-700 border-gray-300 rounded-md'
            >
              <option value=''>Sort by</option>
              <option value='Common'>Common</option>
              <option value='Uncommon'>Uncommon</option>
              <option value='Rare'>Rare</option>
              <option value='Epic'>Epic</option>
              <option value='Legendary'>Legendary</option>
            </select>
          </div>
        </div>
        <div className='header-right'>
          <button
            onClick={handleStake}
            disabled={!selectedVilla}
            style={!selectedVilla ? { opacity: 0.4 } : {}}
          >
            Stake
          </button>
          <button
            onClick={handleUnstake}
            disabled={!selectedVilla}
            style={!selectedVilla ? { opacity: 0.4 } : {}}
          >
            Unstake
          </button>
        </div>
      </header>
      <section className='villas'>
        {filteredNFTs.length > 0 && filteredNFTs.map((data, ind) => (
          <div
            key={data[0].id}
            className='villasCard-cont'
            onClick={(e) => {
              e.stopPropagation();
              handleSelectVilla(data[0].id);
            }}
            style={{
              border: data[0]?.id === selectedVilla ? '5px solid #0284E2' : 'none',
              cursor: 'pointer',
            }}
          >
            <IMGComp
              src={formatMetadata(data[0].metadata).url}
              hashVal='LRG]2NENM{WB_NogRiWB.9WBxaj?'
              alt={`Villa ${ind}`}
              className='villas-card'
              height=''
              width=''
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default YourVillas;
