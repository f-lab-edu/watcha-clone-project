import LoadingSkeleton from '@components/skeleton/LoadingSkeleton';
import { Suspense } from 'react';
import { Outlet } from 'react-router';
import '../../assets/css/common.css';
import ErrorBoundary from './ErrorBoundary';
import Header from './Header';

const Default = () => {
  return (
    <div className='app'>
      <Header />
      <ErrorBoundary>
        <Suspense fallback={<LoadingSkeleton />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Default;
