import React, { useMemo } from 'react';
import Title from 'antd/lib/typography/Title';
import useUrlParams from '@hooks/useUrlParams';
import { EStatusCampaign, SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import type { IMPagination, TPagination } from '@components/molecules';
import { downloadFileByGetMethod, filterObject } from '@utils/objectHelper';
import type {
  CampaignDTO,
  CampaignSearchRequest,
  TCampaignSearchForm,
} from '@dtos';
import {
  useCampaignExport,
  useCampaignRemoveMutation,
  useCampaignSearchQuery,
} from '@hooks/queries';
import { useNavigate } from 'react-router-dom';
import { createNavigatePath, ROUTES } from '@routers/path';
import { ExportIcon } from '@assets/icons';
import { AButton } from '@components/atoms';
import { Flex } from 'antd';
import { useProfile } from '@stores';
import { useNotification } from '@libs/antd';
import { dayjsToString } from '@utils/dateHelper';
import type { TBaseTableSort } from '@types';
import { validationHelper } from '@utils/validationHelper';
import { CampaignSearch, CampaignTable } from './components';

const Campaign: React.FC = () => {
  const {
    pagination: { current, pageSize },
    sort,
    filters,
    setFilters,
    handleResetFilters,
  } = useUrlParams<Partial<CampaignDTO>>();

  const navigate = useNavigate();
  const notify = useNotification();
  const { isSeller } = useProfile();

  const searchParams: CampaignSearchRequest = useMemo(
    () => ({
      page: {
        pageNum: Number(current),
        pageSize: Number(pageSize),
      },
      order: sort,
      ...filterObject(filters),
      status: isSeller ? EStatusCampaign.INPROGRESS : filters.status,
    }),
    [current, pageSize, sort, filters, isSeller],
  );

  const { data: campaignRes } = useCampaignSearchQuery(searchParams);

  const { mutate: mutationDeleteProducts } = useCampaignRemoveMutation();
  const { refetch: campaignExport } = useCampaignExport({
    ...searchParams,
    page: undefined,
  });

  const handleCreate = () => {
    navigate(ROUTES.CAMPAIGN.CREATE);
  };

  const handleEdit = (data: CampaignDTO) => {
    if (data?.id) {
      navigate(createNavigatePath(ROUTES.CAMPAIGN.EDIT, { id: data.id }));
    }
  };

  const handleSearch = (searchObject: TCampaignSearchForm) => {
    setFilters({
      ...searchObject,
      startDate: dayjsToString(searchObject?.startDate),
      endDate: dayjsToString(searchObject?.endDate),
      current: 1,
    });
  };

  const handlePaginationChange = (data: TPagination) => {
    setFilters({
      ...data,
      current: data.pageSize !== pageSize ? 1 : data.current,
    });
  };

  const paginations: IMPagination = {
    pagination: {
      current,
      pageSize,
      total: campaignRes?.data?.total ?? 1,
    },
    setPagination: handlePaginationChange,
    optionPageSize: [10, 20, 50, 100],
    className: 'flex-end',
  };

  const handleView = (id: string) => {
    const item = campaignRes?.data.content.find((i) => i.id === id);
    if (item) {
      navigate(createNavigatePath(ROUTES.CAMPAIGN.DETAIL, { id }));
    }
  };

  const handleCustomerListView = (id: string) => {
    const item = campaignRes?.data.content.find((i) => i.id === id);
    if (item) {
      navigate(
        `${ROUTES.CUSTOMER.LIST}?campaignId=${item.id}&categoryId=${item.categoryId}`,
      );
    }
  };

  const handleSort = ({ direction, field }: TBaseTableSort) => {
    setFilters({
      field,
      direction: direction ? SORT_ORDER_FOR_SERVER[direction] : '',
      current: 1,
    });
  };

  const handleDelete = (id: string) => {
    mutationDeleteProducts(
      { id },
      {
        onSuccess: (d) =>
          validationHelper(d, notify, () => {
            notify({
              message: 'Xoá thành công',
              type: 'success',
            });
          }),
      },
    );
  };

  return (
    <div className="pt-32">
      <Flex justify="space-between" className="mb-14">
        <Title level={3} className="mb-0">
          Danh sách Campaign
        </Title>
        <Flex gap={16}>
          <AButton
            variant="filled"
            color="primary"
            icon={<ExportIcon />}
            onClick={() =>
              downloadFileByGetMethod(campaignExport, 'DS_Campaign.xlsx')
            }
          >
            Export
          </AButton>
        </Flex>
      </Flex>
      <CampaignSearch
        onSearch={handleSearch}
        onClearAll={handleResetFilters}
        initialValues={filters}
        onCreate={handleCreate}
      />
      <div className="mb-24" />
      <CampaignTable
        dataSource={campaignRes?.data?.content ?? []}
        paginations={paginations}
        sortDirection={sort}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onSort={handleSort}
        onList={handleCustomerListView}
      />
    </div>
  );
};

export default Campaign;
