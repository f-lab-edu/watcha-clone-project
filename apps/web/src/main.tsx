import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";

import { ModalProvider } from "@components/modal/ModalContext";
// 가변 폰트: 서브셋 1세트로 100~900 전 weight 커버 → 폰트 요청 수 약 1/3로 감소
import "@fontsource-variable/noto-sans-kr";
import { OverlayProvider } from "overlay-kit";
import Router from "./router";

const queryClient = new QueryClient();
const root = createRoot(document.getElementById("root")!);
root.render(
  <>
    <QueryClientProvider client={queryClient}>
      <OverlayProvider>
        <ModalProvider>
          <Router />
        </ModalProvider>
      </OverlayProvider>
    </QueryClientProvider>
  </>,
);
