import { ATag } from '@components/atoms';
import { OTable, type TTableKey } from '@components/organisms';
import { ESalesOpportunities } from '@constants/masterData';
import type { ColumnType } from 'antd/es/table';
import React, { useState, type ReactNode } from 'react';
import type { SortOrder, SorterResult } from 'antd/es/table/interface';
import type { SalesOpportunitiesDTO } from 'src/dtos/sales-opportunities';
import type { IMPagination } from '@components/molecules/m-pagination/MPagination.type';
import type { OrderDTO } from '@dtos';

export type TSalesOpportunitiesRecord = TTableKey &
  Partial<SalesOpportunitiesDTO>;

interface ISalesOpportunitiesTable {
  dataSource: TSalesOpportunitiesRecord[];
  onView: (id: string) => void;
  onSort: (field: string, direction: SortOrder) => void;
  paginations: IMPagination;
  sortDirection?: OrderDTO;
}

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

const columns: ColumnType<TSalesOpportunitiesRecord>[] = [
  {
    title: 'Mã khách hàng',
    dataIndex: 'customerId',
    minWidth: 104,
    sorter: true,
    showSorterTooltip: false,
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
    dataIndex: 'customerGroupName',
    minWidth: 164,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Phân khúc khách hàng',
    dataIndex: 'customerSegment',
    minWidth: 164,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Họ và tên',
    dataIndex: 'customerName',
    minWidth: 184,
    sorter: true,
    showSorterTooltip: false,
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

const SalesOpportunitiesTable: React.FC<ISalesOpportunitiesTable> = ({
  dataSource,
  onView,
  onSort,
  paginations,
  sortDirection,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  return (
    <div>
      <OTable<TSalesOpportunitiesRecord>
        columns={columns}
        data={dataSource}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        paginations={paginations}
        sortDirection={sortDirection}
        isCheckboxHidden
        onView={(id) => onView(id as string)}
        onChange={(_p, _f, s) => {
          const { field, order } = s as SorterResult<TSalesOpportunitiesRecord>;
          onSort(field as string, order as SortOrder);
        }}
      />
    </div>
  );
};

export default SalesOpportunitiesTable;
