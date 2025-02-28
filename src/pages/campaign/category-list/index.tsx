/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import Title from 'antd/lib/typography/Title';
import useUrlParams from '@hooks/useUrlParams';
import { ESalesCampaign, SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import type { SortOrder } from 'antd/es/table/interface';
import type {
  IMPagination,
  TPagination,
} from '@components/molecules/m-pagination/MPagination.type';
import { DATE_SLASH_FORMAT } from '@constants/dateFormat';
import { filterObject } from '@utils/objectHelper';
import dayjs from 'dayjs';
import {
  useManageCategorySearchQuery,
  useManagerCategoryRemoveMutation,
} from '@hooks/queries/manageCategoryQueries';
import type { TCampaignSearchForm } from 'src/dtos/campaign';
import { useNavigate } from 'react-router-dom';
import { MANAGER_CAMPAIGN } from '@routers/path';
import type { ManagerCategoryDTO } from 'src/dtos/manage-category';
import type { TCategoryTableRecord } from './components/CategoryTable';
import CategoryTable from './components/CategoryTable';
import CategorySearch from './components/CategorySearch';
import './index.scss';

const ManageCategoryPage: React.FC = () => {
  const [initValues, setInitValues] =
    useState<Partial<TCategoryTableRecord> | null>(null);

  const {
    pagination: { current, pageSize },
    setPagination,
    sort,
    setSort,
    filters,
    setFilters,
  } = useUrlParams<Partial<ManagerCategoryDTO>>();

  const navigate = useNavigate();

  const { data: manageCategoryRes } = useManageCategorySearchQuery({
    page: {
      pageNum: Number(current),
      pageSize: Number(pageSize),
    },
    order: sort,
    ...filterObject(filters),
  });

  const { mutate: mutationDeleteCategory } = useManagerCategoryRemoveMutation();

  const handleCreate = () => {
    setInitValues({
      code: undefined,
      name: '',
      status: ESalesCampaign.OPPORTUNITY_TO_SELL,
      startDate: dayjs().format(DATE_SLASH_FORMAT),
      endDate: dayjs().format(DATE_SLASH_FORMAT),
    });

    navigate(
      `/${MANAGER_CAMPAIGN.ROOT}/${MANAGER_CAMPAIGN.CREATE_CATEGORY}?isCreate=${true}`,
    );
  };

  const handleEdit = (data: TCategoryTableRecord) => {
    setInitValues({
      ...data,
      startDate: dayjs(data.startDate).format(DATE_SLASH_FORMAT),
      endDate: dayjs().format(DATE_SLASH_FORMAT),
    });

    if (data) {
      navigate(
        `/${MANAGER_CAMPAIGN.ROOT}/${MANAGER_CAMPAIGN.CATEGORY_DETAIL}/${data.id}`,
      );
    }
  };

  const handleSearch = (searchObject: TCampaignSearchForm) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters(searchObject);
  };

  const handlePaginationChange = (data: TPagination) => {
    setPagination(data);
  };

  const handleDelete = (id: string) => {
    mutationDeleteCategory({ id });
  };

  const paginations: IMPagination = {
    pagination: {
      current,
      pageSize,
      total: manageCategoryRes?.data?.total ?? 1,
    },
    setPagination: handlePaginationChange,
    optionPageSize: [10, 20, 50, 100],
    className: 'flex-end',
  };

  const handleClearAll = () => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters({ code: undefined, name: undefined });
  };

  const handleView = (id: string) => {
    const item = manageCategoryRes?.data.content.find((i) => i.id === id);
    if (item) {
      navigate(
        `/${MANAGER_CAMPAIGN.ROOT}/${MANAGER_CAMPAIGN.CATEGORY_DETAIL}/${id}?isView=${true}`,
      );
      setInitValues({ ...item });
    }
  };

  const handleSort = (field: string, direction: SortOrder) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setSort({
      field,
      direction: direction ? SORT_ORDER_FOR_SERVER[direction] : '',
    });
  };

  // TODO: will be removed
  console.log(initValues);

  return (
    <div className="pt-32">
      <Title level={3} className="mt-24">
        Danh sách Category
      </Title>
      <CategorySearch
        onSearch={handleSearch}
        onClearAll={handleClearAll}
        initialValues={filters}
        onCreate={handleCreate}
      />
      <div className="mb-24" />
      <CategoryTable
        dataSource={manageCategoryRes?.data?.content ?? []}
        paginations={paginations}
        sortDirection={sort}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onSort={handleSort}
      />
    </div>
  );
};

export default ManageCategoryPage;
