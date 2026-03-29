import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';

import Router from './router';

const queryClient = new QueryClient();
const root = createRoot(document.getElementById('root')!);
root.render(
  <>
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  </>,
);
