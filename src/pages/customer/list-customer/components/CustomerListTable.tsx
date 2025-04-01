import { OTable, type TColumnType } from '@components/organisms';
import type { IModalConfirm } from '@components/organisms/o-modal/OModalConfirm';
import { useMemo, useState, type FC, type Key } from 'react';
import { useProfile } from '@stores';
import type { CBaseTable } from '@types';
import type { CustomerDTO } from '@dtos';
import { ROUTES } from '@routers/path';

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
  const { hasPermission, isSeller } = useProfile();

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
        dataIndex: 'customerName',
        width: 157,
        minWidth: 157,
        sorter: true,
        showSorterTooltip: false,
        sortFieldName: 'name',
        // unicodeSort: true, TODO: will be fixed by BE
      },
      {
        title: 'Nhóm khách hàng',
        dataIndex: 'groupName',
        width: 157,
        minWidth: 157,
        sorter: true,
        showSorterTooltip: false,
        sortFieldName: 'customerGroup.name',
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
        dataIndex: 'sellerName',
        width: 157,
        minWidth: 157,
        sorter: true,
        showSorterTooltip: false,
        hidden: isSeller,
        sortFieldName: 'sellerEntity.name',
      },
      {
        title: 'Trạng thái tiếp cận',
        dataIndex: 'approachStatusName',
        width: 170,
        minWidth: 170,
        sorter: true,
        showSorterTooltip: false,
        sortFieldName: 'priority',
        render: (text) => text ?? 'Chưa liên hệ',
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
      onDeleteRow={
        hasPermission(ROUTES.CUSTOMER.DELETE) ? deleteRecord : undefined
      }
      onEdit={hasPermission(ROUTES.CUSTOMER.EDIT) ? onEdit : undefined}
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
