import { OBaseDetailForm } from '@components/organisms/o-form-detail';
import { GENDER_OPTIONS } from '@constants/masterData';
import { type CustomerDTO } from '@dtos';
import { INPUT_TYPE, type TFormItem } from '@types';
import { getOptionLabel } from '@utils/objectHelper';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useMemo, type FC } from 'react';

interface ICustomerDetailForm {
  data: CustomerDTO;
}

const CustomerDetailForm: FC<ICustomerDetailForm> = ({ data }) => {
  const [form] = useForm();

  const items = useMemo(() => {
    const configItems: TFormItem[] = [
      {
        type: INPUT_TYPE.TEXT,
        label: 'Mã Category',
        name: 'categoryCode',
        inputProps: {
          disabled: true,
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Tên Category',
        name: 'categoryName',
        inputProps: {
          disabled: true,
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Mã Campaign',
        name: 'campaignCode',
        inputProps: {
          disabled: true,
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Tên Campaign',
        name: 'campaignName',
        inputProps: {
          disabled: true,
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Mã khách hàng',
        name: 'code',
        inputProps: {
          disabled: true,
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Họ và tên',
        name: 'name',
        inputProps: {
          disabled: true,
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Số điện thoại',
        name: 'phone',
        inputProps: {
          disabled: true,
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Email',
        name: 'email',
        inputProps: {
          disabled: true,
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Năm sinh',
        name: 'birthday',
        inputProps: {
          disabled: true,
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Giới tính',
        name: 'gender',
        inputProps: {
          disabled: true,
        },
        getValueProps: (value) => {
          return {
            value: getOptionLabel(GENDER_OPTIONS, value),
          };
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Nhóm khách hàng',
        name: 'cusGroup',
        inputProps: {
          disabled: true,
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Phân khúc khách hàng',
        name: 'cusSegment',
        inputProps: {
          disabled: true,
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Nghề nghiệp',
        name: 'job',
        inputProps: {
          disabled: true,
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Loại giấy tờ định danh',
        name: 'identnDocType',
        inputProps: {
          disabled: true,
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Số giấy tờ định danh',
        name: 'identityCard',
        inputProps: {
          disabled: true,
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Địa chỉ',
        name: 'address',
        inputProps: {
          disabled: true,
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Sở thích',
        name: 'hobbies',
        inputProps: {
          disabled: true,
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Chi nhánh quản lý',
        name: 'branch',
        inputProps: {
          disabled: true,
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Seller',
        name: 'seller',
        inputProps: {
          disabled: true,
        },
      },
    ];
    return configItems;
  }, []);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({ ...data });
    }
  }, [data, form]);

  return (
    <div>
      <OBaseDetailForm<CustomerDTO> items={items} form={form} />
    </div>
  );
};

export default CustomerDetailForm;
