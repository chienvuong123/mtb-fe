import { INPUT_TYPE, type TFormItem } from '@types';
import { OSearchBaseForm } from '@components/organisms';
import { useForm } from 'antd/es/form/Form';
import { type FC } from 'react';
import type { ControlSearchRequest } from '@dtos';

interface IControlSearchForm {
  onSearch: (values: ControlSearchRequest) => void;
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
      <OSearchBaseForm<ControlSearchRequest>
        items={items}
        form={form}
        onSearch={onSearch}
      />
    </div>
  );
};

export default ControlSearchForm;
