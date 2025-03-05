import { useState } from 'react';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

function useQueryClientConfig() {
  const handleCallApiFailure = (errorAxios: AxiosError) => {
    console.warn(errorAxios);

    if (
      errorAxios.code === 'ERR_NETWORK' ||
      errorAxios.message === 'Network Error'
    ) {
      window.location.href = '/500';
    }
  };

  const queryCache = new QueryCache({
    onError: (error) => {
      handleCallApiFailure(error as AxiosError);
    },
  });

  const mutationCache = new MutationCache({
    onError: (error) => {
      handleCallApiFailure(error as AxiosError);
    },
  });

  const [queryClient] = useState<QueryClient>(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            gcTime: 5 * 60 * 1000,
            staleTime: 5 * 1000,
          },
        },
        queryCache,
        mutationCache,
      }),
  );

  return queryClient;
}

export default useQueryClientConfig;
