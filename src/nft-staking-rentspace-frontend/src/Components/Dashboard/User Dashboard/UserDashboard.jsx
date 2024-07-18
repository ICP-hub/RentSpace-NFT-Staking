import React, { useState } from 'react';
import './UserDashboard.css';
import StakedNFTs from './NFTsComp/StakedNFTs';
import { useSelector } from 'react-redux';

const UserDashboard = () => {
  // const [userInfo] = useState({
  //   name: 'Firstname Lastname',
  //   imgUrl: 'profileImg.jpg',
  //   email: 'xyz123@gmail.com',
  //   points: 25,
  //   importedNFT: 35,
  //   stakedNFT: 22,
  // });

  const user = useSelector((state) => state.user);
  console.log("User Red : ",user)

  const socialHandle=['X.svg','Vector.svg','discord.svg','web.svg']

  return (
    <div className='userDashboard-cont'>
      <div className='left-cont'>
        <div className='userInfo-cont'>
          <div className='profile-cont'>
          <img className='profile-img' src={'profileImg.jpg'} alt='Profile' />
          </div>
         
          <div className='userInfo'>
            <h1>{user.name}</h1>
            <h2>{user.email}</h2>
          </div>
          <div className='points-cont'>
            <h1>Total Points</h1>
            <h1>{user.rewardPoints.toString()}</h1>
          </div>
          <div className='social-cont'>
            {
              socialHandle.map((imgLink,ind)=> <img src={imgLink} /> )
            }
          </div>
          <div className='NFTsCount-cont'>
            <div>
              <h2>Imported NFTs</h2>
              <h1>{user.importedNFTs.length}</h1>
            </div>
            <div>
              <h2>Staked NFTs</h2>
              <h1>{user.stakedNFTs.length}</h1>
            </div>
          </div>
        </div>
        <div className='NFT_Reward-cont'>
           <div className='btn'> Import NFT </div>
           <div className='btn'> Redeem Rewards </div>
        </div>
      </div>

      <div className='right-cont'>
        <StakedNFTs/>
      </div>
    </div>
  );
}

export default UserDashboard;
