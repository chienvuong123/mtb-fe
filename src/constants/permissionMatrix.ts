import { ROUTES } from '@routers/path';
import { ERole } from './masterData';
import { IS_MILESTONE1 } from './env';

export type PermissionMatrix = {
  [key: string]: {
    [ERole.ADMIN]?: boolean;
    [ERole.CAMPAIGN_MANAGER]?: boolean;
    [ERole.SELLER_MANAGER]?: boolean;
    [ERole.SELLER]?: boolean;
  };
};

const permissionMatrix2: PermissionMatrix = {
  // Home
  [ROUTES.HOME]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
    [ERole.SELLER_MANAGER]: true,
    [ERole.SELLER]: true,
  },
  // Dashboard
  [ROUTES.DASHBOARD]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
    [ERole.SELLER_MANAGER]: true,
    [ERole.SELLER]: true,
  },

  [ROUTES.PROFILE]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
    [ERole.SELLER_MANAGER]: true,
    [ERole.SELLER]: true,
  },

  // Campaign
  [ROUTES.CAMPAIGN.ROOT]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
  },
  [ROUTES.CAMPAIGN.LIST]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
    [ERole.SELLER_MANAGER]: true,
    [ERole.SELLER]: true,
  },
  [ROUTES.CAMPAIGN.CREATE]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
  },
  [ROUTES.CAMPAIGN.EDIT]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
  },
  [ROUTES.CAMPAIGN.DELETE]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
  },
  [ROUTES.CAMPAIGN.DETAIL]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
    [ERole.SELLER_MANAGER]: true,
    [ERole.SELLER]: true,
  },

  // Category campaign
  [ROUTES.CAMPAIGN.CATEGORY.LIST]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
    [ERole.SELLER_MANAGER]: true,
  },
  [ROUTES.CAMPAIGN.CATEGORY.DETAIL]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
    [ERole.SELLER_MANAGER]: true,
  },
  [ROUTES.CAMPAIGN.CATEGORY.CREATE]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
  },
  [ROUTES.CAMPAIGN.CATEGORY.EDIT]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
  },
  [ROUTES.CAMPAIGN.CATEGORY.DELETE]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
  },

  [ROUTES.CATEGORY.ROOT]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
  },
  [ROUTES.CATEGORY.PRODUCT]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
  },
  [ROUTES.CATEGORY.MEDIA]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
  },
  [ROUTES.CATEGORY.POSITION]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
  },
  [ROUTES.CATEGORY.BRANCH]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
  },
  [ROUTES.CATEGORY.DEPLOYMENT_METHOD]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
  },
  [ROUTES.CATEGORY.CUSTOMER_SEGMENT]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
  },
  [ROUTES.CATEGORY.UNIT_CALCULATION]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
  },
  [ROUTES.CATEGORY.CUSTOMER_TYPE]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
  },
  [ROUTES.CATEGORY.DEPARTMENT]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
  },
  [ROUTES.CATEGORY.EXPERTISE]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
  },
  [ROUTES.CATEGORY.IDENTIFICATION_TYPE]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
  },
  [ROUTES.CATEGORY.APPROACH]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
  },
  [ROUTES.CATEGORY.GENDER]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
  },

  // Customer
  [ROUTES.CUSTOMER.ROOT]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
    [ERole.SELLER_MANAGER]: true,
    [ERole.SELLER]: true,
  },
  [ROUTES.CUSTOMER.LIST]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
    [ERole.SELLER_MANAGER]: true,
    [ERole.SELLER]: true,
  },
  [ROUTES.CUSTOMER.CREATE]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
    [ERole.SELLER_MANAGER]: true,
    [ERole.SELLER]: true,
  },
  [ROUTES.CUSTOMER.DETAIL]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
    [ERole.SELLER_MANAGER]: true,
    [ERole.SELLER]: true,
  },
  [ROUTES.CUSTOMER.IMPORT]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
  },
  [ROUTES.CUSTOMER.EXPORT]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
  },
  [ROUTES.CUSTOMER.GROUP]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
    [ERole.SELLER_MANAGER]: true,
    [ERole.SELLER]: true,
  },
  [ROUTES.CUSTOMER.GROUP_CREATE]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
    [ERole.SELLER_MANAGER]: true,
    [ERole.SELLER]: true,
  },

  // Sales
  [ROUTES.SALES.ROOT]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
    [ERole.SELLER_MANAGER]: true,
    [ERole.SELLER]: true,
  },
  [ROUTES.SALES.OPPORTUNITIES]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
    [ERole.SELLER_MANAGER]: true,
    [ERole.SELLER]: true,
  },

  // Scenario
  [ROUTES.SCENARIO.ROOT]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
    [ERole.SELLER_MANAGER]: true,
    [ERole.SELLER]: true,
  },
  [ROUTES.SCENARIO.LIST]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
    [ERole.SELLER_MANAGER]: true,
    [ERole.SELLER]: true,
  },
  [ROUTES.SCENARIO.CREATE]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
  },
  [ROUTES.SCENARIO.EDIT]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
  },
  [ROUTES.SCENARIO.DELETE]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
  },
  [ROUTES.SCENARIO.DETAIL]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
    [ERole.SELLER_MANAGER]: true,
    [ERole.SELLER]: true,
  },

  // Seller
  [ROUTES.SELLER.ROOT]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
    [ERole.SELLER_MANAGER]: true,
  },
  [ROUTES.SELLER.LIST]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
    [ERole.SELLER_MANAGER]: true,
  },
  [ROUTES.SELLER.DETAIL]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
    [ERole.SELLER_MANAGER]: true,
  },
  [ROUTES.SELLER.ASSIGNMENT]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
    [ERole.SELLER_MANAGER]: true,
  },

  // Multimedia warehouse
  [ROUTES.MULTIMEDIA.ROOT]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
  },

  // Setting
  [ROUTES.SETTING.ROOT]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
  },
  [ROUTES.SETTING.CONTROL]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
  },

  // System account management
  [ROUTES.ACCOUNT.ROOT]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
    [ERole.SELLER_MANAGER]: true,
    [ERole.SELLER]: true,
  },
  [ROUTES.ACCOUNT.MANAGEMENT]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
  },
};

