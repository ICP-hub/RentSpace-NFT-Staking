import React from 'react'
import "./Card.css"
import { add_ImportNfts } from '../../utils/Redux-Config/ImportNfts_Slice';
import { useDispatch } from 'react-redux';


const Card = ({id, name, imgURL, desc, isStaked, purpose }) => {
  const dispatch= useDispatch();

  function handleStaking(){
    if(isStaked){
      // write  unstaking logic 
    }
    else{
      // Staking logic
    }
  }

  function handle_CheckNfts(){
   // logic for select nft
      dispatch(add_ImportNfts(id))
  }

  return (
    <div className="card">
      {
        purpose === 'import' ? 
         <input onClick={handle_CheckNfts} type='checkbox' className='checkbox' />
        :
        ''
      }
      <img src={imgURL} className='card-image' alt="villa image" width={418}/>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p className="card-content">{desc}</p>
      { purpose === 'import' ? ''
      :
       <button className='card-btn' onClick={handleStaking} > { isStaked ? 'Unstake' : 'Stake' }</button> 
       }
      </div>
    </div>
  );
};

export default Card;
