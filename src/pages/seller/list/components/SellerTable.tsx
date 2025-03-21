import { OTable, type TColumnType } from '@components/organisms';
import type { IModalConfirm } from '@components/organisms/o-modal';
import type { SellerDTO } from '@dtos';
import { useProfile } from '@stores';
import type { CBaseTable } from '@types';
import { useState, type FC, type Key } from 'react';

const confirmProps: IModalConfirm = {
  title: 'Xoá Seller',
};

const columns: TColumnType<SellerDTO>[] = [
  {
    title: 'Mã',
    dataIndex: ['user', 'employeeCode'],
    width: 105,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Họ và tên',
    dataIndex: 'name',
    width: 271,
    sorter: true,
    showSorterTooltip: false,
    unicodeSort: true,
    sortFieldName: 's.user',
  },
  {
    title: 'Tổng số Campaign tham gia',
    dataIndex: 'totalCampaign',
    width: 220,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Tổng số khách hàng',
    dataIndex: 'totalCustomer',
    width: 178,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Email',
    dataIndex: ['user', 'email'],
    width: 271,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Số điện thoại',
    dataIndex: ['user', 'phoneNum'],
    width: 138,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Chi nhánh',
    dataIndex: ['branch', 'name'],
    width: 118,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Phòng',
    dataIndex: ['department', 'name'],
    width: 108,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Chức vụ',
    dataIndex: ['position', 'name'],
    width: 108,
    sorter: true,
    showSorterTooltip: false,
  },
];

const SellerTable: FC<CBaseTable<SellerDTO>> = ({
  dataSource,
  paginations,
  sortDirection,
  onEdit,
  onView,
  onSort,
  onDelete,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const deleteRecord = (key: Key) => {
    onDelete?.(key as string);
  };
  const { isAdmin, isCampaignManager, isSellerManager } = useProfile();

  const activeAction = isAdmin || isCampaignManager || isSellerManager;

  return (
    <OTable<SellerDTO>
      rowKey="id"
      isCheckboxHidden
      columns={columns}
      data={dataSource}
      selectedRowKeys={selectedRowKeys}
      onEdit={activeAction ? onEdit : undefined}
      onDeleteRow={isAdmin || isCampaignManager ? deleteRecord : undefined}
      setSelectedRowKeys={setSelectedRowKeys}
      paginations={paginations}
      sortDirection={sortDirection}
      onView={(id) => onView?.(id as string)}
      onSort={onSort}
      scroll={{ x: 1575 }}
      confirmProps={confirmProps}
    />
  );
};

export default SellerTable;
