import { EStatus } from '@constants/masterData';
import { Drawer } from 'antd';
import { type FC, useState, useMemo } from 'react';
import Title from 'antd/lib/typography/Title';
import dayjs from 'dayjs';
import { DATE_SLASH_FORMAT } from '@constants/dateFormat';
import {
  CategoryType,
  type CategoryDTO,
  type ProductCategoryDTO,
  type TProductSearchForm,
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

  const [searchValues, setSearchValues] = useState<Partial<TProductSearchForm>>(
    {},
  );

  const [isViewMode, setIsViewMode] = useState(false);

  const { data: productList, refetch: refetchProductList } =
    useProductCategorySearchQuery({
      categoryType: CategoryType.PRODUCT,
      pageNumber: metaData.current - 1,
      pageSize: metaData.pageSize,
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
    refetchProductList();
  };

  console.log(productList?.data.content);

  const { mutate: mutationCreateProducts } = useProductCategoryAddMutation();
  const { mutate: mutationUpdateProducts } = useProductCategoryEditMutation();
  const { mutate: mutationDeleteProducts } = useProductCategoryRemoveMutation();

  const handleCreate = () => {
    setInitValues({
      code: '0003', // insert from client??
      name: '',
      key: 'CODE',
      status: EStatus.ACTIVE,
      createdDate: dayjs().format(DATE_SLASH_FORMAT),
      updatedDate: dayjs().format(DATE_SLASH_FORMAT),
      createdBy: 'You',
      updatedBy: 'You',
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

  const handleSubmitUpsert = ({
    name,
    code,
    status,
    createdBy,
    createdDate,
    updatedBy,
    updatedDate,
  }: ProductCategoryDTO) => {
    const data: Partial<CategoryDTO> = {
      name,
      code, // insert from client??
      id: initValues?.id,
      status,
      categoryType: CategoryType.PRODUCT,
      createdBy, // insert from client??
      createdDate: dayjs(createdDate).toISOString(), // insert from client??
      updatedBy, // insert from client??
      updatedDate: dayjs(updatedDate).toISOString(), // insert from client??
    };
    // update product
    if (data?.id) {
      mutationUpdateProducts(data, {
        onSuccess: handleReset,
        onError: (error) => {
          console.error('Error occurred:', error);
        },
        onSettled: () => {
          console.log('Mutation finished');
        },
      });
      return;
    }
    // create new product
    // const { id, ...params } = data;
    delete data.id;
    mutationCreateProducts(data, {
      onSuccess: handleReset,
      onError: (error) => {
        console.error('Error occurred:', error);
      },
      onSettled: () => {
        console.log('Mutation finished');
      },
    });
  };

  const handleDelete = (id: string) => {
    mutationDeleteProducts(
      { id },
      {
        onSuccess: () => {
          refetchProductList();
        },
        onError: (error) => {
          console.error('Error occurred:', error);
        },
        onSettled: () => {
          console.log('Mutation finished');
        },
      },
    );
  };

  const paginations: IMPagination = {
    pagination: {
      ...metaData,
      total: productList?.data?.page
        ? productList.data.page * metaData.pageSize
        : 0,
    },
    setPagination: handlePaginationChange,
    optionPageSize: [10, 20, 50, 100],
    className: 'flex-end',
  };

  const dataSources: TProductRecord[] =
    useMemo(
      () =>
        productList?.data?.content?.map((i) => ({ ...i, key: i.id as string })),
      [productList],
    ) ?? [];

  const handleClearAll = () => {
    setMetaData((pre) => ({ ...pre, current: 1 }));
    setSearchValues({});
  };

  const handleView = (id: string) => {
    console.log(id);
    const item = productList?.data.content.find((i) => i.id === id);
    if (item) {
      setIsViewMode(true);
      setInitValues({ ...item });
      setShowInsertForm(true);
    }
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
          onSubmit={handleSubmitUpsert}
        />
      </Drawer>
    </div>
  );
};

export default ProductCategoryPage;
