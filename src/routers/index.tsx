import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LayoutWrapper from '@layouts/LayoutWrapper';
import { LOGIN, CATEGORY, EXAMPLE } from './path';

const createLazyElement = (
  importFn: () => Promise<{ default: React.ComponentType }>,
) => {
  const Component = React.lazy(importFn);
  return <Component />;
};

const routes = createBrowserRouter(
  [
    {
      path: LOGIN,
      element: createLazyElement(() => import('@pages/login')),
    },
    {
      path: '',
      element: <LayoutWrapper />,
      children: [
        {
          path: EXAMPLE,
          element: createLazyElement(() => import('../pages/example')),
        },

        {
          path: CATEGORY.ROOT,
          children: [
            {
              path: CATEGORY.PRODUCT_CATEGORY,
              element: createLazyElement(
                () => import('@pages/category/product-category'),
              ),
            },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <>not found</>,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  },
);
export default routes;
