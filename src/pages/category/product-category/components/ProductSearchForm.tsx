import { INPUT_TYPE, type TFormItem } from '@types';
import { OSearchBaseForm } from '@components/organisms';
import { useForm } from 'antd/es/form/Form';
import { type FC } from 'react';
import type { TProductSearchForm } from '@dtos';

interface IProductSearchForm {
  onSearch: (values: TProductSearchForm) => void;
  onClearAll?: () => void;
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
  onSearch,
  onClearAll,
}) => {
  const [form] = useForm();

  return (
    <div>
      <OSearchBaseForm<TProductSearchForm>
        items={items}
        form={form}
        onSearch={onSearch}
        onClearAll={onClearAll}
      />
    </div>
  );
};

export default ProductSearchForm;
