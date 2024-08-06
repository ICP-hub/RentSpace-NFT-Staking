import React from 'react';
import './Card.css';
import IMGComp from '../IMGComp';
import { FaCheck } from 'react-icons/fa';

const CheckCard = ({ id, imgURL, name, desc, handleChange }) => {
  const handleCheck = (e) => {
    handleChange(e.target.checked, id);
  };

  return (
    <div className="card checked-card">
      <label className='check-label' onClick={handleCheck}>
        <input id={id} type='checkbox' className='checkbox' />
        <span className='checkmark'><FaCheck /></span>
      </label>
      {/* <img src={imgURL} className='card-image' alt={name} /> */}
      < IMGComp src={imgURL} hashVal='LRG]2NENM{WB_NogRiWB.9WBxaj?' alt="villa image" className='card-image' height='' width='' />
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p className="card-content">{desc}</p>
      </div>
    </div>
  );
};

export default CheckCard;
