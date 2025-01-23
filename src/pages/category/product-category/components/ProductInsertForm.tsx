import { OBaseForm } from '@components/organisms';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useForm } from 'antd/es/form/Form';
import { type FC } from 'react';

type TProductInsertFormType = { code: string; name: string; select: string };

interface IProductInsertForm {
  initialValues?: TProductInsertFormType;
  onClose: () => void;
}

const items: TFormItem[] = [
  {
    type: INPUT_TYPE.TEXT,
    label: 'Mã',
    name: 'code',
    inputProps: { title: 'Mã', placeholder: 'Nhập...' },
    required: true,
    rules: [{ required: true }],
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Ten',
    name: 'name',
    inputProps: { placeholder: 'Nhập...' },
    required: true,
    rules: [{ required: true }],
  },
  {
    type: INPUT_TYPE.TEXT_AREA,
    label: 'Ghi chu',
    name: 'note',
    inputProps: { placeholder: 'Nhập...', maxLength: 1000 },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Select',
    name: 'select',
    inputProps: {
      placeholder: 'Nhập...',
      options: [
        { value: '1', label: 'First item' },
        { value: '2', label: 'Second item' },
      ],
    },
  },
];

const ProductInsertForm: FC<IProductInsertForm> = ({
  onClose,
  initialValues,
}) => {
  const [form] = useForm();

  const handleSearch = (values: TProductInsertFormType) => {
    console.log(values);
    console.log(initialValues);
  };
  return (
    <div>
      <OBaseForm<TProductInsertFormType>
        items={[
          ...items,
          {
            type: INPUT_TYPE.FILE,
            label: 'File',
            name: 'file',
            inputProps: {},
          },
        ]}
        form={form}
        onSubmit={handleSearch}
        onClose={() => {
          onClose();
          form.resetFields();
        }}
      />
    </div>
  );
};

export default ProductInsertForm;
