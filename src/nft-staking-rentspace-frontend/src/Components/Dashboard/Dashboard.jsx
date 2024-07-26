import React, { useState } from 'react';
  import './Dashboard.css';
import { Outlet } from 'react-router-dom';

  const Dashboard = () => {

    return (
      <div className='Dashboard-MainCont' style={{ backgroundImage: "url('Assets/BackgroundIMG.png')" }}>
        <div className='Heading-staking'>
          <h1>Staking</h1>
        </div>
         <Outlet/>
      </div>
    );
  }
  
export default Dashboard