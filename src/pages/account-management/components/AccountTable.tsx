import type { IModalConfirm } from '@components/organisms/o-modal';
import { OTable, type TColumnType } from '@components/organisms';
import { EStatus, STATUS_OBJECT_STATIC } from '@constants/masterData';
import type { CategoryDTO } from '@dtos';
import { useProfile } from '@stores';
import type { CBaseTable } from '@types';
import { useState, type FC, type Key } from 'react';
import type { UserDTO } from 'src/dtos/auth';

const confirmProps: IModalConfirm = {
  title: 'Xoá tài khoản',
};

export type TAccountManagementRecord = Partial<UserDTO>;

const columns: TColumnType<TAccountManagementRecord>[] = [
  {
    title: 'Mã nhân viên',
    dataIndex: 'employeeCode',
    minWidth: 104,
    showSorterTooltip: false,
  },
  {
    title: 'Tên đăng nhập',
    dataIndex: 'username',
    minWidth: 213,
    showSorterTooltip: false,
  },
  {
    title: 'Họ và tên',
    dataIndex: 'fullName',
    minWidth: 164,
    sorter: true,
    showSorterTooltip: false,
    unicodeSort: true,
  },
  {
    title: 'Chức vụ',
    dataIndex: 'positionDtl',
    minWidth: 164,
    showSorterTooltip: false,
    render: (value: CategoryDTO) => value?.name ?? '-',
  },
  {
    title: 'Chi nhánh',
    dataIndex: 'branchDtl',
    minWidth: 164,
    showSorterTooltip: false,
    render: (value: CategoryDTO) => value?.name ?? '-',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phoneNum',
    minWidth: 164,
    showSorterTooltip: false,
  },
  {
    title: 'Phòng',
    dataIndex: 'departmentDtl',
    minWidth: 164,
    showSorterTooltip: false,
    render: (value: CategoryDTO) => value?.name ?? '-',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    minWidth: 164,
    showSorterTooltip: false,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    minWidth: 164,
    showSorterTooltip: false,
    render: (value: EStatus) => STATUS_OBJECT_STATIC[value] ?? null,
  },
];

const AccountTable: FC<CBaseTable<TAccountManagementRecord>> = ({
  dataSource,
  paginations,
  sortDirection,
  onView,
  onSort,
  onDelete,
  onEdit,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const deleteRecord = (key: Key) => {
    onDelete?.(key as string);
  };

  const { isAdmin, isCampaignManager } = useProfile();

  return (
    <OTable<TAccountManagementRecord>
      rowKey="id"
      columns={columns}
      data={dataSource}
      selectedRowKeys={selectedRowKeys}
      setSelectedRowKeys={setSelectedRowKeys}
      onDeleteRow={isAdmin || isCampaignManager ? deleteRecord : undefined}
      onEdit={isAdmin || isCampaignManager ? onEdit : undefined}
      paginations={paginations}
      sortDirection={sortDirection}
      isCheckboxHidden
      onView={(id) => onView?.(id as string)}
      onSort={onSort}
      scroll={{ x: 1300 }}
      confirmProps={confirmProps}
    />
  );
};

export default AccountTable;
