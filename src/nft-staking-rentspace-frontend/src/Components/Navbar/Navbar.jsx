import React, { useState } from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/useAuthClient';
import { useDispatch } from 'react-redux';
import { addUserData } from '../../utils/Redux-Config/UserSlice';
import plugWalletLogo from "../../../public/Assets/plug-wallet.png"
import ICPlogo from "../../../public/Assets/icp.png"

const PointerBox = ({ handleClick }) => {

  return (
    <div className="pointer-box">
      <div className="pointer"></div>
      <div className="content">
        <div className='plug-wallet-cont'>
          <div onClick={handleClick} className='plug-wallet'>
            <img src={plugWalletLogo} alt="plug-wallet-logo" className='plug-wallet-img' />
            <span>Plug Wallet</span>
          </div>
        </div>
        <div onClick={handleClick} className='internet-identity-cont'>
          <div className='internet-identity'>
            <img src={ICPlogo} alt="icp-logo" className='icp-img' />
            <span>Internet Identity</span>
          </div>
        </div>
      </div>
    </div>
  );
};


const Navbar = () => {

  const { login, actors, isAuthenticated, logout } = useAuth();
  const [showLoginBox, setShowLoginBox] = useState(false);
  // const [isConnected, setConnected]= useState(isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const connectWallet = async () => {
    try {
      const response = await login()
      let backendActor = (actors?.userActor == undefined) ? response : actors?.userActor;

      const userResponse = await backendActor.getUser();
      console.log("User Data : ", userResponse)

      if (userResponse.err) {
        if (userResponse.err === "User Not Found") {
          navigate('register-user')
        }
      }
      else {
        console.log("User : ", userResponse.ok)
        dispatch(addUserData(userResponse.ok))
        navigate('dashboard')
      }
    } catch (err) {
      console.log("Error in connecting :", err)
    }
  };

  const handleClick = async () => {
    if (isAuthenticated) {
      // setConnected(false)
      await logout()
      setShowLoginBox(false)
    }
    else {
      // setConnected(true)
      await connectWallet()
      setShowLoginBox(false)
    }
  }

  // logic for logout and get response from backend
  function handleLogout() {
    const response = !isConnected     // demo value for testing

    setConnected(response)
  }


  return (
    <div className='navbar-mainCont'>
      <div className='navbar-cont'>

        <div className='Logo-cont' onClick={() => navigate('/')}>
          <img className='logo' src='Assets/rentSpaceLogo.png' />
        </div>
        <ul className='navItems-cont' >
          <li onClick={() => navigate('')} >Leaderboard</li>
          <li onClick={() => navigate('/faq')} > FAQ </li>
          <li onClick={() => navigate('/mySpaces')} > My Spaces </li>
        </ul>

        <section className='connectBtn-mainCont'>
          <div className='connectBtn-cont'>
            <div className='btn1'>{isAuthenticated ? 'Connected' : ''}</div>
            <div onClick={() => setShowLoginBox(true)} className='btn2 ' style={isAuthenticated ? { right: 0 } : {}}> {isAuthenticated ? <span onClick={handleClick}>Logout</span> : <span>Connect Wallet</span>} </div>
          </div>
        </section>
      </div>
      {showLoginBox && <PointerBox handleClick={handleClick} />}
    </div>
  )
}

export default Navbar