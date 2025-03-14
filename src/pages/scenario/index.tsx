import type { ScenarioSearchRequest } from '@dtos';
import Title from 'antd/lib/typography/Title';
import { type FC } from 'react';

import type { IMPagination, TPagination } from '@components/molecules';

import {
  useApproachScriptRemoveMutation,
  useApproachScriptSearchQuery,
} from '@hooks/queries';
import { EStatus, SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import useUrlParams from '@hooks/useUrlParams';
import { SCENARIO } from '@routers/path';
import { useNavigate } from 'react-router-dom';
import { filterObject } from '@utils/objectHelper';
import { useNotification } from '@libs/antd';
import { validationHelper } from '@utils/validationHelper';
import type { TBaseTableSort } from '@types';
import ScenarioSearchForm from './components/ScenarioSearchForm';
import ScenarioTable, {
  type TScenarioRecord,
} from './components/ScenarioTable';
import './index.scss';

const ScenarioPage: FC = () => {
  const navigate = useNavigate();
  const { filters, setFilters, pagination, setPagination, sort, setSort } =
    useUrlParams<ScenarioSearchRequest>();

  const notify = useNotification();

  const { data: scenarioList } = useApproachScriptSearchQuery({
    page: {
      pageSize: Number(pagination.pageSize),
      pageNum: Number(pagination.current),
    },
    order: sort,
    ...filterObject(filters),
  });

  const { mutate: removeScenarioMutation } = useApproachScriptRemoveMutation();

  const handleCreate = () => {
    navigate(`${SCENARIO.ROOT}/${SCENARIO.CREATE}`);
  };

  const handleEdit = (data: TScenarioRecord) => {
    navigate(`${SCENARIO.ROOT}/edit/${data.id}`);
  };

  const handleSearch = ({ status, ...values }: ScenarioSearchRequest) => {
    setFilters({
      ...values,
      status: status === EStatus.ALL ? undefined : status,
    });
  };

  const handlePaginationChange = (data: TPagination) => {
    setPagination({
      ...data,
      current: data.pageSize !== pagination.pageSize ? 1 : data.current,
    });
  };

  const handleDelete = (id: string) => {
    removeScenarioMutation(
      { id },
      {
        onSuccess: (data) =>
          validationHelper(data, notify, () => {
            notify({ message: 'Xoá thành công', type: 'success' });
          }),
      },
    );
  };

  const handleClearAll = () => {
    setFilters({});
  };

  const handleView = (id: string) => {
    navigate(`${SCENARIO.ROOT}/${id}`);
  };

  const handleSort = ({ field, direction }: TBaseTableSort) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setSort({
      field,
      direction: direction ? SORT_ORDER_FOR_SERVER[direction] : '',
    });
  };

  const paginationProps: IMPagination = {
    pagination: {
      ...pagination,
      total: scenarioList?.data?.total ?? 1,
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
      <ScenarioSearchForm
        onCreate={handleCreate}
        onSearch={handleSearch}
        onClearAll={handleClearAll}
      />
      <div className="mt-24" />
      <ScenarioTable
        dataSource={scenarioList?.data?.content ?? []}
        paginations={paginationProps}
        sortDirection={sort}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onSort={handleSort}
      />
    </div>
  );
};

export default ScenarioPage;
