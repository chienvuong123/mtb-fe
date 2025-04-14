import { createBrowserRouter } from 'react-router-dom';
import { ROUTES, PATH_SEGMENT } from '@routers/path';
import {
  // Layout
  LayoutWrapper,
  // Pages
  NotFoundPage,
  // Categories
  CategoryPages,
  DashboardPage,
} from './lazy-imports';

const routes = createBrowserRouter(
  [
    // Main Authenticated Layout
    {
      path: '',
      element: <LayoutWrapper />,
      children: [
        // Dashboard Routes
        {
          path: ROUTES.DASHBOARD,
          children: [
            {
              path: PATH_SEGMENT.ROOT,
              element: <DashboardPage />,
            },
          ],
        },

        // Category Routes
        {
          path: ROUTES.CATEGORY.ROOT,
          children: [
            {
              path: ROUTES.CATEGORY.PRODUCT,
              element: <CategoryPages.ProductCategoryPage />,
            },
          ],
        },
      ],
    },

    // Error Routes
    {
      path: '*',
      element: <NotFoundPage />,
    },
    {
      path: '/403',
      element: <>Forbidden</>,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  },
);

export default routes;
