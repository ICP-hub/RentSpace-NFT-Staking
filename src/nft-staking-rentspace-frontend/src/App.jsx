
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainContainer from './MainContainer';
import HomePage from './Components/Home/HomePage';
import MySpaces from './Components/My Spaces/MySpaces';
import FAQ from './Components/FAQ/FAQ';
import MyWorlds from './Components/My Worlds/MyWorlds';
import UserDashboard from './Components/User Dashboard/UserDashboard';
import ImpNftDetails from './Components/User Dashboard/NFTsDetails/ImpNftDetails';
import StakNftDetails from './Components/User Dashboard/NFTsDetails/StakNftDetails';
import MinimalisticWorld from './Components/MinimalisticWorld/MinimalisticWorld';

function App() {

  const browserRouter = createBrowserRouter([
    {
      path: '/',
      element: <MainContainer />,
      children: [
        {
          path: '/',
          element: <HomePage />
        },
        {
          path: '/mySpaces',
          element: <MySpaces />
        },
        {
          path: '/FAQ',
          element: <FAQ/>
        },
        {
          path: '/myWorlds',
          element: <MyWorlds/>
        },
        {
          path: '/userDashboard',
          element: <UserDashboard/>
        },
        {
            path:'/ImpNftDetails',
            element:<ImpNftDetails/>
        },
        {
          path:'/StakNftDetails',
          element:<StakNftDetails/>
        },
        //Temporary route for Minimalistic World
        {
          path: '/minimalisticWorld',
          element: <MinimalisticWorld/>
        }
       
      ]
    },
  ]);

  return (
    <RouterProvider router={browserRouter} />
  );
}

export default App;
