import { SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import {
  type CustomerDTO,
  type CustomerSearchRequest,
  type GroupCustomerDTO,
} from '@dtos';
import { type NotificationArgsProps, type UploadFile } from 'antd';
import { type FC, type SetStateAction, useMemo, useState } from 'react';

import { UserGroupIcon } from '@assets/icons';
import { AButton } from '@components/atoms';
import type { IMPagination, TPagination } from '@components/molecules';
import {
  useCustomerAddMutation,
  useCustomerDownloadTemplete,
  useCustomerEditMutation,
  useCustomerExport,
  useCustomerImportMutation,
  useCustomerRemoveMutation,
  useCustomerSearchQuery,
  useGroupCustomerAddMutation,
} from '@hooks/queries';
import useUrlParams from '@hooks/useUrlParams';
import { filterObject } from '@utils/objectHelper';

import { ODrawer, OTitleBlock } from '@components/organisms';
import type { SortOrder } from 'antd/es/table/interface';
import { downloadBase64File } from '@utils/fileHelper';
import { useProfile } from '@stores';
import { useNotification } from '@libs/antd';
import { CUSTOMER } from '@routers/path';
import { useNavigate } from 'react-router-dom';
import { validationHelper } from '@utils/validationHelper';
import {
  CustomerForm,
  CustomerListTable,
  CustomerSearchForm,
  CustomerViewForm,
} from './components';
import type { TCustomerSearchForm } from './customer.type';
import {
  destructCustomerData,
  downloadFileByGetMethod,
  stringifyCustomerObj,
} from './customerHelper';
import { GroupCustomerInsertForm } from '../group-customer/components';

type TDrawerMode = 'group' | 'list' | false;

const DRAWER_WIDTH = {
  group: 1025,
  list: 1643,
};

let abortController = new AbortController();

const ListCustomerPage: FC = () => {
  const [drawerMode, setDrawerMode] = useState<TDrawerMode>(false);
  const [drawerWidth, setDrawerWidth] = useState<number>(DRAWER_WIDTH.list);
  const [initValues, setInitValues] = useState<CustomerDTO | null>(null);
  const notify = useNotification();
  const navigate = useNavigate();

  const {
    pagination: { current, pageSize },
    setPagination,
    sort,
    setSort,
    filters,
    setFilters,
  } = useUrlParams<Partial<CustomerDTO>>();

  const [isViewMode, setIsViewMode] = useState(false);
  const { isAdmin, isCampaignManager, isSaleManager } = useProfile();

  const searchParams: CustomerSearchRequest = useMemo(
    () => ({
      page: {
        pageNum: Number(current),
        pageSize: Number(pageSize),
      },
      order: sort,
      ...filterObject(destructCustomerData(filters, true)),
    }),
    [current, pageSize, sort, filters],
  );

  const { data: customerRes, refetch: refetchCustomer } =
    useCustomerSearchQuery(searchParams);

  const handleCloseForm = () => {
    setDrawerMode(false);
    setIsViewMode(false);
    setTimeout(() => {
      setDrawerWidth(DRAWER_WIDTH.list);
    }, 100);
  };

  const handleReset = ({ message, type }: NotificationArgsProps) => {
    notify({ message, type });
    handleCloseForm();
    setInitValues(null);
  };

  const { mutate: mutationCreateCustomer } = useCustomerAddMutation();
  const { mutate: mutationUpdateCustomer } = useCustomerEditMutation();
  const { mutate: mutationDeleteCustomer } = useCustomerRemoveMutation();
  const { mutate: mutationImportCustomer, isPending: importCustomerLoading } =
    useCustomerImportMutation();
  const { refetch: downloadTemplate } = useCustomerDownloadTemplete();
  const { refetch: customerExport } = useCustomerExport({
    ...searchParams,
    page: {
      pageNum: 1,
      pageSize: customerRes?.data?.total ?? pageSize,
    },
  });
  const { mutate: mutationCreateGroupCustomer } = useGroupCustomerAddMutation();

  const cancelImport = () => {
    abortController?.abort();
  };

  const handleOpenDrawer = () => {
    setDrawerWidth(DRAWER_WIDTH.list);
    setDrawerMode('list');
  };

  const handleCreate = () => {
    setInitValues({
      ...destructCustomerData({}),
    } as CustomerDTO);
    handleOpenDrawer();
  };

  const handleEdit = (data: CustomerDTO) => {
    setInitValues({
      ...destructCustomerData({}), // reset fields
      ...data,
    });
    handleOpenDrawer();
  };

  const handleSearch = (values: Partial<TCustomerSearchForm>) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters(filterObject(stringifyCustomerObj(values)));
  };
  const handlePaginationChange = (data: TPagination) => {
    setPagination({
      ...data,
      current: data.pageSize !== pageSize ? 1 : data.current,
    });
  };
  const handleSubmitInsert = (data: CustomerDTO) => {
    const dData = destructCustomerData(data);
    // update customer
    if (initValues?.id) {
      mutationUpdateCustomer(
        { ...dData, id: initValues.id },
        {
          onSuccess: (d) =>
            validationHelper(d, notify, () =>
              handleReset({
                type: 'success',
                message: 'Cập nhật thông tin thành công',
              }),
            ),
        },
      );
      return;
    }
    // create new customer
    mutationCreateCustomer(dData, {
      onSuccess: (d) =>
        validationHelper(d, notify, () =>
          handleReset({
            type: 'success',
            message: 'Tạo mới thành công',
          }),
        ),
    });
  };

  const handleSubmitInsertCustomerGroup = (
    values: Partial<GroupCustomerDTO>,
  ) => {
    mutationCreateGroupCustomer(values, {
      onSuccess: (d) =>
        validationHelper(d, notify, () =>
          handleReset({
            type: 'success',
            message: 'Tạo mới thành công',
          }),
        ),
    });
  };

  const handleDelete = (id: string) => {
    mutationDeleteCustomer(
      { id },
      {
        onSuccess: () => {
          notify({
            message: 'Xoá khách hàng thành công',
            type: 'success',
          });
        },
      },
    );
  };

  const handleImportCustomer = (
    file: UploadFile[],
    setProgressPercent?: React.Dispatch<SetStateAction<number>>,
    setError?: React.Dispatch<SetStateAction<boolean | string>>,
    resetPopup?: () => void,
    resetField?: () => void,
  ) => {
    abortController = new AbortController();
    if (file?.[0]?.originFileObj) {
      mutationImportCustomer(
        {
          file: file[0]?.originFileObj,
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1),
            );
            setProgressPercent?.(percent);
          },
          signal: abortController.signal,
        },
        {
          onSuccess: (d) => {
            validationHelper(d, notify, () => {
              resetField?.();
              notify({
                message: 'Import thành công',
                type: 'success',
              });
              resetPopup?.();
              if (current !== 1) {
                setPagination((pre) => ({ ...pre, current: 1 }));
              } else {
                refetchCustomer();
              }
            });
            if (d?.errorCode === 'CUS0009') {
              downloadBase64File(d.data as string, 'DSKH_error.xlsx');
            }
          },
          onError: () => {
            setError?.(true);
            setProgressPercent?.(0);
          },
        },
      );
    }
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

  const handleClearAll = () => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters({});
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

  const handleCall = (record: CustomerDTO) => {
    navigate(`${CUSTOMER.ROOT}/${record.id}`);
  };

  const handleSort = (field: string, direction: SortOrder) => {
    const orderField = Array.isArray(field) ? field.join('.') : field;

    setPagination((pre) => ({ ...pre, current: 1 }));
    setSort({
      field: orderField,
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

  const getFormContent = () => {
    const props = { initialValues: initValues, onClose: handleCloseForm };
    if (drawerWidth === DRAWER_WIDTH.group)
      return (
        <GroupCustomerInsertForm
          mode="add"
          onSubmit={handleSubmitInsertCustomerGroup}
          onClose={handleCloseForm}
        />
      );
    if (isViewMode) return <CustomerViewForm {...props} />;
    return (
      <CustomerForm
        {...props}
        mode={initValues?.id ? 'edit' : 'add'}
        onSubmit={handleSubmitInsert}
      />
    );
  };

  return (
    <div className="pt-32">
      <OTitleBlock
        title="Danh sách khách hàng"
        showImport={isAdmin || isCampaignManager}
        onExport={() => downloadFileByGetMethod(customerExport, 'DSKH.xlsx')}
        onImport={handleImportCustomer}
        onDownloadEg={() =>
          downloadFileByGetMethod(downloadTemplate, 'DSKH_Template.xlsx')
        }
        popupProps={{
          disabled: importCustomerLoading,
          modalProps: {
            title: 'Tải lên danh sách khách hàng',
          },
          onCancelImport: cancelImport,
        }}
      >
        {(isAdmin || isCampaignManager || isSaleManager) && (
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
        )}
      </OTitleBlock>

      <CustomerSearchForm
        onSearch={handleSearch}
        onClearAll={handleClearAll}
        initialValues={filters as CustomerDTO}
        onCreate={handleCreate}
        // onDeleteAll={() => { TODO: will be implemented in milestone 2
        //   console.log('delete all');
        // }}
      />
      <div className="mt-24" />
      <CustomerListTable
        dataSource={customerRes?.data?.content ?? []}
        paginations={paginations}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onCall={handleCall}
        onSort={handleSort}
      />

      <ODrawer
        title={getDrawerTitle}
        onClose={handleCloseForm}
        open={!!drawerMode}
        width={drawerWidth}
      >
        {getFormContent()}
      </ODrawer>
    </div>
  );
};

export default ListCustomerPage;
