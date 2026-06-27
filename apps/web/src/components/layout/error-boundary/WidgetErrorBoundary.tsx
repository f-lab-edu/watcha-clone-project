import { Component, ErrorInfo, PropsWithChildren, ReactNode } from "react";

import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { FallbackProps } from "./types/fallbackProps";
import DefaultWidgetErrorFallback from "./ui/DefaultWidgetErrorFallback";

interface ErrorBoundaryProps extends PropsWithChildren {
  FallbackComponent?: (props: FallbackProps) => ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class CustomErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
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

  render() {
    const { hasError, error } = this.state;
    const { FallbackComponent, children } = this.props;

    if (hasError && error) {
      return FallbackComponent ? (
        <FallbackComponent
          error={error}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      ) : (
        <DefaultWidgetErrorFallback
          error={error}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      );
    }

    return children;
  }
}

const WidgetErrorBoundary = (props: Omit<ErrorBoundaryProps, "onReset">) => {
  const { reset } = useQueryErrorResetBoundary();
  return <CustomErrorBoundary onReset={reset} {...props} />;
};
export default WidgetErrorBoundary;
