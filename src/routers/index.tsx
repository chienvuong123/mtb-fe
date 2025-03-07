import { ERole } from '@constants/masterData';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import {
  ACCOUNT,
  CATEGORY,
  CHANGE_PASSWORD,
  CONFIRM_PASSWORD,
  CUSTOMER,
  EXAMPLE,
  FORGOT_PASSWORD,
  LOGIN,
  OTP,
  SALES_OPPORTUNITIES,
  MANAGER_CAMPAIGN,
  SCENARIO,
  EXPRIED_CHANGE_PASSWORD,
  SELLER,
  SETTING,
  ACCOUNT_MANAGEMENT,
} from './path';

const GuestGuard = React.lazy(() => import('./guards/GuestGuard'));
const AuthGuard = React.lazy(() => import('./guards/AuthGuard'));
const VerifyGuard = React.lazy(() => import('./guards/VerifyGuard'));
const RoleBasedGuard = React.lazy(() => import('./guards/RoleBasedGuard'));

const allRole = [
  ERole.ADMIN,
  ERole.CAMPAIGN_MANAGER,
  ERole.SELLER_MANAGER,
  ERole.SELLER,
];

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
      path: CHANGE_PASSWORD,
      element: createLazyElement(
        () => import('@pages/authentication/change-password'),
      ),
    },
    {
      path: EXPRIED_CHANGE_PASSWORD,
      element: createLazyElement(
        () => import('@pages/authentication/expried-link'),
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
          {createLazyElement(() => import('@layouts/LayoutWrapper'))}
        </AuthGuard>
      ),
      children: [
        {
          path: EXAMPLE,
          element: createLazyElement(() => import('../pages/example')),
        },

        {
          path: CATEGORY.ROOT,
          element: (
            <RoleBasedGuard
              accessibleRoles={[ERole.ADMIN, ERole.CAMPAIGN_MANAGER]}
            />
          ),
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
            {
              path: CATEGORY.POSITON_CATEGORY,
              element: createLazyElement(
                () => import('@pages/category/positon-category'),
              ),
            },
            {
              path: CATEGORY.BRANCH_CATEGORY,
              element: createLazyElement(
                () => import('@pages/category/branch-category'),
              ),
            },
            {
              path: CATEGORY.HOBBY_CATEGORY,
              element: createLazyElement(
                () => import('@pages/category/hobby-category'),
              ),
            },
            {
              path: CATEGORY.CUSTOMER_SEGMENT_CATEGORY,
              element: createLazyElement(
                () => import('@pages/category/department-category'),
              ),
            },
            {
              path: CATEGORY.DEPARTMENT_CATEGORY,
              element: createLazyElement(
                () => import('@pages/category/department-category'),
              ),
            },
            {
              path: CATEGORY.EXPERSITE_CATEGORY,
              element: createLazyElement(
                () => import('@pages/category/expertise-category'),
              ),
            },
            {
              path: CATEGORY.JOB_CATEGORY,
              element: createLazyElement(
                () => import('@pages/category/job-category'),
              ),
            },
            {
              path: CATEGORY.CUSTOMER_GROUP_CATEGORY,
              element: createLazyElement(
                () => import('@pages/category/customer-group-category'),
              ),
            },
          ],
        },

        {
          path: SETTING.ROOT,
          element: <RoleBasedGuard accessibleRoles={allRole} />,
        },

        {
          path: MANAGER_CAMPAIGN.ROOT,
          element: <RoleBasedGuard accessibleRoles={allRole} />,
          children: [
            {
              path: MANAGER_CAMPAIGN.CAMPAIGN,
              element: createLazyElement(
                () => import('@pages/campaign/campaign-list'),
              ),
            },
            {
              path: `${MANAGER_CAMPAIGN.CAMPAIGN_DETAIL}/:id`,
              element: createLazyElement(
                () => import('@pages/campaign/campaign-list/details'),
              ),
            },
            {
              path: `${MANAGER_CAMPAIGN.CREATE_CAMPAIGN}`,
              element: createLazyElement(
                () => import('@pages/campaign/campaign-list/form'),
              ),
            },
            {
              path: `${MANAGER_CAMPAIGN.EDIT_CAMPAIGN}/:id`,
              element: createLazyElement(
                () => import('@pages/campaign/campaign-list/form'),
              ),
            },
            {
              path: '',
              element: (
                <RoleBasedGuard
                  accessibleRoles={[
                    ERole.ADMIN,
                    ERole.CAMPAIGN_MANAGER,
                    ERole.SELLER_MANAGER,
                  ]}
                />
              ),
              children: [
                {
                  path: `${MANAGER_CAMPAIGN.CATEGORY}`,
                  element: createLazyElement(
                    () => import('@pages/campaign/category-list'),
                  ),
                },
              ],
            },
            {
              path: `${MANAGER_CAMPAIGN.CATEGORY_DETAIL}/:id`,
              element: createLazyElement(
                () => import('@pages/campaign/category-list/details'),
              ),
            },
          ],
        },
        {
          path: CUSTOMER.ROOT,
          element: <RoleBasedGuard accessibleRoles={allRole} />,
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
          path: SALES_OPPORTUNITIES,
          children: [
            {
              path: SALES_OPPORTUNITIES,
              element: createLazyElement(
                () => import('@pages/sales-opportunities'),
              ),
            },
          ],
        },
        {
          path: SCENARIO.ROOT,
          element: <RoleBasedGuard accessibleRoles={allRole} />,
          children: [
            {
              path: SCENARIO.LIST,
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
        {
          path: SELLER.ROOT,
          element: (
            <RoleBasedGuard
              accessibleRoles={[
                ERole.ADMIN,
                ERole.CAMPAIGN_MANAGER,
                ERole.SELLER_MANAGER,
              ]}
            />
          ),
          children: [
            {
              path: SELLER.LIST,
              element: createLazyElement(() => import('@pages/seller/list')),
            },
            {
              path: SELLER.DETAIL,
              element: createLazyElement(() => import('@pages/seller/details')),
            },
            {
              path: SELLER.ASSIGNMENT,
              element: createLazyElement(
                () => import('@pages/seller/assignment'),
              ),
            },
          ],
        },
        {
          path: ACCOUNT_MANAGEMENT,
          element: createLazyElement(() => import('@pages/account-management')),
        },
      ],
    },
    {
      path: '*',
      element: createLazyElement(() => import('@pages/404')),
    },
    {
      path: '/403',
      element: <>Forbidden</>,
    },
    {
      path: '/500',
      element: createLazyElement(() => import('@pages/500')),
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  },
);
export default routes;
