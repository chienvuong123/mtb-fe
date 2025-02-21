import type { CustomerCollectFormDTO } from '@dtos';
import { useFormItems } from '@hooks';
import type { TFormItem } from '@types';
import { Form, Typography, type FormInstance } from 'antd';
import { useMemo } from 'react';

interface ICollectInfoForm {
  items: TFormItem[];
  form: FormInstance<CustomerCollectFormDTO>;
}

export const CollectInfoForm = ({ form, items }: ICollectInfoForm) => {
  const transformItems = useMemo(
    () =>
      items.map(({ label, colProps, ...others }) => ({
        label: <Typography className="fw-500 fs-14">{label}</Typography>,
        colProps: { span: 12, ...colProps },
        ...others,
      })),
    [items],
  );

  const { formContent } = useFormItems({
    formItems: transformItems,
    rowProps: { gutter: [16, 20] },
  });

  return (
    <Form form={form} layout="vertical">
      <div>{formContent}</div>
    </Form>
  );
};
