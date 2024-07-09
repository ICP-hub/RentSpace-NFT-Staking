import React, { useEffect, useState } from 'react';
import './UserDashboard.css';
import { useLocation } from 'react-router-dom';
import { FaTwitter, FaMedium, FaDiscord } from "react-icons/fa";
import { TbWorldCheck } from "react-icons/tb";
import ImportedNFTs from './NFTsComp/ImportedNFTs';
import StakedNFTs from './NFTsComp/StakedNFTs';
import { NFTsData } from '../../Constants/useNFTsData';
import { useAuth } from '../../utils/useAuthClient';
import { formatMetadata } from '../../utils/utils';

const UserDashboard = () => {
    const location = useLocation();
    const { NFTs, setNFTs } = NFTsData();
    const { actors } = useAuth();
    const [switchSection, setSwitchSection] = useState(false);
    const [userData, setUserData] = useState({
        name: "Xyz Gupta",
        email: "xyz@gmail.com",
        rewardPoints: 0
    });

    const [assetsData, setAssetsData] = useState([
        { 'Volume Traded': '' },
        { 'Items': null },
        { 'Imported NFT': null },
        { 'Staked NFT': null }
    ]);

    useEffect(() => {
        const importedNfts = NFTs.filter(data => !data.staked);
        const stakedNfts = NFTs.filter(data => data.staked);
        setAssetsData([
            { 'Volume Traded': '10k' },
            { 'Items': NFTs.length },
            { 'Imported NFT': importedNfts.length },
            { 'Staked NFT': stakedNfts.length }
        ]);
    }, [NFTs]);

    const getUserInfo = async () => {
        try {
            const res = await actors.userActor.getUserData();
            setUserData(res.ok);
        } catch (error) {
            console.error("Failed to fetch user data", error);
        }
    };

    useEffect(() => {
        getUserInfo();
        console.log(formatMetadata());
    }, []);

    return (
        <div className='dashboard-cont'>
            <div className='bgText-cont'>
                <div className='text-cont'>
                    <h1>Rentspace NFT</h1>
                    <h1>Staking</h1>
                </div>
            </div>

            <div className='content-cont'>
                <div className='userData-cont'>
                    <div className='userData-col1'>
                        <div className='profilePic-cont'>
                            <img src={'profileLogo.png'} className='profile-img' alt='profilePic' />
                        </div>
                        <div>
                            <h1 className='username-text'>{userData.name}</h1>
                            <div className='socialHandle-cont'>
                                <FaTwitter />
                                <FaMedium />
                                <FaDiscord />
                                <TbWorldCheck />
                            </div>
                            <h1 className='email-text'>{userData.email}</h1>
                            <p className='extra-info'>Total points earned: {parseInt(userData.rewardPoints)}</p>
                        </div>
                    </div>

                    <div className='userData-col2'>
                        {assetsData.map((data, ind) => (
                            <div className='assetsData-cont' key={ind}>
                                <h2>{data[Object.keys(data)[0]]}</h2>
                                <h1>{Object.keys(data)[0]}</h1>
                            </div>
                        ))}
                    </div>

                    <div className='NFTSection-btn'>
                        <h1 onClick={() => setSwitchSection(false)} className={!switchSection ? 'bg-black ' : ''}>
                            Imported NFTs
                        </h1>
                        <h1 onClick={() => setSwitchSection(true)} className={switchSection ? 'bg-gray-500' : ''}>
                            Staked NFTs
                        </h1>
                    </div>
                </div>

                {switchSection ? <StakedNFTs /> : <ImportedNFTs />}
            </div>
        </div>
    );
};

export default UserDashboard;
