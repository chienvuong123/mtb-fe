import React, { useState } from 'react';
import Title from 'antd/lib/typography/Title';
import useUrlParams from '@hooks/useUrlParams';
import type {
  TSalesOpportunitiesSearchForm,
  SalesOpportunitiesDTO,
} from 'src/dtos/sales-opportunities';
import type { SortOrder } from 'antd/es/table/interface';
import type { IMPagination, TPagination } from '@components/molecules';
import { SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import { useSalesOpportunitiesSearchQuery } from '@hooks/queries/salesOpportunitiesQueries';
import { ODrawer } from '@components/organisms';
import type { TFormType } from '@types';
import { filterObject } from '@utils/objectHelper';
import { convertInitValues } from './utils';
import {
  SalesOpportunitiesSearch,
  SalesOpportunitiesDetail,
  SalesOpportunitiesTable,
} from './components';

const ManageSalesOpportunities: React.FC = () => {
  const [drawerMode, setDrawerMode] = useState<TFormType>();
  const [initValues, setInitValues] =
    useState<Partial<SalesOpportunitiesDTO> | null>(null);

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

  const handlePaginationChange = (data: TPagination) => {
    setPagination({
      ...data,
      current: data.pageSize !== pagination.pageSize ? 1 : data.current,
    });
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
      const recordItem: SalesOpportunitiesDTO = {
        ...item,
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
      <SalesOpportunitiesTable
        dataSource={opportunitySellRes?.data?.content ?? []}
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
        {drawerMode && (
          <SalesOpportunitiesDetail
            mode={drawerMode}
            onClose={handleCloseForm}
            initialValues={initValues as SalesOpportunitiesDTO}
            onSubmit={() => {}}
          />
        )}
      </ODrawer>
    </div>
  );
};

export default ManageSalesOpportunities;
