import { ERole } from '@constants/masterData';
import LayoutWrapper from '@layouts/LayoutWrapper';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import {
  ACCOUNT,
  CATEGORY,
  CONFIRM_PASSWORD,
  CUSTOMER,
  EXAMPLE,
  FORGOT_PASSWORD,
  LOGIN,
  OTP,
  SALES_OPPORTUNITIES,
  MANAGER_CATEGORY,
  SETTING,
  SCENARIO,
} from './path';
import GuestGuard from './guards/GuestGuard';
import AuthGuard from './guards/AuthGuard';
import VerifyGuard from './guards/VerifyGuard';
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
          path: SETTING.ROOT,
          element: (
            <RoleBasedGuard
              accessibleRoles={[ERole.ADMIN, ERole.CAMPAIGN_MANAGER]}
            />
          ),
        },
        {
          path: MANAGER_CATEGORY.ROOT,
          children: [
            {
              path: MANAGER_CATEGORY.CAMPAIGN,
              element: createLazyElement(
                () => import('@pages/campaign/campaign-list'),
              ),
            },
            {
              path: `${MANAGER_CATEGORY.CAMPAIGN_DETAIL}/:id`,
              element: createLazyElement(
                () => import('@pages/campaign/campaign-detail'),
              ),
            },
          ],
        },
        {
          path: CUSTOMER.ROOT,
          element: (
            <RoleBasedGuard
              accessibleRoles={[ERole.ADMIN, ERole.CAMPAIGN_MANAGER]}
            />
          ),
          children: [
            {
              path: CUSTOMER.CUSTOMER_CAMPAIGN_LIST,
              element: createLazyElement(
                () => import('@pages/customer/list-customer'),
              ),
            },

            {
              path: CUSTOMER.CUSTOMER_GROUP_CAMPAIGN_LIST,
              element: createLazyElement(
                () => import('@pages/customer/group-customer'),
              ),
            },
            {
              path: CUSTOMER.DETAIL,
              element: createLazyElement(
                () => import('@pages/customer/detail'),
              ),
            },
          ],
        },
        {
          path: MANAGER_CATEGORY.ROOT,
          children: [
            {
              path: MANAGER_CATEGORY.CAMPAIGN,
              element: createLazyElement(
                () => import('@pages/campaign/campaign-list'),
              ),
            },
            {
              path: `${MANAGER_CATEGORY.CAMPAIGN_DETAIL}/:id`,
              element: createLazyElement(
                () => import('@pages/campaign/campaign-detail'),
              ),
            },
          ],
        },
        {
          path: SCENARIO.ROOT,
          element: <RoleBasedGuard accessibleRoles={[ERole.ADMIN]} />,
          children: [
            {
              path: '',
              element: createLazyElement(() => import('@pages/scenario')),
            },
            {
              path: SCENARIO.CREATE,
              element: createLazyElement(
                () => import('@pages/scenario/create'),
              ),
            },
            {
              path: SCENARIO.DETAIL,
              element: createLazyElement(
                () => import('@pages/scenario/detail'),
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
          element: createLazyElement(
            () => import('@pages/sales-opportunities'),
          ),
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
