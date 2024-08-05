import React, { useState } from 'react';
  import './Dashboard.css';
import { Outlet } from 'react-router-dom';
import IMGComp from '../IMGComp';

  const Dashboard = () => {

    return (
      <div className='Dashboard-MainCont'>
         < IMGComp src='Assets/BackgroundIMG.png' hashVal="LcEzJw9Gsqt5.AIVs.agD+xaRjWC" className='cabinet-bg' height='' width='' />
        <div className='Heading-staking'>
          <h1>Staking</h1>
        </div>
         <Outlet/>
      </div>
    );
  }
  
export default Dashboard