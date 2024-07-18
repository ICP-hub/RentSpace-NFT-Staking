import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


const MyWorlds = () => {
    const [currentWorld, setCurrent] = useState(0);
    const navigate = useNavigate();
  
    const worldNames = ['Minimalistic world', 'Modernistic world', 'Futuristic world', 'Moon World', 'Mars World'];
    const worldsIMG = [
      ['image 803.png', 'image 803.png', 'image 803.png', 'image 1726.png', 'image 1726.png', 'image 1726.png', 'image 1726.png'],
      ['image 1726.png', 'image 1726.png', 'image 803.png', 'image 1726.png'],
      ['image 803.png', 'image 1726.png', 'image 1726.png'],
      ['image 1717.png', 'image 1726.png'],
      ['image 803.png', 'image 1726.png', 'image 1726.png'],
    ];
  
    const prevWorld = () => {
      setCurrent(currentWorld === 0 ? worldsIMG.length - 1 : currentWorld - 1);
    }
  
    const nextWorld = () => {
      setCurrent(currentWorld === worldsIMG.length - 1 ? 0 : currentWorld + 1);
    }
  
  return (
    <div className='myWorlds-Cont'>
    <div className='carousel-btn'>
      <FaChevronLeft className='favIcon' size={25} onClick={prevWorld} />
      <h1>{worldNames[currentWorld]}</h1>
      <FaChevronRight className='favIcon' size={25} onClick={nextWorld} />
    </div>
    <div className='myWorlds no-scrollbar'>
      <div className='flexWorlds'>
        {worldsIMG[currentWorld].map((data, ind) => (
          <div className='worlds' key={ind} style={ind > 0 ? { marginLeft: '100px' } : {}}>
            <img src={data} alt={data} />
          </div>
        ))}
      </div>
    </div>
    <div className='explore-btn'>
      <button onClick={() => navigate(`/world/ ${worldNames[currentWorld]} `)}>Explore Now</button>
    </div>
  </div>
  )
}

export default MyWorlds