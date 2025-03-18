import React from 'react';

// ====================== GUARDS ======================
export const GuestGuard = React.lazy(() => import('./guards/GuestGuard'));
export const AuthGuard = React.lazy(() => import('./guards/AuthGuard'));
export const VerifyGuard = React.lazy(() => import('./guards/VerifyGuard'));

// ====================== LAYOUTS ======================
export const LayoutWrapper = React.lazy(() => import('@layouts/LayoutWrapper'));

// ====================== AUTH PAGES ======================
export const LoginPage = React.lazy(
  () => import('@pages/authentication/login'),
);
export const ForgotPasswordPage = React.lazy(
  () => import('@pages/authentication/forgot-password'),
);
export const ConfirmPasswordPage = React.lazy(
  () => import('@pages/authentication/confirm-password'),
);
export const ChangePasswordPage = React.lazy(
  () => import('@pages/authentication/change-password'),
);
export const ExpiredLinkPage = React.lazy(
  () => import('@pages/authentication/expried-link'),
);
export const OtpPage = React.lazy(() => import('@pages/authentication/otp'));

// ====================== CATEGORY PAGES ======================
export const ProductCategoryPage = React.lazy(
  () => import('@pages/category/product-category'),
);
export const MediaCategoryPage = React.lazy(
  () => import('@pages/category/media-category'),
);
export const PositionCategoryPage = React.lazy(
  () => import('@pages/category/positon-category'),
);
export const BranchCategoryPage = React.lazy(
  () => import('@pages/category/branch-category'),
);
export const DeploymentMethodCategoryPage = React.lazy(
  () => import('@pages/category/deployment-method-category'),
);
export const CustomerSegmentCategoryPage = React.lazy(
  () => import('@pages/category/customer-segment-category'),
);
export const DepartmentCategoryPage = React.lazy(
  () => import('@pages/category/department-category'),
);
export const ExpertiseCategoryPage = React.lazy(
  () => import('@pages/category/expertise-category'),
);
export const UnitCalculationCategoryPage = React.lazy(
  () => import('@pages/category/unit-of-calculation-category'),
);
export const CustomerTypeCategoryPage = React.lazy(
  () => import('@pages/category/customer-type-category'),
);
export const IdentificationTypeCategoryPage = React.lazy(
  () => import('@pages/category/type-of-identification-catgegory'),
);
export const ApproachCategoryPage = React.lazy(
  () => import('@pages/category/approach'),
);
export const GenderCategoryPage = React.lazy(
  () => import('@pages/category/gender'),
);

// ====================== CAMPAIGN PAGES ======================
export const CampaignListPage = React.lazy(
  () => import('@pages/campaign/campaign-list'),
);
export const CampaignDetailsPage = React.lazy(
  () => import('@pages/campaign/campaign-list/details'),
);
export const CampaignFormPage = React.lazy(
  () => import('@pages/campaign/campaign-list/form'),
);
export const CampaignCategoryListPage = React.lazy(
  () => import('@pages/campaign/category-list'),
);
export const CampaignCategoryDetailsPage = React.lazy(
  () => import('@pages/campaign/category-list/details'),
);

// ====================== CUSTOMER PAGES ======================
export const CustomerListPage = React.lazy(
  () => import('@pages/customer/list-customer'),
);
export const CustomerGroupPage = React.lazy(
  () => import('@pages/customer/group-customer'),
);
export const CustomerDetailPage = React.lazy(
  () => import('@pages/customer/detail'),
);

// ====================== SCENARIO PAGES ======================
export const ScenarioListPage = React.lazy(() => import('@pages/scenario'));
export const ScenarioCreatePage = React.lazy(
  () => import('@pages/scenario/create'),
);
export const ScenarioEditPage = React.lazy(
  () => import('@pages/scenario/edit'),
);
export const ScenarioDetailPage = React.lazy(
  () => import('@pages/scenario/detail'),
);

// ====================== SELLER PAGES ======================
export const SellerListPage = React.lazy(() => import('@pages/seller/list'));
export const SellerDetailsPage = React.lazy(
  () => import('@pages/seller/details'),
);
export const SellerAssignmentPage = React.lazy(
  () => import('@pages/seller/assignment'),
);

// ====================== SETTING PAGES ======================
export const SettingControlPage = React.lazy(
  () => import('@pages/setting/control'),
);

// ====================== SALES PAGES ======================
export const SalesOpportunitiesPage = React.lazy(
  () => import('@pages/sales-opportunities'),
);

// ====================== ACCOUNT PAGES ======================
export const AccountProfilePage = React.lazy(() => import('../pages/account'));
export const AccountManagementPage = React.lazy(
  () => import('@pages/account-management'),
);

// ====================== ERROR PAGES ======================
export const NotFoundPage = React.lazy(() => import('@pages/404'));
export const ServerErrorPage = React.lazy(() => import('@pages/500'));

// Nhóm các components để dễ sử dụng
export const Guards = {
  GuestGuard,
  AuthGuard,
  VerifyGuard,
};

export const CategoryPages = {
  ProductCategoryPage,
  MediaCategoryPage,
  PositionCategoryPage,
  BranchCategoryPage,
  DeploymentMethodCategoryPage,
  CustomerSegmentCategoryPage,
  DepartmentCategoryPage,
  ExpertiseCategoryPage,
  UnitCalculationCategoryPage,
  CustomerTypeCategoryPage,
  IdentificationTypeCategoryPage,
  ApproachCategoryPage,
  GenderCategoryPage,
};

export const CampaignPages = {
  CampaignListPage,
  CampaignDetailsPage,
  CampaignFormPage,
  CampaignCategoryListPage,
  CampaignCategoryDetailsPage,
};

export const CustomerPages = {
  CustomerListPage,
  CustomerGroupPage,
  CustomerDetailPage,
};

export const ScenarioPages = {
  ScenarioListPage,
  ScenarioCreatePage,
  ScenarioEditPage,
  ScenarioDetailPage,
};

export const SellerPages = {
  SellerListPage,
  SellerDetailsPage,
  SellerAssignmentPage,
};

export const ErrorPages = {
  NotFoundPage,
  ServerErrorPage,
};
