// ./src/routes/index.js

import React from "react";
import PathConstants from "./pathConstants";
import HomePage from "../Components/Home/HomePage";
import MySpaces from "../Components/My Spaces/MySpaces";
import FAQ from "../Components/FAQ/FAQ";
import MyWorlds from "../Components/Worlds/MyWorlds";
import World from "../Components/Worlds/World";
import Dashboard from "../Components/Dashboard/Dashboard";
import UserDashboard from "../Components/Dashboard/User Dashboard/UserDashboard";
import ImportedNFTs from "../Components/Dashboard/User Dashboard/NFTsComp/ImportedNFTs";
import StakedNFTs from "../Components/Dashboard/User Dashboard/NFTsComp/StakedNFTs";
import RegisterUser from "../Components/RegisterUser/RegisterUser";


// const UserDashboard = React.lazy(() => import("../pages/UserDashboard"));
// const ImportedNFTs = React.lazy(() => import("../pages/ImportedNFTs"));
// const StakedNFTs = React.lazy(() => import("../pages/StakedNFTs"));


const routes = [
      { path: PathConstants.HOME, element: <HomePage /> },
      { path: PathConstants.MY_SPACES, element: <MySpaces /> },
      { path: PathConstants.FAQ, element: <FAQ /> },
      { path: PathConstants.MY_WORLDS, element: <MyWorlds /> },
      { path: PathConstants.WORLD, element: <World /> },
      {
        path: PathConstants.DASHBOARD,
        element: <Dashboard />,
        children: [
          {
            path: PathConstants.USER_DASHBOARD,
            element: <UserDashboard />,
            children: [
              { path: PathConstants.IMPORTED_NFTS, element: <ImportedNFTs /> },
              { path: PathConstants.STAKED_NFTS, element: <StakedNFTs /> }
            ]
          }
        ]
      },
      { path: PathConstants.REGISTER_USER, element: <RegisterUser /> }
];

export default routes;
