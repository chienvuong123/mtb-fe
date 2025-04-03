import { buildPath, createCommonRoutes, createNavigatePath } from './utils';

export const PATH_SEGMENT = {
  // Base paths (level 1)
  ROOT: '',
  AUTH: 'auth',
  DASHBOARD: 'dashboard',
  CAMPAIGN: 'campaign',
  CATEGORY: 'category',
  CUSTOMER: 'customer',
  SCENARIO: 'scenario',
  SELLER: 'seller',
  SALES: 'sales',
  SETTING: 'setting',
  MULTIMEDIA: 'multimedia',
  ACCOUNT: 'account',
  PROFILE: 'profile',

  // Common sub-paths (level 2)
  LIST: 'list',
  DETAIL: 'detail',
  CREATE: 'create',
  EDIT: 'edit',
  DELETE: 'delete',
  COPY: 'copy',
  PREVIEW: 'preview',
  // Seller
  ASSIGNMENT: 'assignment',
  MANAGEMENT: 'management',
  // Setting
  CONTROL: 'control',
  // Sales
  OPPORTUNITIES: 'opportunities',

  // Categories
  PRODUCT: 'product',
  MEDIA: 'media',
  POSITION: 'position',
  BRANCH: 'branch',
  DEPLOYMENT_METHOD: 'deployment-method',
  CUSTOMER_SEGMENT: 'customer-segment',
  UNIT_CALCULATION: 'unit-calculation',
  CUSTOMER_TYPE: 'customer-type',
  DEPARTMENT: 'department',
  EXPERTISE: 'expertise',
  MB_IDENTIFICATION: 'mb-identification',
  APPROACH: 'approach',
  GENDER: 'gender',
  CUSTOMERS: 'customer',
  TARGET: 'target',

  // Multimedia
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
  DOCUMENT: 'document',
  ANIMATED: 'animated',

  // Auth related
  LOGIN: 'login',
  REGISTER: 'register',
  FORGOT_PASSWORD: 'forgot-password',
  CONFIRM_PASSWORD: 'confirm-password',
  CHANGE_PASSWORD: 'change-password',
  EXPIRED_PASSWORD: 'expired-password',
  OTP: 'otp',

  // Customer
  IMPORT: 'import',
  EXPORT: 'export',
  GROUP: 'group',
  GROUP_CREATE: 'group-create',
};

