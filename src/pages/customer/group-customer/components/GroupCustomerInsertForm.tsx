import { OBaseForm } from '@components/organisms';
import { GROUP_CUSTOMER_KEY } from '@hooks/queries/useGroupCustomerQueries';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useForm } from 'antd/es/form/Form';
import type { FC } from 'react';
import type { GroupCustomerDTO } from 'src/dtos/group-customer';

interface IGroupCustomerInsertForm {
  onClose: () => void;
  onSubmit: (values: GroupCustomerDTO) => void;
}

const items: TFormItem[] = [
  {
    type: INPUT_TYPE.SELECT,
    label: 'Mã Category',
    name: 'categoryId',
    inputProps: {
      options: [],
      allowClear: false,
    },
  },

  {
    type: INPUT_TYPE.SELECT,
    label: 'Mã campaign',
    name: 'campaignId',
    inputProps: {
      options: [],
      allowClear: false,
    },
  },

  {
    type: INPUT_TYPE.SELECT,
    label: 'Mã nhóm',
    name: 'groupId',
    inputProps: {
      options: [],
      allowClear: false,
    },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Tên nhóm',
    name: 'nameGroup',
    inputProps: {
      options: [],
      allowClear: false,
    },
  },
];

const GroupCustomerInsertForm: FC<IGroupCustomerInsertForm> = ({
  onClose,
  onSubmit,
}) => {
  const [form] = useForm();

  return (
    <div>
      <OBaseForm<GroupCustomerDTO>
        mutationKey={GROUP_CUSTOMER_KEY}
        items={items}
        form={form}
        onSubmit={onSubmit}
        onClose={() => {
          onClose();
          form.resetFields();
        }}
      />
    </div>
  );
};

export default GroupCustomerInsertForm;
