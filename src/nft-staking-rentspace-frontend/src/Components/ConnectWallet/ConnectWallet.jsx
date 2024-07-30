import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUserData } from '../../utils/Redux-Config/UserSlice';
import { useAuth } from '../../utils/useAuthClient';
import './ConnectWallet.css'
import { Oval } from 'react-loader-spinner';

export const LoginBox = ({ setShowLoginBox, setIsLoading }) => {
  const { login, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const connectWallet = async (method) => {
    try {
      const actor = await login(method);
      console.log("Actor : ", actor)
      const userResponse = await actor.getUser();
      console.log("User Data:", userResponse);

      if (userResponse.err) {
        if (userResponse.err === "User Not Found") {
          navigate('register-user');
        }
      } else {
        console.log("User:", userResponse.ok);
        dispatch(addUserData(userResponse.ok));
        navigate('dashboard');
      }
    } catch (err) {
      console.log("Error in connecting:", err);
    }
  };

  const handleClick = async (method) => {
    console.log("authenticated", isAuthenticated)
    if (isAuthenticated.ii || isAuthenticated.plug) {
      setIsLoading(true);
      await logout();
      setIsLoading(false);
      setShowLoginBox(false)
    } else {
      setIsLoading(true);
      await connectWallet(method);
      setIsLoading(false)
      setShowLoginBox(false);
    }
  };

  return (
    <div className="pointer-box">
      <div className="pointer"></div>
      <div className="content">
        <div className='plug-wallet-cont'>
          <div onClick={() => handleClick('plug')} className='plug-wallet'>
            <img src='Assets/plug-wallet.png' alt="plug-wallet-logo" className='plug-wallet-img' />
            <span>Plug Wallet</span>
          </div>
        </div>
        <div onClick={() => handleClick('ii')} className='internet-identity-cont'>
          <div className='internet-identity'>
            <img src='Assets/icp.png' alt="icp-logo" className='icp-img' />
            <span>Internet Identity</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConnectWallet = () => {
  const [showLoginBox, setShowLoginBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  return (
    <section className='connectBtn-mainCont'>
      <div className='connectBtn-cont'>
        <div className='btn1'>{(isAuthenticated.ii || isAuthenticated.plug) ? 'Connected' : ''}</div>
        <div className='btn2' style={(isAuthenticated.ii || isAuthenticated.plug) ? { right: 0 } : {}}>
          {(isAuthenticated.ii || isAuthenticated.plug) ? <span onClick={logout}>Logout</span> : <span onClick={() => setShowLoginBox(true)}>{isLoading ? <Oval height={20} /> : 'Connect Wallet'}</span>}
        </div>
      </div>
      {showLoginBox && <LoginBox setShowLoginBox={setShowLoginBox} setIsLoading={setIsLoading} />}
    </section>
  )
}

export default ConnectWallet