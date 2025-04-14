import React from 'react';

// ====================== LAYOUTS ======================
export const LayoutWrapper = React.lazy(() => import('@layouts/LayoutWrapper'));

// ====================== CATEGORY PAGES ======================
export const ProductCategoryPage = React.lazy(
  () => import('@pages/category/product-category'),
);

// ====================== ACCOUNT PAGES ======================
export const AccountProfilePage = React.lazy(() => import('../pages/profile'));

// ====================== ERROR PAGES ======================
export const NotFoundPage = React.lazy(() => import('@pages/404'));

// ====================== DASHBOARD PAGES ======================
export const DashboardPage = React.lazy(() => import('@pages/dashboard'));

// Nhóm các components để dễ sử dụng

export const CategoryPages = {
  ProductCategoryPage,
};
