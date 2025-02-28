import { EStatus, SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import {
  CategoryType,
  type BaseResponse,
  type ProductCategoryDTO,
  type TProductSearchForm,
} from '@dtos';
import Title from 'antd/lib/typography/Title';
import { useEffect, useState, type FC } from 'react';

import type {
  IMPagination,
  TPagination,
} from '@components/molecules/m-pagination/MPagination.type';
import { ODrawer } from '@components/organisms';
import {
  useProductCategoryAddMutation,
  useProductCategoryEditMutation,
  useProductCategoryRemoveMutation,
  useProductCategorySearchQuery,
} from '@hooks/queries/productCategoryQueries';
import useUrlParams from '@hooks/useUrlParams';
import { useProfile } from '@stores';
import type { TFormType } from '@types';
import { formatDate } from '@utils/dateHelper';
import { filterObject } from '@utils/objectHelper';
import type { SortOrder } from 'antd/es/table/interface';
import { useNotification } from '@libs/antd';
import { validateInsertCategory } from '../utils';
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

  const notify = useNotification();

  const {
    pagination: { current, pageSize },
    setPagination,
    sort,
    setSort,
    filters,
    setFilters,
  } = useUrlParams<Partial<ProductCategoryDTO>>();

  const [drawerMode, setDrawerMode] = useState<TFormType>();

  const { user } = useProfile();

  const { data: productRes, isLoading } = useProductCategorySearchQuery({
    categoryTypeCode: CategoryType.PRODUCT,
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

  const { mutate: mutationCreateProduct } = useProductCategoryAddMutation();
  const { mutate: mutationUpdateProduct } = useProductCategoryEditMutation();
  const { mutate: mutationDeleteProduct } = useProductCategoryRemoveMutation();

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

  const handleEdit = (data: TProductRecord) => {
    setInitValuesEditForm({
      ...data,
      createdDate: formatDate(data.createdDate ?? ''),
      updatedDate: formatDate(),
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
      categoryTypeCode: CategoryType.PRODUCT,
      code,
      name,
      status,
      id: initValuesInsertForm?.id,
    };

    // create new product
    mutationCreateProduct(data, {
      onSuccess: (resData) => handleInvalidate(resData),
    });
  };

  const handleSubmitEdit = ({ name, code, status }: ProductCategoryDTO) => {
    const data: Partial<ProductCategoryDTO> = {
      categoryTypeCode: CategoryType.MEDIA,
      code,
      name,
      status,
      id: initValuesEditForm?.id,
    };
    mutationUpdateProduct(data, {
      onSuccess: (resData) => handleInvalidate(resData, true),
    });
  };

  const handleDelete = (id: string) => {
    mutationDeleteProduct({ id });
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
    if (!isLoading && !productRes?.data?.content?.length && current > 1) {
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
        dataSource={productRes?.data?.content ?? []}
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
