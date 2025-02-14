import { SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import { Drawer, Flex, type FormInstance } from 'antd';
import { type FC, useState, useMemo } from 'react';
import Title from 'antd/lib/typography/Title';
import { type CustomerDTO } from '@dtos';

import type {
  IMPagination,
  TPagination,
} from '@components/molecules/m-pagination/MPagination.type';
import {
  useCustomerSearchQuery,
  useCustomerAddMutation,
  useCustomerEditMutation,
  useCustomerRemoveMutation,
} from '@hooks/queries';
import type { SortOrder } from 'antd/es/table/interface';
import { AButton } from '@components/atoms';
import { ExportIcon, ImportIcon, UserGroupIcon } from '@assets/icons';
import { OUploadPopup } from '@components/organisms/o-upload-popup';
import useUrlParams from '@hooks/useUrlParams';
import CustomerListSearchForm from './components/CustomerListSearchForm';
import CustomerListTable, {
  type TCustomerRecord,
} from './components/CustomerListTable';
import CustomerForm from './components/CustomerForm';
import CustomerGroupForm from '../group-customer/components/CustomerGroupForm';
import { destructCustomerData, validateInsertCustomer } from './customerHelper';

type TDrawerMode = 'group' | 'list' | false;

const DRAWER_WIDTH = {
  group: 1025,
  list: 1643,
};

const ListCustomerPage: FC = () => {
  const [drawerMode, setDrawerMode] = useState<TDrawerMode>(false);
  const [drawerWidth, setDrawerWidth] = useState<number>(DRAWER_WIDTH.list);
  const [initValues, setInitValues] = useState<Partial<CustomerDTO> | null>(
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

  const { data: customerRes } = useCustomerSearchQuery({
    page: {
      pageNum: Number(current),
      pageSize: Number(pageSize),
    },
    order: sort,
    ...destructCustomerData(filters, true),
  });

  const handleCloseForm = () => {
    setDrawerMode(false);
    setIsViewMode(false);
    setTimeout(() => {
      setDrawerWidth(DRAWER_WIDTH.list);
    }, 100);
  };

  const handleReset = () => {
    handleCloseForm();
    setInitValues(null);
  };

  const { mutate: mutationCreateCustomer } = useCustomerAddMutation();
  const { mutate: mutationUpdateCustomer } = useCustomerEditMutation();
  const { mutate: mutationDeleteCustomer } = useCustomerRemoveMutation();

  const handleOpenDrawer = () => {
    setDrawerWidth(DRAWER_WIDTH.list);
    setDrawerMode('list');
  };

  const handleCreate = ({ categoryId, categoryName }: CustomerDTO) => {
    setInitValues({
      ...destructCustomerData({}),
      categoryId,
      categoryName,
    });
    handleOpenDrawer();
  };

  const handleEdit = (data: TCustomerRecord) => {
    setInitValues({
      ...data,
    });
    handleOpenDrawer();
  };

  const handleSearch = (obj: object) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters(obj);
  };
  const handlePaginationChange = (data: TPagination) => {
    setPagination(data);
  };
  const handleSubmitInsert = (
    data: Partial<CustomerDTO>,
    form: FormInstance,
  ) => {
    const dData = destructCustomerData(data);
    // update customer group
    if (initValues?.id) {
      mutationUpdateCustomer(
        { ...dData, id: initValues.id },
        {
          onSuccess: (d) => validateInsertCustomer(d, form, handleReset),
        },
      );
      return;
    }
    // create new customer group
    mutationCreateCustomer(dData, {
      onSuccess: (d) => validateInsertCustomer(d, form, handleReset),
    });
  };

  const handleSubmitInsertCustomerGroup = () => {};

  const handleDelete = (id: string) => {
    mutationDeleteCustomer({ id });
  };

  const paginations: IMPagination = {
    pagination: {
      current,
      pageSize,
      total: customerRes?.data?.total ?? 1,
    },
    setPagination: handlePaginationChange,
    optionPageSize: [10, 20, 50, 100],
    className: 'flex-end',
  };

  const dataSources: TCustomerRecord[] =
    useMemo(
      () =>
        customerRes?.data?.content?.map((i) => ({
          ...i,
          key: i.id as string,
        })),
      [customerRes],
    ) ?? [];

  const handleClearAll = () => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters({ code: undefined, name: undefined });
  };

  const handleView = (id: string) => {
    const item = customerRes?.data.content.find((i) => i.id === id);
    if (item) {
      setIsViewMode(true);
      setInitValues({
        ...item,
      });
      handleOpenDrawer();
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
    if (drawerMode === 'group') return 'Tạo mới nhóm khách hàng';
    const title = '$ khách hàng';
    if (isViewMode) return title.replace('$', 'Chi tiết');
    if (initValues?.id) return title.replace('$', 'Chỉnh sửa');
    return title.replace('$', 'Tạo mới');
  }, [initValues?.id, isViewMode, drawerMode]);

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
          Danh sách khách hàng
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
          <AButton
            variant="filled"
            color="primary"
            icon={<UserGroupIcon />}
            onClick={() => {
              setDrawerMode('group');
              setDrawerWidth(DRAWER_WIDTH.group);
            }}
          >
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
        open={!!drawerMode}
        width={drawerWidth}
        maskClosable={false}
        classNames={{ body: 'pa-0', header: 'py-22 px-40 fs-16 fw-500' }}
      >
        {drawerWidth === DRAWER_WIDTH.group ? (
          <CustomerGroupForm
            onClose={handleCloseForm}
            initialValues={initValues}
            onSubmit={handleSubmitInsertCustomerGroup}
          />
        ) : (
          <CustomerForm
            isViewMode={isViewMode}
            onClose={handleCloseForm}
            initialValues={initValues}
            onSubmit={handleSubmitInsert}
          />
        )}
      </Drawer>
    </div>
  );
};

export default ListCustomerPage;
