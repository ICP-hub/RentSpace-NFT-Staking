import React from 'react'
import "./Card.css"

const Card = ({ name, imgURL, desc }) => {
  return (
    <div className="card">
      <img src={imgURL} className='card-image' alt="villa image" width={418}/>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p className="card-content">{desc}</p>
        <button className='card-btn'>Stake</button>
      </div>
    </div>
  );
};

export default Card;
