import { OFormDetail } from '@components/organisms';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useMemo, type FC } from 'react';

export type TSellerDetailsForm = {
  branch?: string;
  code?: string;
  department?: string;
  email?: string;
  name?: string;
  phone?: string;
  position?: string;
  totalCampaign?: number;
};

interface ISellerDetailsForm {
  initialValues?: TSellerDetailsForm;
}

const SellerDetailsForm: FC<ISellerDetailsForm> = ({ initialValues }) => {
  const [form] = useForm();

  const items = useMemo(() => {
    return [
      {
        type: INPUT_TYPE.TEXT,
        label: 'Mã nhân viên',
        name: 'code',
        inputProps: { readOnly: true, disabled: true },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Họ và tên',
        name: 'name',
        inputProps: { readOnly: true, disabled: true },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Email',
        name: 'email',
        inputProps: { readOnly: true, disabled: true },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Số điện thoại',
        name: 'phone',
        inputProps: { readOnly: true, disabled: true },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Chi nhánh',
        name: 'branch',
        inputProps: {
          disabled: true,
        },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Phòng',
        name: 'department',
        inputProps: {
          disabled: true,
        },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Chức vụ',
        name: 'position',
        inputProps: {
          disabled: true,
        },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Tổng campaign tham gia',
        name: 'totalCampaign',
        inputProps: { readOnly: true, disabled: true },
      },
    ] as TFormItem[];
  }, []);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues, form]);

  return (
    <div className="border-2 rounded-8 border-gray-border bg-white">
      <OFormDetail<TSellerDetailsForm> items={items} form={form} />
    </div>
  );
};

export default SellerDetailsForm;
