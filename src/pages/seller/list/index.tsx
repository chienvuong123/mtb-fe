import { ERole, EStatus, SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import {
  type BaseResponse,
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
  useSellerViewQuery,
} from '@hooks/queries';
import type { TBaseTableSort, TFormType } from '@types';
import { validateInsertCategory } from '@pages/category/utils';
import { useNotification } from '@libs/antd';
import { createNavigatePath } from '@routers/utils';
import { ROUTES } from '@routers/path';
import { formatDate } from '@utils/dateHelper';
import { useProfile } from '@stores';
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

  const [sellerId, setSellerId] = useState<string>('');

  const navigate = useNavigate();
  const notify = useNotification();
  const { user } = useProfile();

  const { data: sellerRes, isLoading } = useSellerSearchQuery({
    page: {
      pageNum: Number(current),
      pageSize: Number(pageSize),
    },
    order: sort,
    ...filterObject(filters),
  });

  const { data: sellerViewRes } = useSellerViewQuery(
    { id: sellerId },
    { enabled: !!sellerId },
  );

  const handleCloseForm = () => {
    setDrawerMode(undefined);
    setInitialValuesForm(null);
    setSellerId('');
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
      createdBy: user?.username,
      updatedBy: user?.username,
      createdDate: formatDate(),
      updatedDate: formatDate(),
      memberMb: false,
    }));
  };

  const handleEdit = (record: Partial<SellerDTO>) => {
    if (record.id) {
      setSellerId(record.id);
      setDrawerMode('edit');
    }
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
    startDate,
    endDate,
    saleManager,
    memberMb,
  }: Partial<UserDTO>) => {
    const data = {
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
      startDate,
      endDate,
      saleManager,
      memberMb,
    } as Partial<SellerDTO>;

    // create new seller
    if (drawerMode === 'add') {
      mutationCreateSeller(data, {
        onSuccess: (resData) => handleInvalidate(resData, 'Tạo mới thành công'),
      });
    } else {
      // update seller
      mutationEditSeller(
        { ...data, id },
        {
          onSuccess: (resData) =>
            handleInvalidate(resData, 'Cập nhật thành công'),
        },
      );
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

  const handleDelete = (id: string) => {
    mutationRemoveSeller(
      { id },
      {
        onSuccess: (resData) =>
          handleInvalidate(resData, 'Xóa Seller thành công'),
      },
    );
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

  useEffect(() => {
    if (sellerViewRes) {
      const { user: seller, id } = sellerViewRes.data ?? {};
      const sellerDTO: Partial<UserDTO> = {
        employeeCode: seller?.employeeCode,
        username: seller?.username,
        fullName: seller.fullName,
        email: seller?.email,
        phoneNum: seller?.phoneNum,
        status: seller?.status,
        role: seller?.role,
        position: seller?.position,
        branch: seller?.branch,
        department: seller?.department,
        expertise: seller?.expertise,
        createdBy: seller?.createdBy,
        createdDate: formatDate(seller?.createdDate),
        updatedBy: seller?.updatedBy,
        updatedDate: formatDate(seller?.updatedDate),
        id,
        startDate: seller?.startDate,
        endDate: seller?.endDate,
        memberMb: seller?.memberMb,
        saleManager: seller?.saleManager,
      };
      setInitialValuesForm(sellerDTO);
    }
  }, [sellerViewRes]);

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
        width={1261}
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
