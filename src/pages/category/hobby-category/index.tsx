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
  useHobbyCategoryAddMutation,
  useHobbyCategoryEditMutation,
  useHobbyCategoryRemoveMutation,
  useHobbyCategorySearchQuery,
} from '@hooks/queries/hobbyCategoryQueries';
import useUrlParams from '@hooks/useUrlParams';
import { useProfile } from '@stores';
import { formatDate } from '@utils/dateHelper';
import { filterObject } from '@utils/objectHelper';
import { useNotification } from '@libs/antd';
import type { SortOrder } from 'antd/es/table/interface';
import type { TFormType } from '@types';
import type { HobbyCategoryDTO, THobbySearchForm } from 'src/dtos/hobby';
import { validateInsertCategory } from '../utils';
import {
  HobbyEditForm,
  HobbyInsertForm,
  HobbySearchForm,
  HobbyTable,
} from './components';

const HobbyCategoryPage: FC = () => {
  const [initValuesInsertForm, setInitValuesInsertForm] =
    useState<HobbyCategoryDTO | null>(null);
  const [initValuesEditForm, setInitValuesEditForm] =
    useState<Partial<HobbyCategoryDTO> | null>(null);

  const {
    pagination: { current, pageSize },
    setPagination,
    sort,
    setSort,
    filters,
    setFilters,
  } = useUrlParams<Partial<HobbyCategoryDTO>>();

  const [drawerMode, setDrawerMode] = useState<TFormType>();

  const { user } = useProfile();

  const notify = useNotification();

  const { data: hobbyRes, isLoading } = useHobbyCategorySearchQuery({
    categoryTypeCode: CategoryType.HOBBY,
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

  const { mutate: mutationCreateHobby } = useHobbyCategoryAddMutation();
  const { mutate: mutationUpdateHobby } = useHobbyCategoryEditMutation();
  const { mutate: mutationDeleteHobby } = useHobbyCategoryRemoveMutation();

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

  const handleEdit = (data: HobbyCategoryDTO) => {
    setInitValuesEditForm({
      ...data,
      createdDate: formatDate(data.createdDate ?? ''),
      updatedDate: formatDate(),
    });
    setDrawerMode('edit');
  };

  const handleSearch = ({ code, name, status }: THobbySearchForm) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters({ code, name, status });
  };

  const handlePaginationChange = (data: TPagination) => {
    setPagination({
      ...data,
      current: data.pageSize !== pageSize ? 1 : data.current,
    });
  };

  const handleSubmitInsert = ({ name, code, status }: HobbyCategoryDTO) => {
    const data: Partial<HobbyCategoryDTO> = {
      categoryTypeCode: CategoryType.HOBBY,
      code,
      name,
      status,
      id: initValuesInsertForm?.id,
    };

    // create new Department
    mutationCreateHobby(data, {
      onSuccess: (resData) => handleInvalidate(resData),
    });
  };

  const handleSubmitEdit = ({
    name,
    code,
    status,
  }: Partial<HobbyCategoryDTO>) => {
    const data: Partial<HobbyCategoryDTO> = {
      categoryTypeCode: CategoryType.HOBBY,
      code,
      name,
      status,
      id: initValuesEditForm?.id,
    };
    mutationUpdateHobby(data, {
      onSuccess: (resData) => handleInvalidate(resData, true),
    });
  };

  const handleDelete = (id: string) => {
    mutationDeleteHobby(
      { id },
      {
        onSuccess: () => {
          notify({
            message: 'Xóa thành công',
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
      total: hobbyRes?.data?.total ?? 1,
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
    const item = hobbyRes?.data.content.find((i) => i.id === id);
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
    if (!isLoading && !hobbyRes?.data?.content?.length && current > 1) {
      setPagination((prev) => ({
        ...prev,
        current: prev.current - 1,
        total: hobbyRes?.data?.total ?? 1,
      }));
    }
  }, [hobbyRes, setPagination, current, isLoading]);

  return (
    <div className="pt-32">
      <Title level={3} className="mb-24">
        Danh mục sở thích
      </Title>
      <HobbySearchForm
        onSearch={handleSearch}
        onClearAll={handleClearAll}
        onCreate={handleCreate}
        initialValues={{
          ...filters,
          status: filters?.status ?? EStatus.ACTIVE,
        }}
      />
      <div className="mt-24" />
      <HobbyTable
        dataSource={hobbyRes?.data?.content ?? []}
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
            <HobbyInsertForm
              mode="add"
              onClose={handleCloseForm}
              initialValues={initValuesInsertForm}
              onSubmit={handleSubmitInsert}
            />
          ) : (
            <HobbyEditForm
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

export default HobbyCategoryPage;
