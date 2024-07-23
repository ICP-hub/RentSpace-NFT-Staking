import React, { useState, useEffect } from 'react';
import { NFTsData } from '../../Constants/useNFTsData';

const YourVillas = () => {
  const { NFTs } = NFTsData();
  const [selectedVilla, setSelectedVilla] = useState(null);
  const [filteredNFTs, setFilteredNFTs] = useState([]);

  useEffect(() => {
    setFilteredNFTs(NFTs);
  }, [NFTs]);

  const handleStake = () => {
    alert(`Staking ${selectedVilla}`);
  };

  const handleUnstake = () => {
    alert(`Unstaking ${selectedVilla}`);
  };

  const handleFilterNFTs = (rarity) => {
    console.log(rarity)
    if (rarity === '') {
      setFilteredNFTs(NFTs);
    } else {
      const filtered = NFTs.filter((NFT) => Object.keys(NFT.rarity) == rarity);
      setFilteredNFTs(filtered);
    }
  };

  return (
    <div className='Villas-cont'>
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
            className='villas-card'
            onClick={() => setSelectedVilla(data.id)}
            style={{
              border: data.id === selectedVilla ? '5px solid #0284E2' : 'none',
              cursor: 'pointer'
            }}
          >
            <img src={data.metadata.url} alt={`Villa ${ind}`} />
          </div>
        ))}
      </section>
    </div>
  );
};

export default YourVillas;
