import { OTable } from '@components/organisms';
import type { SellerCampaignData } from '@dtos';
import type { CBaseTable } from '@types';
import type { ColumnType } from 'antd/es/table';
import { type FC, type Key } from 'react';

export type TSellerRecord = Partial<SellerCampaignData>;

const columns: ColumnType<TSellerRecord>[] = [
  {
    title: 'Mã Campaign',
    dataIndex: ['campaign', 'code'],
    width: 290,
  },
  {
    title: 'Tên Campaign',
    dataIndex: ['campaign', 'name'],
    width: 290,
  },
  {
    title: 'Số lượng khách phân công',
    dataIndex: 'customerCount',
    width: 290,
  },
  {
    title: 'Đã tiếp cận',
    dataIndex: 'approachedCount',
    width: 290,
  },
  {
    title: 'Chưa tiếp cận',
    dataIndex: 'notApproachedCount',
    width: 290,
  },
];

const SellerTable: FC<CBaseTable<TSellerRecord>> = ({ dataSource }) => {
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
