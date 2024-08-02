import React from 'react';
import './FallbackUI.css'

const DataNotFound_UI = ({ purpose, message }) => {
  return (
    <div className='DataNotFound_UI-cont' >
      <h1 className='heading'>
        {purpose === 'Staked' ? 'Staked NFT' : purpose === 'Imported' ? 'Imported NFT' : purpose }
      </h1>

      <div className='innerCont'>
         <div>
              <img src='Assets/fileLogo.svg' alt='file logo'/>
              <h2> <span> {purpose === 'Staked' ? 'No Staked NFT available to show ' : purpose === 'Imported' ? 'No Imported NFT available to show ' : message } </span>   </h2>
              </div>
      </div>
    </div>
  );
};

export default DataNotFound_UI;
