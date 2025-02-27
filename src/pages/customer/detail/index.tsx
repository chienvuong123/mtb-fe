import Title from 'antd/lib/typography/Title';
import { type FC } from 'react';

import type { IMPagination } from '@components/molecules/m-pagination/MPagination.type';
import type { BaseSearchParams } from '@dtos';
import useUrlParams from '@hooks/useUrlParams';
import { MOCK_CUSTOMER, MOCK_CUSTOMER_APPROACHES } from '@mocks/customer';
import { useParams } from 'react-router-dom';
import CustomerApproachPreview from './components/CustomerApproachPreview';
import CustomerApproachTable from './components/CustomerApproachTable';
import CustomerDetailForm from './components/CustomerDetailForm';
import './index.scss';

const CustomerDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { pagination, setPagination } = useUrlParams<BaseSearchParams>();

  const paginationProps: IMPagination = {
    pagination: {
      ...pagination,
      total: MOCK_CUSTOMER_APPROACHES.length,
    },
    setPagination,
    optionPageSize: [10, 20, 50, 100],
    className: 'flex-end',
  };

  return (
    <div className="pt-32">
      <Title level={3} className="mb-16">
        Thông tin khách hàng {id}
      </Title>
      <CustomerDetailForm data={MOCK_CUSTOMER} />
      <Title level={3} className="mt-32 mb-16">
        Kế hoạch tiếp cận
      </Title>
      <CustomerApproachTable
        paginations={paginationProps}
        dataSource={MOCK_CUSTOMER_APPROACHES}
      />
      <Title level={3} className="mt-32 mb-16">
        Thông tin tiếp cận
      </Title>
      <CustomerApproachPreview data={MOCK_CUSTOMER_APPROACHES} />
    </div>
  );
};

export default CustomerDetailPage;
