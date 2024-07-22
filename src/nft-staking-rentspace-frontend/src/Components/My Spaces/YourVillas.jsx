import React, { useState } from 'react';
import { NFTsData } from '../../Constants/useNFTsData';

const YourVillas = () => {
  const { NFTs } = NFTsData();
  const [selectOption, setSelectOption] = useState('');
  const [selectedVilla, setSelectedVilla] = useState(null);

  const handleStake = () => {
    alert(`Staking ${selectedVilla}`);
  };

  const handleUnstake = () => {
    alert(`Unstaking ${selectedVilla}`);
  };

  return (
    <div className='Villas-cont'>
      <header className='header'>
        <div className='header-left'>
          <h1>Your Villas</h1>
          <div className='sortBy-cont'>
            <select onChange={(e) => setSelectOption(e.target.value)} value={selectOption}>
              <option value=''>Sort by</option>
              <option value='villa1'>option 1</option>
              <option value='villa2'>option 2</option>
              <option value='villa3'>option 3</option>
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
  <button onClick={handleUnstake} disabled={!selectedVilla}
  style={!selectedVilla ? { opacity: 0.4 } : {}}>
    Unstake
  </button>
</div>

      </header>
      <section className='villas'>
        {NFTs?.map((data, ind) => (
          <div
            key={ind}
            className='villas-card'
            onClick={() => setSelectedVilla(data.id)}
            style={{ border: data.id === selectedVilla ? '5px solid #0284E2' : 'none' }}
          >
            <img src={data.metadata.url} alt={`Villa ${ind}`} />
          </div>
        ))}
      </section>
    </div>
  );
}

export default YourVillas;
