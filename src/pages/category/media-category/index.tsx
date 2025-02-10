import { EStatus, SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import { Drawer } from 'antd';
import { type FC, useState, useMemo } from 'react';
import Title from 'antd/lib/typography/Title';
import dayjs from 'dayjs';
import { DATE_SLASH_FORMAT } from '@constants/dateFormat';
import {
  CategoryType,
  type MediaCategoryDTO,
  type TMediaSearchForm,
} from '@dtos';

import './index.scss';
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
import type { SortOrder } from 'antd/es/table/interface';
import useUrlParams from '@hooks/useUrlParams';
import MediaSearchForm from './components/MediaSearchForm';
import MediaTable, { type TMediaRecord } from './components/MediaTable';
import MediaInsertForm from './components/MediaInsertForm';

const MediaCategoryPage: FC = () => {
  const [showInsertForm, setShowInsertForm] = useState<boolean>(false);
  const [initValues, setInitValues] = useState<Partial<TMediaRecord> | null>(
    null,
  );

  const { pagination, setPagination, sort, setSort, filters, setFilters } =
    useUrlParams<Partial<MediaCategoryDTO>>();

  const [isViewMode, setIsViewMode] = useState(false);

  const { data: MediaRes } = useMediaCategorySearchQuery({
    categoryType: CategoryType.MEDIA,
    page: { pageNum: pagination.current, pageSize: pagination.pageSize },
    order: sort,
    code: filters.code,
    name: filters.name,
  });

  const handleCloseForm = () => {
    setShowInsertForm(false);
    setIsViewMode(false);
  };

  const handleReset = () => {
    handleCloseForm();
    setInitValues(null);
  };

  const { mutate: mutationCreateMedias } = useMediaCategoryAddMutation(
    {},
    handleReset,
  );
  const { mutate: mutationUpdateMedias } = useMediaCategoryEditMutation(
    {},
    handleReset,
  );
  const { mutate: mutationDeleteMedias } = useMediaCategoryRemoveMutation();

  const handleCreate = () => {
    setInitValues({
      code: undefined,
      name: '',
      status: EStatus.ACTIVE,
      createdDate: dayjs().format(DATE_SLASH_FORMAT),
      updatedDate: dayjs().format(DATE_SLASH_FORMAT),
    });
    setShowInsertForm(true);
  };

  const handleEdit = (data: TMediaRecord) => {
    setInitValues({
      ...data,
      createdDate: dayjs(data.createdDate).format(DATE_SLASH_FORMAT),
      updatedDate: dayjs().format(DATE_SLASH_FORMAT),
    });
    setShowInsertForm(true);
  };

  const handleSearch = ({ code, name }: TMediaSearchForm) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters({ code, name });
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
      id: initValues?.id,
    };
    // update Media
    if (data?.id) {
      mutationUpdateMedias(data);
      return;
    }
    // create new Media
    mutationCreateMedias(data);
  };

  const handleDelete = (id: string) => {
    mutationDeleteMedias({ id });
  };

  const paginations: IMPagination = {
    pagination: {
      ...pagination,
      total: MediaRes?.data?.total ?? 1,
    },
    setPagination: handlePaginationChange,
    optionPageSize: [10, 20, 50, 100],
    className: 'flex-end',
  };

  const dataSources: TMediaRecord[] =
    useMemo(
      () =>
        MediaRes?.data?.content?.map((i) => ({
          ...i,
          key: i.id as string,
        })),
      [MediaRes],
    ) ?? [];

  const handleClearAll = () => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters({ code: undefined, name: undefined });
  };

  const handleView = (id: string) => {
    const item = MediaRes?.data.content.find((i) => i.id === id);
    if (item) {
      setIsViewMode(true);
      setInitValues({ ...item });
      setShowInsertForm(true);
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
    if (initValues?.id) return title.replace('$', 'Chỉnh sửa');
    return title.replace('$', 'Tạo mới');
  }, [initValues?.id, isViewMode]);

  return (
    <div className="pt-32">
      <Title level={3} className="mb-24">
        Danh mục đa phương tiện
      </Title>
      <MediaSearchForm
        onSearch={handleSearch}
        onClearAll={handleClearAll}
        initialValues={{ code: filters?.code ?? '', name: filters?.name ?? '' }}
      />
      <div className="mt-24" />
      <MediaTable
        dataSource={dataSources}
        paginations={paginations}
        sortDirection={sort}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onSort={handleSort}
      />

      <Drawer
        title={getDrawerTitle}
        onClose={handleCloseForm}
        open={showInsertForm}
        width={1025}
        maskClosable={false}
        classNames={{ body: 'pa-0', header: 'py-22 px-40 fs-16 fw-500' }}
      >
        <MediaInsertForm
          isViewMode={isViewMode}
          onClose={handleCloseForm}
          initialValues={initValues}
          onSubmit={handleSubmitInsert}
        />
      </Drawer>
    </div>
  );
};

export default MediaCategoryPage;
