import React, { useState } from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const [isConnected, setConnected]= useState(false);
  const navigate = useNavigate();

  // logic for wallet connection and get response from backend
  function ConnectWallet(){
     const response = !isConnected     // demo value for testing

    setConnected(response)
  }

    // logic for logout and get response from backend
   function handleLogout(){
     const response = !isConnected     // demo value for testing

    setConnected(response)
   }


  return (
    <div className='navbar-mainCont'>
    <div className='navbar-cont'>

      <div className='Logo-cont' onClick={()=> navigate('/')}>
      <img className='logo' src='RentSpace_logo_black(transp) 6.png'/>
      </div>
      <ul className='navItems-cont' >
         <li onClick={()=> navigate('') } >Leaderboard</li>
         <li onClick={()=> navigate('/faq') } > FAQ </li>
         <li onClick={()=> navigate('/mySpaces') } > My Spaces </li>
      </ul>

      <section className='connectBtn-mainCont'>
         <div className='connectBtn-cont'>
         <div className='btn1'>{ isConnected ? 'Connected' : '' }</div>
         <div  className='btn2 ' style={isConnected ? { right:0 } : { }}>
          { isConnected ? <button onClick={handleLogout}> Logout </button> : <button onClick={ ConnectWallet } >Connect Wallet </button> }
           </div>
         </div>
          
      </section>
    </div>
    </div>
  )
}

export default Navbar