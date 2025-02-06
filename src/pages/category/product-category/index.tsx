import { EStatus } from '@constants/masterData';
import { Drawer } from 'antd';
import { type FC, useState, useMemo } from 'react';
import Title from 'antd/lib/typography/Title';
import dayjs from 'dayjs';
import { DATE_SLASH_FORMAT } from '@constants/dateFormat';
import {
  CategoryType,
  type ProductCategoryDTO,
  type CategoryInsertRequest,
  type TProductSearchForm,
  type OrderDTO,
} from '@dtos';

import './index.scss';
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
import type { SortOrder } from 'antd/es/table/interface';
import ProductInsertForm from './components/ProductInsertForm';
import ProductSearchForm from './components/ProductSearchForm';
import ProductTable, { type TProductRecord } from './components/ProductTable';

const ProductCategoryPage: FC = () => {
  const [showInsertForm, setShowInsertForm] = useState<boolean>(false);
  const [initValues, setInitValues] = useState<Partial<TProductRecord> | null>(
    null,
  );

  const [metaData, setMetaData] = useState<TPagination>({
    current: 1,
    pageSize: 20,
    total: 100,
  });

  const [searchValues, setSearchValues] = useState<Partial<ProductCategoryDTO>>(
    {},
  );

  const [sortObject, setSortObject] = useState<OrderDTO>();

  const [isViewMode, setIsViewMode] = useState(false);

  const { data: productRes } = useProductCategorySearchQuery({
    categoryType: CategoryType.PRODUCT,
    page: { pageNum: metaData.current, pageSize: metaData.pageSize },
    order: sortObject,
    code: searchValues.code,
    name: searchValues.name,
  });

  const handleCloseForm = () => {
    setShowInsertForm(false);
    setIsViewMode(false);
  };

  const handleReset = () => {
    handleCloseForm();
    setInitValues(null);
  };

  const { mutate: mutationCreateProducts } = useProductCategoryAddMutation(
    {},
    handleReset,
  );
  const { mutate: mutationUpdateProducts } = useProductCategoryEditMutation(
    {},
    handleReset,
  );
  const { mutate: mutationDeleteProducts } = useProductCategoryRemoveMutation();

  const handleCreate = () => {
    setInitValues({
      code: '0013',
      name: '',
      status: EStatus.ACTIVE,
      createdDate: dayjs().format(DATE_SLASH_FORMAT),
      updatedDate: dayjs().format(DATE_SLASH_FORMAT),
    });
    setShowInsertForm(true);
  };

  const handleEdit = (data: TProductRecord) => {
    setInitValues({
      ...data,
      createdDate: dayjs(data.createdDate).format(DATE_SLASH_FORMAT),
      updatedDate: dayjs().format(DATE_SLASH_FORMAT),
    });
    setShowInsertForm(true);
  };

  const handleSearch = (values: TProductSearchForm) => {
    setSearchValues(values);
  };

  const handlePaginationChange = (data: TPagination) => {
    setMetaData(data);
  };

  const handleSubmitInsert = ({ name, code, status }: ProductCategoryDTO) => {
    const data: Partial<CategoryInsertRequest> = {
      category: {
        categoryTypeId: CategoryType.PRODUCT,
        code,
        name,
        status,
        id: initValues?.id,
      },
    };
    // update product
    if (data?.category?.id) {
      mutationUpdateProducts(data);
      return;
    }
    // create new product
    mutationCreateProducts(data);
  };

  const handleDelete = (id: string) => {
    mutationDeleteProducts({ id });
  };

  const paginations: IMPagination = {
    pagination: {
      ...metaData,
      total: productRes?.data?.total ?? 1,
    },
    setPagination: handlePaginationChange,
    optionPageSize: [10, 20, 50, 100],
    className: 'flex-end',
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

  const handleClearAll = () => {
    setMetaData((pre) => ({ ...pre, current: 1 }));
    setSearchValues({});
  };

  const handleView = (id: string) => {
    const item = productRes?.data.content.find((i) => i.id === id);
    if (item) {
      setIsViewMode(true);
      setInitValues({ ...item });
      setShowInsertForm(true);
    }
  };

  const handleSort = (field: string, direction: SortOrder) => {
    setSortObject(
      direction
        ? { field, direction: direction.replace('end', '') }
        : undefined,
    );
  };

  const getDrawerTitle = useMemo(() => {
    const title = '$ danh mục product';
    if (isViewMode) return title.replace('$', 'Chi tiết');
    if (initValues?.id) return title.replace('$', 'Chỉnh sửa');
    return title.replace('$', 'Tạo mới');
  }, [initValues?.id, isViewMode]);

  return (
    <div className="pt-32">
      <Title level={3} className="mb-24">
        Danh mục Product
      </Title>
      <ProductSearchForm onSearch={handleSearch} onClearAll={handleClearAll} />
      <div className="mt-24" />
      <ProductTable
        dataSource={dataSources}
        paginations={paginations}
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
        <ProductInsertForm
          isViewMode={isViewMode}
          onClose={handleCloseForm}
          initialValues={initValues}
          onSubmit={handleSubmitInsert}
        />
      </Drawer>
    </div>
  );
};

export default ProductCategoryPage;
