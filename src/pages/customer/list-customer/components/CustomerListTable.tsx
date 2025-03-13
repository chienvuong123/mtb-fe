import { OTable, type TColumnType } from '@components/organisms';
import type { IModalConfirm } from '@components/organisms/o-modal/OModalConfirm';
import { useMemo, useState, type FC, type Key } from 'react';
import { useProfile } from '@stores';
import type { CBaseTable } from '@types';
import type { CustomerDTO } from '@dtos';

const confirmProps: IModalConfirm = {
  title: 'Xoá khách hàng',
};

const CustomerListTable: FC<CBaseTable<CustomerDTO>> = ({
  dataSource,
  paginations,
  onEdit,
  onDelete,
  onView,
  onSort,
  onCall,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const { isAdmin, isCampaignManager, isSeller } = useProfile();

  const columns: TColumnType<CustomerDTO>[] = useMemo(() => {
    const columnsTable: TColumnType<CustomerDTO>[] = [
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
        unicodeSort: true,
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
        hidden: isSeller,
      },
      {
        title: 'Trạng thái tiếp cận',
        dataIndex: ['approachResult', 'categoryStatus', 'name'],
        width: 170,
        minWidth: 170,
        sorter: true,
        showSorterTooltip: false,
        sortFieldName: 'approachResult',
      },
    ];
    return columnsTable;
  }, [isSeller]);

  const deleteRecord = (key: Key) => {
    onDelete?.(key as string);
  };

  return (
    <OTable<CustomerDTO>
      rowKey="id"
      isCheckboxHidden
      columns={columns}
      data={dataSource}
      selectedRowKeys={selectedRowKeys}
      onDeleteRow={isAdmin || isCampaignManager ? deleteRecord : undefined}
      onEdit={isAdmin || isCampaignManager ? onEdit : undefined}
      setSelectedRowKeys={setSelectedRowKeys}
      paginations={paginations}
      onView={(id) => onView?.(id as string)}
      onCall={onCall}
      scroll={{ x: 1574 }}
      onSort={onSort}
      confirmProps={confirmProps}
    />
  );
};

export default CustomerListTable;
