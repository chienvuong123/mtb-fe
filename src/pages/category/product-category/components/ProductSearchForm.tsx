import { INPUT_TYPE, type TFormItem } from '@types';
import { OSearchBaseForm } from '@components/organisms';
import { useForm } from 'antd/es/form/Form';
import { type FC } from 'react';

interface IProductSearchForm {
  data: unknown[];
}

type TProductSearchFormType = { code: string; name: string; select: string };

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

const ProductSearchForm: FC<IProductSearchForm> = () => {
  const [form] = useForm();

  const handleSearch = (values: TProductSearchFormType) => {
    console.log(values);
  };

  return (
    <div className="bg-white">
      <OSearchBaseForm<TProductSearchFormType>
        items={items}
        form={form}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default ProductSearchForm;
