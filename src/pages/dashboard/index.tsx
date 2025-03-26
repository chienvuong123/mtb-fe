import React, { useState } from 'react';
import { Flex } from 'antd';
import { useStatisticsCampaign } from '@hooks/queries/dashboardQueries';
import type { DashboardSearchRequest } from 'src/dtos/dashboard';
import { DashboardTable } from './components';
import DashboardReport from './components/DashboardReport';
import DashboardAreaChart from './areaChart';
import DashboardPieChart from './pieChart';

const DashboardPage: React.FC = () => {
  const [dateRange, setDateRange] = useState<DashboardSearchRequest>({
    startDate: '',
    endDate: '',
  });

  const onDateChange = (startDate: string, endDate: string) => {
    setDateRange({ startDate, endDate });
  };

  const { data: statisticsData } = useStatisticsCampaign({
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
  });

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
        dataSource={statisticsData?.data || []}
        onDateChange={onDateChange}
      />
    </div>
  );
};

export default DashboardPage;
