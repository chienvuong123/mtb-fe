import { OSearchBaseForm } from '@components/organisms';
import { STATUS_OPTIONS } from '@constants/masterData';
import type { ScenarioSearchRequest } from '@dtos';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useForm } from 'antd/es/form/Form';
import { type FC } from 'react';

interface IScenarioSearchForm {
  onSearch: (values: ScenarioSearchRequest) => void;
}

const items: TFormItem[] = [
  {
    type: INPUT_TYPE.SELECT,
    label: 'Mã Category',
    name: 'categoryCode',
    inputProps: {
      placeholder: 'Chọn',
      options: [],
    },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Tên Category',
    name: 'categoryName',
    inputProps: {
      placeholder: 'Chọn',
      options: [],
    },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Mã kịch bản',
    name: 'code',
    inputProps: { title: 'Mã', placeholder: 'Nhập...', maxLength: 20 },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Tên kịch bản',
    name: 'name',
    inputProps: { placeholder: 'Nhập...', maxLength: 100 },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Trạng thái',
    name: 'status',
    inputProps: {
      placeholder: 'Chọn',
      options: STATUS_OPTIONS,
    },
  },
];

const ScenarioSearchForm: FC<IScenarioSearchForm> = ({ onSearch }) => {
  const [form] = useForm();

  return (
    <div>
      <OSearchBaseForm<ScenarioSearchRequest>
        items={items}
        form={form}
        onSearch={onSearch}
      />
    </div>
  );
};

export default ScenarioSearchForm;
