import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider, Skeleton } from 'antd';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import routes from './routers';
import JotaiProvider from './libs/jotai';
import ReactQueryProvider from './libs/react-query/ReactQueryProvider';
import { formConfig, themeConfig } from './libs/antd';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <ConfigProvider prefixCls="mbb" theme={themeConfig} form={formConfig}>
      <JotaiProvider>
        <ReactQueryProvider>
          <Suspense fallback={<Skeleton />}>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={routes} />
            </QueryClientProvider>
          </Suspense>
          <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryProvider>
      </JotaiProvider>
    </ConfigProvider>
  );
};

export default App;
