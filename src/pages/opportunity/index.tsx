import React, { useMemo, useState } from 'react'
import OpportunitySellListSearch from './components/OpportunitySellSearch'
import Title from 'antd/lib/typography/Title';
import useUrlParams from '@hooks/useUrlParams';
import { CategoryType } from '@dtos';
import type { IOpportunitySellSearchForm, OpportunitySellDTO } from 'src/dtos/opportunity';
import type { SortOrder } from 'antd/es/table/interface';
import type {
  IMPagination,
  TPagination,
} from '@components/molecules/m-pagination/MPagination.type';
import { SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import OpportunitySellTable, { type TOpportunitySellRecord } from './components/OpportunitySellTable';
import { useOpportunitySellSearchQuery } from '@hooks/queries/userOpportunitySellQueries';
import { Drawer } from 'antd';
import OpportunitySellDetail from './components/OpportunitySellDetail';

const ManageSalesOpportunities : React.FC  = () => {
  const [showInsertForm, setShowInsertForm] = useState<boolean>(false);
  const [initValues, setInitValues] = useState<Partial<TOpportunitySellRecord> | null>(
    null,
  );

  const [isViewMode, setIsViewMode] = useState(false);

  const { setPagination, setFilters, setSort, pagination, sort, filters } =
  useUrlParams<Partial<OpportunitySellDTO>>();

  const { data: OpportunitySellRes } = useOpportunitySellSearchQuery({
    // categoryType: CategoryType.PRODUCT,
    // page: { pageNum: pagination.current, pageSize: pagination.pageSize },
    // order: sort,
    // code: filters.code,
    // name: filters.name,
  });
console.log(OpportunitySellRes);

  const dataSources: TOpportunitySellRecord[] =
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
    setIsViewMode(true);
    setShowInsertForm(true);
    const item = OpportunitySellRes?.data?.content.find((i) => i.id === id);
    if (item) {
      setIsViewMode(true);
      setInitValues({ ...item });
      setShowInsertForm(true);
    }
  };

  const handleSearch = ({name, code}: IOpportunitySellSearchForm) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters({name, code});
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
    <div className='pt-32'>
      <Title level={3} className='mb-24'>
        Danh sách cơ hội bán
      </Title>
      <OpportunitySellListSearch
        onSearch={handleSearch}
        onClearAll={handleClearAll}
      />
      <div className='mt-24'/>
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
        <OpportunitySellDetail
          isViewMode={isViewMode} 
          onClose={handleCloseFormDetail}
          initialValues={initValues}
        />
      </Drawer>
    </div>
  )
}

export default ManageSalesOpportunities  
