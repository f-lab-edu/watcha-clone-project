import PageErrorBoundary from '@components/layout/error-boundary/PageErrorBoundary';
import Home from '@pages/Home';
import NotFound from '@pages/NotFound';
import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

import Default from '../components/layout/Default';

const ContentDetail = lazy(() => import('@pages/ContentDetail'));
const Search = lazy(() => import('@pages/Search'));
const GenreList = lazy(() => import('@pages/GenreList'));
const SearchTag = lazy(() => import('@pages/SearchTag'));

const route = createBrowserRouter([
  {
    path: '/',
    element: <Default />,
    children: [
      {
        index: true,
        element: (
          <PageErrorBoundary>
            <Home />
          </PageErrorBoundary>
        ),
      },
      {
        path: 'contents/:mediaType/:id',
        element: (
          <PageErrorBoundary>
            <ContentDetail />
          </PageErrorBoundary>
        ),
      },
      {
        path: 'search',
        element: (
          <PageErrorBoundary>
            <Search />
          </PageErrorBoundary>
        ),
      },
      {
        path: 'genre/:type',
        element: (
          <PageErrorBoundary>
            <GenreList />
          </PageErrorBoundary>
        ),
      },
      {
        path: 'tag',
        element: (
          <PageErrorBoundary>
            <SearchTag />
          </PageErrorBoundary>
        ),
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={route} />;
};

export default Router;
