import { buildPath, createCommonRoutes, createNavigatePath } from './utils';

export const PATH_SEGMENT = {
  // Base paths (level 1)
  ROOT: '',

  // Common sub-paths (level 2)
  LIST: 'list',
  DETAIL: 'detail',
  CREATE: 'create',
  EDIT: 'edit',
  DELETE: 'delete',
  COPY: 'copy',
  PREVIEW: 'preview',

  // Admin
  ADMIN: 'admin',
  DASHBOARD: 'dashboard',
  CATEGORY: 'category',

  // Categories
  PRODUCT: 'product',
  CUSTOMER_SEGMENT: 'customer-segment',
};

// Tạo các đường dẫn cho toàn bộ ứng dụng
export const ROUTES = {
  // Main routes
  HOME: '/',
  // Admin
  DASHBOARD: buildPath(PATH_SEGMENT.DASHBOARD),

  // Category

  CATEGORY: {
    ...createCommonRoutes(PATH_SEGMENT.CATEGORY),
    PRODUCT: buildPath(PATH_SEGMENT.CATEGORY, [PATH_SEGMENT.PRODUCT]),
    CUSTOMER_SEGMENT: buildPath(PATH_SEGMENT.CATEGORY, [
      PATH_SEGMENT.CUSTOMER_SEGMENT,
    ]),
  },
};

export { createNavigatePath };
