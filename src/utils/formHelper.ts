import type { FormInstance } from 'antd';

export const handleResetFields = (fields: string[], form: FormInstance) => {
  fields.forEach((field) => {
    form.setFieldValue(field, undefined);
  });
};
