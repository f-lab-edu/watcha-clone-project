import { Component, ErrorInfo, PropsWithChildren, ReactNode } from "react";

import { FallbackProps } from "./types/fallbackProps";

interface BaseErrorBoundaryProps extends PropsWithChildren {
  FallbackComponent: (props: FallbackProps) => ReactNode;
  onReset?: () => void;
  resetKeys?: unknown[];
  // 401/403 버블링 여부
  shouldRethrow?: (error: Error) => boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class BaseErrorBoundary extends Component<
  BaseErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidUpdate(prevProps: BaseErrorBoundaryProps) {
    if (
      this.state.hasError &&
      this.hasResetKeysChanged(
        prevProps.resetKeys || [],
        this.props.resetKeys || [],
      )
    ) {
      this.resetErrorBoundary();
    }
  }

  // 에러 로깅 용도
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  // 화살표 함수로 정의하여 this 바인딩 문제를 해결
  resetErrorBoundary = () => {
    this.props.onReset?.();
    this.setState({ hasError: false, error: null });
  };

  private hasResetKeysChanged(prevKeys: unknown[], nextKeys: unknown[]) {
    if (prevKeys === nextKeys) {
      return false;
    }

    if (!prevKeys || !nextKeys || prevKeys.length !== nextKeys.length) {
      return true;
    }

    return prevKeys.some((key, index) => !Object.is(key, nextKeys[index]));
  }

  render() {
    const { hasError, error } = this.state;
    const { FallbackComponent, children, shouldRethrow } = this.props;

    if (hasError && error) {
      // 이 바운더리가 처리하지 않을 에러는 상위 바운더리로 버블링
      if (shouldRethrow?.(error)) {
        throw error;
      }

      return (
        <FallbackComponent
          error={error}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      );
    }

    return children;
  }
}

export default BaseErrorBoundary;
