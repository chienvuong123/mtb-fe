import { BLOCKING_NUMBER_PARTERN } from '@constants/regex';
import type { FormInstance } from 'antd';

export const handleResetFields = (fields: string[], form: FormInstance) => {
  fields.forEach((field) => {
    form.setFieldValue(field, undefined);
  });
};

export const handleValidateNumberField = (
  e: React.ChangeEvent<HTMLInputElement>,
  form: FormInstance,
  fields: string[],
) => {
  const value = e.target.value.replace(BLOCKING_NUMBER_PARTERN, '');
  fields.forEach((field) => {
    form.setFieldValue(field, value);
  });
};
