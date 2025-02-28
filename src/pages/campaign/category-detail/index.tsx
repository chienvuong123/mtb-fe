import Title from 'antd/lib/typography/Title';
import { Flex } from 'antd';
import { AButton } from '@components/atoms';
import React, { useMemo } from 'react';
import useUrlParams from '@hooks/useUrlParams';
import type { SortOrder } from 'antd/es/table/interface';
import { SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import type {
  IMPagination,
  TPagination,
} from '@components/molecules/m-pagination/MPagination.type';
import type { TCategoryDetailDTO } from 'src/dtos/manage-category-detail';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { MANAGER_CAMPAIGN } from '@routers/path';
import { type TId } from '@dtos';
import { useCategoryDetailViewQuery } from '@hooks/queries/manageCategoryQueries';
import { useCampaignSearchQuery } from '@hooks/queries';
import CategoryDetailSearch from './components/CategoryDetailSearch';
import CategoryDetailTable, {
  type TCategoryDetaillRecord,
} from './components/CategoryDetailTable';
import './index.scss';

const BUTTON_TEXT = {
  CANCEL: 'Hủy',
  SAVE: 'Lưu',
  BACK: 'Trở về',
} as const;

const ManagerCategoryDetail: React.FC = () => {
  const { id: categoryId } = useParams<TId>();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const { categoryCode } = Object.fromEntries(searchParams);

  const {
    pagination: { current, pageSize },
    setPagination,
    setSort,
  } = useUrlParams<Partial<TCategoryDetailDTO>>();

  const { data: categoryDetailRes } = useCategoryDetailViewQuery({
    id: categoryId ?? '',
  });

  const { data: categoryQuery } = useCampaignSearchQuery({
    categoryCode: categoryCode ?? '',
  });

  const handlePaginationChange = (data: TPagination) => {
    setPagination(data);
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

  const handleSort = (field: string, direction: SortOrder) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setSort({
      field,
      direction: direction ? SORT_ORDER_FOR_SERVER[direction] : '',
    });
  };

  const handleBack = () => {
    navigate(`/${MANAGER_CAMPAIGN.ROOT}/${MANAGER_CAMPAIGN.CATEGORY}`);
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
