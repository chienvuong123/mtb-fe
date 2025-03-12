import { ATag } from '@components/atoms';
import { OTable, type TColumnType } from '@components/organisms';
import { ESalesOpportunities } from '@constants/masterData';
import React, { useState, type ReactNode } from 'react';
import type { SalesOpportunitiesDTO } from 'src/dtos/sales-opportunities';
import type { CBaseTable } from '@types';

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
    title: 'Trạng thái',
    dataIndex: 'status',
    minWidth: 164,
    sorter: true,
    showSorterTooltip: false,
    render: (value: ESalesOpportunities) =>
      statusSalesOpportunitiesObject[value] ?? null,
  },
  {
    title: 'Nhóm khách hàng',
    dataIndex: 'customerGroup',
    minWidth: 164,
    sorter: true,
    showSorterTooltip: false,
    render: (customerGroup) => customerGroup?.name || ' ',
  },
  {
    title: 'Phân khúc khách hàng',
    dataIndex: 'customer',
    minWidth: 164,
    sorter: true,
    showSorterTooltip: false,
    render: (customer) => customer?.customerSegment.name || '',
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
  },
  {
    title: 'Email',
    dataIndex: 'customerEmail',
    minWidth: 164,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'mobilePhone',
    minWidth: 164,
    sorter: true,
    showSorterTooltip: false,
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
      />
    </div>
  );
};

export default SalesOpportunitiesTable;
