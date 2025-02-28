import { OBaseDetailForm } from '@components/organisms/o-form-detail';
import { CategoryType, type CustomerDTO } from '@dtos';
import {
  useCategoryOptionsListQuery,
  useCustomerViewQuery,
} from '@hooks/queries';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useMemo, type FC } from 'react';
import { useParams } from 'react-router-dom';

const CustomerDetailForm: FC = () => {
  const [form] = useForm();
  const { customerId } = useParams();

  const { data: customerQueryData } = useCustomerViewQuery({
    id: customerId as string,
  });
  const customerData = customerQueryData?.data;

  const { data: hobbyOptions } = useCategoryOptionsListQuery(
    CategoryType.HOBBY,
  );

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
      {
        type: INPUT_TYPE.TEXT,
        label: 'Order ID',
        name: 'orderId',
        inputProps: {
          disabled: true,
        },
      },
    ];
    return configItems;
  }, []);

  useEffect(() => {
    if (customerData) {
      const hobbiesArray = customerData?.hobbies?.split(',') || [];
      const hobbiesName = hobbiesArray
        .map(
          (hobbyId) =>
            hobbyOptions?.find((option) => option.value === hobbyId)?.label ||
            '',
        )
        .filter(Boolean)
        .join(', ');

      form.setFieldsValue({
        categoryCode: customerData?.categoryCampaign?.code,
        categoryName: customerData?.categoryCampaign?.name,
        campaignCode: customerData?.campaign?.code,
        campaignName: customerData?.campaign?.name,
        code: customerData?.code,
        name: customerData?.name,
        phone: customerData?.phone,
        email: customerData?.email,
        birthday: customerData?.birthday,
        gender: customerData?.genderCategory?.name,
        cusGroup: customerData?.customerGroup?.name,
        cusSegment: customerData?.customerSegment?.name,
        job: customerData?.jobCategory?.name,
        identnDocType: customerData?.identnDocTypeCategory?.name,
        identityCard: customerData?.identityCard,
        address: customerData?.address,
        hobbies: hobbiesName,
        branch: customerData?.branchCategory?.name,
        seller: customerData?.sellerEntity?.name,
        orderId: customerData?.orderId,
      });
    }
  }, [customerData, form, hobbyOptions]);

  return (
    <div>
      <OBaseDetailForm<CustomerDTO> items={items} form={form} />
    </div>
  );
};

export default CustomerDetailForm;
