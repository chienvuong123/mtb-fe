import type { IMPagination } from '@components/molecules/m-pagination/MPagination.type';
import type { BaseAntdOptionType, BaseOptionListDTO } from '@dtos';
import type {
  QueryObserverResult,
  RefetchOptions,
} from '@tanstack/react-query';
import { downloadFile } from './fileHelper';

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

const transformToOptions = <T extends Omit<BaseOptionListDTO, 'active'>>(
  data: T[],
  combine?: boolean,
): BaseAntdOptionType[] =>
  data.map((item) => ({
    label: combine ? `${item.code} - ${item.name}` : item.name,
    value: item.id as string,
  })) ?? [];

const getOptionLabel = (
  options: BaseAntdOptionType[] | undefined,
  value: string | number | undefined,
) => {
  return options?.find((option) => option.value === value)?.label || '';
};

function isEqual(value: unknown, other: unknown): boolean {
  if (value === other) return true;
  if (value == null || other == null) return value === other;

  if (typeof value !== typeof other) return false;

  if (Array.isArray(value) && Array.isArray(other)) {
    if (value.length !== other.length) return false;
    return value.every((val, index) => isEqual(val, other[index]));
  }

  if (typeof value === 'object' && typeof other === 'object') {
    const valueKeys = Object.keys(value as object);
    const otherKeys = Object.keys(other as object);

    if (valueKeys.length !== otherKeys.length) return false;

    return valueKeys.every((key) =>
      isEqual(
        (value as Record<string, unknown>)[key],
        (other as Record<string, unknown>)[key],
      ),
    );
  }

  if (value instanceof Date && other instanceof Date) {
    return value.getTime() === other.getTime();
  }

  return value === other;
}

const downloadFileByGetMethod = async (
  promise: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<unknown, Error>>,
  fileName?: string,
  onError?: () => void,
) => {
  try {
    const { data: resData } = await promise();
    if (resData) downloadFile(resData as Blob, fileName);
  } catch {
    onError?.();
  }
};

export {
  trimObjectValues,
  isNumberArray,
  filterObject,
  transformToOptions,
  getOptionLabel,
  isEqual,
  downloadFileByGetMethod,
};
