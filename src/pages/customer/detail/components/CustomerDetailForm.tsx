import { OFormDetail } from '@components/organisms';
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
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Tên Category',
        name: 'categoryName',
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Mã Campaign',
        name: 'campaignCode',
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Tên Campaign',
        name: 'campaignName',
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Mã khách hàng',
        name: 'code',
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Họ và tên',
        name: 'name',
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Số điện thoại',
        name: 'phone',
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Email',
        name: 'email',
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Năm sinh',
        name: 'birthday',
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Giới tính',
        name: 'gender',
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Nhóm khách hàng',
        name: 'cusGroup',
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Phân khúc khách hàng',
        name: 'cusSegment',
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Nghề nghiệp',
        name: 'job',
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Loại giấy tờ định danh',
        name: 'identnDocType',
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Số giấy tờ định danh',
        name: 'identityCard',
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Địa chỉ',
        name: 'address',
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Chi nhánh quản lý',
        name: 'branch',
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Seller',
        name: 'seller',
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Order ID',
        name: 'orderId',
      },
    ];
    return configItems;
  }, []);

  useEffect(() => {
    if (customerData) {
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
        branch: customerData?.branchCategory?.name,
        seller: customerData?.sellerEntity?.name,
        orderId: customerData?.orderId,
      });
    }
  }, [customerData, form, hobbyOptions]);

  return (
    <div className="border-2 rounded-8 border-gray-border bg-white">
      <OFormDetail<CustomerDTO> items={items} form={form} isViewMode />
    </div>
  );
};

export default CustomerDetailForm;
