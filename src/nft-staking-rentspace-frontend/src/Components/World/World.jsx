
import React, { useState, useEffect } from 'react';
import "./World.css";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { NFTsData } from '../../Constants/useNFTsData';
import Card from '../Card/Card';
import { FaAngleLeft } from "react-icons/fa6";

const World = () => {
  const { world } = useParams();
  const { NFTs } = NFTsData();
  const [filteredWorlds, setFilteredWorlds] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const worldName = world.split("-").join(' ');
    const newFilteredWorlds = NFTs.filter(data =>
      data.metadata.name.toLowerCase().includes(worldName.split(' ')[0].toLowerCase())
    );
    console.log('called');
    setFilteredWorlds(newFilteredWorlds);
  }, [world, NFTs]);

  return (
    <div className='min-world-MainCont'>
      <div className='min-world-InnerCont'>
        <div className='worlds-navCont'>
          <div className='staking'>
            <FaAngleLeft size={15} onClick={() => navigate(-1)} />
            <span className='staking-header'>Staking</span>
          </div>
          <Link to={'/world/minimalistic-world'} className={'worlds-nav'}>Minimalistic World</Link>
          <Link to={'/world/modernistic-world'} className={'worlds-nav'}>Modernistic World</Link>
          <Link to={'/world/futuristic-world'} className={'worlds-nav'}>Futuristic World</Link>
          <Link to={'/world/moon-world'} className={'worlds-nav'}>Moon World</Link>
          <Link to={'/world/mars-world'} className={'worlds-nav'}>Mars World</Link>
        </div>
        <div className='cards-box'>
          <h2 className='world-name'>{world.split("-").join(' ')}</h2>
          <div className='cards-container'>
            {filteredWorlds.length > 0 ? filteredWorlds.map(NFT => (
              <Card key={NFT.metadata.name} name={NFT.metadata.name} imgURL={NFT.metadata.thumb} desc={NFT.metadata.description} />
            )) : <p>Sorry, No data found</p>}
          </div> 
        </div>
      </div>
    </div>
  );
}

export default World;
