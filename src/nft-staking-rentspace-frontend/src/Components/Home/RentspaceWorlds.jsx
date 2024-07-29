import React from 'react';
import IMGComp from '../IMGComp';

const RentspaceWorlds = () => {
  const worldsImg = ['minimilistic.png', 'modernistic.png', 'futuristic.png', 'moon.png', 'mars.png'];
  const VillasImg = ['minimilistic-Villa.png', 'modernistic-Villa.png', 'futuristic-Villa.png', 'Moon-Villa.png', 'Mars-Villa.png'];

  return (
    <div className='MainCont'>
      <div className='tagline-cont'>
        <p>Elevate your digital portfolio with our cutting-edge NFT staking platform. At RentSpace, creativity meets functionality, allowing you to harness the power of multi-chain technology.</p>
      </div>

      <div className='RentSpaceWorlds-Cont'>
        <h1 className='Heading'>RentSpace Worlds</h1>
        <div className='RentSpaceWorlds'>
          <div className='worldsImg'>
          {worldsImg.map((img, ind) => < IMGComp src={`Assets/Worlds&Villas/${img}`} hashVal="L6A-3E%w0001%yxuICM{00IE%e_K" className='world' height='' width='' /> )}
          </div>

          <div className="timeline-cont">
            <div className="timeline-item">
              <p>2020s</p>
              <div className="timeline-circle"></div>
            </div>
            <div className="timeline-line"></div>
            <div className="timeline-item">
              <p>2030s</p>
              <div className="timeline-circle"></div>
            </div>
            <div className="timeline-line"></div>
            <div className="timeline-item">
              <p>2040s</p>
              <div className="timeline-circle"></div>
            </div>
            <div className="timeline-line"></div>
            <div className="timeline-item text-center">
              <p>2050s</p>
              <div className="timeline-circle"></div>
            </div>
            <div className="timeline-line"></div>
            <div className="timeline-item">
              <p>2060s</p>
              <div className="timeline-circle"></div>
            </div>
          </div>

          <div className='villasImg'>
          {VillasImg.map((img, ind) => < IMGComp src={`Assets/Worlds&Villas/${img}`} hashVal="L6B|QlEA00v|_4xu9FRj00$w~Ckr" className='villa' height='' width='' /> )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentspaceWorlds;
