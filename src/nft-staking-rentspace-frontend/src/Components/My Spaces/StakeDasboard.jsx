import React, { useState } from 'react';
import YourVillas from './YourVillas';

const StakeDashboard = () => {
    const [nftStakeInfo, setInfo] = useState([
        { 'Numbers of Villas Staked': 300 },
        { 'Daily points earned': 500 },
        { 'Total points farmed': 4 },
        { 'You are in the top': '10%' }
    ]);

    return (
        <div className='StakeDashboard-cont'>
            <h1 className='heading'>NFT Staking Dashboard</h1>
            <div className='NFTInfo-cont'>
                {nftStakeInfo.map((data, index) => {
                    const key = Object.keys(data)[0];
                    const value = data[key];
                    return (
                        <div  className='NFTInfo' key={index}>
                            
                            <div>
                            <h2>{key}</h2>
                            <p>{value}</p>
                            </div>
                            {(index >= 0 && index < nftStakeInfo.length-1) && <div className='verticalLine'></div>}
                        </div>
                    );
                })}
            </div>

            <div className='YourVillas-mainCont'>
              <h1 className='heading'>Your World in RentSpace Universe</h1>
                <YourVillas/>

            </div>

        </div>
    );
};

export default StakeDashboard;
