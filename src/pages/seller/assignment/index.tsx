import { useMemo, type FC } from 'react';
import Title from 'antd/es/typography/Title';
import { useSellerBeforeAssignQuery } from '@hooks/queries';
import type { AssignmentSellerSearchForm } from '@dtos';
import useUrlParams from '@hooks/useUrlParams';
import { SellerAsignmentTable, SellerAsignmentSearchForm } from './components';

const SellerAssignment: FC = () => {
  const { filters, setFilters } = useUrlParams<AssignmentSellerSearchForm>();

  const { data: sellerRes, refetch } = useSellerBeforeAssignQuery(
    filters?.campaignId,
    filters?.cusGroup?.join(','),
  );
  const handleSearch = (values: AssignmentSellerSearchForm) => {
    setFilters(values);
  };

  const handleClearAll = () => {
    setFilters({});
  };

  const dataSource = useMemo(() => {
    if (!sellerRes?.data?.sellerInformations) return [];
    return sellerRes?.data?.sellerInformations?.map((i) => ({
      ...i,
      key: i.sellerId,
    }));
  }, [sellerRes?.data?.sellerInformations]);

  return (
    <div className="pt-32">
      <Title level={3} className="mb-24">
        Phân công Seller
      </Title>
      <SellerAsignmentSearchForm
        initialValues={filters}
        onSearch={handleSearch}
        onClearAll={handleClearAll}
      />

      <SellerAsignmentTable
        campaignId={filters.campaignId}
        totalCustomer={sellerRes?.data?.customerNumber ?? 0}
        dataSource={dataSource}
        refetchSellerList={refetch}
      />
    </div>
  );
};

export default SellerAssignment;
