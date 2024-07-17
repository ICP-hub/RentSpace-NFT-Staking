import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NFTsData } from '../../../../Constants/useNFTsData';
import './NFTsComp.css'
// import { useAuth } from '../../../utils/useAuthClient';

const StakedNFTs = () => {
  // State variables
  const { NFTs } = NFTsData();
  const [stakedNFTs, setStakedNFTs] = useState([]);
  // const {actors}=useAuth()

  // Hooks
  const navigate = useNavigate();

  // Effect hook to filter staked NFTs
  useEffect(() => {
    const stakedNFTs = NFTs.filter((data) => data.staked);
    setStakedNFTs(stakedNFTs);
  }, [NFTs]);

  // Event handler for viewing NFT details
  function nftDetailsHandle(id, name, img) {
    navigate('/StakNftDetails', { state: { id, name, img } });
  }

  const getAllStakedNFTs=async()=>{
    await actors.userActor.getAllUserStakedNFTs().then(async(res)=>{
      const arr=[]
      console.log(res)
      if(res.ok?.length>0){
        for(let i=0;i<res.length;i++){
          let resp=await actors.userActor.getStakedNFTDetails(res[i][0])
          if(resp.err!=undefined) continue
          arr.push(resp.ok)
        }
        setStakedNFTs(arr)
      }  
    })
  }

  useEffect(()=>{
    getAllStakedNFTs()
  },[])

  // Render Method
  return (
    <div className='nft-Maincont'>

          {/*  Card containiner for NFTsinfo*/}
      <div className='nftOuter-Cont'>
      {stakedNFTs.map((nft, ind) => (
        <div className='nftCont' key={ind} onClick={() => nftDetailsHandle(nft.id, nft.name, nft.img)}>
          <div className='nftLogo-cont'> 
            <img src='RentSpace_logo_black(black).svg' alt='rentspace-logo' />
            <img src='LogoOnNfts-2.svg' alt='logo'/>
          </div>
          <div className='nftImg-cont'>
            <img src={`Worlds&Villas/${nft.img}`} alt='nft-img' />
          </div>
          <div className='VillasData-cont'>
          <h1>{nft.name}</h1>
          <h2> {nft.desc} </h2>
          <div className='btnCont'>
          <button> Claim Reward </button>
          <button> Unstake </button>
          </div>
          </div>
        </div>
      ))}
      </div>    
    </div>
  );
};

export default StakedNFTs;
