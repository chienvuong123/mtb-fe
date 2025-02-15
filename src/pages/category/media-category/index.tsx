import { DATE_SLASH_FORMAT } from '@constants/dateFormat';
import { EStatus, SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import {
  CategoryType,
  type BaseResponse,
  type MediaCategoryDTO,
  type TMediaSearchForm,
} from '@dtos';
import { Drawer } from 'antd';
import Title from 'antd/lib/typography/Title';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState, type FC } from 'react';

import { AAlert } from '@components/atoms';
import type {
  IMPagination,
  TPagination,
} from '@components/molecules/m-pagination/MPagination.type';
import {
  useMediaCategoryAddMutation,
  useMediaCategoryEditMutation,
  useMediaCategoryRemoveMutation,
  useMediaCategorySearchQuery,
} from '@hooks/queries/useMediaCategoryQueries';
import useUrlParams from '@hooks/useUrlParams';
import { useUserStore } from '@stores';
import type { SortOrder } from 'antd/es/table/interface';
import { filterObject } from '@utils/objectHelper';
import MediaEditForm from './components/MediaEditForm';
import MediaInsertForm from './components/MediaInsertForm';
import MediaSearchForm from './components/MediaSearchForm';
import MediaTable, { type TMediaRecord } from './components/MediaTable';
import './index.scss';

const MediaCategoryPage: FC = () => {
  const [showInsertForm, setShowInsertForm] = useState<boolean>(false);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
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

  const [isViewMode, setIsViewMode] = useState(false);

  const { user } = useUserStore();

  const [visible, setVisible] = useState(false);
  const [typeAlert, setTypeAlert] = useState<'success' | 'warning' | 'error'>(
    'success',
  );
  const [message, setMessage] = useState<string>('');

  const showAlert = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  };

  const { data: mediaRes, isLoading } = useMediaCategorySearchQuery({
    categoryType: CategoryType.MEDIA,
    page: {
      pageNum: Number(current),
      pageSize: Number(pageSize),
    },
    order: sort,
    ...filterObject(filters),
    status: filters.status ?? EStatus.ACTIVE,
  });

  const handleCloseForm = () => {
    setShowInsertForm(false);
    setShowEditForm(false);
    setIsViewMode(false);
  };

  const handleShowMessage = (
    dataSuccess?: BaseResponse<boolean>,
    isEdit: boolean = false,
  ) => {
    if (!dataSuccess) return;

    if (dataSuccess.data) {
      setTypeAlert('success');
      setMessage(isEdit ? 'Chỉnh sửa thành công' : 'Tạo mới thành công');
    } else {
      setTypeAlert('error');
      setMessage(dataSuccess.errorDesc);
    }
    showAlert();
  };

  const handleInvalidate = (
    data?: BaseResponse<boolean>,
    isEdit: boolean = false,
  ) => {
    handleShowMessage(data, isEdit);
    handleCloseForm();
    setInitValuesEditForm(null);
    setInitValuesInsertForm(null);
  };

  const { mutate: mutationCreateMedias } = useMediaCategoryAddMutation(
    {},
    (data) => handleInvalidate(data),
  );
  const { mutate: mutationUpdateMedias } = useMediaCategoryEditMutation(
    {},
    (data) => handleInvalidate(data, true),
  );
  const { mutate: mutationDeleteMedias } = useMediaCategoryRemoveMutation();

  const handleCreate = () => {
    setInitValuesInsertForm({
      code: undefined,
      name: '',
      status: EStatus.ACTIVE,
      createdDate: dayjs().format(DATE_SLASH_FORMAT),
      updatedDate: dayjs().format(DATE_SLASH_FORMAT),
      createdBy: user?.username,
    });
    setShowInsertForm(true);
  };

  const handleEdit = (data: TMediaRecord) => {
    setInitValuesEditForm({
      ...data,
      createdDate: dayjs(data.createdDate).format(DATE_SLASH_FORMAT),
      updatedDate: dayjs().format(DATE_SLASH_FORMAT),
    });
    setShowEditForm(true);
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
      categoryTypeId: CategoryType.MEDIA,
      code,
      name,
      status,
      id: initValuesInsertForm?.id,
    };

    // create new Media
    mutationCreateMedias(data);
  };

  const handleSubmitEdit = ({ name, code, status }: MediaCategoryDTO) => {
    const data: Partial<MediaCategoryDTO> = {
      categoryTypeId: CategoryType.MEDIA,
      code,
      name,
      status,
      id: initValuesEditForm?.id,
    };
    mutationUpdateMedias(data);
  };

  const dataSources: TMediaRecord[] =
    useMemo(
      () =>
        mediaRes?.data?.content?.map((i) => ({
          ...i,
          key: i.id as string,
        })),
      [mediaRes],
    ) ?? [];

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
      setIsViewMode(true);
      setInitValuesEditForm({ ...item });
    }
  };

  const handleSort = (field: string, direction: SortOrder) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setSort({
      field,
      direction: direction ? SORT_ORDER_FOR_SERVER[direction] : '',
    });
  };

  const getDrawerTitle = useMemo(() => {
    const title = '$ danh mục đa phương tiện';
    if (isViewMode) return title.replace('$', 'Chi tiết');
    if (initValuesEditForm?.id) return title.replace('$', 'Chỉnh sửa');
    return title.replace('$', 'Tạo mới');
  }, [initValuesEditForm?.id, isViewMode]);

  useEffect(() => {
    if (!isLoading && !mediaRes?.data?.content.length && current > 1) {
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
      {visible && (
        <AAlert
          message={message}
          type={typeAlert}
          closable
          onClose={() => setVisible(false)}
          className={`alert-media ${typeAlert === 'success' ? 'alert-success' : ''} ${typeAlert === 'error' ? 'alert-error' : ''}`}
        />
      )}
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
        dataSource={dataSources}
        paginations={paginations}
        sortDirection={sort}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onSort={handleSort}
      />

      <Drawer
        title={getDrawerTitle}
        onClose={handleCloseForm}
        open={showInsertForm || showEditForm || isViewMode}
        width={1025}
        maskClosable={false}
        classNames={{ body: 'pa-0', header: 'py-22 px-40 fs-16 fw-500' }}
      >
        {showInsertForm && (
          <MediaInsertForm
            onClose={handleCloseForm}
            initialValues={initValuesInsertForm}
            onSubmit={handleSubmitInsert}
          />
        )}
        {(showEditForm || isViewMode) && (
          <MediaEditForm
            isViewMode={isViewMode}
            onClose={handleCloseForm}
            initialValues={initValuesEditForm}
            onSubmit={handleSubmitEdit}
          />
        )}
      </Drawer>
    </div>
  );
};

export default MediaCategoryPage;
