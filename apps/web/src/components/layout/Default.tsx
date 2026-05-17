import { LoadingSkeleton } from '@watcha/ui';
import { Suspense } from 'react';
import { Outlet } from 'react-router';
import '../../assets/css/common.css';
import Header from './Header';
import { GlobalErrorBoundary } from './error-boundary/GlobalErrorBoundary';

const Default = () => {
  return (
    <GlobalErrorBoundary>
      <div className='app'>
        <Header />
        <Suspense fallback={<LoadingSkeleton />}>
          <Outlet />
        </Suspense>
      </div>
    </GlobalErrorBoundary>
  );
};

export default Default;
