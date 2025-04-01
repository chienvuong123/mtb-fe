import { INPUT_TYPE, type CBaseSearch, type TFormItem } from '@types';
import { OSearchBaseForm } from '@components/organisms';
import { useForm } from 'antd/es/form/Form';
import { type FC } from 'react';
import type { ControlSearchRequest } from '@dtos';
import { useProfile } from '@stores';
import { ROUTES } from '@routers/path';

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
    inputProps: { placeholder: 'Nhập...', maxLength: 50 },
  },
];

const ControlSearchForm: FC<CBaseSearch<ControlSearchRequest>> = ({
  onSearch,
  onCreate,
}) => {
  const [form] = useForm();
  const { hasPermission } = useProfile();

  return (
    <div>
      <OSearchBaseForm<ControlSearchRequest>
        items={items}
        form={form}
        onSearch={onSearch}
        onCreate={hasPermission(ROUTES.SETTING.CREATE) ? onCreate : undefined}
      />
    </div>
  );
};

export default ControlSearchForm;
