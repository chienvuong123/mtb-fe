import { DATE_SLASH_FORMAT } from '@constants/dateFormat';
import { EStatus, SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import {
  CategoryType,
  type BaseResponse,
  type ProductCategoryDTO,
  type TProductSearchForm,
} from '@dtos';
import Title from 'antd/lib/typography/Title';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState, type FC } from 'react';

import { AAlert } from '@components/atoms';
import type {
  IMPagination,
  TPagination,
} from '@components/molecules/m-pagination/MPagination.type';
import {
  useProductCategoryAddMutation,
  useProductCategoryEditMutation,
  useProductCategoryRemoveMutation,
  useProductCategorySearchQuery,
} from '@hooks/queries/useProductCategoryQueries';
import useUrlParams from '@hooks/useUrlParams';
import { useUserStore } from '@stores';
import { filterObject } from '@utils/objectHelper';
import type { SortOrder } from 'antd/es/table/interface';
import './index.scss';
import { ODrawer } from '@components/organisms';
import type { TFormType } from '@types';
import {
  ProductEditForm,
  ProductInsertForm,
  ProductSearchForm,
  ProductTable,
  type TProductRecord,
} from './components';

const ProductCategoryPage: FC = () => {
  const [initValuesInsertForm, setInitValuesInsertForm] =
    useState<Partial<TProductRecord> | null>(null);
  const [initValuesEditForm, setInitValuesEditForm] =
    useState<Partial<TProductRecord> | null>(null);

  const {
    pagination: { current, pageSize },
    setPagination,
    sort,
    setSort,
    filters,
    setFilters,
  } = useUrlParams<Partial<ProductCategoryDTO>>();

  const [drawerMode, setDrawerMode] = useState<TFormType>();

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

  const { data: productRes, isLoading } = useProductCategorySearchQuery({
    categoryType: CategoryType.PRODUCT,
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

  const { mutate: mutationCreateProducts } = useProductCategoryAddMutation(
    {},
    (data) => handleInvalidate(data),
  );
  const { mutate: mutationUpdateProducts } = useProductCategoryEditMutation(
    {},
    (data) => handleInvalidate(data, true),
  );
  const { mutate: mutationDeleteProducts } = useProductCategoryRemoveMutation();

  const handleCreate = () => {
    setInitValuesInsertForm({
      code: undefined,
      name: '',
      status: EStatus.ACTIVE,
      createdDate: dayjs().format(DATE_SLASH_FORMAT),
      updatedDate: dayjs().format(DATE_SLASH_FORMAT),
      createdBy: user?.username,
    });
    setDrawerMode('add');
  };

  const handleEdit = (data: TProductRecord) => {
    setInitValuesEditForm({
      ...data,
      createdDate: dayjs(data.createdDate).format(DATE_SLASH_FORMAT),
      updatedDate: dayjs().format(DATE_SLASH_FORMAT),
    });
    setDrawerMode('edit');
  };

  const handleSearch = ({ code, name, status }: TProductSearchForm) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters({ code, name, status });
  };

  const handlePaginationChange = (data: TPagination) => {
    setPagination(data);
  };

  const handleSubmitInsert = ({ name, code, status }: ProductCategoryDTO) => {
    const data: Partial<ProductCategoryDTO> = {
      categoryTypeId: CategoryType.PRODUCT,
      code,
      name,
      status,
      id: initValuesInsertForm?.id,
    };

    // create new product
    mutationCreateProducts(data);
  };

  const handleSubmitEdit = ({ name, code, status }: ProductCategoryDTO) => {
    const data: Partial<ProductCategoryDTO> = {
      categoryTypeId: CategoryType.MEDIA,
      code,
      name,
      status,
      id: initValuesEditForm?.id,
    };
    mutationUpdateProducts(data);
  };

  const dataSources: TProductRecord[] =
    useMemo(
      () =>
        productRes?.data?.content?.map((i) => ({
          ...i,
          key: i.id as string,
        })),
      [productRes],
    ) ?? [];

  const handleDelete = (id: string) => {
    mutationDeleteProducts({ id });
  };

  const paginations: IMPagination = {
    pagination: {
      current,
      pageSize,
      total: productRes?.data?.total ?? 1,
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
    const item = productRes?.data.content.find((i) => i.id === id);
    if (item) {
      setDrawerMode('view');
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

  useEffect(() => {
    if (!isLoading && !productRes?.data?.content.length && current > 1) {
      setPagination((prev) => ({
        ...prev,
        current: prev.current - 1,
        total: productRes?.data?.total ?? 1,
      }));
    }
  }, [productRes, setPagination, current, isLoading]);

  return (
    <div className="pt-32 category-product">
      <Title level={3} className="mb-24">
        Danh mục Product
      </Title>
      {visible && (
        <AAlert
          message={message}
          type={typeAlert}
          closable
          onClose={() => setVisible(false)}
          className={`alert-product ${typeAlert === 'success' ? 'alert-success' : ''} ${typeAlert === 'error' ? 'alert-error' : ''}`}
        />
      )}
      <ProductSearchForm
        onSearch={handleSearch}
        onClearAll={handleClearAll}
        initialValues={{
          code: filters?.code ?? '',
          name: filters?.name ?? '',
          status: filters?.status ?? EStatus.ACTIVE,
        }}
        onCreate={handleCreate}
      />
      <div className="mt-24" />
      <ProductTable
        dataSource={dataSources}
        paginations={paginations}
        sortDirection={sort}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onSort={handleSort}
      />

      <ODrawer
        usePrefixTitle
        title="danh mục product"
        mode={drawerMode}
        onClose={handleCloseForm}
        open={!!drawerMode}
        width={1025}
      >
        {drawerMode === 'add' ? (
          <ProductInsertForm
            onClose={handleCloseForm}
            initialValues={initValuesInsertForm}
            onSubmit={handleSubmitInsert}
          />
        ) : (
          <ProductEditForm
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

export default ProductCategoryPage;
