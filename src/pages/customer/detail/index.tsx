import Title from 'antd/lib/typography/Title';
import { useState, type FC } from 'react';

import CustomerApproachPreview from './components/CustomerApproachPreview';
import CustomerApproachTable from './components/CustomerApproachTable';
import CustomerDetailForm from './components/CustomerDetailForm';
import './index.scss';

const CustomerDetailPage: FC = () => {
  const [calledIds, setCalledIds] = useState<string[]>([]);
  return (
    <div className="pt-32">
      <Title level={3} className="mb-16">
        Thông tin khách hàng
      </Title>
      <CustomerDetailForm />
      <Title level={3} className="mt-32 mb-16">
        Kế hoạch tiếp cận
      </Title>
      <CustomerApproachTable
        calledIds={calledIds}
        setCalledIds={setCalledIds}
      />
      <Title level={3} className="mt-32 mb-16">
        Thông tin tiếp cận
      </Title>
      <CustomerApproachPreview calledIds={calledIds} />
    </div>
  );
};

export default CustomerDetailPage;
