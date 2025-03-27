import ADatePicker from '@components/atoms/a-date-picker/ADatePicker';
import { OTable } from '@components/organisms';
import type { CBaseTable } from '@types';
import { Flex, Space, Typography } from 'antd';
import type { ColumnType } from 'antd/es/table';
import React, { useState } from 'react';
import type { TStatisticsCampaignDTO } from 'src/dtos/dashboard';

interface IDashboardTable extends CBaseTable<TStatisticsCampaignDTO> {
  onDateChange: (startDate: string, endDate: string) => void;
}

const columns: ColumnType<TStatisticsCampaignDTO>[] = [
  {
    title: 'Tên Campaign',
    dataIndex: 'campaignName',
    minWidth: 76,
    showSorterTooltip: false,
    sorter: true,
  },
  {
    title: 'Tổng số khách hàng',
    dataIndex: 'totalCustomer',
    minWidth: 76,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Chưa liên hệ',
    dataIndex: 'customersNotContacted',
    minWidth: 185,
    sorter: true,
    showSorterTooltip: false,
    ellipsis: true,
  },
  {
    title: 'Đang liên hệ',
    dataIndex: 'customersInProgress',
    minWidth: 107,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Thành công',
    dataIndex: 'customersContactedSuccessfully',
    minWidth: 107,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Chưa thành công',
    dataIndex: 'customersContactedUnsuccessfully',
    minWidth: 107,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Không thành công',
    dataIndex: 'customersFailedToContact',
    minWidth: 107,
    sorter: true,
    showSorterTooltip: false,
  },
];

const DashboardTable: React.FC<IDashboardTable> = ({
  onSort,
  onDateChange,
  dataSource,
  paginations,
  sortDirection,
}) => {
  const { Title } = Typography;
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

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
        paginations={paginations}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        sortDirection={sortDirection}
        isCheckboxHidden
        hideActions
        hideIndexColumn
      />
    </div>
  );
};

export default DashboardTable;
