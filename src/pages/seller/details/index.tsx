import { useMemo, type FC } from 'react';
import Title from 'antd/es/typography/Title';
import { useSellerViewQuery } from '@hooks/queries';
import type { TId } from '@dtos';
import { useParams } from 'react-router-dom';
import {
  SellerDetailsForm,
  SellerDetailsTable,
  type TSellerDetailsForm,
} from './components';

const SellerDetails: FC = () => {
  const { id: sellerId } = useParams<TId>();

  const { data: detailsData } = useSellerViewQuery({ id: sellerId as string });

  const initialValues = useMemo(() => {
    if (!detailsData?.data) return {};

    const { user, name, totalCampaign } = detailsData.data;
    return {
      branch: user?.branchDtl?.name,
      code: user?.employeeCode,
      department: user?.departmentDtl?.name,
      email: user?.email,
      name,
      phone: user?.phoneNum,
      position: user?.positionDtl?.name,
      totalCampaign,
    } as TSellerDetailsForm;
  }, [detailsData?.data]);

  const dataSource = useMemo(() => {
    return (
      detailsData?.data?.campaigns?.map((i) => ({
        ...i,
        key: i.campaign.id,
      })) ?? []
    );
  }, [detailsData?.data]);

  return (
    <div className="pt-32">
      <Title level={3} className="mb-24">
        Chi tiết Seller
      </Title>
      <SellerDetailsForm initialValues={initialValues} />
      <Title level={3} className="mb-14 mt-20">
        Danh sách Campaign tham gia
      </Title>
      <SellerDetailsTable dataSource={dataSource} />
    </div>
  );
};

export default SellerDetails;
