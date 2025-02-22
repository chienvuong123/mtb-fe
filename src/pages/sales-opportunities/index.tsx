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
import { useSalesOpportunitiesSearchQuery } from '@hooks/queries/salesOpportunitiesQueries';
import { ODrawer } from '@components/organisms';
import type { TFormType } from '@types';
import { filterObject } from '@utils/objectHelper';
import OpportunitySellTable, {
  type TSalesOpportunitiesRecord,
} from './components/SalesOpportunitiesTable';
import SalesOpportunitiesSearch from './components/SalesOpportunitiesSearch';
import SalesOpportunitiesDetail from './components/SalesOpportunitiesDetail';
import { convertInitValues } from './components/hook/salesOpportunitiesHelper';

const ManageSalesOpportunities: React.FC = () => {
  const [drawerMode, setDrawerMode] = useState<TFormType>();
  const [initValues, setInitValues] =
    useState<Partial<TSalesOpportunitiesRecord> | null>(null);

  const { setPagination, setFilters, setSort, pagination, sort, filters } =
    useUrlParams<Partial<SalesOpportunitiesDTO>>();

  const { data: opportunitySellRes } = useSalesOpportunitiesSearchQuery({
    page: {
      pageNum: Number(pagination.current),
      pageSize: Number(pagination.pageSize),
    },
    order: sort,
    ...filterObject(filters),
  });

  const dataSources: TSalesOpportunitiesRecord[] =
    useMemo(
      () =>
        opportunitySellRes?.data?.content?.map((i) => ({
          ...i,
          key: i.id as string,
        })),
      [opportunitySellRes],
    ) ?? [];

  const handlePaginationChange = (data: TPagination) => {
    setPagination(data);
  };

  const paginations: IMPagination = {
    pagination: {
      ...pagination,
      total: opportunitySellRes?.data?.total ?? 1,
    },
    setPagination: handlePaginationChange,
    optionPageSize: [10, 20, 50, 100],
    className: 'flex-end',
  };

  const handleView = (id: string) => {
    const item = opportunitySellRes?.data?.content.find((i) => i.id === id);
    if (item) {
      const recordItem: TSalesOpportunitiesRecord = {
        ...item,
        key: item.id,
      };
      setInitValues(convertInitValues(recordItem));
      setDrawerMode('view');
    }
  };

  const handleSearch = (searchObject: TSalesOpportunitiesSearchForm) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters(searchObject);
  };

  const handleClearAll = () => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters({});
  };

  const handleSort = (field: string, direction: SortOrder) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setSort({
      field,
      direction: direction ? SORT_ORDER_FOR_SERVER[direction] : '',
    });
  };

  const handleCloseForm = () => {
    setDrawerMode(undefined);
  };

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
      <ODrawer
        usePrefixTitle
        title="cơ hội bán"
        mode={drawerMode}
        onClose={handleCloseForm}
        open={!!drawerMode}
        width={1280}
        maskClosable={false}
        classNames={{ body: 'pa-0', header: 'py-22 px-40 fs-16 fw-500' }}
      >
        <SalesOpportunitiesDetail
          isViewMode={drawerMode === 'view'}
          onClose={handleCloseForm}
          initialValues={initValues}
        />
      </ODrawer>
    </div>
  );
};

export default ManageSalesOpportunities;
