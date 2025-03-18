import type { FormInstance } from 'antd';

export const handleResetFields = (
  fields: string[] | string[][],
  form: FormInstance,
) => {
  fields.forEach((field) => {
    form.setFieldValue(field, undefined);
  });
};

export const getValueFromEvent = (value: string, pattern?: RegExp) =>
  pattern ? value.normalize('NFC').replace(pattern, '') : value;
