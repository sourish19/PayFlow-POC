import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Toaster } from 'sonner';

import App from './App.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <App />
      <Toaster />
    </Router>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
