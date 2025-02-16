import { AAlert } from '@components/atoms';
import type {
  IMPagination,
  TPagination,
} from '@components/molecules/m-pagination/MPagination.type';
import { SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import type { BaseResponse } from '@dtos';
import { useCampaignSearchMasterDataQuery } from '@hooks/queries/useCampaignQueries';
import {
  useGroupCustomerAddMutation,
  useGroupCustomerSearchQuery,
} from '@hooks/queries/useGroupCustomerQueries';
import useUrlParams from '@hooks/useUrlParams';
import { Drawer } from 'antd';
import type { SortOrder } from 'antd/es/table/interface';
import Title from 'antd/lib/typography/Title';
import { useEffect, useMemo, useState } from 'react';
import type { GroupCustomerDTO } from 'src/dtos/group-customer';
import GroupCustomerInsertForm from './components/GroupCustomerInsertForm';
import GroupCustomerSearchForm from './components/GroupCustomerSearchForm';
import type { TGroupCustomerRecord } from './components/GroupCustomerTable';
import GroupCustomerTable from './components/GroupCustomerTable';

const GroupCustomerPage = () => {
  const [showInsertForm, setShowInsertForm] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [typeAlert, setTypeAlert] = useState<'success' | 'warning' | 'error'>(
    'success',
  );
  const [message, setMessage] = useState<string>('');

  const { pagination, setPagination, sort, setSort, filters, setFilters } =
    useUrlParams<Partial<GroupCustomerDTO>>();

  const showAlert = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  };

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

  // search list master data campaign
  const { data: campaignMasterData } = useCampaignSearchMasterDataQuery({
    // TODO
    page: { pageNum: 1, pageSize: 10 },
  });

  const handleCloseForm = () => {
    setShowInsertForm(false);
    setIsViewMode(false);
  };

  const handleShowMessage = (dataSuccess?: BaseResponse<boolean>) => {
    if (!dataSuccess) return;

    if (dataSuccess.data) {
      setTypeAlert('success');
      setMessage('Tạo mới thành công');
    } else {
      setTypeAlert('error');
      setMessage(dataSuccess.errorDesc);
    }
    showAlert();
  };

  const handleInvalidate = (data?: BaseResponse<boolean>) => {
    handleShowMessage(data);
    handleCloseForm();
  };

  const { mutate: mutationCreateGroupCustomer } = useGroupCustomerAddMutation(
    {},
    (data) => handleInvalidate(data),
  );

  const handleCreate = () => {
    setShowInsertForm(true);
  };

  const handleClearAll = () => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters({
      campaignId: '',
      nameCampaign: '',
      categoryId: '',
      nameCategory: '',
      code: '',
      name: '',
    });
  };

  const handleView = (id: string) => {
    const item = groupCustomerRes?.data.content.find((i) => i.id === id);
    if (item) {
      setIsViewMode(true);
    }
  };

  const handleSort = (field: string, direction: SortOrder) => {
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
    setPagination(data);
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
    mutationCreateGroupCustomer(data);
  };

  const getDrawerTitle = useMemo(() => {
    const title = '$ nhóm khách hàng';
    if (isViewMode) return title.replace('$', 'Chi tiết');
    return title.replace('$', 'Tạo mới');
  }, [isViewMode]);

  const dataSources: TGroupCustomerRecord[] =
    useMemo(
      () =>
        groupCustomerRes?.data?.content?.map((i) => ({
          ...i,
          key: i.id as string,
          nameCampaign: i.campaign?.name ?? '',
          nameCategory: i.category?.name ?? '',
        })),
      [groupCustomerRes],
    ) ?? [];

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
      {visible && (
        <AAlert
          message={message}
          type={typeAlert}
          closable
          onClose={() => setVisible(false)}
          className={`alert-media ${typeAlert === 'success' ? 'alert-success' : ''} ${typeAlert === 'error' ? 'alert-error' : ''}`}
        />
      )}
      <GroupCustomerSearchForm
        onSearch={handleSearch}
        onClearAll={handleClearAll}
        onCreate={handleCreate}
        listMasterData={{
          campaign: campaignMasterData?.data?.content ?? [],
          // TODO
          category: [],
        }}
        initialValues={{
          campaignId: filters?.campaignId ?? '',
          nameCampaign: filters?.nameCampaign ?? '',
          categoryId: filters?.categoryId ?? '',
          nameCategory: filters?.nameCategory ?? '',
          code: filters?.code ?? '',
          name: filters?.name ?? '',
        }}
      />
      <div className="mt-24" />
      <GroupCustomerTable
        dataSource={dataSources}
        paginations={paginations}
        sortDirection={sort}
        onCreate={handleCreate}
        onView={handleView}
        onSort={handleSort}
      />

      <Drawer
        title={getDrawerTitle}
        onClose={handleCloseForm}
        open={showInsertForm || isViewMode}
        width={1025}
        maskClosable={false}
        classNames={{ body: 'pa-0', header: 'py-22 px-40 fs-16 fw-500' }}
      >
        <GroupCustomerInsertForm
          mode={isViewMode ? 'view' : 'insert'}
          onClose={handleCloseForm}
          onSubmit={handleSubmitInsert}
        />
      </Drawer>
    </div>
  );
};

export default GroupCustomerPage;
