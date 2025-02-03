import { INPUT_TYPE, type TFormItem } from '@types';
import { OSearchBaseForm } from '@components/organisms';
import { useForm } from 'antd/es/form/Form';
import { type FC } from 'react';
import type { TControlSearchForm } from '@dtos';

interface IControlSearchForm {
  onSearch: (values: TControlSearchForm) => void;
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

const ControlSearchForm: FC<IControlSearchForm> = ({ onSearch }) => {
  const [form] = useForm();

  return (
    <div>
      <OSearchBaseForm<TControlSearchForm>
        items={items}
        form={form}
        onSearch={onSearch}
      />
    </div>
  );
};

export default ControlSearchForm;
