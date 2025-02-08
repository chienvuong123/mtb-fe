import { ATag } from '@components/atoms';
import { OTable, type TTableKey } from '@components/organisms';
import { EStatusOpportunitySell } from '@constants/masterData';
import type { ColumnType } from 'antd/es/table';
import React, { useState, type ReactNode } from 'react';
import type { SortOrder, SorterResult } from 'antd/es/table/interface';
import type { OpportunitySellDTO } from 'src/dtos/opportunity';
import type { IMPagination } from '@components/molecules/m-pagination/MPagination.type';
import type { OrderDTO } from '@dtos';

export type TOpportunitySellRecord = TTableKey & Partial<OpportunitySellDTO>;

interface IOpportunitySellTable {
  dataSource: TOpportunitySellRecord[];
  onView: (id: string) => void;
  onSort: (field: string, direction: SortOrder) => void;
  paginations: IMPagination;
  sortDirection?: OrderDTO;
}

const statusObject: Record<EStatusOpportunitySell, ReactNode> = {
  [EStatusOpportunitySell.DISBURSED]: <ATag color="green">Đã giải ngân</ATag>,
  [EStatusOpportunitySell.OPPORTUNITY_TO_SELL]: <ATag color="blue">Đã tạo cơ hội bán</ATag>,
  [EStatusOpportunitySell.CANCELED]: <ATag color="red">Đã hủy</ATag>,
};

const columns: ColumnType<TOpportunitySellRecord>[] = [
  {
    title: 'STT',
    dataIndex: 'index',
    minWidth: 76,
    align: 'center',
    render: (_: unknown, __: unknown, idx: number) => idx + 1,
  },
  {
    title: 'Mã khách hàng',
    dataIndex: 'code',
    minWidth: 104,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Order ID',
    dataIndex: 'OrderId',
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
    render: (value: EStatusOpportunitySell) => statusObject[value] ?? null,
  },
  {
    title: 'Nhóm khách hàng',
    dataIndex: 'group',
    minWidth: 164,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Phân khúc khách hàng',
    dataIndex: 'Segment',
    minWidth: 164,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Họ và tên',
    dataIndex: 'fullName',
    minWidth: 184,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Năm sinh',
    dataIndex: 'birthday',
    minWidth: 124,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    minWidth: 164,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    minWidth: 164,
    sorter: true,
    showSorterTooltip: false,
  },
];

const OpportunitySellTable: React.FC<IOpportunitySellTable> = ({
  dataSource,
  onView,
  onSort,
  paginations,
  sortDirection
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  return (
    <div>
      <OTable<TOpportunitySellRecord>
        columns={columns}
        data={dataSource}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        paginations={paginations}
        sortDirection={sortDirection}
        onView={(id) => onView(id as string)}
        onChange={(_p, _f, s) => {
          const { field, order } = s as SorterResult<TOpportunitySellRecord>;
          onSort(field as string, order as SortOrder);
        }}
      />
    </div>
  )
}

export default OpportunitySellTable
