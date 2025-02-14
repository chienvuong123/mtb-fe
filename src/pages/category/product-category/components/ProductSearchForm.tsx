import { INPUT_TYPE, type TFormItem } from '@types';
import { OSearchBaseForm } from '@components/organisms';
import { useForm } from 'antd/es/form/Form';
import { useEffect, type FC } from 'react';
import type { TProductSearchForm } from '@dtos';

interface IProductSearchForm {
  initialValues?: TProductSearchForm;
  onSearch: (values: TProductSearchForm) => void;
  onClearAll?: () => void;
  onCreate?: () => void;
}

const items: TFormItem[] = [
  {
    type: INPUT_TYPE.TEXT,
    label: 'Mã',
    name: 'code',
    inputProps: { title: 'Mã', placeholder: 'Nhập...', maxLength: 20 },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Tên',
    name: 'name',
    inputProps: { placeholder: 'Nhập...', maxLength: 100 },
  },
];

const ProductSearchForm: FC<IProductSearchForm> = ({
  initialValues,
  onSearch,
  onClearAll,
  onCreate,
}) => {
  const [form] = useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues, form]);

  return (
    <div>
      <OSearchBaseForm<TProductSearchForm>
        items={items}
        form={form}
        onSearch={onSearch}
        onClearAll={onClearAll}
        onCreate={onCreate}
      />
    </div>
  );
};

export default ProductSearchForm;
