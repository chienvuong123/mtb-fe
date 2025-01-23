import { ErrorBoundary } from 'react-error-boundary';
import {
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';

import React from 'react';
import useQueryClientConfig from './config';
import ErrorFallback from './ErrorFallback';

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClientConfig();

  const customFallbackRender = ({
    resetErrorBoundary,
  }: {
    resetErrorBoundary: () => void;
  }) => <ErrorFallback resetErrorBoundary={resetErrorBoundary} />;

  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} fallbackRender={customFallbackRender}>
            {children}
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
