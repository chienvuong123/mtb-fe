import Title from 'antd/lib/typography/Title';
import { Flex } from 'antd';
import { AButton } from '@components/atoms';
import React, { useMemo } from 'react';
import useUrlParams from '@hooks/useUrlParams';
import { SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import type { IMPagination, TPagination } from '@components/molecules';
import type { TCategoryDetailDTO, TId } from '@dtos';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@routers/path';
import {
  useCategoryDetailViewQuery,
  useCampaignSearchQuery,
} from '@hooks/queries';
import { type TBaseTableSort } from '@types';
import CategoryDetailSearch from './components/CategoryDetailSearch';
import CategoryDetailTable from './components/CategoryDetailTable';
import './index.scss';

const BUTTON_TEXT = {
  CANCEL: 'Hủy',
  SAVE: 'Lưu',
  BACK: 'Quay lại',
} as const;

const ManagerCategoryDetail: React.FC = () => {
  const { id: categoryId } = useParams<TId>();

  const navigate = useNavigate();

  const {
    pagination: { current, pageSize },
    setFilters,
    sort,
  } = useUrlParams<Partial<TCategoryDetailDTO>>();

  const { data: categoryDetailRes } = useCategoryDetailViewQuery({
    id: categoryId ?? '',
  });

  const { data: categoryRes } = useCampaignSearchQuery({
    categoryId: categoryId ?? '',
    page: {
      pageNum: Number(current),
      pageSize: Number(pageSize),
    },
    order: sort,
  });

  const handlePaginationChange = (data: TPagination) => {
    setFilters({
      ...data,
      current: data.pageSize !== pageSize ? 1 : data.current,
    });
  };

  const dataSourcesDetail: Partial<TCategoryDetailDTO> = useMemo(
    () => categoryDetailRes?.data ?? {},
    [categoryDetailRes],
  );

  const paginations: IMPagination = {
    pagination: {
      current,
      pageSize,
      total: categoryRes?.data?.total ?? 0,
    },
    setPagination: handlePaginationChange,
    optionPageSize: [10, 20, 50, 100],
    className: 'flex-end',
  };

  const handleSort = ({ direction, field }: TBaseTableSort) => {
    setFilters({
      field,
      direction: direction ? SORT_ORDER_FOR_SERVER[direction] : '',
      current: 1,
    });
  };

  const handleBack = () => {
    navigate(ROUTES.CAMPAIGN.CATEGORY.LIST);
  };

  return (
    <div className="pt-32">
      <Title level={3} className="pb-24">
        Chi tiết Category
      </Title>
      <CategoryDetailSearch initialValues={dataSourcesDetail} isDisabled />
      <div className="mb-24" />
      <CategoryDetailTable
        onSort={handleSort}
        dataSource={categoryRes?.data?.content ?? []}
        paginations={paginations}
      />
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md z-10 mt-20 py-10 px-4">
        <Flex justify="between" className="py-4 w-full px-6" gap="middle">
          <AButton
            onClick={handleBack}
            type="primary"
            variant="filled"
            data-testid="back-button"
          >
            {BUTTON_TEXT.BACK}
          </AButton>
        </Flex>
      </div>
    </div>
  );
};

export default ManagerCategoryDetail;
