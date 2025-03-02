import React, { useMemo } from 'react';
import Title from 'antd/lib/typography/Title';
import useUrlParams from '@hooks/useUrlParams';
import { SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import type { SortOrder } from 'antd/es/table/interface';
import type {
  IMPagination,
  TPagination,
} from '@components/molecules/m-pagination/MPagination.type';
import { downloadFileByGetMethod, filterObject } from '@utils/objectHelper';
import type {
  CampaignDTO,
  CampaignSearchRequest,
  TCampaignSearchForm,
} from 'src/dtos/campaign';
import {
  useCampaignExport,
  useCampaignRemoveMutation,
  useCampaignSearchQuery,
} from '@hooks/queries';
import { useNavigate } from 'react-router-dom';
import { MANAGER_CAMPAIGN } from '@routers/path';
import { ExportIcon } from '@assets/icons';
import { AButton } from '@components/atoms';
import { Flex } from 'antd';
import { useNotification } from '@libs/antd';
import CampaignTable, {
  type TCampaignRecord,
} from './components/CampaignTable';
import CampaignSearch from './components/CampaignSearch';

const Campaign: React.FC = () => {
  const {
    pagination: { current, pageSize },
    setPagination,
    sort,
    setSort,
    filters,
    setFilters,
  } = useUrlParams<Partial<CampaignDTO>>();

  const navigate = useNavigate();
  const notify = useNotification();

  const searchParams: CampaignSearchRequest = useMemo(
    () => ({
      page: {
        pageNum: Number(current),
        pageSize: Number(pageSize),
      },
      order: sort,
      ...filterObject(filters),
    }),
    [current, pageSize, sort, filters],
  );

  const { data: campaignRes } = useCampaignSearchQuery(searchParams);

  const { mutate: mutationDeleteProducts } = useCampaignRemoveMutation();
  const { refetch: campaignExport } = useCampaignExport(searchParams);

  const handleCreate = () => {
    navigate(`/${MANAGER_CAMPAIGN.ROOT}/${MANAGER_CAMPAIGN.CREATE_CAMPAIGN}`);
  };

  const handleEdit = (data: TCampaignRecord) => {
    if (data?.id) {
      navigate(
        `/${MANAGER_CAMPAIGN.ROOT}/${MANAGER_CAMPAIGN.EDIT_CAMPAIGN}/${data.id}`,
      );
    }
  };

  const handleSearch = (searchObject: TCampaignSearchForm) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters(searchObject);
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
      total: campaignRes?.data?.total ?? 1,
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
    const item = campaignRes?.data.content.find((i) => i.id === id);
    if (item) {
      navigate(
        `/${MANAGER_CAMPAIGN.ROOT}/${MANAGER_CAMPAIGN.CAMPAIGN_DETAIL}/${id}`,
      );
    }
  };

  const handleSort = (field: string, direction: SortOrder) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setSort({
      field,
      direction: direction ? SORT_ORDER_FOR_SERVER[direction] : '',
    });
  };

  const handleDelete = (id: string) => {
    mutationDeleteProducts(
      { id },
      {
        onSuccess: () => {
          notify({
            message: 'Xoá thành công',
            type: 'success',
          });
        },
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
            onClick={() => downloadFileByGetMethod(campaignExport, 'DSKH.xlsx')}
          >
            Export
          </AButton>
        </Flex>
      </Flex>
      <CampaignSearch
        onSearch={handleSearch}
        onClearAll={handleClearAll}
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
      />
    </div>
  );
};

export default Campaign;
