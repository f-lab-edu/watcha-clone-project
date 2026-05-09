import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

import { isAxiosError } from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const UnknownErrorPage = ({ onRetry }: { onRetry: () => void }) => (
  <div className='nf-root'>
    <p className='nf-desc'>알 수 없는 오류가 발생했습니다.</p>

    <div className='nf-buttons'>
      <button className='nf-btn-primary' onClick={onRetry}>
        다시 시도
      </button>
    </div>
  </div>
);

const ForbiddenPage = ({ onGoBack, onHome }: { onGoBack: () => void; onHome: () => void }) => (
  <div className='nf-root'>
    <p className='nf-desc'>접근 권한이 없습니다.</p>

    <div className='nf-buttons'>
      <button className='nf-btn-primary' onClick={onGoBack}>
        다시 시도
      </button>
      <button className='nf-btn-secondary' onClick={onHome}>
        홈으로
      </button>
    </div>
  </div>
);

const NetworkErrorPage = ({ onRetry }: { onRetry: () => void }) => (
  <div className='nf-root'>
    <p className='nf-desc'>네트워크 오류가 발생했습니다.</p>

    <div className='nf-buttons'>
      <button className='nf-btn-primary' onClick={onRetry}>
        다시 시도
      </button>
    </div>
  </div>
);

const GlobalErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const navigate = useNavigate();
  const { reset } = useQueryErrorResetBoundary();

  useEffect(() => {
    if (isAxiosError(error) && error.response?.status === 401) {
      resetErrorBoundary();
      navigate('/login', {
        replace: true,
        state: { from: location.pathname },
      });
    }
  }, [error, navigate, location, resetErrorBoundary]);

  const handleRetry = () => {
    reset();
    resetErrorBoundary();
  };

  if (isAxiosError(error)) {
    const status = error.response?.status;

    if (status === 401) {
      return null;
    }

    if (status === 403) {
      return <ForbiddenPage onGoBack={() => navigate(-1)} onHome={() => navigate('/')} />;
    }

    return <NetworkErrorPage onRetry={handleRetry} />;
  }

  return <UnknownErrorPage onRetry={handleRetry} />;
};

export const GlobalErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return <ErrorBoundary FallbackComponent={GlobalErrorFallback}>{children}</ErrorBoundary>;
};
