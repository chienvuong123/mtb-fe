import { Flex, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useStatisticsCustomerApproach } from '@hooks/queries/dashboardQueries';
import type { DashboardSearchRequest } from 'src/dtos/dashboard';
import CustomLegendPieChart from './components/CustomeLegendPieChart';
import CustomeTooltipPieChart from './components/CustomeTooltipPieChart';
import './pieChart.scss';
import { DDatePicker } from '../components/date-picker';

const DashboardPieChart: React.FC = () => {
  const [dateRange, setDateRange] = useState<DashboardSearchRequest>({
    startDate: '',
    endDate: '',
  });

  const { Title } = Typography;

  const onDateChange = (startDate: string, endDate: string) => {
    setDateRange({ startDate, endDate });
  };

  const { data: statisticsCustomerApproad } = useStatisticsCustomerApproach({
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
  });

  const chartData = statisticsCustomerApproad?.data
    ? [
        {
          name: 'Chưa liên hệ',
          value: statisticsCustomerApproad.data.notContacted,
          color: '#141ED2',
        },
        {
          name: 'Đang liên hệ',
          value: statisticsCustomerApproad.data.inContact,
          color: '#FCBE2D',
        },
        {
          name: 'Thành công',
          value: statisticsCustomerApproad.data.successful,
          color: '#EB2D4B',
        },
        {
          name: 'Chưa thành công',
          value: statisticsCustomerApproad.data.notSuccessfulYet,
          color: '#31C23F',
        },
        {
          name: 'Không thành công',
          value: statisticsCustomerApproad.data.unSuccessful,
          color: '#EB2DBB',
        },
      ]
    : [];

  const total = chartData.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div className="pieChart container bg-white">
      <Flex justify="space-between" align="center" className="px-20">
        <Space direction="vertical" className="mb-24">
          <Title level={4} style={{ margin: 0 }}>
            Tỷ lệ tiếp cận khách hàng
          </Title>
          <DDatePicker onDateChange={onDateChange} />
        </Space>
      </Flex>
      <div className="flex-clo ">
        <ResponsiveContainer width="100%" height={182}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={80}
              labelLine={false}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry) => (
                <Cell fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomeTooltipPieChart total={total} />} />
          </PieChart>
        </ResponsiveContainer>
        <CustomLegendPieChart data={chartData} />
      </div>
    </div>
  );
};

export default DashboardPieChart;
