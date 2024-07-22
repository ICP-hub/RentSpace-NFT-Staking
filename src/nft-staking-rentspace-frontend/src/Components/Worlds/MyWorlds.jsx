import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Worlds.css";

const MyWorlds = () => {
  const [currentWorld, setCurrent] = useState(0);
  const navigate = useNavigate();

  const worldNames = ['Minimalistic world', 'Modernistic world', 'Futuristic world', 'Moon World', 'Mars World'];
  const worldsIMG = ['MinimilisticWorld.png', 'ModernisticWorld.png', 'FuturisticWorld.png', 'MoonWorld.png', 'MarsWorld.png'];

  const prevWorld = () => {
    setCurrent(currentWorld === 0 ? worldsIMG.length - 1 : currentWorld - 1);
  }

  const nextWorld = () => {
    setCurrent(currentWorld === worldsIMG.length - 1 ? 0 : currentWorld + 1);
  }

  return (
    <div className='myWorlds-Cont' style={{ backgroundImage: "url('BackgroundIMG.png')" }}>
      <h1 className='heading-staking'> Staking </h1>
      <div className='carousel-btn'>
        <FaChevronLeft className='favIcon' size={25} onClick={prevWorld} />
        <h1>{worldNames[currentWorld]}</h1>
        <FaChevronRight className='favIcon' size={25} onClick={nextWorld} />
      </div>
      <div className='myWorlds-wrapper'>
        <div className='blurred left-blur'></div>
        <div className='myWorlds'>
          <div className='flexWorlds' style={{ transform: `translateX(calc(-${currentWorld} * (380px ) )` }}>
            {worldsIMG.map((data, ind) => (
              <div className='worlds' key={ind} style={ind > 0 ? { marginLeft: '90px' } : {}}>
                <img src={`myWorlds/${data}`} alt={data} />
              </div>
            ))}
          </div>
        </div>
        <div className='blurred right-blur'></div>
      </div>
      <div className='explore-btn'>
        <button onClick={() => navigate(`/world/${worldNames[currentWorld]}`)}>Explore Now</button>
      </div>
    </div>
  )
}

export default MyWorlds;
