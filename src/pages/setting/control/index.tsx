import type { BaseResponse, ControlDTO, ControlSearchRequest } from '@dtos';
import Title from 'antd/lib/typography/Title';
import { type FC, useEffect, useState } from 'react';

import type { IMPagination, TPagination } from '@components/molecules';

import {
  useControlAddMutation,
  useControlEditMutation,
  useControlRemoveMutation,
  useControlSearchQuery,
} from '@hooks/queries';
import useUrlParams from '@hooks/useUrlParams';
import { filterObject } from '@utils/objectHelper';
import type { TFormType } from '@types';
import { useNotification } from '@libs/antd';
import { validationHelper } from '@utils/validationHelper';
import { ODrawer } from '@components/organisms';
import ControlInsertForm from './components/ControlInsertForm';
import ControlSearchForm from './components/ControlSearchForm';
import ControlTable from './components/ControlTable';
import './index.scss';

const SettingControlPage: FC = () => {
  const [initValues, setInitValues] = useState<Partial<ControlDTO> | null>(
    null,
  );
  const [drawerMode, setDrawerMode] = useState<TFormType>();

  const notify = useNotification();

  const {
    pagination: { current, pageSize },
    setPagination,
    sort,
    filters,
    setFilters,
  } = useUrlParams<ControlSearchRequest>();

  const { data: controlList, isLoading } = useControlSearchQuery({
    page: {
      pageNum: current,
      pageSize,
    },
    order: sort,
    ...filterObject(filters),
  });

  const { mutate: addMutate } = useControlAddMutation();
  const { mutate: editMutate } = useControlEditMutation();
  const { mutate: removeMutate } = useControlRemoveMutation({});

  const handleCloseForm = () => {
    setDrawerMode(undefined);
  };

  const handleInvalidate = (
    d?: BaseResponse<boolean>,
    mode: 'create' | 'edit' | 'remove' = 'create',
  ) => {
    const title = {
      create: 'Tạo mới',
      edit: 'Chỉnh sửa',
      remove: 'Xóa',
    };
    if (d)
      validationHelper(d, notify, () => {
        notify({
          message: `${title[mode]} thành công`,
          type: 'success',
        });
        handleCloseForm();
        setInitValues(null);
      });
  };

  const handleCreate = () => {
    setInitValues(null);
    setDrawerMode('add');
  };

  const handleEdit = (data: ControlDTO) => {
    setInitValues(data);
    setDrawerMode('edit');
  };

  const handleView = (id: string) => {
    const control = controlList?.data?.content?.find((c) => c.id === id);
    if (control) {
      setInitValues(control);
      setDrawerMode('view');
    }
  };

  const handleSearch = (values: ControlSearchRequest) => {
    setFilters(values);
  };

  const handlePaginationChange = (paginationData: TPagination) => {
    setPagination({
      ...paginationData,
      current:
        paginationData.pageSize !== pageSize ? 1 : paginationData.current,
    });
  };

  const handleSubmitUpsert = ({ name, type }: ControlDTO) => {
    const data = {
      id: '',
      name,
      type,
    };
    if (initValues?.id) {
      data.id = initValues.id;
      editMutate(data, {
        onSuccess: (resData) => handleInvalidate(resData, 'edit'),
      });
    } else {
      addMutate(data, {
        onSuccess: (resData) => handleInvalidate(resData, 'create'),
      });
    }
  };

  const handleDelete = (id: string) => {
    removeMutate(
      { id },
      {
        onSuccess: (resData) => handleInvalidate(resData, 'remove'),
      },
    );
  };

  const paginationProps: IMPagination = {
    pagination: {
      current,
      pageSize,
      total: controlList?.data?.total || 0,
    },
    setPagination: handlePaginationChange,
    optionPageSize: [10, 20, 50, 100],
    className: 'flex-end',
  };

  useEffect(() => {
    if (!isLoading && !controlList?.data?.content?.length && current > 1) {
      setPagination((prev) => ({
        ...prev,
        current: prev.current - 1,
        total: controlList?.data?.total ?? 1,
      }));
    }
  }, [controlList, setPagination, current, isLoading]);

  return (
    <div className="pt-32">
      <Title level={3} className="mb-24">
        Danh mục Control Attribute
      </Title>
      <ControlSearchForm onSearch={handleSearch} onCreate={handleCreate} />
      <div className="mt-24" />
      <ControlTable
        paginations={paginationProps}
        dataSource={controlList?.data?.content ?? []}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />

      <ODrawer
        usePrefixTitle
        title="danh mục control attribute"
        mode={drawerMode}
        onClose={handleCloseForm}
        open={!!drawerMode}
        width={1025}
        maskClosable={false}
        classNames={{ body: 'pa-0', header: 'py-22 px-40 fs-16 fw-500' }}
      >
        <ControlInsertForm
          onClose={handleCloseForm}
          initialValues={initValues}
          onSubmit={handleSubmitUpsert}
          mode={drawerMode}
        />
      </ODrawer>
    </div>
  );
};

export default SettingControlPage;
