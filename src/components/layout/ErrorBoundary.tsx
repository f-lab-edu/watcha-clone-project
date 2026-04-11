import { Component, ErrorInfo, ReactNode } from 'react';
import { useNavigate } from 'react-router';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

const ErrorFallback = ({
  error,
  onReset,
}: {
  error: Error | null;
  onReset: () => void;
}) => {
  const navigate = useNavigate();

  return (
    <div className='nf-root'>
      <h1 className='nf-title'>문제가 발생했습니다</h1>
      <p className='nf-desc'>
        일시적인 오류일 수 있어요. 잠시 후 다시 시도해 주세요.
        {process.env.NODE_ENV === 'development' && error?.message ? (
          <>
            <br />
            <span style={{ color: 'var(--text3)', fontSize: '0.85rem' }}>
              {error.message}
            </span>
          </>
        ) : null}
      </p>
      <div className='nf-buttons'>
        <button
          type='button'
          className='nf-btn-primary'
          onClick={() => {
            onReset();
            navigate('/');
          }}
        >
          홈으로 가기
        </button>
        <button type='button' className='nf-btn-secondary' onClick={() => {
          onReset();
          navigate(0);
          }}>
          다시 시도
        </button>
      </div>
    </div>
  );
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary:', error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback error={this.state.error} onReset={this.handleReset} />
      );
    }
    return this.props.children;
  }
}
