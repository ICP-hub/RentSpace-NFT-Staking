import React from 'react'
import "./World.css"
import {NavLink, useParams, useNavigate} from 'react-router-dom'
import { NFTsData } from '../../Constants/useNFTsData'
import Card from '../Card/Card'
import { FaAngleLeft } from "react-icons/fa6";


const World = () => {
  const {world} = useParams();
  const {NFTs, setNFTs} = NFTsData();
  const worldName = world.split("-").join(' ')
  const filteredWorlds = NFTs.filter(data=>data.metadata.name.toLocaleLowerCase().includes(worldName.split(' ')[0].toLowerCase()))
  const navigate = useNavigate();
  return (
    <div className='min-world-MainCont'>
      <div className='min-world-InnerCont'>
        <div className='worlds-navCont'>
          <div className='staking'>
          <FaAngleLeft size={15}/>
          <span className='staking-header'>Staking</span>
          </div>
          
          <NavLink to={'/world/minimalistic-World'} className={'worlds-nav'}>Minimalistic World</NavLink>
          <NavLink to={'/world/modernistic-World'} className={'worlds-nav'}>Modernistic World</NavLink>
          <NavLink to={'/world/futuristic-World'} className={'worlds-nav'}>Futuristic World</NavLink>
          <NavLink to={'/world/moon-World'} className={'worlds-nav'}>Moon World</NavLink>
          <NavLink to={'/world/mars-World'} className={'worlds-nav'}>Mars World</NavLink>
        </div>
        <div className='cards-box'>
          <h2 className='world-name'>{world.split("-").join(' ')}</h2>
          <div className='cards-container'>

          {filteredWorlds.length > 0 ? filteredWorlds.map(NFT => (
            <Card name = {NFT.metadata.name} imgURL = {NFT.metadata.thumb} desc = {NFT.metadata.description}/>
          )) : <p>Sorry, No data found</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default World