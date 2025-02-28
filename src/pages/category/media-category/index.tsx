import { EStatus, SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import {
  CategoryType,
  type BaseResponse,
  type MediaCategoryDTO,
  type TMediaSearchForm,
} from '@dtos';
import Title from 'antd/lib/typography/Title';
import { useEffect, useState, type FC } from 'react';

import type {
  IMPagination,
  TPagination,
} from '@components/molecules/m-pagination/MPagination.type';
import { ODrawer } from '@components/organisms';
import {
  useMediaCategoryAddMutation,
  useMediaCategoryEditMutation,
  useMediaCategoryRemoveMutation,
  useMediaCategorySearchQuery,
} from '@hooks/queries/useMediaCategoryQueries';
import useUrlParams from '@hooks/useUrlParams';
import { useProfile } from '@stores';
import type { TFormType } from '@types';
import { formatDate } from '@utils/dateHelper';
import { filterObject } from '@utils/objectHelper';
import { useNotification } from '@libs/antd';
import type { SortOrder } from 'antd/es/table/interface';
import { validateInsertCategory } from '../utils';
import MediaEditForm from './components/MediaEditForm';
import MediaInsertForm from './components/MediaInsertForm';
import MediaSearchForm from './components/MediaSearchForm';
import MediaTable, { type TMediaRecord } from './components/MediaTable';

const MediaCategoryPage: FC = () => {
  const [initValuesInsertForm, setInitValuesInsertForm] =
    useState<Partial<TMediaRecord> | null>(null);
  const [initValuesEditForm, setInitValuesEditForm] =
    useState<Partial<TMediaRecord> | null>(null);

  const {
    pagination: { current, pageSize },
    setPagination,
    sort,
    setSort,
    filters,
    setFilters,
  } = useUrlParams<Partial<MediaCategoryDTO>>();

  const [drawerMode, setDrawerMode] = useState<TFormType>();

  const { user } = useProfile();

  const notify = useNotification();

  const { data: mediaRes, isLoading } = useMediaCategorySearchQuery({
    categoryTypeCode: CategoryType.MEDIA,
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

  const { mutate: mutationCreateMedias } = useMediaCategoryAddMutation();
  const { mutate: mutationUpdateMedias } = useMediaCategoryEditMutation();
  const { mutate: mutationDeleteMedias } = useMediaCategoryRemoveMutation();

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

  const handleEdit = (data: TMediaRecord) => {
    setInitValuesEditForm({
      ...data,
      createdDate: formatDate(data.createdDate ?? ''),
      updatedDate: formatDate(),
    });
    setDrawerMode('edit');
  };

  const handleSearch = ({ code, name, status }: TMediaSearchForm) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters({ code, name, status });
  };

  const handlePaginationChange = (data: TPagination) => {
    setPagination(data);
  };

  const handleSubmitInsert = ({ name, code, status }: MediaCategoryDTO) => {
    const data: Partial<MediaCategoryDTO> = {
      categoryTypeCode: CategoryType.MEDIA,
      code,
      name,
      status,
      id: initValuesInsertForm?.id,
    };

    // create new Media
    mutationCreateMedias(data, {
      onSuccess: (resData) => handleInvalidate(resData),
    });
  };

  const handleSubmitEdit = ({ name, code, status }: MediaCategoryDTO) => {
    const data: Partial<MediaCategoryDTO> = {
      categoryTypeCode: CategoryType.MEDIA,
      code,
      name,
      status,
      id: initValuesEditForm?.id,
    };
    mutationUpdateMedias(data, {
      onSuccess: (resData) => handleInvalidate(resData, true),
    });
  };

  const handleDelete = (id: string) => {
    mutationDeleteMedias({ id });
  };

  const paginations: IMPagination = {
    pagination: {
      current,
      pageSize,
      total: mediaRes?.data?.total ?? 1,
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
    const item = mediaRes?.data.content.find((i) => i.id === id);
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
    if (!isLoading && !mediaRes?.data?.content?.length && current > 1) {
      setPagination((prev) => ({
        ...prev,
        current: prev.current - 1,
        total: mediaRes?.data?.total ?? 1,
      }));
    }
  }, [mediaRes, setPagination, current, isLoading]);

  return (
    <div className="pt-32 category-media">
      <Title level={3} className="mb-24">
        Danh mục đa phương tiện
      </Title>
      <MediaSearchForm
        onSearch={handleSearch}
        onClearAll={handleClearAll}
        onCreate={handleCreate}
        initialValues={{
          code: filters?.code ?? '',
          name: filters?.name ?? '',
          status: filters?.status ?? EStatus.ACTIVE,
        }}
      />
      <div className="mt-24" />
      <MediaTable
        dataSource={mediaRes?.data?.content ?? []}
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
        {drawerMode === 'add' ? (
          <MediaInsertForm
            onClose={handleCloseForm}
            initialValues={initValuesInsertForm}
            onSubmit={handleSubmitInsert}
          />
        ) : (
          <MediaEditForm
            isViewMode={drawerMode === 'view'}
            onClose={handleCloseForm}
            initialValues={initValuesEditForm}
            onSubmit={handleSubmitEdit}
          />
        )}
      </ODrawer>
    </div>
  );
};

export default MediaCategoryPage;
