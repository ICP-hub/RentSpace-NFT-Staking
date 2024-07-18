import React from 'react';
import './FallbackUI.css'

const FallbackUI = ({ purpose }) => {
  return (
    <div className='fallbackUI-cont' >
      <h1 className='heading'>
        {purpose === 'Stacked' ? 'Stacked NFT' : purpose === 'Imported' ? 'Imported NFT' : ''}
      </h1>

      <div className='fallbackUI-innerCont'>
         <div>
              <img src='fileLogo.svg' alt='file logo'/>
              <h2> <span> {purpose === 'Stacked' ? 'No Stacked NFT ' : purpose === 'Imported' ? 'No Imported NFT ' : 'No Data '} </span>  available to show </h2>
              </div>
      </div>
    </div>
  );
};

export default FallbackUI;
