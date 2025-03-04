import { OTable } from '@components/organisms';
import type { IModalConfirm } from '@components/organisms/o-modal/OModalConfirm';
import type { ColumnType } from 'antd/es/table';
import type { SortOrder, SorterResult } from 'antd/es/table/interface';
import { useState, type FC, type Key } from 'react';
import { useProfile } from '@stores';
import type { ICustomerTable, TCustomerRecord } from '../customer.type';

const columns: ColumnType<TCustomerRecord>[] = [
  {
    title: 'Order ID',
    dataIndex: 'orderId',
    width: 157,
    minWidth: 157,
    sorter: true,
    showSorterTooltip: false,
    align: 'center',
  },
  {
    title: 'Mã khách hàng',
    dataIndex: 'code',
    width: 157,
    minWidth: 157,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Họ và tên',
    dataIndex: 'name',
    width: 157,
    minWidth: 157,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Nhóm khách hàng',
    dataIndex: ['customerGroup', 'name'],
    width: 157,
    minWidth: 157,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Năm sinh',
    dataIndex: 'birthday',
    width: 157,
    minWidth: 157,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: 157,
    minWidth: 157,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    width: 157,
    minWidth: 157,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Số lần gọi',
    dataIndex: 'numberOfCalls',
    width: 157,
    minWidth: 157,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Seller',
    dataIndex: ['sellerEntity', 'name'],
    width: 157,
    minWidth: 157,
    sorter: true,
    showSorterTooltip: false,
  },
];

const confirmProps: IModalConfirm = {
  title: 'Xoá khách hàng',
};

const CustomerListTable: FC<ICustomerTable> = ({
  dataSource,
  paginations,
  onEdit,
  onDelete,
  onView,
  onSort,
  onCall,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const { isAdmin, isCampaignManager } = useProfile();

  const deleteRecord = (key: Key) => {
    onDelete(key as string);
  };

  return (
    <OTable<TCustomerRecord>
      rowKey="id"
      isCheckboxHidden
      columns={columns}
      data={dataSource}
      selectedRowKeys={selectedRowKeys}
      onDeleteRow={isAdmin || isCampaignManager ? deleteRecord : undefined}
      onEdit={isAdmin || isCampaignManager ? onEdit : undefined}
      setSelectedRowKeys={setSelectedRowKeys}
      paginations={paginations}
      onView={(id) => onView(id as string)}
      onCall={onCall}
      scroll={{ x: 1574 }}
      onChange={(_p, _f, s) => {
        const { field, order } = s as SorterResult<TCustomerRecord>;
        onSort(field as string, order as SortOrder);
      }}
      confirmProps={confirmProps}
    />
  );
};

export default CustomerListTable;
