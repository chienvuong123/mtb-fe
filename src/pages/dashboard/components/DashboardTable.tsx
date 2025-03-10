import ADatePicker from '@components/atoms/a-date-picker/ADatePicker';
import { OTable } from '@components/organisms';
import type { CBaseTable } from '@types';
import { Flex, Space, Typography } from 'antd';
import type { ColumnType } from 'antd/es/table';
import React from 'react';
import type { TStatisticsCampaignDTO } from 'src/dtos/dashboard';

interface IDashboardTable extends CBaseTable<TStatisticsCampaignDTO> {
  onDateChange: (startDate: string, endDate: string) => void;
}

const handleSort = (a?: string, b?: string) =>
  a && b ? a.localeCompare(b) : 0;

const handleSortNumber = (a?: number, b?: number) => (a && b ? a - b : 0);

const columns: ColumnType<TStatisticsCampaignDTO>[] = [
  {
    title: 'Tên Campaign',
    dataIndex: 'campaignName',
    minWidth: 76,
    showSorterTooltip: false,
    sorter: (a, b) => handleSort(a.campaignName, b.campaignName),
  },
  {
    title: 'Tổng số khách hàng',
    dataIndex: 'totalCustomer',
    minWidth: 76,
    sorter: (a, b) => handleSortNumber(a.totalCustomer, b.totalCustomer),
    showSorterTooltip: false,
  },
  {
    title: 'Chưa liên hệ',
    dataIndex: 'customersNotContacted',
    minWidth: 185,
    sorter: (a, b) =>
      handleSortNumber(a.customersNotContacted, b.customersNotContacted),
    showSorterTooltip: false,
    ellipsis: true,
  },
  {
    title: 'Đang liên hệ',
    dataIndex: 'customersInProgress',
    minWidth: 107,
    sorter: (a, b) =>
      handleSortNumber(a.customersInProgress, b.customersInProgress),
    showSorterTooltip: false,
  },
  {
    title: 'Thành công',
    dataIndex: 'customersContactedSuccessfully',
    minWidth: 107,
    sorter: (a, b) =>
      handleSortNumber(
        a.customersContactedSuccessfully,
        b.customersContactedSuccessfully,
      ),
    showSorterTooltip: false,
  },
  {
    title: 'Chưa thành công',
    dataIndex: 'customersContactedUnsuccessfully',
    minWidth: 107,
    sorter: (a, b) =>
      handleSortNumber(
        a.customersContactedUnsuccessfully,
        b.customersContactedUnsuccessfully,
      ),
    showSorterTooltip: false,
  },
  {
    title: 'Không thành công',
    dataIndex: 'customersFailedToContact',
    minWidth: 107,
    sorter: (a, b) =>
      handleSortNumber(a.customersFailedToContact, b.customersFailedToContact),
    showSorterTooltip: false,
  },
];

const DashboardTable: React.FC<IDashboardTable> = ({
  onSort,
  onDateChange,
  dataSource,
}) => {
  const { Title } = Typography;

  const customHeader = (
    <Flex justify="space-between" align="center">
      <Space direction="vertical">
        <Title level={4} style={{ margin: 0 }}>
          Bảng thống kê
        </Title>
        <ADatePicker onDateChange={onDateChange} />
      </Space>
    </Flex>
  );
  return (
    <div>
      <OTable<TStatisticsCampaignDTO>
        rowKey="id"
        header={customHeader}
        columns={columns}
        data={dataSource}
        onSort={onSort}
        isCheckboxHidden
        hideActions
        hideIndexColumn
        scroll={{ y: 550 }}
      />
    </div>
  );
};

export default DashboardTable;
