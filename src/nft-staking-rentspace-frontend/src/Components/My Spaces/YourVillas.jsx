import React, { useState, useEffect, useCallback } from 'react';
import { NFTsData } from '../../Constants/useNFTsData';
import IMGComp from '../IMGComp';

const YourVillas = () => {
  const { NFTs } = NFTsData();
  const [selectedVilla, setSelectedVilla] = useState(null);
  const [filteredNFTs, setFilteredNFTs] = useState([]);

  useEffect(() => {
    setFilteredNFTs(NFTs);
  }, [NFTs]);

  const handleFilterNFTs = (rarity) => {
    if (rarity === '') {
      setFilteredNFTs(NFTs);
    } else {
      const filtered = NFTs.filter((NFT) => Object.keys(NFT.rarity) == rarity);
      setFilteredNFTs(filtered);
    }
  };

  const handleStake = useCallback(() => {
    if (selectedVilla) {
      alert(`Staking ${selectedVilla}`);
    }
  }, [selectedVilla]);

  const handleUnstake = useCallback(() => {
    if (selectedVilla) {
      alert(`Unstaking ${selectedVilla}`);
    }
  }, [selectedVilla]);

  const handleSelectVilla = useCallback((id) => {
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
        {filteredNFTs.map((data, ind) => (
          <div
            key={ind}
            className='villasCard-cont'
            onClick={(e) => {
              e.stopPropagation();
              handleSelectVilla(data.id);
            }}
            style={{
              border: data.id === selectedVilla ? '5px solid #0284E2' : 'none',
              cursor: 'pointer',
            }}
          >
            <IMGComp
              src={data.metadata.url}
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
