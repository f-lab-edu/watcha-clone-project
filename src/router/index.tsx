import Home from '@pages/Home';
import NotFound from '@pages/NotFound';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import Default from '../components/layout/Default';

const ContentDetail = lazy(() => import('@pages/ContentDetail'));
const Search = lazy(() => import('@pages/Search'));
const GenreList = lazy(() => import('@pages/GenreLis'));
const SearchTag = lazy(() => import('@pages/SearchTag'));

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
