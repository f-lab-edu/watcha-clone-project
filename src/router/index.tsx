import ContentDetail from '@pages/ContentDetail';
import NotFound from '@pages/NotFound';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import Default from '../components/layout/Default';
import Home from '../pages/Home';

const route = createBrowserRouter([
  {
    path: '/',
    element: <Default />,
    children: [
      { index: true, element: <Home /> },
      { path: 'contents/:id', element: <ContentDetail /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={route} />;
};

export default Router;
