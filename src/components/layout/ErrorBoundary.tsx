import { Component, ErrorInfo, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router';

type FallbackRender = (args: { error: Error | null; reset: () => void }) => ReactNode;

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode | FallbackRender;
  onError?: (error: Error, info: ErrorInfo) => void;
  resetKey?: string;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

const DefaultErrorFallback = ({ error, reset }: { error: Error | null; reset: () => void }) => {
  const navigate = useNavigate();

  return (
    <div className='nf-root' role='alert' aria-live='assertive'>
      <h1 className='nf-title'>문제가 발생했습니다</h1>
      <p className='nf-desc'>
        일시적인 오류일 수 있어요. 잠시 후 다시 시도해 주세요.
        {process.env.NODE_ENV === 'development' && error?.message ? (
          <>
            <br />
            <span style={{ color: 'var(--text3)', fontSize: '0.85rem' }}>{error.message}</span>
          </>
        ) : null}
      </p>
      <div className='nf-buttons'>
        <button
          type='button'
          className='nf-btn-primary'
          onClick={() => {
            reset();
            navigate('/', { replace: true });
          }}>
          홈으로 가기
        </button>
        <button
          type='button'
          className='nf-btn-secondary'
          onClick={() => {
            reset();
            navigate(0);
          }}>
          다시 시도
        </button>
      </div>
    </div>
  );
};

class ErrorBoundaryImpl extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info);
    console.error('ErrorBoundary:', error, info.componentStack);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (!this.state.hasError) return;
    if (this.props.resetKey === undefined) return;
    if (prevProps.resetKey === this.props.resetKey) return;

    this.handleReset();
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (typeof this.props.fallback === 'function') {
        return this.props.fallback({
          error: this.state.error,
          reset: this.handleReset,
        });
      }
      if (this.props.fallback) return this.props.fallback;

      return <DefaultErrorFallback error={this.state.error} reset={this.handleReset} />;
    }
    return this.props.children;
  }
}

type ErrorBoundaryWrapperProps = Omit<ErrorBoundaryProps, 'resetKey'> & {
  resetOnLocationChange?: boolean;
  resetKey?: string;
};

const ErrorBoundary = ({
  resetOnLocationChange = true,
  resetKey,
  ...props
}: ErrorBoundaryWrapperProps) => {
  const location = useLocation();
  const locationKey = `${location.pathname}${location.search}${location.hash}`;
  const computedResetKey = resetOnLocationChange ? (resetKey ?? locationKey) : resetKey;

  return <ErrorBoundaryImpl {...props} resetKey={computedResetKey} />;
};

export default ErrorBoundary;
