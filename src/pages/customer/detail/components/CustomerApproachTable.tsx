import type { IMPagination } from '@components/molecules/m-pagination/MPagination.type';
import { OTable, type TTableKey } from '@components/organisms';
import { DATE_SLASH_FORMAT_DDMMYYYY } from '@constants/dateFormat';
import {
  EApproachStatus,
  type CustomerApproachDTO,
  type OrderDTO,
} from '@dtos';
import type { ColumnType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useState, type FC, type ReactNode } from 'react';

export type TCustomerApproachRecord = TTableKey & Partial<CustomerApproachDTO>;

interface ICustomerApproachTable {
  dataSource: TCustomerApproachRecord[];
  paginations: IMPagination;
  sortDirection?: OrderDTO;
}

const statusObject: Record<EApproachStatus, ReactNode> = {
  [EApproachStatus.PENDING]: 'Chưa bắt đầu',
  [EApproachStatus.INPROGRESS]: 'Đang triển khai',
  [EApproachStatus.FINISHED]: 'Hoàn thành',
};

const columns: ColumnType<TCustomerApproachRecord>[] = [
  {
    title: 'Lần tiếp cận số',
    dataIndex: ['approachPlan', 'code'],
    minWidth: 80,
  },
  {
    title: 'Ngày',
    dataIndex: 'updatedDate',
    minWidth: 120,
    render: (value: string) => dayjs(value).format(DATE_SLASH_FORMAT_DDMMYYYY),
  },
  {
    title: 'Phương thức tiếp cận',
    dataIndex: ['approachPlan', 'method'],
    minWidth: 160,
  },
  {
    title: 'Ghi chú',
    dataIndex: 'note',
    minWidth: 164,
  },
  {
    title: 'Kịch bản tiếp cận',
    dataIndex: ['scenario', 'name'],
    minWidth: 164,
  },
  {
    title: 'Kết quả tiếp cận',
    dataIndex: 'status',
    minWidth: 164,
    render: (value: EApproachStatus) => statusObject[value] ?? null,
  },
  {
    title: 'Seller',
    dataIndex: ['seller', 'firstName'],
    minWidth: 164,
  },
];

const CustomerApproachTable: FC<ICustomerApproachTable> = ({
  dataSource,
  paginations,
  sortDirection,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  return (
    <OTable<TCustomerApproachRecord>
      columns={columns}
      data={dataSource}
      selectedRowKeys={selectedRowKeys}
      setSelectedRowKeys={setSelectedRowKeys}
      paginations={paginations}
      sortDirection={sortDirection}
      hideActions
    />
  );
};

export default CustomerApproachTable;
