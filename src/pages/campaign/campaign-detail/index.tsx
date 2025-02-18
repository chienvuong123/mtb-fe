import Title from 'antd/lib/typography/Title';
import React, { useMemo, useState } from 'react';
import type { TCampaignDetailDTO } from 'src/dtos/campaign-detail';
import useUrlParams from '@hooks/useUrlParams';
import type { SortOrder } from 'antd/es/table/interface';
import { SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import {
  useCampaignDetailRemoveMutation,
  useCampaignDetailViewQuery,
  useCampaignScriptMutation,
} from '@hooks/queries/useCampaignDetail';
import type {
  IMPagination,
  TPagination,
} from '@components/molecules/m-pagination/MPagination.type';
import { useParams } from 'react-router-dom';
import type { TMediaRecord } from '@pages/category/media-category/components/MediaTable';
import { filterObject } from '@utils/objectHelper';
import CampaignDetailTable, {
  type TCampaignDetaillRecord,
} from './components/CampaignDetailTable';
import CampaignDetailSearch from './components/CampaignDetailSearch';
import './index.scss';

const ManagerCampaignDetail: React.FC = () => {
  const [showInsertForm, setShowInsertForm] = useState<boolean>(false);
  const [initValues, setInitValues] =
    useState<Partial<TCampaignDetaillRecord> | null>(null);

  const [isViewMode, setIsViewMode] = useState(false);

  const { id } = useParams<{ id: string }>();

  const {
    pagination: { current, pageSize },
    setPagination,
    setSort,
    filters,
    sort,
  } = useUrlParams<Partial<TCampaignDetailDTO>>();

  const { data: campaignDetailRes } = useCampaignDetailViewQuery({
    id: id ?? '',
  });

  const { data: campaignScriptMutate } = useCampaignScriptMutation({
    campaignId: id ?? '',
    page: {
      pageNum: Number(current),
      pageSize: Number(pageSize),
    },
    order: sort,
    ...filterObject(filters),
  });

  const handleCloseForm = () => {
    setShowInsertForm(false);
    setIsViewMode(false);
  };

  const handleReset = () => {
    handleCloseForm();
    setInitValues(null);
  };

  const { mutate: mutationDeleteCampaignDetail } =
    useCampaignDetailRemoveMutation();

  const handlePaginationChange = (data: TPagination) => {
    setPagination(data);
  };

  const dataSourcesDetail: Partial<TCampaignDetailDTO> = useMemo(
    () => campaignDetailRes?.data ?? {},
    [campaignDetailRes],
  );

  const dataSources: TCampaignDetaillRecord[] =
    useMemo(
      () =>
        campaignScriptMutate?.data?.content?.map((i) => ({
          ...i,
          key: i.id as string,
        })),
      [campaignScriptMutate],
    ) ?? [];

  const paginations: IMPagination = {
    pagination: {
      current,
      pageSize,
      total: campaignScriptMutate?.data?.total ?? 1,
    },
    setPagination: handlePaginationChange,
    optionPageSize: [10, 20, 50, 100],
    className: 'flex-end',
  };

  const handleView = (campaignId: string) => {
    const item = campaignScriptMutate?.data.content.find(
      (i) => i.id === campaignId,
    );
    if (item) {
      setIsViewMode(true);
      setInitValues({ ...item });
      setShowInsertForm(true);
    }
  };

  const handleSort = (field: string, direction: SortOrder) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setSort({
      field,
      direction: direction ? SORT_ORDER_FOR_SERVER[direction] : '',
    });
  };

  const handleEdit = (data: TMediaRecord) => {
    setInitValues({
      ...data,
    });
    setShowInsertForm(true);
  };

  const handleDelete = (campaignId: string) => {
    mutationDeleteCampaignDetail({ id: campaignId });
  };

  // TODO: will be removed
  console.log(showInsertForm, initValues, isViewMode, handleReset, id);

  return (
    <div className="pt-32">
      <Title level={3} className="pb-24">
        Chi tiết Campaign
      </Title>
      <CampaignDetailSearch
        initialValues={dataSourcesDetail}
        onEdit={handleEdit}
        onDelete={handleDelete}
        dataSource={campaignDetailRes?.data?.targets}
      />
      <div className="mb-24" />
      <CampaignDetailTable
        onSort={handleSort}
        onView={handleView}
        dataSource={dataSources}
        paginations={paginations}
      />
    </div>
  );
};

export default ManagerCampaignDetail;
