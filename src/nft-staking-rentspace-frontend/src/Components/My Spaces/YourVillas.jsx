import React, { useState } from 'react';
import { NFTsData } from '../../Constants/useNFTsData';


const YourVillas = () => {
  const { NFTs } = NFTsData();
  const [selectOption, setSelectOption] = useState('');
  const [selectedVilla, setSelectedVilla] = useState('');

  const handleStake = () => {
    // Add stake functionality here
    alert(`Staking ${selectedVilla}`);
  };

  const handleUnstake = () => {
    // Add unstake functionality here
    alert(`Unstaking ${selectedVilla}`);
  };


  
  return (
    <div className='yourVillas-cont'>
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
          <button onClick={handleStake} disabled={!selectedVilla}>Stake</button>
          <button onClick={handleUnstake} disabled={!selectedVilla}>Unstake</button>
        </div>
      </header>
       <section>
           {NFTs?.map((data, ind)=>{
            return <div>
                <img src={data.url}/>
            </div>
           } )}
       </section>

      <div>
       

      </div>
    </div>
  );
}

export default YourVillas;
