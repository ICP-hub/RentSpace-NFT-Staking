import React, { useState } from 'react'
import './myWorlds.css'
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";


const MyWorlds = () => {
    const [currentWorld, setCurrent] = useState(0);
    const Navigate= useNavigate();

    const worldNames = ['Minimalistic world', 'Modernistic world', 'Futuristic world', 'Moon World'];
    const worldsIMG = [
        'image 803.png',
        'image 1726.png',
        'image 803.png',
        'image 1717.png'
    ];

    const prevWorld = () => {
        setCurrent(currentWorld === 0 ? worldsIMG.length - 1 : currentWorld - 1);
    }

    const nextWorld = () => {
        setCurrent(currentWorld === worldsIMG.length - 1 ? 0 : currentWorld + 1);
    }

    return (
        <div className='myWorlds-MainCont'>
            <div className='myWorlds-Cont'>
                <div className='carousel-btn'>
                 <FaChevronLeft className='favIcon' size={25} onClick={prevWorld}/>
                    <h1>{worldNames[currentWorld]}</h1>
                    <FaChevronRight className='favIcon'  size={25}  onClick={nextWorld}/>
                </div>
                <div className='myWorlds '>
                    <img src={worldsIMG[currentWorld]} alt={worldNames[currentWorld]} />
                    <div className='explore-btn '>
                    <button onClick={() => Navigate('/userDashboard')}>Explore</button>
                  </div>
                </div>
                  
                  
            </div>
        </div>
    )
}

export default MyWorlds
