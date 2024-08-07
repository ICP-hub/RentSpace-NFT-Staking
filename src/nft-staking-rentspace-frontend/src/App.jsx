
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainContainer from './MainContainer';
import { Provider } from 'react-redux';
import { myStore } from './utils/Redux-Config/ReduxStore';

import routes from './Routes';

function App() {

  const browserRouter = createBrowserRouter([
    {
      path: '/',
      element: <MainContainer />,
      children:routes
    },
  ]);

  return (
    <Provider store={myStore}>
    <RouterProvider router={browserRouter} />
    </Provider>
  );
}

export default App;
