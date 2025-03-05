import type { ControlDTO, ControlSearchRequest } from '@dtos';
import { Drawer } from 'antd';
import Title from 'antd/lib/typography/Title';
import dayjs from 'dayjs';
import { type FC, useState } from 'react';

import type { IMPagination, TPagination } from '@components/molecules';

import {
  useControlAddMutation,
  useControlEditMutation,
  useControlRemoveMutation,
  useControlSearchQuery,
} from '@hooks/queries';
import useUrlParams from '@hooks/useUrlParams';
import { filterObject } from '@utils/objectHelper';
import ControlInsertForm from './components/ControlInsertForm';
import ControlSearchForm from './components/ControlSearchForm';
import ControlTable, { type TControlRecord } from './components/ControlTable';
import './index.scss';

const SettingControlPage: FC = () => {
  const [showInsertForm, setShowInsertForm] = useState<boolean>(false);
  const [initValues, setInitValues] = useState<Partial<TControlRecord> | null>(
    null,
  );

  const { filters, setFilters, pagination, setPagination, sort, setSort } =
    useUrlParams<ControlSearchRequest>();

  const { data: controlList } = useControlSearchQuery({
    page: {
      pageSize: Number(pagination.pageSize),
      pageNum: Number(pagination.current - 1),
    },
    order: sort,
    ...filterObject(filters),
  });

  const handleCloseForm = () => setShowInsertForm(false);
  const handleReset = () => {
    handleCloseForm();
    setInitValues(null);
  };
  const addControlMutation = useControlAddMutation({}, handleReset);
  const editControlMutation = useControlEditMutation({}, handleReset);
  const removeControlMutation = useControlRemoveMutation({}, handleReset);

  const handleEdit = (data: TControlRecord) => {
    setInitValues(data);
    setShowInsertForm(true);
  };

  const handleSearch = (values: ControlSearchRequest) => {
    setFilters(values);
  };

  const handlePaginationChange = (data: TPagination) => {
    setPagination({
      ...data,
      current: data.pageSize !== pagination.pageSize ? 1 : data.current,
    });

    // This for testing
    setSort({
      field: 'code',
      direction: 'desc',
    });
  };

  const handleSubmitUpsert = ({
    name,
    code,
    status,
    controlType,
    createdBy,
    createdDate,
    updatedBy,
    updatedDate,
  }: ControlDTO) => {
    const data = {
      id: '',
      reqNo: '',
      name,
      code, // insert from client??
      controlType,
      status,
      createdBy, // insert from client??
      createdDate: dayjs(createdDate).toISOString(), // insert from client??
      updatedBy, // insert from client??
      updatedDate: dayjs(updatedDate).toISOString(), // insert from client??
    };
    if (initValues?.id) {
      data.id = initValues.id;
      addControlMutation.mutate(data);
    } else {
      editControlMutation.mutate(data);
    }
  };

  const handleDelete = (id: string) => {
    removeControlMutation.mutate({ id });
  };

  const paginationProps: IMPagination = {
    pagination: {
      ...pagination,
      total: controlList?.data?.page
        ? controlList.data.page * (pagination?.pageSize || 20)
        : 0,
    },
    setPagination: handlePaginationChange,
    optionPageSize: [10, 20, 50, 100],
    className: 'flex-end',
  };

  return (
    <div className="pt-32">
      <Title level={3} className="mb-24">
        Danh mục Control Attribute
      </Title>
      <ControlSearchForm onSearch={handleSearch} />
      <div className="mt-24" />
      <ControlTable
        dataSource={controlList?.data?.content ?? []}
        pagination={paginationProps}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Drawer
        title={`${initValues?.id ? 'Chỉnh sửa' : 'Tạo mới'} danh mục control attribute`}
        onClose={handleCloseForm}
        open={showInsertForm}
        width={1025}
        maskClosable={false}
        classNames={{ body: 'pa-0', header: 'py-22 px-40 fs-16 fw-500' }}
      >
        <ControlInsertForm
          onClose={handleCloseForm}
          initialValues={initValues}
          onSubmit={handleSubmitUpsert}
        />
      </Drawer>
    </div>
  );
};

export default SettingControlPage;
