import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { NFTsData } from '../../../Constants/useNFTsData';
import { formatMetadata } from '../../../utils/utils';
import { useAuth } from '../../../utils/useAuthClient';
import Loader from '../../Loader'
import { Principal } from '@dfinity/principal';
import { HashLoader } from 'react-spinners';

const StakedNFTs = () => {
  // State variables
  const { NFTs } = NFTsData();
  const [stakedNFTs, setStakedNFTs] = useState([]);
  const {actors}=useAuth()
  const [isLoading,setLoading] = useState(true)

  // Hooks
  const navigate = useNavigate();

  const getUserStakedNFTs = async () => {
    try {
      // Fetch all imported NFT IDs
      const stakedNFTs = await actors.userActor.getAllUserStakedNFTs();
      const stakedNFTIDs = await stakedNFTs?.ok;

      // Fetch details of each staked NFT
      const stakedNFTDetailsPromises = stakedNFTIDs.map(id => {

        const _nftDetail = actors.userActor.getStakedNFTDetails(id).then(res =>{
          if(res.ok){
            const nftDetail = res.ok;
            nftDetail.metadata = formatMetadata(nftDetail.metadata);
            console.log("Owner Principal : ", nftDetail.owner.toText())
            return nftDetail;
          }
          else {
            throw new Error('Error fetching staked NFT details');
          }
        })

        return _nftDetail;
      }
      );

      // Wait for all promises to resolve and return the result
      const NFTDetails = await Promise.all(stakedNFTDetailsPromises);
      setLoading(false)
      return NFTDetails;
    } catch (error) {
      console.error('Error fetching staked NFTs:', error);
      throw error;
    }
  };

  // Effect hook to filter staked NFTs
  useEffect(() => {
    const fetchData = async () => {
      const stakedNFTs = await getUserStakedNFTs()
      console.log("Staked : ",stakedNFTs)
      setStakedNFTs(stakedNFTs)
    };
    fetchData();
  }, [NFTs]);

  // Event handler for viewing NFT details
  function nftDetailsHandle(id, name, img, desc) {
    navigate('/StakNftDetails', { state: { id, name, img, desc } });
  }

  // const getAllStakedNFTs=async()=>{
  //   await actors.userActor.getAllUserStakedNFTs().then(async(res)=>{
  //     const arr=[]
  //     console.log(res)
  //     if(res.ok?.length>0){
  //       for(let i=0;i<res.length;i++){
  //         let resp=await actors.userActor.getStakedNFTDetails(res[i][0])
  //         if(resp.err!=undefined) continue
  //         arr.push(resp.ok)
  //       }
  //       setStakedNFTs(arr)
  //     }  
  //   })
  // }

  // useEffect(()=>{
  //   getAllStakedNFTs()
  // },[])

  // Render Method
  return (
    <div className='nft-Maincont'>
      {isLoading && <HashLoader color='#fff'/>}
        {(!isLoading && stakedNFTs.length>0) && stakedNFTs.map(((nft, ind) => (
          <div className='nftCont' key={ind} onClick={() => nftDetailsHandle(nft.id, nft.metadata.name, nft.metadata.thumb, nft.metadata.description)}>
            <div className='nftImg-cont'>
              <img src={nft.metadata.thumb} alt='nft-image' />
            </div>
            <h1>{nft.metadata.name}</h1>
          </div>
        )))}
        {(!isLoading && stakedNFTs.length===0) && <h1 className='no-nft'>No Staked NFTs</h1>}
    </div>
  );
};

export default StakedNFTs;
