import LayoutWrapper from '@layouts/LayoutWrapper';
import React from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../stores';
import {
  CATEGORY,
  CONFIRM_PASSWORD,
  EXAMPLE,
  FORGOT_PASSWORD,
  LOGIN,
  OTP,
  SETTING,
} from './path';

const createLazyElement = (
  importFn: () => Promise<{ default: React.ComponentType }>,
) => {
  const Component = React.lazy(importFn);
  return <Component />;
};

const ProtectRoutes = ({ roles = [] }: { roles: string[] }) => {
  const { user, isAuthenticated } = useUserStore();
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  if (roles.length && !roles.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }
  return <Outlet />;
};

const routes = createBrowserRouter(
  [
    {
      path: LOGIN,
      element: createLazyElement(() => import('@pages/authentication/login')),
    },
    {
      path: FORGOT_PASSWORD,
      element: createLazyElement(
        () => import('@pages/authentication/forgot-password'),
      ),
    },
    {
      path: CONFIRM_PASSWORD,
      element: createLazyElement(
        () => import('@pages/authentication/confirm-password'),
      ),
    },
    {
      path: OTP,
      element: createLazyElement(() => import('@pages/authentication/otp')),
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
        {
          path: SETTING.ROOT,
          element: <ProtectRoutes roles={['ADMIN']} />,
          children: [
            {
              path: SETTING.CONTROL,
              element: createLazyElement(
                () => import('@pages/setting/control'),
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
