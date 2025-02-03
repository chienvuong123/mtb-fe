import type {
  CMResponseControlDTO,
  CMResponseControlsDTO,
  ControlDTO,
  ControlUpsertRequest,
  TControlSearchForm,
} from '@dtos';
import {
  createControl,
  deleteControl,
  getControls,
  updateControl,
} from '@services/rq-hooks';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Drawer } from 'antd';
import Title from 'antd/lib/typography/Title';
import dayjs from 'dayjs';
import { type FC, useMemo, useState } from 'react';

import type {
  IMPagination,
  TPagination,
} from '@components/molecules/m-pagination/MPagination.type';
import useUrlParams from '@hooks/useUrlParams';
import ControlInsertForm from './components/ControlInsertForm';
import ControlSearchForm from './components/ControlSearchForm';
import ControlTable, { type TControlRecord } from './components/ControlTable';
import './index.scss';

const SettingControlPage: FC = () => {
  const [showInsertForm, setShowInsertForm] = useState<boolean>(false);
  const [initValues, setInitValues] = useState<Partial<TControlRecord> | null>(
    null,
  );

  const { filters, setFilters, pagination, setPagination } =
    useUrlParams<TControlSearchForm>();

  const { data: controlList, refetch: refetchControlList } =
    useQuery<CMResponseControlsDTO>({
      queryKey: [
        'control/list',
        pagination.current,
        pagination.pageSize,
        filters.code,
        filters.name,
      ],
      queryFn: () =>
        getControls({
          pageNumber: pagination.current - 1,
          pageSize: pagination.pageSize || 10,
          code: filters.code,
          name: filters.name,
        }),
    });

  const handleCloseForm = () => setShowInsertForm(false);

  const handleReset = () => {
    handleCloseForm();
    setInitValues(null);
    refetchControlList();
  };

  const mutationCreateControls = useMutation<
    CMResponseControlDTO,
    Error,
    ControlUpsertRequest
  >({
    mutationFn: (values) => createControl(values),
    onSuccess: handleReset,
    onError: (error) => {
      console.error('Error occurred:', error);
    },
    onSettled: () => {
      console.log('Mutation finished');
    },
  });
  const mutationUpdateControls = useMutation<
    CMResponseControlDTO,
    Error,
    ControlUpsertRequest
  >({
    mutationFn: (values) => updateControl(values),
    onSuccess: handleReset,
    onError: (error) => {
      console.error('Error occurred:', error);
    },
    onSettled: () => {
      console.log('Mutation finished');
    },
  });

  const mutationDeleteControls = useMutation<
    CMResponseControlDTO,
    Error,
    string
  >({
    mutationFn: (values) => deleteControl(values),
    onSuccess: () => {
      refetchControlList();
    },
    onError: (error) => {
      console.error('Error occurred:', error);
    },
    onSettled: () => {
      console.log('Mutation finished');
    },
  });

  const handleCreate = () => {
    setInitValues(null);
    setShowInsertForm(true);
  };

  const handleEdit = (data: TControlRecord) => {
    setInitValues(data);
    setShowInsertForm(true);
  };

  const handleSearch = (values: TControlSearchForm) => {
    setFilters(values);
  };

  const handlePaginationChange = ({ pageSize, current }: TPagination) => {
    setPagination({ pageSize, current });
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
    const data: ControlUpsertRequest = {
      id: '',
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
      mutationUpdateControls.mutate(data);
    } else {
      mutationCreateControls.mutate(data);
    }
  };

  const handleDelete = (id: string) => {
    mutationDeleteControls.mutate(id);
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

  const dataSources: TControlRecord[] =
    useMemo(
      () => controlList?.data?.content?.map((i) => ({ ...i, key: i.id })),
      [controlList],
    ) ?? [];

  return (
    <div className="pt-32">
      <Title level={3} className="mb-24">
        Danh mục Control Attribute
      </Title>
      <ControlSearchForm onSearch={handleSearch} />
      <div className="mt-24" />
      <ControlTable
        dataSource={dataSources}
        pagination={paginationProps}
        onCreate={handleCreate}
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
