import { OTable } from '@components/organisms';
import type { SellerCampaignData } from '@dtos';
import type { ColumnType } from 'antd/es/table';
import { type FC, type Key } from 'react';

export type TSellerRecord = Partial<SellerCampaignData>;

interface ISellerTable {
  dataSource: TSellerRecord[];
}

const columns: ColumnType<TSellerRecord>[] = [
  {
    title: 'Mã Campaign',
    dataIndex: ['campaign', 'code'],
    width: 290,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Tên Campaign',
    dataIndex: ['campaign', 'name'],
    width: 290,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Số lượng khách phân công',
    dataIndex: 'customerCount',
    width: 290,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Đã tiếp cận',
    dataIndex: 'approachedCount',
    width: 290,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Chưa tiếp cận',
    dataIndex: 'notApproachedCount',
    width: 290,
    sorter: true,
    showSorterTooltip: false,
  },
];

const SellerTable: FC<ISellerTable> = ({ dataSource }) => {
  return (
    <OTable<TSellerRecord>
      rowKey="campaign"
      isCheckboxHidden
      hideActions
      columns={columns}
      data={dataSource}
      scroll={{ x: 1575 }}
      tableRowKey={(record) => record.campaign?.id as Key}
    />
  );
};

export default SellerTable;
