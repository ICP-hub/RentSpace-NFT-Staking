import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import ConnectWallet from '../ConnectWallet/ConnectWallet';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='navbar-mainCont'>
      <div className='navbar-cont'>
        <div className='Logo-cont' onClick={() => navigate('/')}>
          <img className='logo' src='Assets/rentSpaceLogo.png' />
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
