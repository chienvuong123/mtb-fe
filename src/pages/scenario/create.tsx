import Title from 'antd/lib/typography/Title';
import { useMemo, useState, type FC } from 'react';

import type {
  IMPagination,
  TPagination,
} from '@components/molecules/m-pagination/MPagination.type';
import type { AttributeDTO, AttributeSearchRequest } from '@dtos';
import useUrlParams from '@hooks/useUrlParams';
import { Drawer } from 'antd';
import AttributeInsertForm from './components/AttributeInsertForm';
import AttributeTable, {
  type TAttributeRecord,
} from './components/AttributeTable';
import type { TScenarioRecord } from './components/ScenarioTable';
import './index.scss';

const ScenarioCreatePage: FC = () => {
  const [showInsertForm, setShowInsertForm] = useState<boolean>(false);
  const [initValues, setInitValues] = useState<Partial<TScenarioRecord> | null>(
    null,
  );

  const { pagination, setPagination, setSort } =
    useUrlParams<AttributeSearchRequest>();

  const handleCreate = () => {
    setInitValues({});
    setShowInsertForm(true);
  };

  const handlePaginationChange = ({ pageSize, current }: TPagination) => {
    setPagination({ pageSize, current });

    // This for testing
    setSort({
      field: 'code',
      direction: 'desc',
    });
  };

  const paginationProps: IMPagination = {
    pagination: {
      ...pagination,
      total: initValues?.attributes?.length ?? 0,
    },
    setPagination: handlePaginationChange,
    optionPageSize: [10, 20, 50, 100],
    className: 'flex-end',
  };

  const handleCloseForm = () => setShowInsertForm(false);

  const handleCreateAttribute = (data: AttributeDTO) => {
    console.log(data);
  };

  const dataSources: TAttributeRecord[] =
    useMemo(
      () =>
        (initValues?.attributes || []).map((i: AttributeDTO) => ({
          ...i,
          key: i.id,
        })),
      [initValues?.attributes],
    ) ?? [];

  const handleEdit = (data: TAttributeRecord) => {
    console.log(data);
  };
  const handleDelete = (id: string) => {
    console.log(id);
  };

  return (
    <div className="pt-32">
      <Title level={3} className="mb-24">
        Tạo mới kịch bản
      </Title>
      <div className="mt-24" />
      <AttributeTable
        dataSource={dataSources}
        pagination={paginationProps}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Drawer
        title={`${initValues?.id ? 'Chỉnh sửa' : 'Tạo mới'} Attribute`}
        onClose={handleCloseForm}
        open={showInsertForm}
        width={1025}
        maskClosable={false}
        classNames={{ body: 'pa-0', header: 'py-22 px-40 fs-16 fw-500' }}
      >
        <AttributeInsertForm
          onClose={handleCloseForm}
          initialValues={initValues}
          onSubmit={handleCreateAttribute}
        />
      </Drawer>
    </div>
  );
};

export default ScenarioCreatePage;
