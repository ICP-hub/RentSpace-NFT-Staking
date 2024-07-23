import React from 'react';
import './Card.css';

const CheckCard = ({ id, imgURL, name, desc, handleChange }) => {
  const handleCheck = (e) => {
    handleChange(e.target.checked, id);
  };

  return (
    <div className="card checked-card">
      <input onClick={handleCheck} id={id} type='checkbox' className='checkbox' />
      <img src={imgURL} className='card-image' alt={name} width={418} />
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p className="card-content">{desc}</p>
      </div>
    </div>
  );
};

export default CheckCard;
