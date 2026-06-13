import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { useLocation } from 'react-router';

const DefaultWidgetErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { reset } = useQueryErrorResetBoundary();

  if (isAxiosError(error)) {
    const status = error.response?.status;
    if (status === 401 || status === 403) throw error; // ← Global로 bubble up
  }

  const handleReset = () => {
    reset();
    resetErrorBoundary();
  };

  return (
    <div className='w-full h-full pt-[1rem] gap-[1rem] min-h-[120px] flex flex-col items-center justify-center gap-3'>
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='rgba(255,255,255,0.3)'
        strokeWidth='3'
        strokeLinecap='round'>
        <circle cx='12' cy='12' r='10' />
        <line x1='12' y1='8' x2='12' y2='12' />
        <line x1='12' y1='16' x2='12.01' y2='16' />
      </svg>

      <p className='text-white/40 text-[1rem] font-normal tracking-[0.01em] m-0'>
        일시적인 오류로 불러오지 못했습니다.
      </p>

      <button onClick={handleReset} className='btn-watch'>
        다시 시도
      </button>
    </div>
  );
};

const WidgetErrorBoundary = ({ children }: React.PropsWithChildren) => {
  const { reset } = useQueryErrorResetBoundary();
  const { pathname } = useLocation();

  return (
    <ErrorBoundary
      FallbackComponent={DefaultWidgetErrorFallback}
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

export default WidgetErrorBoundary;
