import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainContainer from './MainContainer';
import HomePage from './Components/Home/HomePage';
import MySpaces from './Components/My Spaces/MySpaces';
import FAQ from './Components/FAQ/FAQ';

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
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={browserRouter} />
  );
}

export default App;
