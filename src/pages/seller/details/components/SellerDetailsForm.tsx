import { OBaseDetailForm } from '@components/organisms/o-form-detail';
import type { SellerDetailsDTO } from '@dtos';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useMemo, type FC } from 'react';

interface ISellerDetailsForm {
  initialValues?: Partial<SellerDetailsDTO> | null;
}

const SellerDetailsForm: FC<ISellerDetailsForm> = ({ initialValues }) => {
  const [form] = useForm();

  const items = useMemo(() => {
    return [
      {
        type: INPUT_TYPE.TEXT,
        label: 'Mã nhân viên',
        name: 'code',
        inputProps: { readOnly: true },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Họ và tên',
        name: 'name',
        inputProps: { readOnly: true },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Email',
        name: 'email',
        inputProps: { readOnly: true },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Số điện thoại',
        name: 'phone',
        inputProps: { readOnly: true },
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
        type: INPUT_TYPE.NUMBER,
        label: 'Tổng campaign tham gia',
        name: 'totalCampaign',
        inputProps: { readOnly: true },
      },
    ] as TFormItem[];
  }, []);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues, form]);

  return (
    <div>
      <OBaseDetailForm<SellerDetailsDTO> items={items} form={form} />
    </div>
  );
};

export default SellerDetailsForm;
