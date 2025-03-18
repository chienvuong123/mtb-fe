import { ERole, EStatus, SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import {
  type BaseResponse,
  type CreateSellerDTO,
  type SellerDTO,
  type SellerSearchRequest,
  type UserDTO,
} from '@dtos';
import { useEffect, useState, type FC } from 'react';

import type { IMPagination, TPagination } from '@components/molecules';
import useUrlParams from '@hooks/useUrlParams';
import { filterObject } from '@utils/objectHelper';
import { ODrawer, OTitleBlock } from '@components/organisms';
import { useNavigate } from 'react-router-dom';
import {
  useSellerAddMutation,
  useSellerEditMutation,
  useSellerRemoveMutation,
  useSellerSearchQuery,
} from '@hooks/queries';
import type { TBaseTableSort, TFormType } from '@types';
import { validateInsertCategory } from '@pages/category/utils';
import { useNotification } from '@libs/antd';
import { createNavigatePath } from '@routers/utils';
import { ROUTES } from '@routers/path';
import SellerInsertForm from './components/SellerInsertForm';
import { SellerSearchForm, SellerTable } from './components';

const SellerPage: FC = () => {
  const {
    pagination: { current, pageSize },
    setPagination,
    sort,
    setSort,
    filters,
    setFilters,
  } = useUrlParams<Partial<SellerSearchRequest>>();
  const [drawerMode, setDrawerMode] = useState<TFormType>();
  const [initialValuesForm, setInitialValuesForm] =
    useState<Partial<UserDTO> | null>(null);

  const navigate = useNavigate();
  const notify = useNotification();

  const { data: sellerRes, isLoading } = useSellerSearchQuery({
    page: {
      pageNum: Number(current),
      pageSize: Number(pageSize),
    },
    order: sort,
    ...filterObject(filters),
  });

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

  const { mutate: mutationCreateSeller } = useSellerAddMutation();
  const { mutate: mutationEditSeller } = useSellerEditMutation();

  const { mutate: mutationRemoveSeller } = useSellerRemoveMutation();

  const handleCreate = () => {
    setDrawerMode('add');
    setInitialValuesForm((prevValues) => ({
      ...prevValues,
      role: ERole.SELLER,
      status: EStatus.ACTIVE,
    }));
  };

  const handleEdit = (record: Partial<SellerDTO>) => {
    setDrawerMode('edit');
    const userDTO: Partial<UserDTO> = {
      employeeCode: record.user?.employeeCode,
      username: record.user?.username,
      fullName: record.name,
      email: record.user?.email,
      phoneNum: record.user?.phoneNum,
      status: record.user?.status,
      role: record.user?.role,
      position: record.position?.id,
      branch: record.branch?.id,
      department: record.department?.id,
      expertise: record.user?.expertise,
      id: record.id,
    };
    setInitialValuesForm(userDTO);
  };

  const handleSearch = (data: SellerSearchRequest) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters({
      ...data,
      totalCampaign: data?.totalCampaign?.toString(),
    });
  };

  const handlePaginationChange = (data: TPagination) => {
    setPagination({
      ...data,
      current: data.pageSize !== pageSize ? 1 : data.current,
    });
  };

  const paginations: IMPagination = {
    pagination: {
      current,
      pageSize,
      total: sellerRes?.data?.total ?? 1,
    },
    setPagination: handlePaginationChange,
    optionPageSize: [10, 20, 50, 100],
    className: 'flex-end',
  };

  const handleClearAll = () => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters({});
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
    const data: Partial<CreateSellerDTO> = {
      employeeCode,
      username,
      fullName,
      email,
      status: status as EStatus,
      role,
      position,
      branch,
      department,
      phoneNum,
      expertise,
      id,
    };

    // create new seller
    if (drawerMode === 'add') {
      mutationCreateSeller(data as Partial<SellerDTO>, {
        onSuccess: (resData) => handleInvalidate(resData, 'Tạo mới thành công'),
      });
    } else {
      // update seller
      mutationEditSeller(data as Partial<SellerDTO>, {
        onSuccess: (resData) =>
          handleInvalidate(resData, 'Cập nhật thành công'),
      });
    }
  };

  const handleView = (id: string) => {
    navigate(createNavigatePath(ROUTES.SELLER.DETAIL, { id }));
  };

  const handleSort = ({ direction, field, unicodeSort }: TBaseTableSort) => {
    const orderField = Array.isArray(field) ? field.join('.') : field;
    setPagination((pre) => ({ ...pre, current: 1 }));
    setSort({
      field: orderField,
      direction: direction ? SORT_ORDER_FOR_SERVER[direction] : '',
      unicode: unicodeSort,
    });
  };

  useEffect(() => {
    if (!isLoading && !sellerRes?.data?.content?.length && current > 1) {
      setPagination((prev) => ({
        ...prev,
        current: prev.current - 1,
        total: sellerRes?.data?.total ?? 1,
      }));
    }
  }, [sellerRes, setPagination, current, isLoading]);

  const handleDelete = (id: string) => {
    mutationRemoveSeller(
      { id },
      {
        onSuccess: (resData) =>
          handleInvalidate(resData, 'Xóa Seller thành công'),
      },
    );
  };

  return (
    <div className="pt-32 category-product">
      <OTitleBlock
        title="Danh sách Seller"
        showImport={false}
        showExport={false}
        popupProps={{
          modalProps: {
            title: 'Tải lên danh sách Seller',
          },
        }}
      />

      <SellerSearchForm
        onSearch={handleSearch}
        onClearAll={handleClearAll}
        initialValues={filterObject(filters)}
        onCreate={handleCreate}
      />
      <div className="mt-24" />
      <SellerTable
        dataSource={sellerRes?.data?.content ?? []}
        paginations={paginations}
        sortDirection={sort}
        onEdit={handleEdit}
        onView={handleView}
        onSort={handleSort}
        onDelete={handleDelete}
      />
      <ODrawer
        usePrefixTitle
        title="Seller"
        mode={drawerMode}
        onClose={handleCloseForm}
        open={!!drawerMode}
        width={1025}
      >
        <SellerInsertForm
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

export default SellerPage;
