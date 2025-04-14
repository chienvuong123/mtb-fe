import { ROUTES } from '@routers/path';
import { ERole } from './masterData';
import { IS_MILESTONE1 } from './env';

export type PermissionMatrix = {
  [key: string]: {
    [ERole.ADMIN]?: boolean;
    [ERole.CAMPAIGN_MANAGER]?: boolean;
    [ERole.SELLER_MANAGER]?: boolean;
    [ERole.SELLER]?: boolean;
    [ERole.REPORTER]?: boolean;
  };
};

const permissionMatrix2: PermissionMatrix = {
  // Home
  [ROUTES.HOME]: {
    [ERole.ADMIN]: true,
    [ERole.REPORTER]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
    [ERole.SELLER_MANAGER]: true,
    [ERole.SELLER]: true,
  },
  // Dashboard
  [ROUTES.DASHBOARD]: {
    [ERole.ADMIN]: true,
    [ERole.REPORTER]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
    [ERole.SELLER_MANAGER]: true,
    [ERole.SELLER]: true,
  },

  // Categories
  [ROUTES.CATEGORY.ROOT]: {
    [ERole.ADMIN]: true,
    [ERole.REPORTER]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
  },
  [ROUTES.CATEGORY.PRODUCT]: {
    [ERole.ADMIN]: true,
    [ERole.REPORTER]: true,
    [ERole.CAMPAIGN_MANAGER]: true,
  },
  [ROUTES.CATEGORY.CUSTOMER_SEGMENT]: {
    [ERole.ADMIN]: true,
    [ERole.REPORTER]: true,
  },
};

const permissionMatrix1: PermissionMatrix = {
  // Home
  [ROUTES.HOME]: {
    [ERole.ADMIN]: true,
    [ERole.SELLER]: true,
  },
};

const mockMileStone1 = localStorage.getItem('mileStone1');
export const permissionMatrix =
  IS_MILESTONE1 === 'true' || mockMileStone1 === 'true'
    ? permissionMatrix1
    : permissionMatrix2;
