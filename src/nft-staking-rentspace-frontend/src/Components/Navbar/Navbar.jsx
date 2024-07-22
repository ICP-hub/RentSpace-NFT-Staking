import React, { useState } from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/useAuthClient';
import { useDispatch } from 'react-redux';
import { addUserData } from '../../utils/Redux-Config/UserSlice';

const Navbar = () => {

  const {login , actors, isAuthenticated, logout} = useAuth()
  // const [isConnected, setConnected]= useState(isAuthenticated);
  const navigate = useNavigate();
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
        navigate('dashboard')
      }
    } catch(err) {
      console.log("Error in connecting :", err)
    }
  };

  const handleClick = async () => {
    if(isAuthenticated) {
      // setConnected(false)
      await logout()
    }
    else {
      // setConnected(true)
      await connectWallet()
    }
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
         <div className='btn1'>{ isAuthenticated ? 'Connected' : '' }</div>
         <div onClick={handleClick} className='btn2 ' style={isAuthenticated ? { right:0 } : { }}> <span>{isAuthenticated ? 'Logout' : 'Connect Wallet'} </span></div>
         </div>
          
      </section>
    </div>
    </div>
  )
}

export default Navbar