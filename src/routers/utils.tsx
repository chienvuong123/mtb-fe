import { PATH_SEGMENT } from './path';

/**
 * Create navigate path with dynamic parameters
 * @param route - The base path with dynamic parameters (e.g. "/user/:id")
 * @param params - The object containing the dynamic parameters
 * @returns The path with the dynamic parameters replaced
 */
export const createNavigatePath = (
  route: string,
  params?: Record<string, string | number>,
) => {
  let path = route;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      path = path.replace(`:${key}`, String(value));
    });
  }
  return path;
};

/**
 * Build the full path from the base and segments
 * @param base - The base of the path
 * @param segments - The additional segments (optional)
 * @returns The full path with the format "/base/segment1/segment2"
 */
export const buildPath = (base: string, segments: string[] = []): string => {
  return `/${[base, ...segments].filter(Boolean).join('/')}`;
};

/**
 * Create common routes (list, create, edit, detail) for a module
 * @param basePath - The base path of the module
 * @returns The object containing the common routes
 */
export const createCommonRoutes = (basePath: string) => {
  const { LIST, CREATE, EDIT, DETAIL } = PATH_SEGMENT;

  return {
    ROOT: buildPath(basePath),
    LIST: buildPath(basePath, [LIST]),
    CREATE: buildPath(basePath, [CREATE]),
    EDIT: buildPath(basePath, [EDIT, ':id']),
    DETAIL: buildPath(basePath, [DETAIL, ':id']),
  };
};
