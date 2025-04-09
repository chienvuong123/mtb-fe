import Title from 'antd/lib/typography/Title';
import { Flex } from 'antd';
import { AButton } from '@components/atoms';
import React, { useMemo } from 'react';
import useUrlParams from '@hooks/useUrlParams';
import { SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import type { IMPagination, TPagination } from '@components/molecules';
import type { TCategoryDetailDTO } from 'src/dtos/manage-category-detail';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@routers/path';
import { type TId } from '@dtos';
import {
  useCategoryDetailViewQuery,
  useCampaignSearchQuery,
} from '@hooks/queries';
import { type TBaseTableSort } from '@types';
import CategoryDetailSearch from './components/CategoryDetailSearch';
import CategoryDetailTable, {
  type TCategoryDetaillRecord,
} from './components/CategoryDetailTable';
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
    setPagination,
    setSort,
    sort,
  } = useUrlParams<Partial<TCategoryDetailDTO>>();

  const { data: categoryDetailRes } = useCategoryDetailViewQuery({
    id: categoryId ?? '',
  });

  const { data: categoryQuery } = useCampaignSearchQuery({
    categoryId: categoryId ?? '',
    page: {
      pageNum: Number(current),
      pageSize: Number(pageSize),
    },
    order: sort,
  });

  const handlePaginationChange = (data: TPagination) => {
    setPagination({
      ...data,
      current: data.pageSize !== pageSize ? 1 : data.current,
    });
  };

  const dataSourcesDetail: Partial<TCategoryDetailDTO> = useMemo(
    () => categoryDetailRes?.data ?? {},
    [categoryDetailRes],
  );

  const dataSources: TCategoryDetaillRecord[] =
    useMemo(
      () =>
        categoryQuery?.data?.content?.map((i) => ({
          ...i,
          key: i.id as string,
        })),
      [categoryQuery],
    ) ?? [];

  const paginations: IMPagination = {
    pagination: {
      current,
      pageSize,
      total: categoryQuery?.data?.total ?? 1,
    },
    setPagination: handlePaginationChange,
    optionPageSize: [10, 20, 50, 100],
    className: 'flex-end',
  };

  const handleSort = ({ direction, field }: TBaseTableSort) => {
    setPagination({ current: 1 });
    setSort({
      field,
      direction: direction ? SORT_ORDER_FOR_SERVER[direction] : '',
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
        dataSource={dataSources}
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
