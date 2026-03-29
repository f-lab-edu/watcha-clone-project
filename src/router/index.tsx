import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import Default from '../components/layout/Default';
import Home from '../pages/Home';

const route = createBrowserRouter([
  {
    path: '/',
    element: <Default />,
    children: [{ index: true, element: <Home /> }],
  },
]);

const Router = () => {
  return <RouterProvider router={route} />;
};

export default Router;
