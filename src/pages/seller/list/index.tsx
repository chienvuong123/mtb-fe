import { SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import { type SellerSearchRequest } from '@dtos';
import { useEffect, type FC } from 'react';

import type {
  IMPagination,
  TPagination,
} from '@components/molecules/m-pagination/MPagination.type';
import useUrlParams from '@hooks/useUrlParams';
import { filterObject } from '@utils/objectHelper';
import type { SortOrder } from 'antd/es/table/interface';
import { OTitleBlock } from '@components/organisms';
import { useNavigate } from 'react-router-dom';
import { useSellerSearchQuery } from '@hooks/queries';
import { SELLER } from '@routers/path';
import { SellerSearchForm, SellerTable } from './components';

const SellerPage: FC = () => {
  const {
    pagination: { current, pageSize },
    setPagination,
    sort,
    setSort,
    filters,
    setFilters,
  } = useUrlParams<Partial<SellerSearchRequest>>();

  const navigate = useNavigate();

  const { data: sellerRes, isLoading } = useSellerSearchQuery({
    page: {
      pageNum: Number(current),
      pageSize: Number(pageSize),
    },
    order: sort,
    ...filterObject(filters),
  });

  const handleCreate = () => {
    // navigate here
  };

  const handleEdit = () => {
    // navigate here
  };

  const handleSearch = (data: SellerSearchRequest) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters(data);
  };

  const handlePaginationChange = (data: TPagination) => {
    setPagination({
      ...data,
      current: data.pageSize !== pageSize ? 1 : data.current,
    });
  };

  const paginations: IMPagination = {
    pagination: {
      current,
      pageSize,
      total: sellerRes?.data?.total ?? 1,
    },
    setPagination: handlePaginationChange,
    optionPageSize: [10, 20, 50, 100],
    className: 'flex-end',
  };

  const handleClearAll = () => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters({});
  };

  const handleView = (id: string) => {
    navigate(`${SELLER.ROOT}/${id}`);
  };

  const handleSort = (field: string | string[], direction: SortOrder) => {
    const orderField = Array.isArray(field) ? field.join('.') : field;
    setPagination((pre) => ({ ...pre, current: 1 }));
    setSort({
      field: orderField,
      direction: direction ? SORT_ORDER_FOR_SERVER[direction] : '',
    });
  };

  useEffect(() => {
    if (!isLoading && !sellerRes?.data?.content?.length && current > 1) {
      setPagination((prev) => ({
        ...prev,
        current: prev.current - 1,
        total: sellerRes?.data?.total ?? 1,
      }));
    }
  }, [sellerRes, setPagination, current, isLoading]);

  return (
    <div className="pt-32 category-product">
      <OTitleBlock
        title="Danh sách Seller"
        showImport={false}
        showExport={false}
        popupProps={{
          modalProps: {
            title: 'Tải lên danh sách Seller',
          },
        }}
      />

      <SellerSearchForm
        onSearch={handleSearch}
        onClearAll={handleClearAll}
        initialValues={filterObject(filters)}
        onCreate={handleCreate}
      />
      <div className="mt-24" />
      <SellerTable
        dataSource={sellerRes?.data?.content ?? []}
        paginations={paginations}
        sortDirection={sort}
        onEdit={handleEdit}
        onView={handleView}
        onSort={handleSort}
      />
    </div>
  );
};

export default SellerPage;
