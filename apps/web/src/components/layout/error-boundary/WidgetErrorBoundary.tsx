import { Component, ErrorInfo, ReactNode } from "react";

import { FallbackProps } from "./types/fallbackProps";
import DefaultWidgetErrorFallback from "./ui/DefaultWidgetErrorFallback";

interface ErrorBoundaryProps {
  FallbackComponent?: (props: FallbackProps) => ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class WidgetErrorBoundary extends Component<
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

  render() {
    const { hasError, error } = this.state;
    const { FallbackComponent, children } = this.props;

    if (hasError && error) {
      return FallbackComponent ? (
        <FallbackComponent error={error} />
      ) : (
        <DefaultWidgetErrorFallback error={error} />
      );
    }

    return children;
  }
}

export default WidgetErrorBoundary;
