import { OSearchBaseForm } from '@components/organisms';
import { STATUS_OPTIONS } from '@constants/masterData';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useForm } from 'antd/es/form/Form';
import { useEffect, type FC } from 'react';
import type { TGroupCustomerSearchForm } from 'src/dtos/group-customer';

interface IGroupCustomerSearchForm {
  initialValues?: TGroupCustomerSearchForm;
  onSearch: (values: TGroupCustomerSearchForm) => void;
  onClearAll?: () => void;
}

const items: TFormItem[] = [
  {
    type: INPUT_TYPE.SELECT,
    label: 'Mã Category',
    name: 'status',
    inputProps: {
      options: STATUS_OPTIONS,
      allowClear: false,
    },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Tên Category',
    name: 'status',
    inputProps: {
      options: STATUS_OPTIONS,
      allowClear: false,
    },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Mã campaign',
    name: 'status',
    inputProps: {
      options: STATUS_OPTIONS,
      allowClear: false,
    },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Tên campaign',
    name: 'status',
    inputProps: {
      options: STATUS_OPTIONS,
      allowClear: false,
    },
  },
];

const GroupCustomerSearchForm: FC<IGroupCustomerSearchForm> = ({
  initialValues,
  onSearch,
  onClearAll,
}) => {
  const [form] = useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues, form]);

  return (
    <div>
      <OSearchBaseForm<TGroupCustomerSearchForm>
        items={items}
        form={form}
        onSearch={onSearch}
        onClearAll={onClearAll}
      />
    </div>
  );
};

export default GroupCustomerSearchForm;
