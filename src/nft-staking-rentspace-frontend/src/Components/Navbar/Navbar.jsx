import React, { useState } from 'react'
import './Navbar.css'
import { useAuth } from '../../utils/useAuthClient';
import { useNavigate } from 'react-router-dom';
import { addUserData } from '../../utils/Redux-Config/UserSlice';
import { useDispatch } from 'react-redux';

const Navbar = () => {
  const [navItems, setItems]=useState(['Leaderboard', 'FAQ', 'My Worlds']);
  const navigate = useNavigate()
  const [isConnected, setConnected]= useState(false);
  const {login , actors} = useAuth()
  const dispatch = useDispatch()



  const connectWallet = async() => {
    try {
      const response = await login()
      let backendActor = (actors?.userActor == undefined) ? response : actors?.userActor;

      const userResponse = await backendActor.getUser();
      console.log("User Data : ", userResponse)

      if(userResponse.err) {
        if(userResponse.err === "User Not Found") {
          navigate('register-user')
        }
      }
      else {
        console.log("User : ",userResponse.ok)
        dispatch(addUserData(userResponse.ok))
        setConnected(true)
        navigate('Dashboard/userDashboard')
      }



    } catch(err) {
      // Pop Up
    }
  };

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
         <div className='btn1'>{ isConnected ? 'Connected' : '' }</div>
         <div onClick={connectWallet} className='btn2 ' style={isConnected ? { right:0 } : { }}> <span>Connect Wallet </span></div>
         </div>
          
      </section>
    </div>
    </div>
  )
}

export default Navbar