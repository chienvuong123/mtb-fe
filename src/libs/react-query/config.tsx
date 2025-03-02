import { useState } from 'react';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

function useQueryClientConfig() {
  const handleCallApiFailure = (errorAxios: AxiosError) => {
    // TODO: handle error when connection is lost
    console.log(errorAxios);
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
            staleTime: 60 * 1000,
          },
        },
        queryCache,
        mutationCache,
      }),
  );

  return queryClient;
}

export default useQueryClientConfig;
