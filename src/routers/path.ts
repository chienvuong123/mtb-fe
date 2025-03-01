const ROUTE_PATH = {
  HOME: '/',

  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  OTP: '/otp',
  CONFIRM_PASSWORD: '/confirm-password',
  CHANGE_PASSWORD: '/change-password',
  EXPRIED_CHANGE_PASSWORD: '/expried-change-password',
  REGISTER: '/register',
  ACCOUNT: '/account',

  EXAMPLE: '/example',

  CATEGORY: {
    ROOT: '/category',
    PRODUCT_CATEGORY: `product-category`,
    MEDIA_CATEGORY: `media-category`,
  },

  MANAGER_CAMPAIGN: {
    ROOT: 'manager-category',
    CAMPAIGN: `campaign`,
    CAMPAIGN_DETAIL: `campaign-detail`,
    CREATE_CAMPAIGN: `campaign-create`,
    CREATE_CATEGORY: `create-category`,
    CATEGORY: `category`,
    CATEGORY_DETAIL: `category-detail`,
  },

  SETTING: {
    ROOT: '/setting',
    CONTROL: 'control',
  },
  SALES_OPPORTUNITIES: '/sales-opportunities',

  CUSTOMER: {
    ROOT: '/customer',
    CUSTOMER_CAMPAIGN_LIST: 'list',
    CUSTOMER_GROUP_CAMPAIGN_LIST: 'group-list',
    DETAIL: ':customerId',
  },
  SCENARIO: {
    LIST: 'list',
    ROOT: '/scenario',
    CREATE: 'create',
    DETAIL: ':id',
  },
  SELLER: {
    ROOT: '/seller',
    LIST: 'list',
    ASSIGNMENT: 'assignment',
    DETAIL: ':id',
  },
  MULTIMEDIA_WAREHOUSE: 'multimedia-warehouse',
  ACCOUNT_MANAGEMENT: 'account-management',
};

export const {
  HOME,
  LOGIN,
  FORGOT_PASSWORD,
  CONFIRM_PASSWORD,
  CHANGE_PASSWORD,
  EXPRIED_CHANGE_PASSWORD,
  OTP,
  REGISTER,
  ACCOUNT,
  EXAMPLE,
  CATEGORY,
  SETTING,
  SALES_OPPORTUNITIES,
  CUSTOMER,
  MANAGER_CAMPAIGN,
  SCENARIO,
  SELLER,
  MULTIMEDIA_WAREHOUSE,
  ACCOUNT_MANAGEMENT,
} = ROUTE_PATH;
