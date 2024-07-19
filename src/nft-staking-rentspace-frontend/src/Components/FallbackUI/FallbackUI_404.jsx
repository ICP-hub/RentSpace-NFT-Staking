import React from 'react';
import './FallbackUI.css'
import { useNavigate } from 'react-router-dom';

const FallbackUI_404 = ({ purpose }) => {
    const navigate= useNavigate();
  return (
    <div className='fallbackUI_404-cont' >

      <div className='fallbackUI_404-innerCont'>
         <h1 > 404 </h1>
         <p> PAGE NOT FOUND</p>
         <button onClick={()=> navigate('/')}> GO TO HOMEPAGE </button>
      </div>
    </div>
  );
};

export default FallbackUI_404;
