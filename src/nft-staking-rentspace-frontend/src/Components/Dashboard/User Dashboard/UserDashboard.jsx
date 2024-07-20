import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './UserDashboard.css';
import ImportingNFTs from './ImportingNFTs';
import RedeemModal from '../../Modals/RedeemModal';
import FallbackUI_404 from '../../FallbackUI/FallbackUI_404';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportModule, setImportModule] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  // Fetch user data and store into state
  useEffect(() => {
    // fetch get user data
    
    setUserInfo({
      name: 'Firstname Lastname',
      imgUrl: 'profileImg.jpg',
      email: 'xyz123@gmail.com',
      points: 25,
      importedNFT: 35,
      stakedNFT: 22,
    });

    setIsLoading(false);

  }, []);

  const socialHandles = ['X.svg', 'Vector.svg', 'discord.svg', 'web.svg'];

  const handleImportModule = () => setImportModule(true);

  return (
    <>
      {isLoading ? (
        ''
      ) : userInfo ? (
        <div
          className='userDashboard-cont'
          style={
            isImportModule || isModalOpen
              ? { filter: 'blur(3px)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)' }
              : {}
          }
        >
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
                {socialHandles.map((imgLink, ind) => (
                  <img key={ind} src={imgLink} alt={`Social icon ${ind}`} />
                ))}
              </div>
              <div className='NFTsCount-cont'>
                <div>
                  <h2
                    className='Nav-Nfts'
                    onClick={() => navigate('/Dashboard/importedNFTs')}
                  >
                    Imported NFTs
                  </h2>
                  <h1>{userInfo.importedNFT}</h1>
                </div>
                <div>
                  <h2
                    className='Nav-Nfts'
                    onClick={() => navigate('/Dashboard')}
                  >
                    Staked NFTs
                  </h2>
                  <h1>{userInfo.stakedNFT}</h1>
                </div>
              </div>
            </div>
            <div className='NFT_Reward-cont'>
              <div className='btn' onClick={handleImportModule}>
                Import NFT
              </div>
              <div className='btn' onClick={() => setIsModalOpen(true)}>
                Redeem Rewards
              </div>
            </div>
          </div>

          <div className='right-cont'>
            <Outlet />
          </div>
        </div>
      ) : (
        <FallbackUI_404 />
      )}

      {/* Importing NFTs Module */}
      {isImportModule && (
        <ImportingNFTs setImportModule={setImportModule} />
      )}

      {/* Redeem Rewards Modal */}
      {isModalOpen && (
        <RedeemModal isModalOpen={true} setIsModalOpen={setIsModalOpen} />
      )}
    </>
  );
}

export default UserDashboard;
