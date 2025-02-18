const ROUTE_PATH = {
  HOME: '/',

  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  OTP: '/otp',
  CONFIRM_PASSWORD: '/confirm-password',
  CHANGE_PASSWORD: '/change-password',
  REGISTER: '/register',
  ACCOUNT: '/account',

  EXAMPLE: '/example',

  CATEGORY: {
    ROOT: '/category',
    PRODUCT_CATEGORY: `product-category`,
    MEDIA_CATEGORY: `media-category`,
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
    DETAIL: ':id',
  },
  SCENARIO: {
    LIST: 'list',
    ROOT: '/scenario',
    CREATE: 'create',
    DETAIL: ':id',
  },
};

export const {
  HOME,
  LOGIN,
  FORGOT_PASSWORD,
  CONFIRM_PASSWORD,
  CHANGE_PASSWORD,
  OTP,
  REGISTER,
  ACCOUNT,
  EXAMPLE,
  CATEGORY,
  SETTING,
  SALES_OPPORTUNITIES,
  CUSTOMER,
  SCENARIO,
} = ROUTE_PATH;
