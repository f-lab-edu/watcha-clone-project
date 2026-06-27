import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { PropsWithChildren, ReactNode } from "react";

import BaseErrorBoundary from "./BaseErrorBoundary";
import { isAuthError } from "./errorBoundaryUtil";
import { FallbackProps } from "./types/fallbackProps";
import DefaultWidgetErrorFallback from "./ui/DefaultWidgetErrorFallback";

interface WidgetErrorBoundaryProps extends PropsWithChildren {
  FallbackComponent?: (props: FallbackProps) => ReactNode;
  resetKeys?: unknown[];
}

const WidgetErrorBoundary = ({
  children,
  FallbackComponent,
  resetKeys,
}: WidgetErrorBoundaryProps) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <BaseErrorBoundary
      FallbackComponent={FallbackComponent ?? DefaultWidgetErrorFallback}
      shouldRethrow={isAuthError}
      onReset={reset}
      resetKeys={resetKeys}
    >
      {children}
    </BaseErrorBoundary>
  );
};

export default WidgetErrorBoundary;
