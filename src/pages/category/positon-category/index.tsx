import { EStatus, SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import { CategoryType, type BaseResponse } from '@dtos';
import Title from 'antd/lib/typography/Title';
import { useEffect, useState, type FC } from 'react';

import type {
  IMPagination,
  TPagination,
} from '@components/molecules/m-pagination/MPagination.type';
import {
  usePositionCategoryAddMutation,
  usePositionCategoryEditMutation,
  usePositionCategoryRemoveMutation,
  usePositionCategorySearchQuery,
} from '@hooks/queries/positionCategoryQueries';
import { ODrawer } from '@components/organisms';
import useUrlParams from '@hooks/useUrlParams';
import { useProfile } from '@stores';
import type { TFormType } from '@types';
import { formatDate } from '@utils/dateHelper';
import { filterObject } from '@utils/objectHelper';
import { useNotification } from '@libs/antd';
import type { SortOrder } from 'antd/es/table/interface';
import type {
  PositionCategoryDTO,
  TPositionSearchForm,
} from 'src/dtos/position';
import { validateInsertCategory } from '../utils';
import {
  PositionSearchForm,
  PositionTable,
  PositionInsertForm,
  PositionEditForm,
} from './components';

const PositionCategoryPage: FC = () => {
  const [initValuesInsertForm, setInitValuesInsertForm] =
    useState<Partial<PositionCategoryDTO> | null>(null);
  const [initValuesEditForm, setInitValuesEditForm] =
    useState<Partial<PositionCategoryDTO> | null>(null);

  const {
    pagination: { current, pageSize },
    setPagination,
    sort,
    setSort,
    filters,
    setFilters,
  } = useUrlParams<Partial<PositionCategoryDTO>>();

  const [drawerMode, setDrawerMode] = useState<TFormType>();

  const { user } = useProfile();

  const notify = useNotification();

  const { data: positionRes, isLoading } = usePositionCategorySearchQuery({
    categoryTypeCode: CategoryType.POSITION,
    page: {
      pageNum: Number(current),
      pageSize: Number(pageSize),
    },
    order: sort,
    ...filterObject(filters),
    status: filters.status ?? EStatus.ACTIVE,
  });

  const handleCloseForm = () => {
    setDrawerMode(undefined);
  };

  const handleInvalidate = (
    data?: BaseResponse<boolean>,
    isEdit: boolean = false,
  ) => {
    if (data)
      validateInsertCategory(data, notify, () => {
        notify({
          message: `${isEdit ? 'Chỉnh sửa' : 'Tạo mới'} thành công`,
          type: 'success',
        });
        handleCloseForm();
        setInitValuesEditForm(null);
        setInitValuesInsertForm(null);
      });
  };

  const { mutate: mutationCreatePosition } = usePositionCategoryAddMutation();
  const { mutate: mutationUpdatePosition } = usePositionCategoryEditMutation();
  const { mutate: mutationDeletePosition } =
    usePositionCategoryRemoveMutation();

  const handleCreate = () => {
    setInitValuesInsertForm({
      code: undefined,
      name: '',
      status: EStatus.ACTIVE,
      createdDate: formatDate(),
      updatedDate: formatDate(),
      createdBy: user?.username,
      updatedBy: user?.username,
    });
    setDrawerMode('add');
  };

  const handleEdit = (data: PositionCategoryDTO) => {
    setInitValuesEditForm({
      ...data,
      createdDate: formatDate(data.createdDate ?? ''),
      updatedDate: formatDate(),
    });
    setDrawerMode('edit');
  };

  const handleSearch = ({ code, name, status }: TPositionSearchForm) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters({ code, name, status });
  };

  const handlePaginationChange = (data: TPagination) => {
    setPagination({
      ...data,
      current: data.pageSize !== pageSize ? 1 : data.current,
    });
  };

  const handleSubmitInsert = ({ name, code, status }: PositionCategoryDTO) => {
    const data: Partial<PositionCategoryDTO> = {
      categoryTypeCode: CategoryType.POSITION,
      code,
      name,
      status,
      id: initValuesInsertForm?.id,
    };

    // create new Media
    mutationCreatePosition(data, {
      onSuccess: (resData) => handleInvalidate(resData),
    });
  };

  const handleSubmitEdit = ({ name, code, status }: PositionCategoryDTO) => {
    const data: Partial<PositionCategoryDTO> = {
      categoryTypeCode: CategoryType.POSITION,
      code,
      name,
      status,
      id: initValuesEditForm?.id,
    };
    mutationUpdatePosition(data, {
      onSuccess: (resData) => handleInvalidate(resData, true),
    });
  };

  const handleDelete = (id: string) => {
    mutationDeletePosition({ id });
  };

  const paginations: IMPagination = {
    pagination: {
      current,
      pageSize,
      total: positionRes?.data?.total ?? 1,
    },
    setPagination: handlePaginationChange,
    optionPageSize: [10, 20, 50, 100],
    className: 'flex-end',
  };

  const handleClearAll = () => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters({ code: undefined, name: undefined, status: EStatus.ACTIVE });
  };

  const handleView = (id: string) => {
    const item = positionRes?.data.content.find((i) => i.id === id);
    if (item) {
      setDrawerMode('view');
      setInitValuesEditForm({
        ...item,
        createdDate: formatDate(item.createdDate),
        updatedDate: formatDate(item.updatedDate),
      });
    }
  };

  const handleSort = (field: string, direction: SortOrder) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setSort({
      field,
      direction: direction ? SORT_ORDER_FOR_SERVER[direction] : '',
    });
  };

  useEffect(() => {
    if (!isLoading && !positionRes?.data?.content?.length && current > 1) {
      setPagination((prev) => ({
        ...prev,
        current: prev.current - 1,
        total: positionRes?.data?.total ?? 1,
      }));
    }
  }, [positionRes, setPagination, current, isLoading]);

  return (
    <div className="pt-32 category-media">
      <Title level={3} className="mb-24">
        Danh mục chức vụ
      </Title>
      <PositionSearchForm
        onSearch={handleSearch}
        onClearAll={handleClearAll}
        onCreate={handleCreate}
        initialValues={{
          ...filters,
          status: filters?.status ?? EStatus.ACTIVE,
        }}
      />
      <div className="mt-24" />
      <PositionTable
        dataSource={positionRes?.data?.content ?? []}
        paginations={paginations}
        sortDirection={sort}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onSort={handleSort}
      />

      <ODrawer
        usePrefixTitle
        title="danh mục đa phương tiện"
        mode={drawerMode}
        onClose={handleCloseForm}
        open={!!drawerMode}
        width={1025}
      >
        {drawerMode &&
          (drawerMode === 'add' ? (
            <PositionInsertForm
              mode={drawerMode}
              onClose={handleCloseForm}
              initialValues={initValuesInsertForm as PositionCategoryDTO}
              onSubmit={handleSubmitInsert}
            />
          ) : (
            <PositionEditForm
              mode={drawerMode}
              onClose={handleCloseForm}
              initialValues={initValuesEditForm as PositionCategoryDTO}
              onSubmit={handleSubmitEdit}
            />
          ))}
      </ODrawer>
    </div>
  );
};

export default PositionCategoryPage;
