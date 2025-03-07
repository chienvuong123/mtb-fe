import { OTable } from '@components/organisms';
import type { SellerDTO } from '@dtos';
import { useProfile } from '@stores';
import type { CBaseTable } from '@types';
import type { ColumnType } from 'antd/es/table';
import type { SortOrder, SorterResult } from 'antd/es/table/interface';
import { useState, type FC } from 'react';

const columns: ColumnType<SellerDTO>[] = [
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
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
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
      setSelectedRowKeys={setSelectedRowKeys}
      paginations={paginations}
      sortDirection={sortDirection}
      onView={(id) => onView?.(id as string)}
      onChange={(_p, _f, s) => {
        const { field, order } = s as SorterResult<SellerDTO>;
        onSort?.(field as string, order as SortOrder);
      }}
      scroll={{ x: 1575 }}
    />
  );
};

export default SellerTable;
