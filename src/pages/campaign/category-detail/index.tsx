import dayjs from 'dayjs';
import { DATE_SLASH_FORMAT } from '@constants/dateFormat';
import Title from 'antd/lib/typography/Title';
import { Flex } from 'antd';
import { useForm } from 'antd/lib/form/Form';
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
import { MANAGER_CATEGORY } from '@routers/path';
import { filterObject } from '@utils/objectHelper';
import { type TId } from '@dtos';
import {
  useCategoryDetailViewQuery,
  useManageCategoryAddMutation,
  useManageCategoryEditMutation,
  useManageCategorySearchQuery,
} from '@hooks/queries/manageCategoryQueries';
import type { ManagerCategoryDTO } from 'src/dtos/manage-category';
import CategoryDetailSearch from './components/CategoryDetailSearch';
import CategoryDetailTable from './components/CategoryDetailTable';
import './index.scss';

const BUTTON_TEXT = {
  CANCEL: 'Hủy',
  SAVE: 'Lưu',
  BACK: 'Trở về',
} as const;

const ManagerCategoryDetail: React.FC = () => {
  const { id: categoryId } = useParams<TId>();

  const [form] = useForm();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const { isView, isCreate } = Object.fromEntries(searchParams);

  const isAction = categoryId && isView;

  const {
    pagination: { current, pageSize },
    setPagination,
    setSort,
    filters,
    sort,
  } = useUrlParams<Partial<TCategoryDetailDTO>>();

  const { data: categoryDetailRes } = useCategoryDetailViewQuery({
    id: categoryId ?? '',
  });

  const { data: categoryQuery } = useManageCategorySearchQuery({
    categoryId: categoryId ?? '',
    page: {
      pageNum: Number(current),
      pageSize: Number(pageSize),
    },
    order: sort,
    ...filterObject(filters),
  });

  const handleReset = () => {
    form.resetFields();
  };

  const { mutate: mutationCreateCategory } = useManageCategoryAddMutation(
    {},
    handleReset,
  );
  const { mutate: mutationUpdateCategory } = useManageCategoryEditMutation(
    {},
    handleReset,
  );

  const handlePaginationChange = (data: TPagination) => {
    setPagination(data);
  };

  const dataSourcesDetail: Partial<TCategoryDetailDTO> = useMemo(
    () => categoryDetailRes?.data ?? {},
    [categoryDetailRes],
  );

  const handleSubmitInsert = () => {
    const { startDate, endDate, ...categoryFormData } = form.getFieldsValue();
    const data: Partial<ManagerCategoryDTO> = {
      ...categoryFormData,
      startDate: dayjs(startDate).format(DATE_SLASH_FORMAT),
      endDate: dayjs(endDate).format(DATE_SLASH_FORMAT),
    };

    // update category
    if (data?.id) {
      mutationUpdateCategory(data);
      return;
    }
    // create new category
    mutationCreateCategory(data);
  };

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
    navigate(`/${MANAGER_CATEGORY.ROOT}/${MANAGER_CATEGORY.CATEGORY}`);
  };

  const getTitle = useMemo(() => {
    if (isView) return 'Chi tiết Category';
    if (isCreate) return 'Tạo mới Category';
    return 'Chỉnh sửa Category';
  }, [isView, isCreate]);

  return (
    <div className="pt-32">
      <Title level={3} className="pb-24">
        {getTitle}
      </Title>
      <CategoryDetailSearch
        initialValues={dataSourcesDetail}
        isDisabled={Boolean(isAction)}
        form={form}
      />
      <div className="mb-24" />
      {isView && (
        <CategoryDetailTable
          onSort={handleSort}
          dataSource={categoryQuery?.data?.content ?? []}
          paginations={paginations}
        />
      )}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md z-10 mt-20 py-10 px-4">
        <Flex justify="between" className="py-4 w-full px-6" gap="middle">
          {isAction ? (
            <AButton
              onClick={handleBack}
              type="primary"
              variant="filled"
              data-testid="back-button"
            >
              {BUTTON_TEXT.BACK}
            </AButton>
          ) : (
            <Flex className="ml-auto" gap="middle">
              <AButton onClick={handleBack} variant="outlined">
                {BUTTON_TEXT.CANCEL}
              </AButton>
              <AButton
                onClick={handleSubmitInsert}
                type="primary"
                variant="filled"
              >
                {BUTTON_TEXT.SAVE}
              </AButton>
            </Flex>
          )}
        </Flex>
      </div>
    </div>
  );
};

export default ManagerCategoryDetail;
