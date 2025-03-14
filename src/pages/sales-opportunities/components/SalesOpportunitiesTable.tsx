import { ATag } from '@components/atoms';
import { OTable, type TColumnType } from '@components/organisms';
import { ESalesOpportunities } from '@constants/masterData';
import React, { useState, type ReactNode } from 'react';
import type { SalesOpportunitiesDTO } from 'src/dtos/sales-opportunities';
import type { CBaseTable } from '@types';
import { DATE_SLASH_FORMAT_DDMMYYYY } from '@constants/dateFormat';
import dayjs from 'dayjs';

export const statusSalesOpportunitiesObject: Record<
  ESalesOpportunities,
  ReactNode
> = {
  [ESalesOpportunities.DISBURSED]: <ATag color="green">Đã giải ngân</ATag>,
  [ESalesOpportunities.OPPORTUNITY_TO_SELL]: (
    <ATag color="blue">Đã tạo cơ hội bán</ATag>
  ),
  [ESalesOpportunities.CANCELED]: <ATag color="red">Đã hủy</ATag>,
};

const columns: TColumnType<SalesOpportunitiesDTO>[] = [
  {
    title: 'Mã khách hàng',
    dataIndex: 'customer',
    minWidth: 104,
    sorter: true,
    showSorterTooltip: false,
    render: (customer) => customer?.code || ' ',
  },
  {
    title: 'Order ID',
    dataIndex: 'orderId',
    minWidth: 104,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Trạng thái cơ hội bán',
    dataIndex: 'mbOpportunityStt',
    minWidth: 175,
    sorter: true,
    showSorterTooltip: false,
    render: (value: ESalesOpportunities) =>
      statusSalesOpportunitiesObject[value] ?? null,
  },
  {
    title: 'Trạng thái cơ tiếp cận gần nhất',
    dataIndex: 'customerApproachStatusDtl',
    minWidth: 184,
    sorter: true,
    showSorterTooltip: false,
    render: (value) => value?.name,
  },
  {
    title: 'Họ và tên',
    dataIndex: 'customerName',
    minWidth: 184,
    sorter: true,
    showSorterTooltip: false,
    unicodeSort: true,
  },
  {
    title: 'Năm sinh',
    dataIndex: 'birthDate',
    minWidth: 124,
    sorter: true,
    showSorterTooltip: false,
    render: (value) => dayjs(value).format(DATE_SLASH_FORMAT_DDMMYYYY),
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'mobilePhone',
    minWidth: 164,
    sorter: true,
    showSorterTooltip: false,
    render: (_, record) =>
      record.mobilePhone3 || record.mobilePhone2 || record.mobilePhone || '',
  },
  {
    title: 'Seller',
    dataIndex: 'customer',
    minWidth: 164,
    sorter: true,
    showSorterTooltip: false,
    render: (value) => value?.sellerEntity?.name,
  },
];

const SalesOpportunitiesTable: React.FC<CBaseTable<SalesOpportunitiesDTO>> = ({
  dataSource,
  onView,
  onSort,
  paginations,
  sortDirection,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  return (
    <div>
      <OTable<SalesOpportunitiesDTO>
        rowKey="id"
        columns={columns}
        data={dataSource}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        paginations={paginations}
        sortDirection={sortDirection}
        isCheckboxHidden
        onView={(id) => onView?.(id as string)}
        onSort={onSort}
        scroll={{ x: 1574 }}
      />
    </div>
  );
};

export default SalesOpportunitiesTable;
