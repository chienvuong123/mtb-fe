import { Flex, Space, Typography } from 'antd';
import React, { useState } from 'react';
import {
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
  ResponsiveContainer,
} from 'recharts';
import './areaChart.scss';
import type {
  DashboardSearchRequest,
  IStatisticsCustomerCallStats,
} from '@dtos';
import { useStatisticsCustomerCallStats } from '@hooks/queries';
import { DDatePicker } from '../components/date-picker';
import CustomLegend from './components/CustomLegend';
import CustomTooltip from './components/CustomTooltip';

interface LegendEntry {
  color: string;
  dataKey: string;
  name: string;
}

const parseDate = (dateStr: string): Date | null => {
  if (!dateStr) return null;
  const parts = dateStr.split('/').map(Number);
  if (parts.length !== 3) return null;

  const [day, month, year] = parts;
  const parsedDate = new Date(year, month - 1, day);

  return parsedDate;
};

const sortDataByDate = (
  data: IStatisticsCustomerCallStats[] | undefined,
): IStatisticsCustomerCallStats[] => {
  if (!data || !Array.isArray(data)) return [];

  return [...data].sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);

    if (!dateA || !dateB) return 0;
    return dateA.getTime() - dateB.getTime();
  });
};

const generateData = (dates: IStatisticsCustomerCallStats[]) => {
  return dates.map((dateObj) => ({
    ...dateObj,
    potentialCustomers: Math.floor(Math.random() * 1000) + 2000,
    totalCalls: Math.floor(Math.random() * 1500) + 1000,
  }));
};

const calculateDaysDifference = (startDate: string, endDate: string) => {
  const parsedStart = parseDate(startDate);
  const parsedEnd = parseDate(endDate);

  if (!parsedStart || !parsedEnd) return 31;
  return Math.ceil(
    (parsedEnd.getTime() - parsedStart.getTime()) / (1000 * 3600 * 24),
  );
};

const formatXAxisTick = (
  value: string,
  data: IStatisticsCustomerCallStats[],
  daysDifference: number,
) => {
  if (daysDifference > 31) {
    const dateObj = data.find((item) => item.date === value);
    return dateObj ? `Tháng ${dateObj.month}` : '';
  }
  return value;
};

const DashboardAreaChart: React.FC = () => {
  const { Title } = Typography;
  const legendData: LegendEntry[] = [
    {
      color: '#E46A11',
      dataKey: 'totalCustomerApproach',
      name: 'Khách hàng đã tiếp cận',
    },
    { color: '#1265E9', dataKey: 'totalCalled', name: 'Tổng số cuộc gọi' },
  ];

  const [dateRange, setDateRange] = useState<DashboardSearchRequest>({
    startDate: '',
    endDate: '',
  });

  const onDateChange = (startDate: string, endDate: string) => {
    setDateRange({ startDate, endDate });
  };

  const { data: statisticsDataCallStats } = useStatisticsCustomerCallStats({
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
  });

  const sortedData = sortDataByDate(statisticsDataCallStats?.data);
  const data = generateData(sortedData);

  const daysDifference = calculateDaysDifference(
    dateRange.startDate,
    dateRange.endDate,
  );

  const monthTicks = (() => {
    if (daysDifference > 31) {
      return data.filter((item) => item.day === '1').map((item) => item.date);
    }
    return data.map((item) => item.date);
  })();

  return (
    <div className="areaChart container bg-white py-20">
      <Flex justify="space-between" align="center" className="px-20">
        <Space direction="vertical" className="mb-24">
          <Title level={4} style={{ margin: 0 }}>
            Khách hàng tiếp cận
          </Title>
          <DDatePicker onDateChange={onDateChange} />
        </Space>
        <Flex>
          <CustomLegend legendData={legendData} />
        </Flex>
        <div />
      </Flex>
      <ResponsiveContainer width="100%" height={335}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorTransactions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="-28.5%" stopColor="rgba(20, 30, 210, 0.25)" />
              <stop offset="95.56%" stopColor="rgba(20, 30, 210, 0.00)" />
            </linearGradient>
            <linearGradient id="colorNewCustomers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="-59.78%" stopColor="rgba(233, 136, 65, 0.50)" />
              <stop offset="94.48%" stopColor="rgba(255, 255, 255, 0.00)" />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            axisLine={false}
            padding={{ left: 20 }}
            ticks={monthTicks}
            tickFormatter={(value) =>
              formatXAxisTick(value, data, daysDifference)
            }
          />
          <YAxis
            axisLine={false}
            tickSize={0}
            tickCount={8}
            padding={{ top: 20, bottom: 20 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="totalCustomerApproach"
            stroke="#E46A11"
            fillOpacity={1}
            strokeWidth={2}
            fill="url(#colorNewCustomers)"
          />
          <Area
            type="monotone"
            dataKey="totalCalled"
            stroke="#1265E9"
            fillOpacity={1}
            strokeWidth={2}
            fill="url(#colorTransactions)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardAreaChart;
