import React, { useEffect, useState } from 'react';
import './UserDashboard.css'
import { Outlet, useLocation } from 'react-router-dom';
import { FaXTwitter } from "react-icons/fa6";
import { FaMedium, FaDiscord } from "react-icons/fa";
import { TbWorldCheck } from "react-icons/tb";
import ImportedNFTs from './NFTsComp/ImportedNFTs';
import StakedNFTs from './NFTsComp/StakedNFTs';
import { NFTsData } from '../../Constants/useNFTsData';
import { useAuth } from '../../utils/useAuthClient';
import { convertPrincipalToAccountIdentifier, formatMetadata, convertPointstoICP } from '../../utils/utils';
import NFTProvider, { useImportNFTData } from '../../Context/NFTContext';


const ConversionTable =()=>{
  return(
    <div className='w-full'>
      <table className='w-full text-white'>
        <thead>
          <tr>
            <th>Rarity</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Common</td>
            <td>1</td>
          </tr>
          <tr>
            <td>Uncommon</td>
            <td>2</td>
          </tr>
          <tr>
            <td>Rare</td>
            <td>3</td>
          </tr>
          <tr>
            <td>Epic</td>
            <td>4</td>
          </tr>
          <tr>
            <td>Legendary</td>
            <td>5</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const Form = (props)=>{
  const [points, setPoints] = useState(0)
  const {actors} = useAuth()
  
  const handleChange = (e) =>{
    setPoints(e.target.value)
  }

  const MIN_REQ_POINTS = 10

  const handleSubmit = async(e)=>{
    e.preventDefault()
    if(points < MIN_REQ_POINTS){
      alert('Minimum 10 points required for redemption.')
      return
    }
    try{
      const transfer = await actors.userActor.claimPoints(parseInt(points))
      if(transfer?.ok) {
        alert("Transfered Success!")
      }
      else {
        throw new Error(transfer?.err)
      }
    }
    catch(e) {
      alert(e);
    }
  }

  return(
    <div class="control flex flex-col justify-between items-center gap-4">
      <label for="track">Amount to Redeem</label>
      <input className="accent-[#180a55]"
      id="track" type="range" min="0" max={props.points} value={points} onChange={handleChange} />
      <input type = "number" value={points} disabled='true' aria-disabled='true'
      className='bg-slate-300 border-2 border-[#180a55] text-center '
      />
      <input type="submit"
      onClick={handleSubmit}
      value = "Redeem" className='bg-[#180a55] w-[80%] py-4 text-white rounded-md cursor-pointer'/>
    </div>
  )
}

const Modal =({points})=>{
  return(
    <div
      popover="auto" id="disclose"
      className='disclosure absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
    >
      <header className='flex flex-row justify-between items-center w-full  px-4 border-b-[1px]'>
        <h1 className='text-white font-bold'>Redeem Rewards</h1>
        <button  popovertarget="disclose" popovertargetaction="close"
        className='bg-transparent border-none w-fit focus:outline-none focus:border-none focus:ring-0 text-2xl cursor-pointer'
        >
          <span aria-hidden="true" className='text-white'>x</span>
        </button>
      </header>
      <div className = 'w-full flex flex-row justify-between items-center px-4'>
        <div className=' bg-[#180a55] rounded-md p-2 w-44 text-white'>
          <p className='text-center'>Total Rewards Points</p>
          <p className='text-center'>{points.toString()}</p>
        </div>
        <div className=' bg-[#180a55] rounded-md p-2 w-44 text-white'>
          <p className='text-center'>Points Worth</p>
          <p className='text-center'>{convertPointstoICP(points).toString()} ICP</p>
        </div>
      </div>
      <div className='flex flex-row justify-between items-start w-full px-4 h-full py-3'>
        <div className='w-1/2'>
          <Form points={points}/>
        </div>
        <div className='w-1/2 flex flex-col gap-6'>
          <ConversionTable/>
          <div className='p-4 w-full border-red-600 border-2 bg-slate-300 rounded-md'>
            <p className='text-red-500'>Note : Minimum 10 points required for redemption.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const UserDashboard = () => {
  const location = useLocation();
  const { NFTs, setNFTs } = NFTsData();
  const { NFTData, setNFTData } = useImportNFTData();
  const { actors } = useAuth()
  // Access userData from location.state if it exists
  // const userData = location.state && location.state.userData;
  const [switchSection, setSwitchSection] = useState(false)
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    rewardPoints: 0
  })

  const [AssetsData, setAssetsData] = useState([{ 'Volume Traded': '' }, { 'Items': null }, { 'imported NFT': null }, { 'Staked NFT': null }])

  useEffect(() => {
    const importedNfts = NFTs.filter((data, ind) => data.staked !== true)
    const stakedNfts = NFTs.filter((data, ind) => data.staked === true)
    setAssetsData((prev) => [{ 'Volume Traded': '10k' }, { 'Items': NFTs.length }, { 'imported NFT': importedNfts.length }, { 'Staked NFT': stakedNfts.length }])
    console.log(actors.userActor.getUserData().then((res) => res.ok))
  }, [])

  const getUserInfo = async () => {
    await actors.userActor.getUserData().then((res) => {
      console.log(res)
      setUserData(res.ok)
    })
  }
  
  const {principal} = useAuth()
  const importNFTs = async () => {
    console.log("Import Clicked")
    try{
      const aid = await convertPrincipalToAccountIdentifier(principal)
      console.log(aid)
      const importNFTReq = await actors.userActor.importNewNFT(aid)
      const importNFTResponse = await importNFTReq?.ok
      console.log(importNFTReq)
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getUserInfo()
    // console.log(formatMetadata())
  }, [userData])

  return (
    <div className='dashboard-cont'>
      <div className='bgText-cont'>
        <div className='text-cont'>
          <h1>Rentspace NFT </h1>
          <h1> Staking</h1>
        </div>
      </div>

      <div className='Content-cont'>
        <div className='userData-cont'>
          <div className='userData-col1'>
            <div className='profilePic-cont'>
              <img src={'profileLogo.png'} className='profile-img' alt='profilePic' />
            </div>
            <div>
              <h1 className='username-text'> {userData?.name}</h1>
              <div className='socialHandle-cont'>
                <FaXTwitter />
                <FaMedium />
                <FaDiscord />
                <TbWorldCheck />
              </div>
              <h1 className='email-text'>{userData?.email}</h1>
              <p className='extra-info'>Total points earned : {parseInt(userData?.rewardPoints)}</p>
              <div className='flex flex-row justify-between gap-4'>
              <button
                className='flex items-center bg-violet-500 hover:bg-violet-600
                 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300
                 text-white rounded-full cursor-pointer transition-all duration-300 ease-in-out'
                onClick={importNFTs}>
                <p className='text-center w-full'>Import NFTs</p>
              </button>
              <button
              popovertarget="disclose"
              popovertargetaction="toggle"
              className = 'flex items-center bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 text-white rounded-full cursor-pointer transition-all duration-300 ease-in-out'>
                <p className='text-center w-full'>Redeem Rewards</p>
              </button>
              </div>
            </div>
          </div>

          <Modal points = {userData?.rewardPoints}/>

          <div className='userData-col2'>
            {
              AssetsData.map((data, ind) => {
                return <div className='assestsData-cont'>
                  <h2> {data[Object.keys(data)]}  </h2>  <h1> {Object.keys(data)} </h1>

                </div>
              })
            }

          </div>

          <div className='flex justify-start items-center gap-8 w-screen py-4'>
            <h1 onClick={() => setSwitchSection(false)} className={!switchSection && 'border-white rounded-full border-[1px] p-2 cursor-pointer'} >Imported NFTs</h1>
            <h1 onClick={() => setSwitchSection(true)} className={switchSection && 'border-white rounded-full border-[1px] p-2 cursor-pointer'}>Staked NFTs</h1>

          </div>

        </div>
        <NFTProvider>
          {
            !switchSection ? <ImportedNFTs />
              :
              <StakedNFTs />
          }
        </NFTProvider>

      </div>


    </div>
  );
};

export default UserDashboard;
