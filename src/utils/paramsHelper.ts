import qs from 'qs';

export const paramsSerializer = (params: Record<string, unknown>) => {
  return qs.stringify(params, {
    arrayFormat: 'brackets', // Preserve array format with square brackets []
    encode: false, // Do not encode parameters (keep dots as they are)
    allowDots: true, // Allow dot notation for nested objects
  });
};
