/* eslint-disable prettier/prettier */
import React, { useMemo, useState } from 'react';
import Title from 'antd/lib/typography/Title';
import useUrlParams from '@hooks/useUrlParams';
import { EStatus, SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import type { SortOrder } from 'antd/es/table/interface';
import type {
  IMPagination,
  TPagination,
} from '@components/molecules/m-pagination/MPagination.type';
import { CategoryType } from '@dtos';
import { DATE_SLASH_FORMAT } from '@constants/dateFormat';
import { filterObject } from '@utils/objectHelper';
import dayjs from 'dayjs';
import type { CampaignDTO, TCampaignSearchForm } from 'src/dtos/campaign';
import {
  useCampaignAddMutation,
  useCampaignEditMutation,
  useCampaignRemoveMutation,
  useCampaignSearchQuery,
} from '@hooks/queries';
import { useNavigate } from 'react-router-dom';
import { MANAGER_CATEGORY } from '@routers/path';
import CampaignSearch from './components/CampaignSearch';
import CampaignTable, {
  type TCampaignRecord,
} from './components/CampaignTable';
import './index.scss';

const Campaign: React.FC = () => {
  const [showInsertForm, setShowInsertForm] = useState<boolean>(false);
  const [initValues, setInitValues] = useState<Partial<TCampaignRecord> | null>(
    null,
  );

  const {
    pagination: { current, pageSize },
    setPagination,
    sort,
    setSort,
    filters,
    setFilters,
  } = useUrlParams<Partial<CampaignDTO>>();

  const navigate = useNavigate();

  const { data: campaignRes } = useCampaignSearchQuery({
    categoryType: CategoryType.CAMPAIGN,
    page: {
      pageNum: Number(current),
      pageSize: Number(pageSize),
    },
    order: sort,
    ...filterObject(filters),
    categoryCode: filters.categoryCode,
  });

  const handleReset = () => {
    setInitValues(null);
  };

  const { mutate: mutationCreateCampign } = useCampaignAddMutation(
    {},
    handleReset,
  );
  const { mutate: mutationUpdateCampaign } = useCampaignEditMutation(
    {},
    handleReset,
  );
  const { mutate: mutationDeleteProducts } = useCampaignRemoveMutation();

  const handleCreate = () => {
    setInitValues({
      code: undefined,
      name: '',
      status: EStatus.ACTIVE,
      startDate: dayjs().format(DATE_SLASH_FORMAT),
      endDate: dayjs().format(DATE_SLASH_FORMAT),
    });
    setShowInsertForm(true);
  };

  const handleEdit = (data: TCampaignRecord) => {
    setInitValues({
      ...data,
      startDate: dayjs(data.startDate).format(DATE_SLASH_FORMAT),
      endDate: dayjs().format(DATE_SLASH_FORMAT),
    });
    setShowInsertForm(true);
  };

  const handleSearch = (searchObject: TCampaignSearchForm) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters(searchObject);
  };

  const handlePaginationChange = (data: TPagination) => {
    setPagination(data);
  };

  const handleSubmitInsert = ({ name, code, status }: CampaignDTO) => {
    const data: Partial<CampaignDTO> = {
      categoryTypeId: CategoryType.PRODUCT,
      code,
      name,
      status,
      id: initValues?.id,
    };
    // update campaign
    if (data?.id) {
      mutationUpdateCampaign(data);
      return;
    }
    // create new campaign
    mutationCreateCampign(data);
  };

  const handleDelete = (id: string) => {
    mutationDeleteProducts({ id });
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

  const dataSources: TCampaignRecord[] =
    useMemo(
      () =>
        campaignRes?.data?.content?.map((i) => ({
          ...i,
          key: i.id as string,
        })),
      [campaignRes],
    ) ?? [];

  const handleClearAll = () => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters({ code: undefined, name: undefined });
  };

  const handleView = (id: string) => {
    const item = campaignRes?.data.content.find((i) => i.id === id);
    if (item) {
      navigate(
        `/${MANAGER_CATEGORY.ROOT}/${MANAGER_CATEGORY.CAMPAIGN_DETAIL}/${id}`,
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
  console.log(showInsertForm, handleSubmitInsert);

  return (
    <div className="pt-32">
      <Title level={3} className="mt-24">
        Danh sách Campaign
      </Title>
      <CampaignSearch
        onSearch={handleSearch}
        onClearAll={handleClearAll}
        initialValues={filters}
      />
      <div className="mb-24" />
      <CampaignTable
        dataSource={dataSources}
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

export default Campaign;
