import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './UserDashboard.css';
import ImportingNFTs from './ImportingNFTs';
import { useDispatch, useSelector } from 'react-redux';
import RedeemModal from '../../Modals/RedeemModal';
import FallbackUI_404 from '../../FallbackUI/FallbackUI_404';
import { useAuth } from '../../../utils/useAuthClient';
import { addUserData } from '../../../utils/Redux-Config/UserSlice';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportModule, setImportModule] = useState(false);
  const {isAuthenticated, actors} = useAuth();
  const dispatch = useDispatch()
  const user= useSelector((state) => state.user);

  const socialHandles = ['X.svg', 'Vector.svg', 'discord.svg', 'web.svg'];

  const handleImportModule = () => setImportModule(true);

  useEffect(()=>{
    const fetchUser = async () => {
      if(isAuthenticated && user === undefined) {
        const backendActor = actors.userActor;
        const userReq = await backendActor.getUser();
        if(userReq.ok) {
          dispatch(addUserData(userReq.ok))
        }
      }
    }
    fetchUser()
  }, [actors, isAuthenticated, user])

  return (
    <>
      {!user.name ? (
        <FallbackUI_404 />
      ) : (
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
                <img className='profile-img' src={'Assets/profileImg.jpg'} alt='Profile' />
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
                {socialHandles.map((imgLink, ind) => (
                  <img key={ind} src={`Assets/${imgLink}`} alt={`Social icon ${ind}`} />
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
                  <h1>{user.importedNFTs.length}</h1>
                </div>
                <div>
                  <h2
                    className='Nav-Nfts'
                    onClick={() => navigate('/Dashboard')}
                  >
                    Staked NFTs
                  </h2>
                  <h1>{user.stakedNFTs.length}</h1>
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
      )}

      {/* Importing NFTs Module */}
      {isImportModule && (
        <ImportingNFTs setImportModule={setImportModule} />
      )}

      {/* Redeem Rewards Modal */}
      {isModalOpen && (
        <RedeemModal isModalOpen={true} setIsModalOpen={setIsModalOpen} userID={user.id} rewardPoints={user.rewardPoints} />
      )}
    </>
  );
}

export default UserDashboard;
