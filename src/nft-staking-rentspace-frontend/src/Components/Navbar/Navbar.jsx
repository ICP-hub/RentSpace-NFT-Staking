import React, { useState } from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [navItems, setItems]=useState(['Leaderboard', 'FAQ', 'My Worlds']);
  const [isConnected, setConnected]= useState(false);
  const navigate = useNavigate();


  function ConnectWallet(){
    // logic for wallet connection and get response
     const response = !isConnected     // demo value

    setConnected(response)
  }

  return (
    <div className='navbar-mainCont'>
    <div className='navbar-cont'>

      <div className='Logo-cont' onClick={()=> navigate('/')}>
      <img className='logo' src='RentSpace_logo_black(transp) 6.png'/>
      </div>
      <ul className='navItems-cont' >
         {navItems.map((item, ind)=>  <li> {item} </li>   )}
      </ul>

      <section className='connectBtn-mainCont'>
         <div className='connectBtn-cont'>
         <div className='btn1'>{ isConnected ? 'Connected' : '' }</div>
         <div onClick={ConnectWallet} className='btn2 ' style={isConnected ? { right:0 } : { }}> <span>{isConnected ? 'Logout' : 'Connect Wallet'} </span></div>
         </div>
          
      </section>
    </div>
    </div>
  )
}

export default Navbar