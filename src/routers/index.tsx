import LayoutWrapper from '@layouts/LayoutWrapper';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ERole } from '@constants/masterData';
import {
  CATEGORY,
  CONFIRM_PASSWORD,
  EXAMPLE,
  FORGOT_PASSWORD,
  LOGIN,
  OTP,
  SETTING,
  ACCOUNT,
  SALES_OPPORTUNITIES,
} from './path';
import GuestGuard from './guards/GuestGuard';
import AuthGuard from './guards/AuthGuard';
import RoleBasedGuard from './guards/RoleBasedGuard';

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
      element: (
        <GuestGuard>
          {createLazyElement(() => import('@pages/authentication/login'))}
        </GuestGuard>
      ),
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
      element: (
        <AuthGuard>
          <LayoutWrapper />
        </AuthGuard>
      ),
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
          element: (
            <RoleBasedGuard
              accessibleRoles={[ERole.ADMIN, ERole.CAMPAIGN_MANAGER]}
            />
          ),
          children: [
            {
              path: SETTING.CONTROL,
              element: createLazyElement(
                () => import('@pages/setting/control'),
              ),
            },
          ],
        },
        {
          path: ACCOUNT,
          element: createLazyElement(() => import('../pages/account')),
        },
        {
          path: SALES_OPPORTUNITIES,
          element: createLazyElement(() => import('@pages/sales-opportunities'))
        }
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
