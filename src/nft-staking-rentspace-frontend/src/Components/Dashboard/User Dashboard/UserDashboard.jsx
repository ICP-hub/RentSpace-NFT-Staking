import React, { useState } from 'react';
import './UserDashboard.css';
import { Outlet } from 'react-router-dom';
import ImportingNFTs from './ImportingNFTs';


const UserDashboard = () => {
 
  const [isImportModule, setImportModule]= useState(false);
  const [userInfo] = useState({
    name: 'Firstname Lastname',
    imgUrl: 'profileImg.jpg',
    email: 'xyz123@gmail.com',
    points: 25,
    importedNFT: 35,
    stakedNFT: 22,
  });
  const socialHandle=['X.svg','Vector.svg','discord.svg','web.svg']

  function handle_ImportModule(){
     setImportModule(true)
  }

  return (
    <>
   <div  className='userDashboard-cont'  style={isImportModule ? { filter: 'blur(3px)',  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)' } : {}}>
      <div className='left-cont'>
        <div className='userInfo-cont'>
          <div className='profile-cont'>
          <img className='profile-img' src={userInfo.imgUrl} alt='Profile' />
          </div>
         
          <div className='userInfo'>
            <h1>{userInfo.name}</h1>
            <h2>{userInfo.email}</h2>
          </div>
          <div className='points-cont'>
            <h1>Total Points</h1>
            <h1>{userInfo.points}</h1>
          </div>
          <div className='social-cont'>
            {
              socialHandle.map((imgLink,ind)=> <img src={imgLink} /> )
            }
          </div>
          <div className='NFTsCount-cont'>
            <div>
              <h2>Imported NFTs</h2>
              <h1>{userInfo.importedNFT}</h1>
            </div>
            <div>
              <h2>Staked NFTs</h2>
              <h1>{userInfo.stakedNFT}</h1>
            </div>
          </div>
        </div>
        <div className='NFT_Reward-cont'>
           <div className='btn' onClick={handle_ImportModule}> Import NFT </div>
           <div className='btn'> Redeem Rewards </div>
        </div>
      </div>
      <div className='right-cont'>
        <Outlet/>
      </div>

     
    </div>


    { /* ImportNfts Module */ }

    {
      isImportModule &&
      <ImportingNFTs setImportModule={setImportModule} />
    
    }
    </>
  );
}

export default UserDashboard;
