import type { IMPagination } from '@components/molecules/m-pagination/MPagination.type';

/**
 * Recursively trims all string values in an object.
 * @param obj - The object to trim.
 * @returns A new object with trimmed string values.
 */
function trimObjectValues<T>(obj: T): T {
  if (Array.isArray(obj)) {
    // If it's an array, recursively trim each element
    return obj.map(trimObjectValues) as T;
  }
  if (obj !== null && typeof obj === 'object') {
    // If it's an object, recursively trim each value
    const result: Record<string, unknown> = {};
    Object.keys(obj).forEach((key) => {
      result[key] = trimObjectValues((obj as Record<string, unknown>)[key]);
    });
    return result as T;
  }
  if (typeof obj === 'string') {
    // If it's a string, trim it
    return obj.trim() as T;
  }
  // Return the value as-is if it's neither string, object, nor array
  return obj;
}

function isNumberArray(
  value: IMPagination['optionPageSize'],
): value is number[] {
  return (
    Array.isArray(value) && value.length > 0 && typeof value[0] === 'number'
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function filterObject<T extends Record<string, any>>(obj: T): Partial<T> {
  return Object.keys(obj).reduce((acc, key) => {
    if (obj[key]) {
      acc[key as keyof T] = obj[key];
    }
    return acc;
  }, {} as Partial<T>);
}

export { trimObjectValues, isNumberArray, filterObject };
