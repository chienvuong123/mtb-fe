import { OBaseDetailForm } from '@components/organisms/o-form-detail';
import { GENDER_OPTIONS } from '@constants/masterData';
import type { CustomerDTO } from '@dtos';
import { MOCK_BRANCHES, MOCK_JOBS } from '@mocks/customer';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import { useEffect, useMemo, type FC } from 'react';

interface ICustomerDetailForm {
  data: CustomerDTO;
}

const CustomerDetailForm: FC<ICustomerDetailForm> = ({ data }) => {
  const [form] = useForm();

  const items = useMemo(() => {
    const configItems: TFormItem[] = [
      {
        type: INPUT_TYPE.SELECT,
        label: 'Mã Category',
        name: 'category[code]',
        inputProps: {
          placeholder: 'Chọn',
          options: [
            {
              label: data.category?.code,
              value: data.category?.code,
            },
          ],
        },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Tên Category',
        name: 'category[name]',
        inputProps: {
          placeholder: 'Chọn',
          options: [
            {
              label: data.category?.name,
              value: data.category?.name,
            },
          ],
        },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Mã Campaign',
        name: 'campaign.code',
        inputProps: {
          placeholder: 'Chọn',
          options: [
            {
              label: data.campaign?.code,
              value: data.campaign?.code,
            },
          ],
        },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Tên Campaign',
        name: 'campaign.name',
        inputProps: {
          placeholder: 'Chọn',
          options: [
            {
              label: data.campaign?.name,
              value: data.campaign?.name,
            },
          ],
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Mã khách hàng',
        name: 'code',
        inputProps: { title: 'Mã', placeholder: 'Nhập...', maxLength: 20 },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Số điện thoại',
        name: 'phone',
        inputProps: { placeholder: 'Nhập...', maxLength: 10 },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Email',
        name: 'email',
        inputProps: { placeholder: 'Nhập...', maxLength: 100 },
      },
      {
        type: INPUT_TYPE.DATE_PICKER,
        label: 'Ngày sinh',
        name: 'birthday',
        getValueProps: (value: string) => ({
          value: value ? dayjs(value) : dayjs(),
        }),
        inputProps: {
          placeholder: 'Chọn',
        },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Ngày sinh',
        name: 'gender',
        inputProps: { placeholder: 'Chọn', options: GENDER_OPTIONS },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Họ và tên',
        name: 'name',
        inputProps: { placeholder: 'Nhập...', maxLength: 100 },
      },

      {
        type: INPUT_TYPE.SELECT,
        label: 'Phân khúc khách hàng',
        name: 'segment[id]',
        inputProps: {
          placeholder: 'Chọn',
          options: [
            {
              label: data.segment?.name,
              value: data.segment?.id,
            },
          ],
        },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Nghề nghiệp',
        name: 'job',
        inputProps: {
          placeholder: 'Chọn',
          options: MOCK_JOBS.map((job) => ({
            label: job,
            value: job,
          })),
        },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Khách hàng định danh',
        name: 'identityType',
        inputProps: {
          placeholder: 'Chọn',
          options: ['CCCD', 'Hộ chiếu'].map((val) => ({
            label: val,
            value: val,
          })),
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Địa chỉ',
        name: 'address',
        inputProps: { placeholder: 'Nhập...', maxLength: 200 },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Nhóm khách hàng',
        name: 'group.id',
        inputProps: {
          placeholder: 'Chọn',
          options: [
            {
              label: data.group?.name,
              value: data.group?.id,
            },
          ],
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'CCCD',
        name: 'identityNumber',
        inputProps: { placeholder: 'Nhập...', maxLength: 20 },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Sở thích',
        name: 'hobby',
        inputProps: { placeholder: 'Nhập...', maxLength: 200 },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Chi nhánh quản lý',
        name: 'branch',
        inputProps: {
          placeholder: 'Chọn',
          options: MOCK_BRANCHES.map((branch) => ({
            label: branch,
            value: branch,
          })),
        },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Seller',
        name: 'seller.id',
        inputProps: {
          placeholder: 'Chọn',
          options: [
            {
              label: [data.seller?.lastName, data.seller?.firstName].join(' '),
              value: data.seller?.id,
            },
          ],
        },
      },
    ];
    return configItems;
  }, [data]);

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
