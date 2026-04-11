import ContentDetail from '@pages/ContentDetail';
import GenreList from '@pages/GenreLis';
import NotFound from '@pages/NotFound';
import Search from '@pages/Search';
import SearchTag from '@pages/SearchTag';
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
      { path: 'contents/:mediaType/:id', element: <ContentDetail /> },
      { path: 'search', element: <Search /> },
      { path: 'genre/:type', element: <GenreList /> },
      { path: 'tag', element: <SearchTag /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={route} />;
};

export default Router;
