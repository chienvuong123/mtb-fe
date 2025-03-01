import type { ScenarioSearchRequest } from '@dtos';
import Title from 'antd/lib/typography/Title';
import { type FC } from 'react';

import type {
  IMPagination,
  TPagination,
} from '@components/molecules/m-pagination/MPagination.type';

import {
  useScenarioRemoveMutation,
  useScenarioSearchQuery,
} from '@hooks/queries';
import useUrlParams from '@hooks/useUrlParams';
import { MOCK_SCENARIOS } from '@mocks/scenario';
import { SCENARIO } from '@routers/path';
import { useNavigate } from 'react-router-dom';
import ScenarioSearchForm from './components/ScenarioSearchForm';
import ScenarioTable, {
  type TScenarioRecord,
} from './components/ScenarioTable';
import './index.scss';

const ScenarioPage: FC = () => {
  const navigate = useNavigate();
  const { filters, setFilters, pagination, setPagination, sort, setSort } =
    useUrlParams<ScenarioSearchRequest>();

  const { data: scenarioList } = useScenarioSearchQuery({
    page: {
      pageSize: pagination.pageSize,
      pageNum: pagination.current - 1,
    },
    order: sort,
    code: filters.code,
    name: filters.name,
  });

  const removeScenarioMutation = useScenarioRemoveMutation();

  const handleCreate = () => {
    navigate(`${SCENARIO.ROOT}/${SCENARIO.CREATE}`);
  };

  const handleEdit = (data: TScenarioRecord) => {
    navigate(`${SCENARIO.ROOT}/${data.id}`);
  };

  const handleSearch = (values: ScenarioSearchRequest) => {
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

  const handleDelete = (id: string) => {
    removeScenarioMutation.mutate({ id });
  };

  const paginationProps: IMPagination = {
    pagination: {
      ...pagination,
      total: scenarioList?.data?.page
        ? scenarioList.data.page * (pagination?.pageSize || 20)
        : 0,
    },
    setPagination: handlePaginationChange,
    optionPageSize: [10, 20, 50, 100],
    className: 'flex-end',
  };

  return (
    <div className="pt-32">
      <Title level={3} className="mb-24">
        Danh sách kịch bản
      </Title>
      <ScenarioSearchForm onCreate={handleCreate} onSearch={handleSearch} />
      <div className="mt-24" />
      <ScenarioTable
        dataSource={scenarioList?.data?.content ?? MOCK_SCENARIOS}
        pagination={paginationProps}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ScenarioPage;
