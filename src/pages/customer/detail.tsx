import Title from 'antd/lib/typography/Title';
import { type FC } from 'react';

import { MOCK_CUSTOMER } from '@mocks/customer';
import { useParams } from 'react-router-dom';
import CustomerDetailForm from './components/CustomerDetailForm';
import './index.scss';

const CustomerDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="pt-32">
      <Title level={3} className="mb-24">
        Thông tin khách hàng {id}
      </Title>
      <CustomerDetailForm data={MOCK_CUSTOMER} />
    </div>
  );
};

export default CustomerDetailPage;
