import type {
  IMPagination,
  TPagination,
} from '@components/molecules/m-pagination/MPagination.type';
import { ODrawer } from '@components/organisms';
import { EStatus, SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import type { BaseResponse } from '@dtos';
import {
  useAccountManagementSearchQuery,
  useAccountManagementAddMutation,
  useAccountManagementRemoveMutation,
} from '@hooks/queries';
import useUrlParams from '@hooks/useUrlParams';
import type { TBaseTableSort, TFormType } from '@types';

import { validateInsertCategory } from '@pages/category/utils';
import Title from 'antd/lib/typography/Title';
import { useEffect, useMemo, useState } from 'react';
import type { AccountRequest, UserDTO } from 'src/dtos/auth';
import { filterObject } from '@utils/objectHelper';
import { useNotification } from '@libs/antd';
import { useProfile } from '@stores';
import { formatDate } from '@utils/dateHelper';
import { ROUTES } from '@routers/path';
import {
  AccountInsertForm,
  AccountSearchForm,
  AccountTable,
  type TAccountManagementRecord,
} from './components';

const AccountManagementPage = () => {
  const [drawerMode, setDrawerMode] = useState<TFormType>();
  const notify = useNotification();
  const { user } = useProfile();

  const [initialValuesForm, setInitialValuesForm] =
    useState<Partial<TAccountManagementRecord> | null>(null);

  const { pagination, setPagination, sort, setSort, filters, setFilters } =
    useUrlParams<Partial<UserDTO>>();

  const searchParams: AccountRequest = useMemo(
    () => ({
      page: {
        pageNum: Number(pagination.current),
        pageSize: Number(pagination.pageSize),
      },
      order: sort,
      ...filterObject(filters),
    }),
    [sort, filters, pagination],
  );

  // search list account
  const { data: accountManagementRes, isLoading } =
    useAccountManagementSearchQuery(searchParams);

  const handleCloseForm = () => {
    setDrawerMode(undefined);
    setInitialValuesForm(null);
  };

  const handleInvalidate = (data?: BaseResponse<boolean>, message?: string) => {
    if (data)
      validateInsertCategory(data, notify, () => {
        notify({
          message,
          type: 'success',
        });
        handleCloseForm();
        setInitialValuesForm(null);
      });
  };

  const { mutate: mutationCreateAccountManagement } =
    useAccountManagementAddMutation();

  const { mutate: mutationRemoveAccountManagement } =
    useAccountManagementRemoveMutation();

  const handleCreate = () => {
    setInitialValuesForm({
      status: EStatus.ACTIVE,
      createdBy: user?.username,
      updatedBy: user?.username,
      createdDate: formatDate(),
      updatedDate: formatDate(),
    });
    setDrawerMode('add');
  };

  const handleDelete = (id: string) => {
    mutationRemoveAccountManagement(
      { id },
      {
        onSuccess: (resData) =>
          handleInvalidate(resData, 'Xóa tài khoản thành công'),
      },
    );
  };

  const handleEdit = (record: TAccountManagementRecord) => {
    setDrawerMode('edit');
    const userDTO: Partial<UserDTO> = {
      ...record,
      createdBy: record.createdBy,
      createdDate: formatDate(record.createdDate),
      updatedBy: record.updatedBy,
      updatedDate: formatDate(record.updatedDate),
    };
    setInitialValuesForm(userDTO);
  };

  const handleClearAll = () => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters({});
  };

  const handleView = (id: string) => {
    const item = accountManagementRes?.data.content.find((i) => i.id === id);
    if (item) {
      setDrawerMode('view');
      setInitialValuesForm({ ...item });
    }
  };

  const handleSort = ({ field, direction, unicodeSort }: TBaseTableSort) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setSort({
      field,
      direction: direction ? SORT_ORDER_FOR_SERVER[direction] : '',
      unicode: unicodeSort,
    });
  };

  const handleSearch = ({
    employeeCode,
    username,
    fullName,
    email,
    status,
    role,
    position,
    branch,
    department,
  }: UserDTO) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters({
      employeeCode,
      username,
      fullName,
      email,
      status,
      role,
      position,
      branch,
      department,
    });
  };

  const handlePaginationChange = (data: TPagination) => {
    setPagination(data);
  };

  const handleSubmitInsert = ({
    employeeCode,
    username,
    fullName,
    email,
    status,
    role,
    position,
    branch,
    department,
    phoneNum,
    expertise,
    id,
  }: Partial<UserDTO>) => {
    const data: Partial<UserDTO> = {
      employeeCode,
      username,
      fullName,
      email,
      status,
      role,
      position,
      branch,
      department,
      phoneNum,
      expertise,
      id,
    };

    // create new user
    if (drawerMode === 'add') {
      mutationCreateAccountManagement(data, {
        onSuccess: (resData) => handleInvalidate(resData, 'Tạo mới thành công'),
      });
    } else {
      mutationCreateAccountManagement(data, {
        onSuccess: (resData) =>
          handleInvalidate(resData, 'Cập nhật thành công'),
      });
    }
  };

  const paginations: IMPagination = {
    pagination: {
      ...pagination,
      total: accountManagementRes?.data?.total ?? 0,
    },
    setPagination: handlePaginationChange,
    optionPageSize: [10, 20, 50, 100],
    className: 'flex-end',
  };

  useEffect(() => {
    if (
      !isLoading &&
      !accountManagementRes?.data?.content?.length &&
      pagination.current > 1
    ) {
      setPagination((prev) => ({
        ...prev,
        current: prev.current - 1,
        total: accountManagementRes?.data?.total ?? 0,
      }));
    }
  }, [accountManagementRes, setPagination, pagination, isLoading]);

  const { hasPermission } = useProfile();

  return (
    <div className="pt-32 ">
      <Title level={3} className="mb-24 account-management">
        Danh sách tài khoản
      </Title>

      <AccountSearchForm
        onSearch={handleSearch}
        onClearAll={handleClearAll}
        onCreate={
          hasPermission(ROUTES.ACCOUNT.MANAGEMENT.CREATE)
            ? handleCreate
            : undefined
        }
        initialValues={filters as UserDTO}
      />
      <div className="mt-24" />
      <AccountTable
        dataSource={accountManagementRes?.data?.content ?? []}
        paginations={paginations}
        sortDirection={sort}
        onView={handleView}
        onSort={handleSort}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <ODrawer
        usePrefixTitle
        title="tài khoản"
        mode={drawerMode}
        onClose={handleCloseForm}
        open={!!drawerMode}
        width={1025}
      >
        <AccountInsertForm
          key={drawerMode ?? 'view'}
          mode={drawerMode ?? 'view'}
          initialValues={initialValuesForm as UserDTO}
          onClose={handleCloseForm}
          onSubmit={handleSubmitInsert}
        />
      </ODrawer>
    </div>
  );
};

export default AccountManagementPage;
