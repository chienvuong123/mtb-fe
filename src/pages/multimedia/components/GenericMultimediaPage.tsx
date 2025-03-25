import Title from 'antd/es/typography/Title';
import type { EMediaType, MultimediaDTO } from '@dtos';
import { useUrlParams } from '@hooks/index';
import { useEffect, useMemo, useState, type FC } from 'react';
import type { IMPagination, TPagination } from '@components/molecules';
import { ODrawer } from '@components/organisms';
import type { TBaseTableSort, TFormType } from '@types';
import { SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import {
  useMultimediaAddMutation,
  useMultimediaEditMutation,
  useMultimediaRemoveMutation,
  useMultimediaResourceQuery,
  useMultimediaSearchQuery,
  useMultimediaViewQuery,
} from '@hooks/queries/multimediaQueries';
import { useProfile } from '@stores';
import dayjs from 'dayjs';
import { DATE_SLASH_FORMAT_DDMMYYYY } from '@constants/dateFormat';
import { useNotification } from '@libs/antd';
import { validationHelper } from '@utils/validationHelper';
import type { FormInstance } from 'antd';
import {
  GenericMultimediaForm,
  GenericMultimediaSearchForm,
  GenericMultimediaTable,
} from '.';

interface IMultimediaPage {
  mediaType: EMediaType;
  title: string;
}

const MultimediaPage: FC<IMultimediaPage> = ({ title, mediaType }) => {
  const [drawerMode, setDrawerMode] = useState<TFormType>();
  const [initValuesInsertForm, setInitValuesInsertForm] =
    useState<Partial<MultimediaDTO>>();
  const { user } = useProfile();
  const [multimediaId, setMultimediaId] = useState<string>();

  const notify = useNotification();

  const {
    pagination: { current, pageSize },
    setPagination,
    sort,
    setSort,
    filters,
    setFilters,
  } = useUrlParams<Partial<MultimediaDTO>>();

  const {
    data: multimediaRes,
    refetch: refetchMultimedia,
    isLoading,
  } = useMultimediaSearchQuery({
    type: mediaType,
    page: {
      pageNum: Number(current),
      pageSize: Number(pageSize),
    },
    order: sort,
    ...filters,
  });
  const { data: multimediaViewRes } = useMultimediaViewQuery(
    {
      id: multimediaId as string,
    },
    { enabled: !!multimediaId },
  );
  const { data: src } = useMultimediaResourceQuery(multimediaId as string);

  const { mutate: addMultimedia } = useMultimediaAddMutation();
  const { mutate: editMultimedia } = useMultimediaEditMutation();
  const { mutate: deleteMultimedia } = useMultimediaRemoveMutation();

  const multimediaList = useMemo(
    () => multimediaRes?.data?.content ?? [],
    [multimediaRes],
  );

  const handlePaginationChange = (data: TPagination) => {
    setPagination({
      ...data,
      current: data.pageSize !== pageSize ? 1 : data.current,
    });
  };

  const handleCloseForm = () => {
    setMultimediaId(undefined);
    setDrawerMode(undefined);
  };

  const handleCreate = () => {
    setInitValuesInsertForm({
      createdBy: user?.username,
      createdDate: dayjs().format(DATE_SLASH_FORMAT_DDMMYYYY),
      updatedBy: user?.username,
      updatedDate: dayjs().format(DATE_SLASH_FORMAT_DDMMYYYY),
    });
    setDrawerMode('add');
  };

  const handleSuccess = (form?: FormInstance, isEdit?: boolean) => {
    form?.resetFields();
    handleCloseForm();
    if (current === 1) {
      refetchMultimedia();
    } else {
      setPagination((pre) => ({ ...pre, current: 1 }));
    }
    notify({
      type: 'success',
      message: `${isEdit ? 'Chỉnh sửa' : 'Thêm mới'} thành công`,
    });
  };

  const handleSubmitInsert = (
    { fileUpload, description, ...values }: MultimediaDTO,
    form?: FormInstance<MultimediaDTO>,
  ) => {
    const data = {
      ...values,
      description: description ?? '',
      type: mediaType,
      file: fileUpload?.originFileObj,
    };
    if (initValuesInsertForm?.id) {
      editMultimedia(
        {
          ...data,
          id: initValuesInsertForm.id,
        },
        {
          onSuccess: (d) =>
            validationHelper(d, notify, () => handleSuccess(form, true)),
        },
      );
    } else {
      addMultimedia(data, {
        onSuccess: (d) =>
          validationHelper(d, notify, () => handleSuccess(form)),
      });
    }
  };

  const handleDelete = (id: string) => {
    deleteMultimedia(
      { id },
      {
        onSuccess: (d) =>
          validationHelper(d, notify, () => {
            notify({ message: 'Xoá thành công', type: 'success' });
          }),
      },
    );
  };

  const handleEdit = (values: MultimediaDTO) => {
    setMultimediaId(values.id);
    setDrawerMode('edit');
  };

  const handleView = (id: string) => {
    setMultimediaId(id);
    setDrawerMode('view');
  };

  const handleSort = ({ field, direction }: TBaseTableSort) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setSort({
      field,
      direction: direction ? SORT_ORDER_FOR_SERVER[direction] : '',
    });
  };
  const paginations: IMPagination = {
    pagination: {
      current,
      pageSize,
      total: multimediaRes?.data?.total ?? 0,
    },
    setPagination: handlePaginationChange,
    optionPageSize: [10, 20, 50, 100],
    className: 'flex-end',
  };

  useEffect(() => {
    if (multimediaViewRes) {
      setInitValuesInsertForm({
        ...multimediaViewRes.data,
        ...(drawerMode === 'edit'
          ? {
              updatedBy: user?.username,
              updatedDate: dayjs().format(DATE_SLASH_FORMAT_DDMMYYYY),
            }
          : {}),
      });
    }
  }, [multimediaViewRes, drawerMode, user]);

  useEffect(() => {
    if (!isLoading && !multimediaRes?.data?.content?.length && current > 1) {
      setPagination((prev) => ({
        ...prev,
        current: prev.current - 1,
        total: multimediaRes?.data?.total ?? 1,
      }));
    }
  }, [multimediaRes, setPagination, current, isLoading]);

  return (
    <div className="pt-32">
      <Title level={3} className="mb-24">
        Kho {title}
      </Title>
      <GenericMultimediaSearchForm
        onSearch={(values) => {
          setFilters(values);
        }}
        onClearAll={() => setFilters({})}
        onCreate={handleCreate}
      />
      <div className="mt-24" />
      <GenericMultimediaTable
        title={title}
        dataSource={multimediaList}
        paginations={paginations}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onSort={handleSort}
      />

      <ODrawer
        usePrefixTitle
        title={title}
        mode={drawerMode}
        onClose={handleCloseForm}
        open={!!drawerMode}
        width={1025}
      >
        {drawerMode && (
          <GenericMultimediaForm
            title={title}
            mediaType={mediaType}
            mode={drawerMode}
            onClose={handleCloseForm}
            initialValues={initValuesInsertForm}
            onSubmit={handleSubmitInsert}
            previewSrc={multimediaViewRes?.errorCode === '0' ? src : undefined}
          />
        )}
      </ODrawer>
    </div>
  );
};

export default MultimediaPage;
