import React, { createContext, useState } from 'react'
import { AuthProvider } from './utils/useAuthClient';
import Navbar from './Components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Components/Footer/Footer';



const MainContainer = () => {



  return (
    <AuthProvider>

      <div className='' >
        <Navbar/>
       <Outlet/>
       <Footer/>
      </div>
   
    </AuthProvider>
  )
}

export default MainContainer