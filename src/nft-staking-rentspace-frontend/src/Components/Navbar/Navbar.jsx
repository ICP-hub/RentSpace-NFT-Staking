import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import IMGComp from '../IMGComp';
import ConnectWallet from '../ConnectWallet/ConnectWallet';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='navbar-mainCont'>
      <div className='navbar-cont'>
        <div className='Logo-cont' onClick={() => navigate('/')}>
          < IMGComp src='Assets/rentSpaceLogo.png' hashVal="L5GvL=?G00xu^jxaWUWB00xt~qa}" className='logo' height='' width='' />
        </div>
        <ul className='navItems-cont'>
          <li onClick={() => navigate('/mySpaces')}> My Spaces </li>
          <li onClick={() => navigate('')}>Leaderboard</li>
          <li onClick={() => navigate('/faq')}> FAQ </li>
          <li onClick={() => navigate('/Dashboard')}>Cabinet</li>

        </ul>
        <ConnectWallet />
      </div>
    </div>
  );
};

export default Navbar;
