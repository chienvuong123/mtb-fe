import { EStatus, SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import {
  CategoryType,
  type BaseResponse,
  type CategoryDTO,
  type TCategorySearchForm,
} from '@dtos';
import Title from 'antd/lib/typography/Title';
import { useEffect, useState, type FC } from 'react';

import type { IMPagination, TPagination } from '@components/molecules';
import { ODrawer } from '@components/organisms';
import {
  useCustomerSegmentCategoryAddMutation,
  useCustomerSegmentCategoryEditMutation,
  useCustomerSegmentCategoryRemoveMutation,
  useCustomerSegmentCategorySearchQuery,
} from '@hooks/queries/customerSegmentQueries';
import useUrlParams from '@hooks/useUrlParams';
import { useProfile } from '@stores';
import type { TFormType } from '@types';
import { formatDate } from '@utils/dateHelper';
import { filterObject } from '@utils/objectHelper';
import { useNotification } from '@libs/antd';
import type { SortOrder } from 'antd/es/table/interface';
import { validateInsertCategory } from '../utils';
import {
  CustomerSegmentEditForm,
  CustomerSegmentInsertForm,
  CustomerSegmentSearchForm,
  CustomerSegmentTable,
} from './components';

const CustomerSegmentCategoryPage: FC = () => {
  const [initValuesInsertForm, setInitValuesInsertForm] =
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

  const { user } = useProfile();

  const notify = useNotification();

  const { data: customerSegmentRes, isLoading } =
    useCustomerSegmentCategorySearchQuery({
      categoryTypeCode: CategoryType.CUSTOMER_SEGMENT,
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
        setInitValuesInsertForm(null);
      });
  };

  const { mutate: mutationCreateCustomerSegment } =
    useCustomerSegmentCategoryAddMutation();
  const { mutate: mutationUpdateCustomerSegment } =
    useCustomerSegmentCategoryEditMutation();
  const { mutate: mutationDeleteCustomerSegment } =
    useCustomerSegmentCategoryRemoveMutation();

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

  const handleEdit = (data: Partial<CategoryDTO>) => {
    setInitValuesInsertForm({
      ...data,
      createdDate: formatDate(data.createdDate ?? ''),
      updatedDate: formatDate(),
    });
    setDrawerMode('edit');
  };

  const handleSearch = ({ code, name, status }: TCategorySearchForm) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters({ code, name, status });
  };

  const handlePaginationChange = (data: TPagination) => {
    setPagination({
      ...data,
      current: data.pageSize !== pageSize ? 1 : data.current,
    });
  };

  const handleSubmitInsert = ({ name, code, status }: Partial<CategoryDTO>) => {
    const data: Partial<CategoryDTO> = {
      categoryTypeCode: CategoryType.CUSTOMER_SEGMENT,
      code,
      name,
      status,
      id: initValuesInsertForm?.id,
    };

    // create new Customer Segment
    mutationCreateCustomerSegment(data, {
      onSuccess: (resData) => handleInvalidate(resData),
    });
  };

  const handleSubmitEdit = ({ name, code, status }: Partial<CategoryDTO>) => {
    const data: Partial<CategoryDTO> = {
      categoryTypeCode: CategoryType.CUSTOMER_SEGMENT,
      code,
      name,
      status,
      id: initValuesInsertForm?.id,
    };
    mutationUpdateCustomerSegment(data, {
      onSuccess: (resData) => handleInvalidate(resData, true),
    });
  };

  const handleDelete = (id: string) => {
    mutationDeleteCustomerSegment(
      { id },
      {
        onSuccess: () =>
          notify({
            message: 'Xóa thành công',
            type: 'success',
          }),
      },
    );
  };

  const paginations: IMPagination = {
    pagination: {
      current,
      pageSize,
      total: customerSegmentRes?.data?.total ?? 1,
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
    const item = customerSegmentRes?.data.content.find((i) => i.id === id);
    if (item) {
      setDrawerMode('view');
      setInitValuesInsertForm({
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
    if (
      !isLoading &&
      !customerSegmentRes?.data?.content?.length &&
      current > 1
    ) {
      setPagination((prev) => ({
        ...prev,
        current: prev.current - 1,
        total: customerSegmentRes?.data?.total ?? 1,
      }));
    }
  }, [customerSegmentRes, setPagination, current, isLoading]);

  return (
    <div className="pt-32 category-media">
      <Title level={3} className="mb-24">
        Phân khúc khách hàng
      </Title>
      <CustomerSegmentSearchForm
        onSearch={handleSearch}
        onClearAll={handleClearAll}
        onCreate={handleCreate}
        initialValues={{
          ...filters,
          status: filters?.status ?? EStatus.ACTIVE,
        }}
      />
      <div className="mt-24" />
      <CustomerSegmentTable
        dataSource={customerSegmentRes?.data?.content ?? []}
        paginations={paginations}
        sortDirection={sort}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onSort={handleSort}
      />

      <ODrawer
        usePrefixTitle
        title="danh mục phân khúc khách hàng"
        mode={drawerMode}
        onClose={handleCloseForm}
        open={!!drawerMode}
        width={1025}
      >
        {drawerMode &&
          (drawerMode === 'add' ? (
            <CustomerSegmentInsertForm
              mode="add"
              onClose={handleCloseForm}
              initialValues={initValuesInsertForm}
              onSubmit={handleSubmitInsert}
            />
          ) : (
            <CustomerSegmentEditForm
              mode={drawerMode}
              onClose={handleCloseForm}
              initialValues={initValuesInsertForm}
              onSubmit={handleSubmitEdit}
            />
          ))}
      </ODrawer>
    </div>
  );
};

export default CustomerSegmentCategoryPage;
