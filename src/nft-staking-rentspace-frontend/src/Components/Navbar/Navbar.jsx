import React, { useState } from 'react'
import './Navbar.css'

const Navbar = () => {
  const [navItems, setItems]=useState(['Leaderboard', 'FAQ', 'My Worlds']);
  return (
    <div className='navbar-mainCont'>
    <div className='navbar-cont'>

      <div className='Logo-cont'>
      <img className='logo' src='RentSpace_logo_black(transp) 6.png'/>
      </div>
      <ul className='navItems-cont' >
         {navItems.map((item, ind)=>  <li> {item} </li>   )}
      </ul>

      <section className='connectBtn-mainCont'>
         <div className='connectBtn-cont'>
         <div className='btn1'> Connected </div>
         <div className='btn2'> <span>Connect Wallet </span></div>
         </div>
          
      </section>
    </div>
    </div>
  )
}

export default Navbar