import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NFTsComp.css';
import Card from '../../../Card/Card';
import FallbackUI from '../../../FallbackUI/FallbackUI';
import FallbackUI_NFTs from '../../../FallbackUI/FallbackUI_NFTs';
import { useAuth } from '../../../../utils/useAuthClient';
import { formatMetadata } from '../../../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { addStakedNFTs } from '../../../../utils/Redux-Config/NftsSlice';
import { Hourglass } from 'react-loader-spinner';

const StakedNFTs = () => {
  const { actors, principal } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const stakedNFTs = useSelector((state) => state.Nfts.stakedNFTs);
  const [cardElements, setCardElements] = useState(<></>);
  const navigate = useNavigate();

  const filterStakedNFTs = async () => {
    setIsLoading(true)
    try {
      const backendActor = actors?.userActor;
      const stakedNFTDetails = await backendActor.getUserStakedNFTs();
      console.log("Req : ", stakedNFTDetails.ok);

      if (stakedNFTDetails.ok) {
        dispatch(addStakedNFTs(stakedNFTDetails.ok));
      } else {
        throw new Error("No staked NFTs found.");
      }
    } catch (err) {
      console.error("Error fetching staked NFTs: ", err);
      setError(err.message || "Failed to fetch staked NFTs.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (principal) {
      filterStakedNFTs();
    }
  }, [principal, actors]);

  useEffect(() => {
    const renderCardElements = () => {
      const elements = stakedNFTs.map((NFT, ind) => (
        <div key={ind}>
          {NFT[0]?.id && (
            <Card
              id={NFT[0].id}
              name={formatMetadata(NFT[0].metadata).name}
              imgURL={formatMetadata(NFT[0].metadata).thumb} // Adjusted key for image URL
              desc={formatMetadata(NFT[0].metadata).description}
              isStaked={NFT[0].isStaked}
              isImported={!NFT[0].isStaked}
              onClick={() => nftDetailsHandle(NFT[0].id, formatMetadata(NFT[0].metadata).name, formatMetadata(NFT[0].metadata).thumb)}
            />
          )}
        </div>
      ))
      setCardElements(elements)
    }

    renderCardElements()
  }, [stakedNFTs])

  console.log("Elements : ", cardElements);

  const nftDetailsHandle = (id, name, img) => {
    navigate('/StakNftDetails', { state: { id, name, img } });
  };

  return (
    <>
      {isLoading ? (
        <Hourglass visible={isLoading} ariaLabel='hourglass-loading' height={80} width={80} wrapperClass='loader' colors={['#0288e9', '#00b1fd']} /> // Render this during loading
      ) : error ? (
        <FallbackUI purpose='Error' message={error} /> // Render this on error
      ) : stakedNFTs.length > 0 ? (
        <div className='nft-Maincont'>
          <h1>Staked NFT</h1>
          <div className='nftOuter-Cont'>
            {/* {stakedNFTs.map((NFT, ind) => (
              <div key={ind}>
                {NFT[0]?.id && (
                  <Card
                    id={NFT[0].id}
                    name={formatMetadata(NFT[0].metadata).name}
                    imgURL={formatMetadata(NFT[0].metadata).thumb} // Adjusted key for image URL
                    desc={formatMetadata(NFT[0].metadata).description}
                    isStaked={NFT[0].isStaked}
                    isImported={!NFT[0].isStaked}
                    onClick={() => nftDetailsHandle(NFT[0].id, formatMetadata(NFT[0].metadata).name, formatMetadata(NFT[0].metadata).thumb)}
                  />
                )}
              </div>
            ))} */}
            {cardElements}
          </div>
        </div>
      ) : (
        <FallbackUI purpose='Staked' /> // Render this when no NFTs are found
      )}
    </>
  );
};

export default StakedNFTs;
