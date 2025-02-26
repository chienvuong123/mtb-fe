import { OTable, type TTableKey } from '@components/organisms';
import type { AnyObject } from 'antd/es/_util/type';
import type { ColumnType } from 'antd/es/table';
import { type FC } from 'react';

export type TSellerRecord = TTableKey & Partial<AnyObject>;

interface ISellerTable {
  dataSource: TSellerRecord[];
}

const columns: ColumnType<TSellerRecord>[] = [
  {
    title: 'Mã Campaign',
    dataIndex: 'code',
    width: 290,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Tên Campaign',
    dataIndex: 'name',
    width: 290,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Số lượng khách phân công',
    dataIndex: 'totalCampaign',
    width: 290,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Đã tiếp cận',
    dataIndex: 'totalCustomer',
    width: 290,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Chưa tiếp cận',
    dataIndex: 'email',
    width: 290,
    sorter: true,
    showSorterTooltip: false,
  },
];

const SellerTable: FC<ISellerTable> = ({ dataSource }) => {
  return (
    <OTable<TSellerRecord>
      isCheckboxHidden
      columns={columns}
      data={dataSource}
      scroll={{ x: 1575 }}
    />
  );
};

export default SellerTable;