const permissionMatrix1: PermissionMatrix = {
  // Home
  [ROUTES.HOME]: {
    [ERole.ADMIN]: true,
    [ERole.SELLER]: true,
  },

  [ROUTES.PROFILE]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
    [ERole.SELLER_MANAGER]: true,
    [ERole.SELLER]: true,
  },

  // Campaign
  [ROUTES.CAMPAIGN.ROOT]: {
    [ERole.ADMIN]: true,
    [ERole.SELLER]: true,
  },
  [ROUTES.CAMPAIGN.LIST]: {
    [ERole.ADMIN]: true,
    [ERole.SELLER]: true,
  },
  [ROUTES.CAMPAIGN.CREATE]: {
    [ERole.ADMIN]: false,
    [ERole.SELLER]: false,
  },
  [ROUTES.CAMPAIGN.EDIT]: {
    [ERole.ADMIN]: false,
    [ERole.SELLER]: false,
  },
  [ROUTES.CAMPAIGN.DETAIL]: {
    [ERole.ADMIN]: true,
    [ERole.SELLER]: true,
  },

  // Category campaign
  [ROUTES.CAMPAIGN.CATEGORY.LIST]: {
    [ERole.ADMIN]: true,
  },
  [ROUTES.CAMPAIGN.CATEGORY.DETAIL]: {
    [ERole.ADMIN]: true,
  },

  // Customer
  [ROUTES.CUSTOMER.ROOT]: {
    [ERole.ADMIN]: true,
    [ERole.SELLER]: true,
  },
  [ROUTES.CUSTOMER.LIST]: {
    [ERole.ADMIN]: true,
    [ERole.SELLER]: true,
  },
  [ROUTES.CUSTOMER.DETAIL]: {
    [ERole.ADMIN]: true,
    [ERole.SELLER]: true,
  },
  [ROUTES.CUSTOMER.EDIT]: {
    [ERole.ADMIN]: true,
  },
  [ROUTES.CUSTOMER.GROUP]: {
    [ERole.ADMIN]: true,
    [ERole.SELLER]: true,
  },
  [ROUTES.CUSTOMER.GROUP_CREATE]: {
    [ERole.ADMIN]: true,
    [ERole.SELLER]: true,
  },

  // Sales
  [ROUTES.SALES.ROOT]: {
    [ERole.ADMIN]: true,
    [ERole.SELLER]: true,
  },
  [ROUTES.SALES.OPPORTUNITIES]: {
    [ERole.ADMIN]: true,
    [ERole.SELLER]: true,
  },

  // Scenario
  [ROUTES.SCENARIO.ROOT]: {
    [ERole.ADMIN]: true,
    [ERole.SELLER]: true,
  },
  [ROUTES.SCENARIO.LIST]: {
    [ERole.ADMIN]: true,
    [ERole.SELLER]: true,
  },
  [ROUTES.SCENARIO.DETAIL]: {
    [ERole.ADMIN]: true,
    [ERole.SELLER]: true,
  },

  // Seller
  [ROUTES.SELLER.ROOT]: {
    [ERole.ADMIN]: true,
  },
  [ROUTES.SELLER.LIST]: {
    [ERole.ADMIN]: true,
  },
  [ROUTES.SELLER.DETAIL]: {
    [ERole.ADMIN]: true,
  },
  [ROUTES.SELLER.ASSIGNMENT]: {
    [ERole.ADMIN]: true,
  },

  // System account management
  [ROUTES.ACCOUNT.ROOT]: {
    [ERole.ADMIN]: true,
    [ERole.SELLER]: true,
  },
  [ROUTES.ACCOUNT.MANAGEMENT]: {
    [ERole.ADMIN]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
  },
};

const mockMileStone1 = localStorage.getItem('mileStone1');
export const permissionMatrix =
  IS_MILESTONE1 === 'true' || mockMileStone1 === 'true'
    ? permissionMatrix1
    : permissionMatrix2;
