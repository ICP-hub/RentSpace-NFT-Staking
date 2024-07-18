import React from 'react'
import Card from '../../Card/Card';
import { NFTsData } from '../../../Constants/useNFTsData';
import { FaChevronLeft } from 'react-icons/fa';
// import { useSelector } from 'react-redux';

const ImportingNFTs = ({setImportModule}) => {
const { NFTs } = NFTsData();
// const selectImportArray=useSelector((store)=>store.ImportNfts)

 function handleImport(){
//    selectImportArray && console.log(selectImportArray)

    // logic for import nfts
 }

  return (
    <div className='importNfts-mainCont'>

       <div className='header-cont'>
       <FaChevronLeft className='favIcon' size={25} onClick={()=>  setImportModule(false)} />
         <div> <h1> Your NFTs  </h1></div>
       </div>
        <div className='importNfts-OuterCont  no-scrollbar'>
        <div className='importNfts-InnerCont'>
      { NFTs.map((NFT, ind) => <div className='nft-cont'> 
       <Card id={NFT.id} name = {NFT.metadata.name} imgURL = {NFT.metadata.url} desc = {NFT.metadata.description} purpose='import' />
        </div>   ) }
          </div>
        </div>
        <div className='ImportBtn'>
          <button onClick={handleImport}> Import NFTs </button>
       </div>
       </div>
  )
}

export default ImportingNFTs