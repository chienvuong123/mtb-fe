import type { IMPagination } from '@components/molecules/m-pagination/MPagination.type';
import { OTable, type ITable } from '@components/organisms';
import type { OrderDTO, SellerDTO } from '@dtos';
import { useProfile } from '@stores';
import type { ColumnType } from 'antd/es/table';
import type { SortOrder, SorterResult } from 'antd/es/table/interface';
import { useState, type FC } from 'react';

export type TSellerRecord = Partial<SellerDTO>;

interface ISellerTable {
  dataSource: TSellerRecord[];
  paginations: IMPagination;
  sortDirection?: OrderDTO;
  onEdit: ITable<TSellerRecord>['onEdit'];
  onView?: (id: string) => void;
  onSort: (field: string, direction: SortOrder) => void;
}

const columns: ColumnType<TSellerRecord>[] = [
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
    width: 162,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Tổng số khách hàng',
    dataIndex: 'totalCustomer',
    width: 118,
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
    dataIndex: ['user', 'branchDtl', 'name'],
    width: 108,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Phòng',
    dataIndex: ['user', 'departmentDtl', 'name'],
    width: 108,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Chức vụ',
    dataIndex: ['user', 'positionDtl', 'name'],
    width: 108,
    sorter: true,
    showSorterTooltip: false,
  },
];

const SellerTable: FC<ISellerTable> = ({
  dataSource,
  paginations,
  sortDirection,
  onEdit,
  onView,
  onSort,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const { isAdmin, isCampaignManager, isSaleManager } = useProfile();

  const activeAction = isAdmin || isCampaignManager || isSaleManager;

  return (
    <OTable<TSellerRecord>
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
        const { field, order } = s as SorterResult<TSellerRecord>;
        onSort(field as string, order as SortOrder);
      }}
      scroll={{ x: 1575 }}
    />
  );
};

export default SellerTable;
