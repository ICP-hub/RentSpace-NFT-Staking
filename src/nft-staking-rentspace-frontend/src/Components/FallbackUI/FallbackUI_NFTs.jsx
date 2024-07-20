import React from 'react';
import './FallbackUI.css'


const FallbackUI_NFTs = ({ purpose }) => {
  const fallbackNFTs = 8;

  return (
    <div className='FallbackUI_NFTs-cont' >
    <h1>
      {purpose === 'Stacked' ? 'Stacked NFT' : purpose === 'Imported' ? 'Imported NFT' : ''}
    </h1>

    <div className='innerCont'>
    {Array.from({ length: fallbackNFTs }).map((_, ind) => (
          <div key={ind} className='Fallback_card'>   </div>
        ))}
    </div>
  </div>
  );
};

export default FallbackUI_NFTs;

    
       