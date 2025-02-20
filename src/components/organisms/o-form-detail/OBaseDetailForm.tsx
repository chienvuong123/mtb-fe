import { useFormItems } from '@hooks/index';
import type { TFormItem } from '@types';
import { Form, type FormInstance, Typography } from 'antd';
import { useMemo } from 'react';

interface IBaseDetailForm<T> {
  items: TFormItem[];
  form: FormInstance<T>;
}

const OBaseDetailForm = <T extends object>({
  form,
  items,
}: IBaseDetailForm<T>) => {
  const transformItems = useMemo(
    () =>
      items.map(({ label, ...others }) => ({
        label: (
          <Typography.Text ellipsis className="fw-600 fs-14">
            {label}
          </Typography.Text>
        ),
        ...others,
      })),
    [items],
  );

  const { formContent } = useFormItems({
    formItems: transformItems,
    rowProps: { gutter: [14, 17] },
  });

  return (
    <div className="border-2 rounded-8 border-gray-border bg-white">
      <Form form={form} layout="vertical">
        <div className="pa-24 pb-22">{formContent}</div>
      </Form>
    </div>
  );
};

export default OBaseDetailForm;
