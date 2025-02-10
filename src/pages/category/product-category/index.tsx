import { DATE_SLASH_FORMAT } from '@constants/dateFormat';
import { EStatus, SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import {
  CategoryType,
  type BaseResponse,
  type ProductCategoryDTO,
  type TProductSearchForm,
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
import { ErrorCode } from '@constants/errorCode';
import {
  useProductCategoryAddMutation,
  useProductCategoryEditMutation,
  useProductCategoryRemoveMutation,
  useProductCategorySearchQuery,
} from '@hooks/queries/useProductCategoryQueries';
import useUrlParams from '@hooks/useUrlParams';
import { useUserStore } from '@stores';
import type { SortOrder } from 'antd/es/table/interface';
import ProductEditForm from './components/ProductEditForm';
import ProductInsertForm from './components/ProductInsertForm';
import ProductSearchForm from './components/ProductSearchForm';
import ProductTable, { type TProductRecord } from './components/ProductTable';
import './index.scss';

const ProductCategoryPage: FC = () => {
  const [showInsertForm, setShowInsertForm] = useState<boolean>(false);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [initValuesInsertForm, setInitValuesInsertForm] =
    useState<Partial<TProductRecord> | null>(null);
  const [initValuesEditForm, setInitValuesEditForm] =
    useState<Partial<TProductRecord> | null>(null);

  const { pagination, setPagination, sort, setSort, filters, setFilters } =
    useUrlParams<Partial<ProductCategoryDTO>>();

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

  const { data: productRes, isLoading } = useProductCategorySearchQuery({
    categoryType: CategoryType.PRODUCT,
    page: { pageNum: pagination.current, pageSize: pagination.pageSize },
    order: sort,
    code: filters.code,
    name: filters.name,
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
      switch (dataSuccess.errorCode) {
        case ErrorCode.CATEGORY_DUPLICATE:
          setMessage('Lỗi! Product đã tồn tại');
          break;
        default:
          setMessage('Lỗi! Đã xảy ra lỗi không xác định');
      }
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
    setShowInsertForm(true);
  };

  const handleEdit = (data: TProductRecord) => {
    setInitValuesEditForm({
      ...data,
      createdDate: dayjs(data.createdDate).format(DATE_SLASH_FORMAT),
      updatedDate: dayjs().format(DATE_SLASH_FORMAT),
    });
    setShowInsertForm(true);
    setShowEditForm(true);
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
      ...pagination,
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
    const title = '$ danh mục product';
    if (isViewMode) return title.replace('$', 'Chi tiết');
    if (initValuesEditForm?.id) return title.replace('$', 'Chỉnh sửa');
    return title.replace('$', 'Tạo mới');
  }, [initValuesEditForm?.id, isViewMode]);

  useEffect(() => {
    if (
      !isLoading &&
      !productRes?.data?.content.length &&
      pagination.current > 1
    ) {
      setPagination((prev) => ({
        ...prev,
        current: prev.current - 1,
        total: productRes?.data?.total ?? 1,
      }));
    }
  }, [productRes, setPagination, pagination, isLoading]);

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
      />
      <div className="mt-24" />
      <ProductTable
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
        open={showInsertForm || showEditForm || isViewMode}
        width={1025}
        maskClosable={false}
        classNames={{ body: 'pa-0', header: 'py-22 px-40 fs-16 fw-500' }}
      >
        {showInsertForm && (
          <ProductInsertForm
            onClose={handleCloseForm}
            initialValues={initValuesInsertForm}
            onSubmit={handleSubmitInsert}
          />
        )}
        {(showEditForm || isViewMode) && (
          <ProductEditForm
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

export default ProductCategoryPage;
