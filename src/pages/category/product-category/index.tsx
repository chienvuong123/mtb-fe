import { ECategoryType, EStatus } from '@constants/masterData';
import { Drawer } from 'antd';
import { type FC, useState, useMemo } from 'react';
import Title from 'antd/lib/typography/Title';
import dayjs from 'dayjs';
import { DATE_SLASH_FORMAT } from '@constants/dateFormat';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createProduct,
  deleteProduct,
  getListProduct,
  updateProduct,
} from '@services/rq-hooks';
import type {
  CMResponseProductCategoryDTO,
  CMResponseCategoryDTO,
  ProductCategoryDTO,
  ProductCategoryUpsertRequest,
  TProductSearchForm,
} from '@dtos';

import './index.scss';
import type {
  IMPagination,
  TPagination,
} from '@components/molecules/m-pagination/MPagination.type';
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

  const { data: productList, refetch: refetchProductList } =
    useQuery<CMResponseCategoryDTO>({
      queryKey: [
        'product-category/list',
        metaData.current,
        metaData.pageSize,
        searchValues.code,
        searchValues.name,
      ],
      queryFn: () =>
        getListProduct({
          categoryType: ECategoryType.PRODUCT,
          reqNo: '1',
          pageNumber: metaData.current - 1,
          pageSize: metaData.pageSize,
          code: searchValues.code,
          name: searchValues.name,
        }),
    });

  const handleCloseForm = () => setShowInsertForm(false);

  const handleReset = () => {
    handleCloseForm();
    setInitValues(null);
    refetchProductList();
  };

  // const { data: categoryTypes } = useQuery<CMResponseProductCategoryDTO>({
  //   queryKey: ['category-types', '1'],
  //   queryFn: () => getCategoryTypes('1'),
  // });

  console.log(productList?.data.content);

  const mutationCreateProducts = useMutation<
    CMResponseProductCategoryDTO,
    Error,
    ProductCategoryUpsertRequest
  >({
    mutationFn: (values) => createProduct(values),
    onSuccess: handleReset,
    onError: (error) => {
      console.error('Error occurred:', error);
    },
    onSettled: () => {
      console.log('Mutation finished');
    },
  });
  const mutationUpdateProducts = useMutation<
    CMResponseProductCategoryDTO,
    Error,
    ProductCategoryUpsertRequest
  >({
    mutationFn: (values) => updateProduct(values),
    onSuccess: handleReset,
    onError: (error) => {
      console.error('Error occurred:', error);
    },
    onSettled: () => {
      console.log('Mutation finished');
    },
  });

  const mutationDeleteProducts = useMutation<
    CMResponseProductCategoryDTO,
    Error,
    number
  >({
    mutationFn: (values) => deleteProduct(values),
    onSuccess: () => {
      refetchProductList();
    },
    onError: (error) => {
      console.error('Error occurred:', error);
    },
    onSettled: () => {
      console.log('Mutation finished');
    },
  });

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
    const data: ProductCategoryUpsertRequest = {
      category: {
        name,
        code: code || undefined, // insert from client??
        id: initValues?.id,
        status,
        categoryTypeCode: ECategoryType.PRODUCT,
        createdBy, // insert from client??
        createdDate: dayjs(createdDate).toISOString(), // insert from client??
        updatedBy, // insert from client??
        updatedDate: dayjs(updatedDate).toISOString(), // insert from client??
      },
      reqNo: '1',
    };
    if (data.category?.id) {
      mutationUpdateProducts.mutate(data);
    } else {
      mutationCreateProducts.mutate(data);
    }
  };

  const handleDelete = (id: number) => {
    mutationDeleteProducts.mutate(id);
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
      () => productList?.data?.content?.map((i) => ({ ...i, key: i.id })),
      [productList],
    ) ?? [];

  return (
    <div className="pt-32">
      <Title level={3} className="mb-24">
        Danh mục Product
      </Title>
      <ProductSearchForm onSearch={handleSearch} />
      <div className="mt-24" />
      <ProductTable
        dataSource={dataSources}
        paginations={paginations}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Drawer
        title={`${initValues?.id ? 'Chỉnh sửa' : 'Tạo mới'} danh mục product`}
        onClose={handleCloseForm}
        open={showInsertForm}
        width={1025}
        maskClosable={false}
        classNames={{ body: 'pa-0', header: 'py-22 px-40 fs-16 fw-500' }}
      >
        <ProductInsertForm
          onClose={handleCloseForm}
          initialValues={initValues}
          onSubmit={handleSubmitUpsert}
        />
      </Drawer>
    </div>
  );
};

export default ProductCategoryPage;
