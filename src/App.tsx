import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider, Skeleton } from 'antd';

import routes from './routers';
import JotaiProvider from './libs/jotai';
import ReactQueryProvider from './libs/react-query/ReactQueryProvider';
import { formConfig, themeConfig } from './libs/antd';

const App: React.FC = () => {
  return (
    <ConfigProvider prefixCls="mbb" theme={themeConfig} form={formConfig}>
      <JotaiProvider>
        <ReactQueryProvider>
          <Suspense fallback={<Skeleton />}>
            <RouterProvider router={routes} />
          </Suspense>
          <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryProvider>
      </JotaiProvider>
    </ConfigProvider>
  );
};

export default App;
