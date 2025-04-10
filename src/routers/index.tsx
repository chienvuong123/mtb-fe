import { createBrowserRouter } from 'react-router-dom';
import { ROUTES, PATH_SEGMENT } from '@routers/path';
import {
  // Guards
  GuestGuard,
  AuthGuard,
  VerifyGuard,
  // Layout
  LayoutWrapper,
  // Pages
  LoginPage,
  ForgotPasswordPage,
  ConfirmPasswordPage,
  ChangePasswordPage,
  ExpiredLinkPage,
  OtpPage,
  AccountProfilePage,
  AccountManagementPage,
  SettingControlPage,
  SalesOpportunitiesPage,
  NotFoundPage,
  ServerErrorPage,
  // Categories
  CategoryPages,
  CampaignPages,
  CustomerPages,
  ScenarioPages,
  SellerPages,
  MultimediaPages,
  DashboardPage,
} from './lazy-imports';

const routes = createBrowserRouter(
  [
    // Auth routes
    {
      path: ROUTES.LOGIN,
      element: (
        <GuestGuard>
          <LoginPage />
        </GuestGuard>
      ),
    },
    {
      path: ROUTES.FORGOT_PASSWORD,
      element: <ForgotPasswordPage />,
    },
    {
      path: ROUTES.CONFIRM_PASSWORD,
      element: <ConfirmPasswordPage />,
    },
    {
      path: ROUTES.CHANGE_PASSWORD,
      element: <ChangePasswordPage />,
    },
    {
      path: ROUTES.EXPIRED_PASSWORD,
      element: <ExpiredLinkPage />,
    },
    {
      path: ROUTES.OTP,
      element: (
        <VerifyGuard>
          <OtpPage />
        </VerifyGuard>
      ),
    },

    // Main Authenticated Layout
    {
      path: '',
      element: (
        <AuthGuard>
          <LayoutWrapper />
        </AuthGuard>
      ),
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
            {
              path: ROUTES.CATEGORY.MEDIA,
              element: <CategoryPages.MediaCategoryPage />,
            },
            {
              path: ROUTES.CATEGORY.POSITION,
              element: <CategoryPages.PositionCategoryPage />,
            },
            {
              path: ROUTES.CATEGORY.BRANCH,
              element: <CategoryPages.BranchCategoryPage />,
            },
            {
              path: ROUTES.CATEGORY.DEPLOYMENT_METHOD,
              element: <CategoryPages.DeploymentMethodCategoryPage />,
            },
            {
              path: ROUTES.CATEGORY.CUSTOMER_SEGMENT,
              element: <CategoryPages.CustomerSegmentCategoryPage />,
            },
            {
              path: ROUTES.CATEGORY.DEPARTMENT,
              element: <CategoryPages.DepartmentCategoryPage />,
            },
            {
              path: ROUTES.CATEGORY.EXPERTISE,
              element: <CategoryPages.ExpertiseCategoryPage />,
            },
            {
              path: ROUTES.CATEGORY.UNIT_CALCULATION,
              element: <CategoryPages.UnitCalculationCategoryPage />,
            },
            // {
            //   path: ROUTES.CATEGORY.CUSTOMER_TYPE,
            //   element: <CategoryPages.CustomerTypeCategoryPage />,
            // },
            {
              path: ROUTES.CATEGORY.MB_IDENTIFICATION,
              element: <CategoryPages.MbIdentificationCategoryPage />,
            },
            // {
            //   path: ROUTES.CATEGORY.APPROACH,
            //   element: <CategoryPages.ApproachCategoryPage />,
            // },
            {
              path: ROUTES.CATEGORY.GENDER,
              element: <CategoryPages.GenderCategoryPage />,
            },
            {
              path: ROUTES.CATEGORY.CUSTOMERS,
              element: <CategoryPages.CustomerCategoryPage />,
            },
            {
              path: ROUTES.CATEGORY.TARGET,
              element: <CategoryPages.TargetCategoryPage />,
            },
          ],
        },

        // Campaign Routes
        {
          path: ROUTES.CAMPAIGN.ROOT,
          children: [
            {
              path: PATH_SEGMENT.LIST,
              element: <CampaignPages.CampaignListPage />,
            },
            {
              path: `${PATH_SEGMENT.DETAIL}/:id`,
              element: <CampaignPages.CampaignDetailsPage />,
            },
            {
              path: PATH_SEGMENT.CREATE,
              element: <CampaignPages.CampaignFormPage />,
            },
            {
              path: `${PATH_SEGMENT.EDIT}/:id`,
              element: <CampaignPages.CampaignFormPage />,
            },
            {
              path: `${PATH_SEGMENT.COPY}/:id`,
              element: <CampaignPages.CampaignFormPage />,
            },
            {
              path: PATH_SEGMENT.CATEGORY,
              children: [
                {
                  path: PATH_SEGMENT.LIST,
                  element: <CampaignPages.CampaignCategoryListPage />,
                },
                {
                  path: `${PATH_SEGMENT.DETAIL}/:id`,
                  element: <CampaignPages.CampaignCategoryDetailsPage />,
                },
              ],
            },
          ],
        },

        // Customer Routes
        {
          path: ROUTES.CUSTOMER.ROOT,
          children: [
            {
              path: PATH_SEGMENT.LIST,
              element: <CustomerPages.CustomerListPage />,
            },
            {
              path: PATH_SEGMENT.GROUP,
              element: <CustomerPages.CustomerGroupPage />,
            },
            {
              path: `${PATH_SEGMENT.DETAIL}/:id`,
              element: <CustomerPages.CustomerDetailPage />,
            },
          ],
        },

        // Scenario Routes
        {
          path: ROUTES.SCENARIO.ROOT,
          children: [
            {
              path: PATH_SEGMENT.LIST,
              element: <ScenarioPages.ScenarioListPage />,
            },
            {
              path: PATH_SEGMENT.CREATE,
              element: <ScenarioPages.ScenarioCreatePage />,
            },
            {
              path: `${PATH_SEGMENT.EDIT}/:id`,
              element: <ScenarioPages.ScenarioEditPage />,
            },
            {
              path: `${PATH_SEGMENT.COPY}/:id`,
              element: <ScenarioPages.ScenarioCreatePage />,
            },
            {
              path: `${PATH_SEGMENT.DETAIL}/:id`,
              element: <ScenarioPages.ScenarioDetailPage />,
            },
            {
              path: `${PATH_SEGMENT.PREVIEW}/:id`,
              element: <ScenarioPages.ScenarioPreviewPage />,
            },
          ],
        },

        // Seller Routes
        {
          path: ROUTES.SELLER.ROOT,
          children: [
            {
              path: PATH_SEGMENT.LIST,
              element: <SellerPages.SellerListPage />,
            },
            {
              path: `${PATH_SEGMENT.DETAIL}/:id`,
              element: <SellerPages.SellerDetailsPage />,
            },
            {
              path: PATH_SEGMENT.ASSIGNMENT,
              element: <SellerPages.SellerAssignmentPage />,
            },
          ],
        },

        // Multimedia Routes
        {
          path: ROUTES.MULTIMEDIA.ROOT,
          children: [
            {
              path: '',
              element: <MultimediaPages.MultimediaPage />,
            },
            {
              path: PATH_SEGMENT.IMAGE,
              element: <MultimediaPages.MultimediaImagePage />,
            },
            {
              path: PATH_SEGMENT.AUDIO,
              element: <MultimediaPages.MultimediaAudioPage />,
            },
            {
              path: PATH_SEGMENT.VIDEO,
              element: <MultimediaPages.MultimediaVideoPage />,
            },
            {
              path: PATH_SEGMENT.DOCUMENT,
              element: <MultimediaPages.MultimediaDocumentPage />,
            },
            {
              path: PATH_SEGMENT.ANIMATED,
              element: <MultimediaPages.MultimediaAnimatedPage />,
            },
          ],
        },

        // Setting Routes
        {
          path: ROUTES.SETTING.ROOT,
          children: [
            {
              path: PATH_SEGMENT.CONTROL,
              element: <SettingControlPage />,
            },
          ],
        },

        // Sales Routes
        {
          path: ROUTES.SALES.ROOT,
          children: [
            {
              path: PATH_SEGMENT.OPPORTUNITIES,
              element: <SalesOpportunitiesPage />,
            },
          ],
        },
        {
          path: ROUTES.SALES.OPPORTUNITIES,
          element: <SalesOpportunitiesPage />,
        },

        // Account Routes
        {
          path: ROUTES.PROFILE,
          element: <AccountProfilePage />,
        },
        {
          path: ROUTES.ACCOUNT.MANAGEMENT.ROOT,
          element: <AccountManagementPage />,
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
    {
      path: '/500',
      element: <ServerErrorPage />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  },
);

export default routes;
