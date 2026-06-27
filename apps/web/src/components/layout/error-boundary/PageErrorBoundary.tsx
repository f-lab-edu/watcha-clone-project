import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { useLocation, useNavigate } from "react-router";

import BaseErrorBoundary from "./BaseErrorBoundary";
import { isAuthError } from "./errorBoundaryUtil";
import { FallbackProps } from "./types/fallbackProps";

const DefaultPageErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
  const navigate = useNavigate();

  return (
    <div className="nf-root">
      <h1 className="nf-title">페이지를 불러오지 못했어요</h1>
      <p className="nf-desc">
        일시적인 오류가 발생했거나
        <br />
        요청한 정보를 가져오지 못했어요.
      </p>

      <div className="nf-buttons">
        <button className="nf-btn-primary" onClick={resetErrorBoundary}>
          다시 시도
        </button>
        <button className="nf-btn-secondary" onClick={() => navigate("/")}>
          홈으로
        </button>
      </div>
    </div>
  );
};

const PageErrorBoundary = ({ children }: PropsWithChildren) => {
  const { reset } = useQueryErrorResetBoundary();
  const { pathname } = useLocation();

  return (
    <BaseErrorBoundary
      FallbackComponent={DefaultPageErrorFallback}
      shouldRethrow={isAuthError}
      resetKeys={[pathname]}
      onReset={reset}
    >
      {children}
    </BaseErrorBoundary>
  );
};

export default PageErrorBoundary;
