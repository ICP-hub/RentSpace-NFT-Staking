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
        {/* <Suspense fallback={<div>Loading...</div>}> */}
          <Outlet />
        {/* </Suspense> */}
       <Footer/>
      </div>
   
    </AuthProvider>
  )
}

export default MainContainer