import React, { useMemo, useState } from 'react';
import { Flex } from 'antd';
import { useStatisticsCampaign } from '@hooks/queries';
import type { IMPagination, TPagination } from '@components/molecules';
import type { TBaseTableSort } from '@types';
import { SORT_ORDER_FOR_SERVER } from '@constants/masterData';
import type {
  DashboardSearchRequest,
  TStatisticsCampaignDTO,
} from 'src/dtos/dashboard';
import useUrlParams from '@hooks/useUrlParams';
import { DashboardTable } from './components';
import DashboardReport from './components/DashboardReport';
import DashboardAreaChart from './areaChart';
import DashboardPieChart from './pieChart';

const DashboardPage: React.FC = () => {
  const [dateRange, setDateRange] = useState<DashboardSearchRequest>({
    startDate: '',
    endDate: '',
  });

  const {
    pagination: { current, pageSize },
    setPagination,
    sort,
    setSort,
  } = useUrlParams<Partial<TStatisticsCampaignDTO>>();

  const searchParams: DashboardSearchRequest = useMemo(
    () => ({
      page: {
        pageNum: Number(current),
        pageSize: Number(pageSize),
      },
      order: sort,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    }),
    [current, pageSize, sort, dateRange],
  );

  const onDateChange = (startDate: string, endDate: string) => {
    setDateRange({ startDate, endDate });
  };

  const { data: statisticsData } = useStatisticsCampaign(searchParams);

  const handleSort = ({ direction, field }: TBaseTableSort) => {
    setPagination((pre) => ({ ...pre, current: 1 }));
    setSort({
      field,
      direction: direction ? SORT_ORDER_FOR_SERVER[direction] : '',
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
      total: statisticsData?.data?.total ?? 1,
    },
    setPagination: handlePaginationChange,
    optionPageSize: [10, 20, 50, 100],
    className: 'flex-end',
  };

  return (
    <div className="mt-40">
      <DashboardReport />
      <div className="mt-24" />
      <Flex justify="space-between">
        <DashboardAreaChart />
        <DashboardPieChart />
      </Flex>
      <div className="mt-24" />
      <DashboardTable
        dataSource={statisticsData?.data?.content || []}
        onDateChange={onDateChange}
        paginations={paginations}
        sortDirection={sort}
        onSort={handleSort}
      />
    </div>
  );
};

export default DashboardPage;
