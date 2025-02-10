import React, { useMemo, useState } from 'react';
import Title from 'antd/lib/typography/Title';
import useUrlParams from '@hooks/useUrlParams';
import type {
  TSalesOpportunitiesSearchForm,
  SalesOpportunitiesDTO,
} from 'src/dtos/sales-opportunities';
import type { SortOrder } from 'antd/es/table/interface';
import type {
  IMPagination,
  TPagination,
} from '@components/molecules/m-pagination/MPagination.type';
import { SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import { useSalesOpportunitiesSearchQuery } from '@hooks/queries/userSalesOpportunitiesQueries';
import { Drawer } from 'antd';
import OpportunitySellTable, {
  type TSalesOpportunitiesRecord,
} from './components/SalesOpportunitiesTable';
import SalesOpportunitiesSearch from './components/SalesOpportunitiesSearch';
import SalesOpportunitiesDetail from './components/SalesOpportunitiesDetail';

const ManageSalesOpportunities: React.FC = () => {
  const [showInsertForm, setShowInsertForm] = useState<boolean>(false);
  const [initValues, setInitValues] =
    useState<Partial<TSalesOpportunitiesRecord> | null>(null);

  const [isViewMode, setIsViewMode] = useState(false);

  const { setPagination, setFilters, setSort, pagination, sort, filters } =
    useUrlParams<Partial<SalesOpportunitiesDTO>>();

  const { data: OpportunitySellRes } = useSalesOpportunitiesSearchQuery({
    // categoryType: CategoryType.PRODUCT,
    // page: { pageNum: pagination.current, pageSize: pagination.pageSize },
    // order: sort,
    // code: filters.code,
    // name: filters.name,
  });
  console.log(OpportunitySellRes);

  const dataSources: TSalesOpportunitiesRecord[] =
    useMemo(
      () =>
        OpportunitySellRes?.data?.content?.map((i) => ({
          ...i,
          key: i.id as string,
        })),
      [OpportunitySellRes],
    ) ?? [];

  const handlePaginationChange = (data: TPagination) => {
    setPagination(data);
  };

  const paginations: IMPagination = {
    pagination: {
      ...pagination,
      total: OpportunitySellRes?.data?.total ?? 1,
    },
    setPagination: handlePaginationChange,
    optionPageSize: [10, 20, 50, 100],
    className: 'flex-end',
  };

  const handleView = (id: string) => {
    const item = OpportunitySellRes?.data?.content.find((i) => i.id === id);
    if (item) {
      setIsViewMode(true);
      setInitValues({ ...item });
      setShowInsertForm(true);
    }
  };

  const handleSearch = (searchObject: TSalesOpportunitiesSearchForm) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters(searchObject);
  };

  const handleClearAll = () => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters({ code: undefined, name: undefined });
  };

  const handleSort = (field: string, direction: SortOrder) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setSort({
      field,
      direction: direction ? SORT_ORDER_FOR_SERVER[direction] : '',
    });
  };

  const handleCloseFormDetail = () => {
    setShowInsertForm(false);
    setIsViewMode(false);
  };

  const getDrawerTitle = useMemo(() => {
    const title = '$ Chi tiết cơ hội bán';
    if (isViewMode) return title.replace('$', 'Chi tiết');
    if (initValues?.id) return title.replace('$', 'Chỉnh sửa');
    return title.replace('$', 'Tạo mới');
  }, [initValues?.id, isViewMode]);

  return (
    <div className="pt-32">
      <Title level={3} className="mb-24">
        Danh sách cơ hội bán
      </Title>
      <SalesOpportunitiesSearch
        onSearch={handleSearch}
        onClearAll={handleClearAll}
      />
      <div className="mt-24" />
      <OpportunitySellTable
        dataSource={dataSources}
        onView={handleView}
        onSort={handleSort}
        paginations={paginations}
      />
      <Drawer
        title={getDrawerTitle}
        onClose={handleCloseFormDetail}
        open={showInsertForm}
        width={1280}
        maskClosable={false}
        classNames={{ body: 'pa-0', header: 'py-22 px-40 fs-16 fw-500' }}
      >
        <SalesOpportunitiesDetail
          isViewMode={isViewMode}
          onClose={handleCloseFormDetail}
          initialValues={initValues}
        />
      </Drawer>
    </div>
  );
};

export default ManageSalesOpportunities;