// Tạo các đường dẫn cho toàn bộ ứng dụng
export const ROUTES = {
  // Main routes
  HOME: '/',
  DASHBOARD: buildPath(PATH_SEGMENT.DASHBOARD),

  // Authentication routes
  LOGIN: buildPath(PATH_SEGMENT.LOGIN),
  REGISTER: buildPath(PATH_SEGMENT.REGISTER),
  FORGOT_PASSWORD: buildPath(PATH_SEGMENT.FORGOT_PASSWORD),
  CONFIRM_PASSWORD: buildPath(PATH_SEGMENT.CONFIRM_PASSWORD),
  CHANGE_PASSWORD: buildPath(PATH_SEGMENT.CHANGE_PASSWORD),
  EXPIRED_PASSWORD: buildPath(PATH_SEGMENT.EXPIRED_PASSWORD),
  OTP: buildPath(PATH_SEGMENT.OTP),
  PROFILE: buildPath(PATH_SEGMENT.PROFILE),

  ACCOUNT: {
    ROOT: buildPath(PATH_SEGMENT.ACCOUNT),
    MANAGEMENT: { ...createCommonRoutes(PATH_SEGMENT.ACCOUNT) },
  },

  // Module routes with children
  CAMPAIGN: {
    ...createCommonRoutes(PATH_SEGMENT.CAMPAIGN),
    CATEGORY: {
      LIST: buildPath(PATH_SEGMENT.CAMPAIGN, [
        PATH_SEGMENT.CATEGORY,
        PATH_SEGMENT.LIST,
      ]),
      DETAIL: buildPath(PATH_SEGMENT.CAMPAIGN, [
        PATH_SEGMENT.CATEGORY,
        PATH_SEGMENT.DETAIL,
        ':id',
      ]),
      CREATE: buildPath(PATH_SEGMENT.CAMPAIGN, [
        PATH_SEGMENT.CATEGORY,
        PATH_SEGMENT.CREATE,
      ]),
      EDIT: buildPath(PATH_SEGMENT.CAMPAIGN, [
        PATH_SEGMENT.CATEGORY,
        PATH_SEGMENT.EDIT,
        ':id',
      ]),
      DELETE: buildPath(PATH_SEGMENT.CAMPAIGN, [
        PATH_SEGMENT.CATEGORY,
        PATH_SEGMENT.DELETE,
      ]),
    },
    COPY: buildPath(PATH_SEGMENT.CAMPAIGN, [PATH_SEGMENT.COPY, ':id']),
  },

  CUSTOMER: {
    ...createCommonRoutes(PATH_SEGMENT.CUSTOMER),
    GROUP: buildPath(PATH_SEGMENT.CUSTOMER, [PATH_SEGMENT.GROUP]),
    GROUP_CREATE: buildPath(PATH_SEGMENT.CUSTOMER, [PATH_SEGMENT.GROUP_CREATE]),
    IMPORT: buildPath(PATH_SEGMENT.CUSTOMER, [PATH_SEGMENT.IMPORT]),
    EXPORT: buildPath(PATH_SEGMENT.CUSTOMER, [PATH_SEGMENT.EXPORT]),
  },

  SCENARIO: createCommonRoutes(PATH_SEGMENT.SCENARIO),

  SELLER: {
    ...createCommonRoutes(PATH_SEGMENT.SELLER),
    ASSIGNMENT: buildPath(PATH_SEGMENT.SELLER, [PATH_SEGMENT.ASSIGNMENT]),
  },

  CATEGORY: {
    ...createCommonRoutes(PATH_SEGMENT.CATEGORY),
    PRODUCT: buildPath(PATH_SEGMENT.CATEGORY, [PATH_SEGMENT.PRODUCT]),
    MEDIA: buildPath(PATH_SEGMENT.CATEGORY, [PATH_SEGMENT.MEDIA]),
    POSITION: buildPath(PATH_SEGMENT.CATEGORY, [PATH_SEGMENT.POSITION]),
    BRANCH: buildPath(PATH_SEGMENT.CATEGORY, [PATH_SEGMENT.BRANCH]),
    DEPLOYMENT_METHOD: buildPath(PATH_SEGMENT.CATEGORY, [
      PATH_SEGMENT.DEPLOYMENT_METHOD,
    ]),
    CUSTOMER_SEGMENT: buildPath(PATH_SEGMENT.CATEGORY, [
      PATH_SEGMENT.CUSTOMER_SEGMENT,
    ]),
    UNIT_CALCULATION: buildPath(PATH_SEGMENT.CATEGORY, [
      PATH_SEGMENT.UNIT_CALCULATION,
    ]),
    CUSTOMER_TYPE: buildPath(PATH_SEGMENT.CATEGORY, [
      PATH_SEGMENT.CUSTOMER_TYPE,
    ]),
    DEPARTMENT: buildPath(PATH_SEGMENT.CATEGORY, [PATH_SEGMENT.DEPARTMENT]),
    EXPERTISE: buildPath(PATH_SEGMENT.CATEGORY, [PATH_SEGMENT.EXPERTISE]),
    MB_IDENTIFICATION: buildPath(PATH_SEGMENT.CATEGORY, [
      PATH_SEGMENT.MB_IDENTIFICATION,
    ]),
    APPROACH: buildPath(PATH_SEGMENT.CATEGORY, [PATH_SEGMENT.APPROACH]),
    GENDER: buildPath(PATH_SEGMENT.CATEGORY, [PATH_SEGMENT.GENDER]),
    CUSTOMERS: buildPath(PATH_SEGMENT.CATEGORY, [PATH_SEGMENT.CUSTOMERS]),
    TARGET: buildPath(PATH_SEGMENT.CATEGORY, [PATH_SEGMENT.TARGET]),
  },

  SALES: {
    ROOT: buildPath(PATH_SEGMENT.SALES),
    OPPORTUNITIES: buildPath(PATH_SEGMENT.SALES, [PATH_SEGMENT.OPPORTUNITIES]),
  },

  SETTING: {
    ...createCommonRoutes(PATH_SEGMENT.SETTING),
    CONTROL: buildPath(PATH_SEGMENT.SETTING, [PATH_SEGMENT.CONTROL]),
  },

  MULTIMEDIA: {
    ...createCommonRoutes(PATH_SEGMENT.MULTIMEDIA),
    IMAGE: buildPath(PATH_SEGMENT.MULTIMEDIA, [PATH_SEGMENT.IMAGE]),
  },
};

export { createNavigatePath };
