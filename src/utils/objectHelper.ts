import type { IMPagination } from '@components/molecules/m-pagination/MPagination.type';
import type { BaseAntdOptionType } from '@dtos';

export type TConvertField = 'id' | 'code' | 'name';
export type TConvertFieldObj = {
  label: TConvertField | 'combine';
  value: TConvertField;
};

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

const transformToOptions = <T extends { name: string; code: string }>(
  data: T[],
): BaseAntdOptionType[] =>
  data.map((item) => ({
    label: item.name,
    value: item.code,
  })) ?? [];

const transformToCodeNameOptions = <
  T extends { id?: string | number; code: string; name: string },
>(
  data: T[],
  customField?: TConvertFieldObj,
): {
  byCode: BaseAntdOptionType[];
  byName: BaseAntdOptionType[];
  byId: BaseAntdOptionType[];
  customOptions: BaseAntdOptionType[];
} => {
  const byCode: BaseAntdOptionType[] = [];
  const byName: BaseAntdOptionType[] = [];
  const byId: BaseAntdOptionType[] = [];
  const customOptions: BaseAntdOptionType[] = [];

  data?.forEach((item) => {
    byName.push({
      value: item.id ?? item.code,
      label: `${item.code} - ${item.name}`,
      code: item.code,
    });
    byCode.push({
      value: item.id ?? item.code,
      label: item.code,
      code: item.code,
    });
    byId.push({
      value: item.id ?? item.code,
      label: String(item.id),
      code: item.code,
    });

    if (customField) {
      const value = item[customField.value];
      const label =
        customField.label === 'combine'
          ? `${item.code} - ${item.name}`
          : item[customField.label];
      if (value === undefined || label === undefined) return;
      customOptions.push({
        value,
        label: String(label),
      });
    }
  });

  return { byCode, byName, byId, customOptions };
};

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

export {
  trimObjectValues,
  isNumberArray,
  filterObject,
  transformToOptions,
  transformToCodeNameOptions,
  getOptionLabel,
  isEqual,
};
