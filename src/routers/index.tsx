import LayoutWrapper from '@layouts/LayoutWrapper';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import {
  CATEGORY,
  EXAMPLE,
  FORGOT_PASSWORD,
  LOGIN,
  OTP,
  CONFIRM_PASSWORD,
  CUSTOMER,
  ACCOUNT,
  SALES_OPPORTUNITIES,
} from './path';
import GuestGuard from './guards/GuestGuard';
import AuthGuard from './guards/AuthGuard';
import VerifyGuard from './guards/VerifyGuard';

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
      element: (
        <VerifyGuard>
          {createLazyElement(() => import('@pages/authentication/otp'))}
        </VerifyGuard>
      ),
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
            {
              path: CATEGORY.MEDIA_CATEGORY,
              element: createLazyElement(
                () => import('@pages/category/media-category'),
              ),
            },
          ],
        },
        {
          path: CUSTOMER.ROOT,
          children: [
            {
              path: CUSTOMER.CUSTOMER_CAMPAIGN_LIST,
              element: createLazyElement(
                () => import('@pages/customer/list-customer'),
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
