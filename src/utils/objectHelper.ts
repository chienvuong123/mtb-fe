import type { IMPagination } from '@components/molecules';
import type { BaseAntdOptionType, BaseOptionListDTO } from '@dtos';
import dayjs from 'dayjs';

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
      const object = obj as Record<string, unknown>;
      if (dayjs.isDayjs(object[key])) {
        result[key] = object[key];
      } else {
        result[key] = trimObjectValues(object[key]);
      }
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

const transformToOptions = <T extends Omit<BaseOptionListDTO, 'active'>>(
  data: T[],
  combine?: boolean,
): BaseAntdOptionType[] =>
  data.map((item) => ({
    label: combine ? `${item.code ?? item.id} - ${item.name}` : item.name,
    value: item.id as string,
    code: item?.code,
  })) ?? [];

const transformToF88Options = <T extends Omit<BaseOptionListDTO, 'active'>>(
  data: T[],
): BaseAntdOptionType[] =>
  data.map((item) => ({
    label: item.name,
    value: item.code,
  })) ?? [];

export {
  trimObjectValues,
  isNumberArray,
  filterObject,
  transformToOptions,
  transformToF88Options,
};
