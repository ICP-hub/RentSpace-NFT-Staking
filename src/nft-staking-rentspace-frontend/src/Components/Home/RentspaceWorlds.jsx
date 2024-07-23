import React from 'react';

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
            {worldsImg.map((img, ind) => <img key={ind} src={`Assets/Worlds&Villas/${img}`} alt={`World ${ind}`} />)}
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
            {VillasImg.map((img, ind) => <img key={ind} src={`Assets/Worlds&Villas/${img}`} alt={`Villa ${ind}`} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentspaceWorlds;
