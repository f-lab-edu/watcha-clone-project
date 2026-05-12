import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { useLocation, useNavigate } from 'react-router';

const DefaultPageErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const navigate = useNavigate();
  const { reset } = useQueryErrorResetBoundary();

  if (isAxiosError(error)) {
    const status = error.response?.status;
    if (status === 401 || status === 403) throw error;
  }

  const handleReset = () => {
    reset();
    resetErrorBoundary();
  };

  return (
    <div className='nf-root'>
      <h1 className='nf-title'>페이지를 불러오지 못했어요</h1>
      <p className='nf-desc'>
        일시적인 오류가 발생했거나
        <br />
        요청한 정보를 가져오지 못했어요.
      </p>

      <div className='nf-buttons'>
        <button className='nf-btn-primary' onClick={handleReset}>
          다시 시도
        </button>
        <button className='nf-btn-secondary' onClick={() => navigate('/')}>
          홈으로
        </button>
      </div>
    </div>
  );
};

const PageErrorBoundary = ({ children }: React.PropsWithChildren) => {
  const { reset } = useQueryErrorResetBoundary();
  const { pathname } = useLocation();
  return (
    <ErrorBoundary
      FallbackComponent={DefaultPageErrorFallback}
      resetKeys={[pathname]}
      onReset={(details) => {
        if (details.reason === 'keys') {
          reset();
        }
      }}>
      {children}
    </ErrorBoundary>
  );
};

export default PageErrorBoundary;
