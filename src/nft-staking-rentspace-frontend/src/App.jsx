
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainContainer from './MainContainer';
import HomePage from './Components/Home/HomePage';
import MySpaces from './Components/My Spaces/MySpaces';
import FAQ from './Components/FAQ/FAQ';
import Dashboard from './Components/Dashboard/Dashboard';
import UserDashboard from './Components/Dashboard/User Dashboard/UserDashboard';
import { Provider } from 'react-redux';
import { myStore } from './utils/Redux-Config/ReduxStore';
import World from './Components/Worlds/World';
import RegisterUser from './Components/RegisterUser/RegisterUser';
import StakedNFTs from './Components/Dashboard/User Dashboard/NFTsComp/StakedNFTs';
import ImportedNFTs from './Components/Dashboard/User Dashboard/NFTsComp/ImportedNFTs';
import MyWorlds from './Components/Worlds/MyWorlds';

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
          path: '/faq',
          element: <FAQ/>
        },
        {
          path: '/myWorlds',
          element: <MyWorlds/>
      },
        {
            path: '/world/:world',
            element: <World/>
        },
        {
          path: '/Dashboard',
          element: <Dashboard/>,
          children:[
            {
              path:'/Dashboard',
              element:<UserDashboard/>,
              children:[
                {
                  path:'/Dashboard/',
                  element:<ImportedNFTs/>
                },
                {
                  path:'/Dashboard/stakedNFTs',
                  element:<StakedNFTs/>
                }
              ]
            },
            // {
            //   path:'/Dashboard/Leaderboard',
            //   element:<Leaderboard/>
            // },
          ]
          
        },
        {
          path:'/register-user',
          element: <RegisterUser/>
        }
       
      ]
    },
  ]);

  return (
    <Provider store={myStore}>
    <RouterProvider router={browserRouter} />
    </Provider>
  );
}

export default App;
