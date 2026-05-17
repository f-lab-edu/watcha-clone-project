import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { configureApiClient } from '@watcha/api';
import { createRoot } from 'react-dom/client';

configureApiClient({
  baseURL: process.env.API_BASE_URL ?? '',
  accessToken: process.env.API_ACCESS_TOKEN ?? '',
});

import { ModalProvider } from '@components/modal/ModalContext';
import '@fontsource/noto-sans-kr/400.css';
import '@fontsource/noto-sans-kr/700.css';
import '@fontsource/noto-sans-kr/900.css';
import './styles/tailwind.css';
import { OverlayProvider } from 'overlay-kit';
import Router from './router';

const queryClient = new QueryClient();
const root = createRoot(document.getElementById('root')!);
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
