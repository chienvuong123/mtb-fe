import type { CustomerCollectFormDTO } from '@dtos';
import { useFormItems } from '@hooks';
import { useProfile } from '@stores';
import type { TFormItem } from '@types';
import { getValueFromEvent } from '@utils/formHelper';
import { Form, Typography, type FormInstance } from 'antd';
import { useMemo } from 'react';

interface ICollectInfoForm {
  items: TFormItem[];
  form: FormInstance<CustomerCollectFormDTO>;
}

export const CollectInfoForm = ({ form, items }: ICollectInfoForm) => {
  const transformItems = useMemo(
    () =>
      items.map(({ label, blockingPattern, colProps, ...others }) => ({
        label: <Typography className="fw-500 fs-14">{label}</Typography>,
        colProps: { span: 12, ...colProps },
        getValueFromEvent: blockingPattern
          ? (e: React.ChangeEvent<HTMLInputElement>) => {
              return getValueFromEvent(e?.target?.value ?? e, blockingPattern);
            }
          : undefined,
        ...others,
      })),
    [items],
  );

  const { formContent } = useFormItems({
    formItems: transformItems,
    rowProps: { gutter: [16, 20] },
    form,
  });

  const { isReporter } = useProfile();

  return (
    <Form form={form} layout="vertical" disabled={isReporter}>
      <div>{formContent}</div>
    </Form>
  );
};
