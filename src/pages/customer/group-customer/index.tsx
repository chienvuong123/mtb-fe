import type { IMPagination, TPagination } from '@components/molecules';
import { ODrawer } from '@components/organisms';
import { SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import type { BaseResponse } from '@dtos';
import {
  useGroupCustomerAddMutation,
  useGroupCustomerSearchQuery,
} from '@hooks/queries/groupCustomerQueries';
import useUrlParams from '@hooks/useUrlParams';
import type { TBaseTableSort, TFormType } from '@types';

import { validateInsertCategory } from '@pages/category/utils';
import Title from 'antd/lib/typography/Title';
import { useEffect, useState } from 'react';
import type { GroupCustomerDTO } from 'src/dtos/group-customer';
import { useNotification } from '@libs/antd';
import {
  GroupCustomerInsertForm,
  GroupCustomerSearchForm,
  GroupCustomerTable,
} from './components';

const GroupCustomerPage = () => {
  const [drawerMode, setDrawerMode] = useState<TFormType>();
  const notify = useNotification();

  const [initialValuesForm, setInitialValuesForm] =
    useState<GroupCustomerDTO | null>(null);

  const { pagination, setPagination, sort, setSort, filters, setFilters } =
    useUrlParams<Partial<GroupCustomerDTO>>();

  // search list group customer
  const { data: groupCustomerRes, isLoading } = useGroupCustomerSearchQuery({
    page: { pageNum: pagination.current, pageSize: pagination.pageSize },
    order: sort,
    campaignId: filters.campaignId,
    nameCampaign: filters.nameCampaign,
    categoryId: filters.categoryId,
    nameCategory: filters.nameCategory,
    code: filters.code,
    name: filters.name,
  });

  const handleCloseForm = () => {
    setDrawerMode(undefined);
    setInitialValuesForm(null);
  };

  const handleInvalidate = (data?: BaseResponse<boolean>) => {
    if (data)
      validateInsertCategory(data, notify, () => {
        notify({
          message: 'Tạo mới thành công',
          type: 'success',
        });
        handleCloseForm();
        setInitialValuesForm(null);
      });
  };

  const { mutate: mutationCreateGroupCustomer } = useGroupCustomerAddMutation();

  const handleCreate = () => {
    setDrawerMode('add');
  };

  const handleClearAll = () => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters({});
  };

  const handleView = (id: string) => {
    const item = groupCustomerRes?.data.content.find((i) => i.id === id);
    if (item) {
      setDrawerMode('view');
      setInitialValuesForm({
        ...item,
        categoryId: item.campaign.categoryCampaign?.id ?? '',
      });
    }
  };

  const handleSort = ({ field, direction }: TBaseTableSort) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setSort({
      field,
      direction: direction ? SORT_ORDER_FOR_SERVER[direction] : '',
    });
  };

  const handleSearch = ({
    campaignId,
    nameCampaign,
    categoryId,
    nameCategory,
    code,
    name,
  }: GroupCustomerDTO) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters({
      campaignId,
      nameCampaign,
      categoryId,
      nameCategory,
      code,
      name,
    });
  };

  const handlePaginationChange = (data: TPagination) => {
    setPagination({
      ...data,
      current: data.pageSize !== pagination.pageSize ? 1 : data.current,
    });
  };

  const handleSubmitInsert = ({
    campaignId,
    categoryId,
    code,
    name,
  }: Partial<GroupCustomerDTO>) => {
    const data: Partial<GroupCustomerDTO> = {
      campaignId,
      categoryId,
      code,
      name,
    };

    // create new group customer
    mutationCreateGroupCustomer(data, {
      onSuccess: (resData) => handleInvalidate(resData),
    });
  };

  const paginations: IMPagination = {
    pagination: {
      ...pagination,
      total: groupCustomerRes?.data?.total ?? 1,
    },
    setPagination: handlePaginationChange,
    optionPageSize: [10, 20, 50, 100],
    className: 'flex-end',
  };

  useEffect(() => {
    if (
      !isLoading &&
      !groupCustomerRes?.data?.content?.length &&
      pagination.current > 1
    ) {
      setPagination((prev) => ({
        ...prev,
        current: prev.current - 1,
        total: groupCustomerRes?.data?.total ?? 1,
      }));
    }
  }, [groupCustomerRes, setPagination, pagination, isLoading]);

  return (
    <div className="pt-32 ">
      <Title level={3} className="mb-24 group-customer">
        Danh sách nhóm khách hàng
      </Title>

      <GroupCustomerSearchForm
        onSearch={handleSearch}
        onClearAll={handleClearAll}
        onCreate={handleCreate}
        initialValues={filters as GroupCustomerDTO}
      />
      <div className="mt-24" />
      <GroupCustomerTable
        dataSource={groupCustomerRes?.data?.content ?? []}
        paginations={paginations}
        sortDirection={sort}
        onView={handleView}
        onSort={handleSort}
      />

      <ODrawer
        usePrefixTitle
        title="nhóm khách hàng"
        mode={drawerMode}
        onClose={handleCloseForm}
        open={!!drawerMode}
        width={1025}
      >
        <GroupCustomerInsertForm
          key={drawerMode ?? 'view'}
          mode={drawerMode === 'view' ? 'view' : 'add'}
          initialValues={initialValuesForm}
          onClose={handleCloseForm}
          onSubmit={handleSubmitInsert}
        />
      </ODrawer>
    </div>
  );
};

export default GroupCustomerPage;
