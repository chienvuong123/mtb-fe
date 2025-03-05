import { EStatus, SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import { CategoryType, type BaseResponse } from '@dtos';
import Title from 'antd/lib/typography/Title';
import { useEffect, useState, type FC } from 'react';

import type {
  IMPagination,
  TPagination,
} from '@components/molecules/m-pagination/MPagination.type';
import { ODrawer } from '@components/organisms';
import {
  useBranchCategoryAddMutation,
  useBranchCategoryEditMutation,
  useBranchCategoryRemoveMutation,
  useBranchCategorySearchQuery,
} from '@hooks/queries/branchCategoryQueries';
import useUrlParams from '@hooks/useUrlParams';
import { useProfile } from '@stores';
import type { TFormType } from '@types';
import { formatDate } from '@utils/dateHelper';
import { filterObject } from '@utils/objectHelper';
import { useNotification } from '@libs/antd';
import type { SortOrder } from 'antd/es/table/interface';
import type { BranchCategoryDTO, TBranchSearchForm } from 'src/dtos/branch';
import { validateInsertCategory } from '../utils';
import {
  BranchInsertForm,
  BranchEditForm,
  BranchSearchForm,
  BranchTable,
} from './components';

const BranchCategoryPage: FC = () => {
  const [initValuesInsertForm, setInitValuesInsertForm] =
    useState<BranchCategoryDTO | null>(null);
  const [initValuesEditForm, setInitValuesEditForm] =
    useState<BranchCategoryDTO | null>(null);

  const {
    pagination: { current, pageSize },
    setPagination,
    sort,
    setSort,
    filters,
    setFilters,
  } = useUrlParams<Partial<BranchCategoryDTO>>();

  const [drawerMode, setDrawerMode] = useState<TFormType>();

  const { user } = useProfile();

  const notify = useNotification();

  const { data: branchRes, isLoading } = useBranchCategorySearchQuery({
    categoryTypeCode: CategoryType.BRANCHES,
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

  const { mutate: mutationCreateBranch } = useBranchCategoryAddMutation();
  const { mutate: mutationUpdateBranch } = useBranchCategoryEditMutation();
  const { mutate: mutationDeleteBranch } = useBranchCategoryRemoveMutation();

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

  const handleEdit = (data: BranchCategoryDTO) => {
    setInitValuesEditForm({
      ...data,
      createdDate: formatDate(data.createdDate ?? ''),
      updatedDate: formatDate(),
    });
    setDrawerMode('edit');
  };

  const handleSearch = ({ code, name, status }: TBranchSearchForm) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters({ code, name, status });
  };

  const handlePaginationChange = (data: TPagination) => {
    setPagination({
      ...data,
      current: data.pageSize !== pageSize ? 1 : data.current,
    });
  };

  const handleSubmitInsert = ({ name, code, status }: BranchCategoryDTO) => {
    const data: Partial<BranchCategoryDTO> = {
      categoryTypeCode: CategoryType.BRANCHES,
      code,
      name,
      status,
      id: initValuesInsertForm?.id,
    };

    // create new Branch
    mutationCreateBranch(data, {
      onSuccess: (resData) => handleInvalidate(resData),
    });
  };

  const handleSubmitEdit = ({ name, code, status }: BranchCategoryDTO) => {
    const data: Partial<BranchCategoryDTO> = {
      categoryTypeCode: CategoryType.BRANCHES,
      code,
      name,
      status,
      id: initValuesEditForm?.id,
    };
    mutationUpdateBranch(data, {
      onSuccess: (resData) => handleInvalidate(resData, true),
    });
  };

  const handleDelete = (id: string) => {
    mutationDeleteBranch(
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

  const paginations: IMPagination = {
    pagination: {
      current,
      pageSize,
      total: branchRes?.data?.total ?? 1,
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
    const item = branchRes?.data.content.find((i) => i.id === id);
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
    if (!isLoading && !branchRes?.data?.content?.length && current > 1) {
      setPagination((prev) => ({
        ...prev,
        current: prev.current - 1,
        total: branchRes?.data?.total ?? 1,
      }));
    }
  }, [branchRes, setPagination, current, isLoading]);

  return (
    <div className="pt-32">
      <Title level={3} className="mb-24">
        Danh mục chi nhánh
      </Title>
      <BranchSearchForm
        onSearch={handleSearch}
        onClearAll={handleClearAll}
        onCreate={handleCreate}
        initialValues={{
          ...filters,
          status: filters?.status ?? EStatus.ACTIVE,
        }}
      />
      <div className="mt-24" />
      <BranchTable
        dataSource={branchRes?.data?.content ?? []}
        paginations={paginations}
        sortDirection={sort}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onSort={handleSort}
      />

      <ODrawer
        usePrefixTitle
        title="danh mục chi nhánh"
        mode={drawerMode}
        onClose={handleCloseForm}
        open={!!drawerMode}
        width={1025}
      >
        {drawerMode &&
          (drawerMode === 'add' ? (
            <BranchInsertForm
              mode="add"
              onClose={handleCloseForm}
              initialValues={initValuesInsertForm}
              onSubmit={handleSubmitInsert}
            />
          ) : (
            <BranchEditForm
              mode={drawerMode}
              onClose={handleCloseForm}
              initialValues={initValuesEditForm}
              onSubmit={handleSubmitEdit}
            />
          ))}
      </ODrawer>
    </div>
  );
};

export default BranchCategoryPage;
