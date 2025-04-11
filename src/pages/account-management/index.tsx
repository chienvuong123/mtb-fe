import type {
  IMPagination,
  TPagination,
} from '@components/molecules/m-pagination/MPagination.type';
import { ODrawer } from '@components/organisms';
import { EStatus, SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import type { BaseResponse, AccountRequest, UserDTO } from '@dtos';
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

  const { pagination, sort, filters, setFilters, handleResetFilters } =
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
      memberMb: true,
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
      saleManager: record?.sellerDtl?.sellerManager?.id,
    };
    setInitialValuesForm(userDTO);
  };

  const handleView = (_id: string, record?: Partial<UserDTO>) => {
    setDrawerMode('view');
    setInitialValuesForm({
      ...record,
      position: record?.positionDtl?.name,
      department: record?.departmentDtl?.name,
      branch: record?.branchDtl?.name,
      saleManager: record?.sellerDtl?.sellerManager?.name,
    });
  };

  const handleSort = ({ field, direction, unicodeSort }: TBaseTableSort) => {
    setFilters({
      field,
      direction: direction ? SORT_ORDER_FOR_SERVER[direction] : '',
      unicode: unicodeSort,
      current: 1,
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
      current: 1,
    });
  };

  const handlePaginationChange = (data: TPagination) => {
    setFilters(data);
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
    startDate,
    endDate,
    saleManager,
    memberMb,
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
      startDate,
      endDate,
      saleManager,
      memberMb,
    };

    // create new user
    if (drawerMode === 'add') {
      mutationCreateAccountManagement(data, {
        onSuccess: (resData) => handleInvalidate(resData, 'Tạo mới thành công'),
      });
    } else {
      mutationCreateAccountManagement(
        { ...data, id },
        {
          onSuccess: (resData) =>
            handleInvalidate(resData, 'Cập nhật thành công'),
        },
      );
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
      setFilters({
        current: pagination.current - 1,
      });
    }
  }, [accountManagementRes, setFilters, pagination, isLoading]);

  const { hasPermission } = useProfile();

  return (
    <div className="pt-32 ">
      <Title level={3} className="mb-24 account-management">
        Danh sách tài khoản
      </Title>

      <AccountSearchForm
        onSearch={handleSearch}
        onClearAll={handleResetFilters}
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
        width={1261}
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
