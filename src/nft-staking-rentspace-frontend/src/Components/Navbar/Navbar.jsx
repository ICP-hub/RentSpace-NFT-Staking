import React, { useState } from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const [isConnected, setConnected]= useState(false);
  const navigate = useNavigate();
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

  const handleClick = async () => {
    if(isConnected) {
      setConnected(false)
      await logout()
    }
    else {
      connectWallet()
    }
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
         <div onClick={handleClick} className='btn2 ' style={isConnected ? { right:0 } : { }}> <span>{isConnected ? 'Logout' : 'Connect Wallet'} </span></div>
         </div>
          
      </section>
    </div>
    </div>
  )
}

export default Navbar