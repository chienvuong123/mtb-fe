import React, { useMemo, useState } from 'react';
import Title from 'antd/lib/typography/Title';
import useUrlParams from '@hooks/useUrlParams';
import { SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import { ODrawer } from '@components/organisms';
import type { SortOrder } from 'antd/es/table/interface';
import type {
  IMPagination,
  TPagination,
} from '@components/molecules/m-pagination/MPagination.type';
import { downloadFileByGetMethod, filterObject } from '@utils/objectHelper';
import {
  useCategoryExport,
  useManageCategoryAddMutation,
  useManageCategoryEditMutation,
  useManageCategorySearchQuery,
  useManagerCategoryRemoveMutation,
} from '@hooks/queries/manageCategoryQueries';
import type { TCampaignSearchForm } from 'src/dtos/campaign';
import { useNavigate } from 'react-router-dom';
import { MANAGER_CAMPAIGN } from '@routers/path';
import { Flex, type NotificationArgsProps } from 'antd';
import { AButton } from '@components/atoms';
import { useForm } from 'antd/lib/form/Form';
import { ExportIcon } from '@assets/icons';
import { dayjsToString } from '@utils/dateHelper';
import type {
  ManageCategorySearchRequest,
  ManagerCategoryDTO,
} from 'src/dtos/manage-category';
import { useNotification } from '@libs/antd';
import type { TFormType } from '@types';
import { DATE_SLASH_FORMAT_DDMMYYYY } from '@constants/dateFormat';
import dayjs from 'dayjs';
import { validationHelper } from '@utils/validationHelper';
import type { TCategoryTableRecord } from './components/CategoryTable';
import CategoryTable from './components/CategoryTable';
import CategorySearch from './components/CategorySearch';
import './index.scss';
import CategoryInsert from './components/CategoryInsert';
import type { TCategoryDetaillRecord } from '../category-detail/components/CategoryDetailTable';

const ManageCategoryPage: React.FC = () => {
  const [drawerMode, setDrawerMode] = useState<TFormType>();
  const [initialValuesForm, setInitialValuesForm] =
    useState<Partial<TCategoryDetaillRecord> | null>(null);
  const {
    pagination: { current, pageSize },
    setPagination,
    sort,
    setSort,
    filters,
    setFilters,
  } = useUrlParams<Partial<ManagerCategoryDTO>>();

  const navigate = useNavigate();
  const notify = useNotification();
  const [form] = useForm();

  const searchParams: ManageCategorySearchRequest = useMemo(
    () => ({
      page: {
        pageNum: Number(current),
        pageSize: Number(pageSize),
      },
      order: sort,
      ...filterObject(filters),
      startDate: dayjsToString(filters?.startDate),
      endDate: dayjsToString(filters?.endDate),
    }),
    [current, pageSize, sort, filters],
  );

  const { data: manageCategoryRes } =
    useManageCategorySearchQuery(searchParams);

  const handleReset = ({ message, type }: NotificationArgsProps) => {
    form.resetFields();
    notify({ message, type });
  };

  const { mutate: mutationCreateCategory } = useManageCategoryAddMutation();
  const { mutate: mutationUpdateCategory } = useManageCategoryEditMutation();
  const { mutate: mutationDeleteCategory } = useManagerCategoryRemoveMutation();
  const { refetch: categoryExport } = useCategoryExport(searchParams);

  const handleCloseForm = () => {
    setDrawerMode(undefined);
    setInitialValuesForm(null);
  };

  const handleSubmitInsert = async () => {
    const values = await form.validateFields();

    const data: Partial<ManagerCategoryDTO> = {
      name: values.name,
      customer: values.customer,
      deploymentMethod: values.deploymentMethod,
      mainProduct: values.mainProduct,
      subProduct: values.subProduct,
      note: values.note,
      scope: values.scope,
      status: values.status,
      startDate: dayjs(values.startDate).format(DATE_SLASH_FORMAT_DDMMYYYY),
      endDate: dayjs(values.endDate).format(DATE_SLASH_FORMAT_DDMMYYYY),
    };

    // update category
    if (initialValuesForm?.id) {
      mutationUpdateCategory(
        { ...data, id: initialValuesForm?.id },
        {
          onSuccess: (d) => {
            validationHelper(d, notify, () => {
              handleReset({
                type: 'success',
                message: 'Thay đổi thành công',
              });
              handleCloseForm();
            });
          },
        },
      );
      return;
    }

    // create new category
    mutationCreateCategory(data, {
      onSuccess: (d) => {
        validationHelper(d, notify, () => {
          handleReset({
            type: 'success',
            message: 'Tạo mới thành công',
          });
          handleCloseForm();
        });
      },
    });
  };

  const handleCreate = () => {
    setDrawerMode('add');
  };

  const handleEdit = (data: TCategoryTableRecord) => {
    setInitialValuesForm(data);
    setDrawerMode('edit');
  };

  const handleSearch = (searchObject: TCampaignSearchForm) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters(searchObject);
  };

  const handlePaginationChange = (data: TPagination) => {
    setPagination({
      ...data,
      current: data.pageSize !== pageSize ? 1 : data.current,
    });
  };

  const handleDelete = (id: string) => {
    mutationDeleteCategory(
      { id },
      {
        onSuccess: () => {
          notify({
            message: 'Xoá thành công',
            type: 'success',
          });
        },
      },
    );
  };

  const paginations: IMPagination = {
    pagination: {
      current,
      pageSize,
      total: manageCategoryRes?.data?.total ?? 1,
    },
    setPagination: handlePaginationChange,
    optionPageSize: [10, 20, 50, 100],
    className: 'flex-end',
  };

  const handleClearAll = () => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setFilters({ code: undefined, name: undefined });
  };

  const handleView = (id: string) => {
    const item = manageCategoryRes?.data.content.find((i) => i.id === id);
    if (item) {
      navigate(
        `/${MANAGER_CAMPAIGN.ROOT}/${MANAGER_CAMPAIGN.CATEGORY_DETAIL}/${id}?isView=${true}`,
      );
    }
  };

  const handleSort = (field: string, direction: SortOrder) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setSort({
      field,
      direction: direction ? SORT_ORDER_FOR_SERVER[direction] : '',
    });
  };

  return (
    <div className="pt-32">
      <Flex justify="space-between" className="mb-14">
        <Title level={3} className="mb-0">
          Danh sách Category
        </Title>
        <Flex gap={16}>
          <AButton
            variant="filled"
            color="primary"
            icon={<ExportIcon />}
            onClick={() =>
              downloadFileByGetMethod(categoryExport, 'catgory-campaign.xlsx')
            }
          >
            Export
          </AButton>
        </Flex>
      </Flex>
      <CategorySearch
        onSearch={handleSearch}
        onClearAll={handleClearAll}
        onCreate={handleCreate}
      />
      <div className="mb-24" />
      <CategoryTable
        dataSource={manageCategoryRes?.data?.content ?? []}
        paginations={paginations}
        sortDirection={sort}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onSort={handleSort}
      />
      <ODrawer
        usePrefixTitle
        title="category"
        mode={drawerMode}
        onClose={handleCloseForm}
        open={!!drawerMode}
        width={1025}
      >
        <CategoryInsert
          key={drawerMode ?? 'view'}
          mode={drawerMode === 'view' ? 'view' : 'add'}
          initialValues={initialValuesForm}
          onClose={handleCloseForm}
          onSubmit={handleSubmitInsert}
          isDisabled={false}
          form={form}
        />
      </ODrawer>
    </div>
  );
};

export default ManageCategoryPage;
