import { EStatus, SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import { CategoryType, type BaseResponse, type CategoryDTO } from '@dtos';
import Title from 'antd/lib/typography/Title';
import { useState, type FC, useEffect } from 'react';

import type {
  IMPagination,
  TPagination,
} from '@components/molecules/m-pagination/MPagination.type';
import { ODrawer } from '@components/organisms';
import useUrlParams from '@hooks/useUrlParams';
import { useNotification } from '@libs/antd';
import type { SortOrder } from 'antd/es/table/interface';
import type { TFormType } from '@types';
import { formatDate } from '@utils/dateHelper';
import { filterObject } from '@utils/objectHelper';
import { createCategoryQueryHooks } from '@hooks/queries/categoryQueries';
import {
  GenericCategorySearchForm,
  GenericCategoryTable,
  GenericCategoryInsertForm,
  GenericCategoryEditForm,
} from '.';
import { validateInsertCategory } from '../utils';

export interface CategoryPageProps {
  categoryKey: string;
  categoryType: CategoryType;
  categoryTitle: string;
}

export const GenericCategoryPage: FC<CategoryPageProps> = ({
  categoryKey,
  categoryType,
  categoryTitle,
}) => {
  const [initValuesEditForm, setInitValuesEditForm] =
    useState<Partial<CategoryDTO> | null>(null);

  const {
    pagination: { current, pageSize },
    setPagination,
    sort,
    setSort,
    filters,
    setFilters,
  } = useUrlParams<Partial<CategoryDTO>>();

  const [drawerMode, setDrawerMode] = useState<TFormType>();

  const notify = useNotification();

  const { useSearchQuery, useAddMutation, useEditMutation, useRemoveMutation } =
    createCategoryQueryHooks(categoryKey);

  const handleCloseForm = () => {
    setDrawerMode(undefined);
  };

  const { data: categoryRes, isLoading } = useSearchQuery({
    page: {
      pageNum: current,
      pageSize,
    },
    order: sort,
    categoryTypeCode: categoryType,
    ...filterObject(filters),
    status: filters.status ?? EStatus.ACTIVE,
  });

  const handleInvalidate = (
    d?: BaseResponse<boolean>,
    mode: 'create' | 'edit' | 'remove' = 'create',
  ) => {
    const title = {
      create: 'Tạo mới',
      edit: 'Chỉnh sửa',
      remove: 'Xóa',
    };
    if (d)
      validateInsertCategory(d, notify, () => {
        notify({
          message: `${title[mode]} thành công`,
          type: 'success',
        });
        handleCloseForm();
        setInitValuesEditForm(null);
      });
  };

  const { mutate: addMutate } = useAddMutation();
  const { mutate: editMutate } = useEditMutation();
  const { mutate: removeMutate } = useRemoveMutation({});

  const handleCreate = () => {
    setDrawerMode('add');
  };

  const handleEdit = (record: CategoryDTO) => {
    setInitValuesEditForm(record);
    setDrawerMode('edit');
  };

  const handleView = (id: string) => {
    const record = categoryRes?.data.content.find((i) => i.id === id);
    if (record) {
      setDrawerMode('view');
      setInitValuesEditForm(record);
    }
  };

  const handleSearch = (values: Partial<CategoryDTO>) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters(filterObject(values));
  };

  const handlePaginationChange = (paginationData: TPagination) => {
    setPagination({
      ...paginationData,
      current:
        paginationData.pageSize !== pageSize ? 1 : paginationData.current,
    });
  };

  const handleSubmitInsert = (values: CategoryDTO) => {
    addMutate(
      {
        categoryTypeCode: categoryType,
        name: values.name,
        status: values.status,
      },
      { onSuccess: (resData) => handleInvalidate(resData) },
    );
  };

  const handleSubmitEdit = (values: CategoryDTO) => {
    editMutate(
      {
        id: initValuesEditForm?.id,
        categoryTypeCode: categoryType,
        code: values.code,
        name: values.name,
        status: values.status,
      },
      {
        onSuccess: (resData) => handleInvalidate(resData, 'edit'),
      },
    );
  };

  const handleDelete = (id: string) => {
    removeMutate(
      { id },
      {
        onSuccess: (resData) => handleInvalidate(resData, 'remove'),
      },
    );
  };

  const handleClearAll = () => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters({ code: undefined, name: undefined, status: EStatus.ACTIVE });
  };

  const handleSort = (field: string, direction: SortOrder) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setSort({
      field,
      direction: direction ? SORT_ORDER_FOR_SERVER[direction] : '',
    });
  };

  const paginationConfig: IMPagination = {
    pagination: {
      current,
      pageSize,
      total: categoryRes?.data?.total || 0,
    },
    setPagination: handlePaginationChange,
    optionPageSize: [10, 20, 50, 100],
    className: 'flex-end',
  };

  const getDrawerTitle = () => {
    if (drawerMode === 'add') {
      return `Thêm mới ${categoryTitle.toLowerCase()}`;
    }
    if (drawerMode === 'edit') {
      return `Chỉnh sửa ${categoryTitle.toLowerCase()}`;
    }
    return `Xem chi tiết ${categoryTitle.toLowerCase()}`;
  };

  useEffect(() => {
    if (!isLoading && !categoryRes?.data?.content?.length && current > 1) {
      setPagination((prev) => ({
        ...prev,
        current: prev.current - 1,
        total: categoryRes?.data?.total ?? 1,
      }));
    }
  }, [categoryRes, setPagination, current, isLoading]);

  return (
    <div className="pt-32">
      <Title level={3} className="mb-24">
        {categoryTitle}
      </Title>
      <div className="mb-4">
        <GenericCategorySearchForm
          onSearch={handleSearch}
          onClearAll={handleClearAll}
          onCreate={handleCreate}
          initialValues={{
            code: filters?.code ?? '',
            name: filters?.name ?? '',
            status: filters?.status ?? EStatus.ACTIVE,
          }}
        />
      </div>
      <div className="mt-24" />
      <GenericCategoryTable
        dataSource={categoryRes?.data?.content || []}
        pagination={paginationConfig}
        loading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onSort={handleSort}
        sort={sort}
        formatDate={formatDate}
      />
      <ODrawer
        title={getDrawerTitle()}
        onClose={handleCloseForm}
        open={!!drawerMode}
        width={1025}
      >
        {drawerMode === 'add' && (
          <GenericCategoryInsertForm
            onSubmit={handleSubmitInsert}
            onClose={handleCloseForm}
            mutationKey={categoryKey}
          />
        )}
        {drawerMode === 'edit' && (
          <GenericCategoryEditForm
            initialValues={initValuesEditForm as CategoryDTO}
            onSubmit={handleSubmitEdit}
            onClose={handleCloseForm}
            mutationKey={categoryKey}
          />
        )}
        {drawerMode === 'view' && (
          <GenericCategoryEditForm
            initialValues={initValuesEditForm as CategoryDTO}
            onSubmit={handleSubmitEdit}
            onClose={handleCloseForm}
            isViewMode
            mutationKey={categoryKey}
          />
        )}
      </ODrawer>
    </div>
  );
};
