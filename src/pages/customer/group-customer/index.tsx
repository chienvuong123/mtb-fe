import { EStatus, SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import { Drawer, Flex } from 'antd';
import { type FC, useState, useMemo } from 'react';
import Title from 'antd/lib/typography/Title';
import dayjs from 'dayjs';
import { DATE_SLASH_FORMAT } from '@constants/dateFormat';
import { CategoryType, type CustomerDTO } from '@dtos';

import type {
  IMPagination,
  TPagination,
} from '@components/molecules/m-pagination/MPagination.type';
import {
  useCustomerSearchQuery,
  useProductCategoryAddMutation,
  useProductCategoryEditMutation,
  useProductCategoryRemoveMutation,
  // useProductCategorySearchQuery,
} from '@hooks/queries';
import type { SortOrder } from 'antd/es/table/interface';
import type { AnyObject } from 'antd/es/_util/type';
import { AButton } from '@components/atoms';
import { ExportIcon, ImportIcon, UserGroupIcon } from '@assets/icons';
import { OUploadPopup } from '@components/organisms/o-upload-popup';
import useUrlParams from '@hooks/useUrlParams';
import CustomerListSearchForm from './components/CustomerListSearchForm';
import CustomerListTable, {
  type TProductRecord,
} from './components/CustomerListTable';
import CustomerGroupForm from './components/CustomerGroupForm';

const ListCustomerPage: FC = () => {
  const [showInsertForm, setShowInsertForm] = useState<boolean>(false);
  const [initValues, setInitValues] = useState<Partial<TProductRecord> | null>(
    null,
  );

  const [showExport, setShowImport] = useState<boolean>(false);

  const {
    pagination: { current, pageSize },
    setPagination,
    sort,
    setSort,
    filters,
    setFilters,
  } = useUrlParams<Partial<CustomerDTO>>();

  const [isViewMode, setIsViewMode] = useState(false);

  const { data: productRes } = useCustomerSearchQuery({
    page: {
      pageNum: Number(current),
      pageSize: Number(pageSize),
    },
    order: sort,
    // code: filters.code,
    // name: filters.name,
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

  const handleSearch = (obj: object) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters(obj);
  };
  const handlePaginationChange = (data: TPagination) => {
    setPagination(data);
  };
  const handleSubmitInsert = ({ name, code }: CustomerDTO) => {
    const data: Partial<AnyObject> = {
      category: {
        categoryTypeId: CategoryType.PRODUCT,
        code,
        name,
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
      current,
      pageSize,
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
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters({ code: undefined, name: undefined });
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
    setPagination((pre) => ({ ...pre, current: 1 }));
    setSort({
      field,
      direction: direction ? SORT_ORDER_FOR_SERVER[direction] : '',
    });
  };

  const getDrawerTitle = useMemo(() => {
    const title = '$ khách hàng';
    if (isViewMode) return title.replace('$', 'Chi tiết');
    if (initValues?.id) return title.replace('$', 'Chỉnh sửa');
    return title.replace('$', 'Tạo mới');
  }, [initValues?.id, isViewMode]);

  return (
    <div className="pt-32">
      <OUploadPopup
        modalProps={{
          open: showExport,
          title: 'Tải lên danh sách khách hàng',
          onCancel: () => setShowImport(false),
        }}
        onSubmit={(file) => {
          console.log(file);
        }}
        onDowloadEg={() => {
          console.log('dowload clicked');
        }}
      />

      <Flex justify="space-between" className="mb-14">
        <Title level={3} className="mb-0">
          Danh sách Campaign
        </Title>
        <Flex gap={16}>
          <AButton
            variant="filled"
            color="primary"
            icon={<ImportIcon />}
            onClick={() => setShowImport(true)}
          >
            Import
          </AButton>
          <AButton variant="filled" color="primary" icon={<ExportIcon />}>
            Export
          </AButton>
          <AButton variant="filled" color="primary" icon={<UserGroupIcon />}>
            Tạo nhóm khách hàng
          </AButton>
        </Flex>
      </Flex>

      <CustomerListSearchForm
        onSearch={handleSearch}
        onClearAll={handleClearAll}
        initialValues={{ ...(filters as CustomerDTO) }}
        onCreate={handleCreate}
        onDeleteAll={() => {
          console.log('delete all');
        }}
      />
      <div className="mt-24" />
      <CustomerListTable
        dataSource={dataSources}
        paginations={paginations}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onSort={handleSort}
      />

      <Drawer
        title={getDrawerTitle}
        onClose={handleCloseForm}
        open={showInsertForm}
        width={1643}
        maskClosable={false}
        classNames={{ body: 'pa-0', header: 'py-22 px-40 fs-16 fw-500' }}
      >
        <CustomerGroupForm
          isViewMode={isViewMode}
          onClose={handleCloseForm}
          initialValues={initValues}
          onSubmit={handleSubmitInsert}
        />
      </Drawer>
    </div>
  );
};

export default ListCustomerPage;
