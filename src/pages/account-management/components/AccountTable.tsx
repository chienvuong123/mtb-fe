import type { IModalConfirm } from '@components/organisms/o-modal';
import { OTable, type TColumnType } from '@components/organisms';
import { EStatus, STATUS_OBJECT_STATIC } from '@constants/masterData';
import type { CategoryDTO, UserDTO } from '@dtos';
import { useProfile } from '@stores';
import type { CBaseTable } from '@types';
import { useMemo, useState, type FC, type Key } from 'react';
import { ROUTES } from '@routers/path';

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
    sorter: true,
  },
  {
    title: 'Tên đăng nhập',
    dataIndex: 'username',
    minWidth: 213,
    showSorterTooltip: false,
    sorter: true,
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
    sorter: true,
    unicodeSort: true,
    render: (value: CategoryDTO) => value?.name ?? '-',
  },
  {
    title: 'Chi nhánh',
    dataIndex: 'branchDtl',
    minWidth: 164,
    showSorterTooltip: false,
    sorter: true,
    unicodeSort: true,
    render: (value: CategoryDTO) => value?.name ?? '-',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phoneNum',
    minWidth: 164,
    showSorterTooltip: false,
    sorter: true,
  },
  {
    title: 'Phòng',
    dataIndex: 'departmentDtl',
    minWidth: 164,
    showSorterTooltip: false,
    render: (value: CategoryDTO) => value?.name ?? '-',
    sorter: true,
    unicodeSort: true,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    minWidth: 164,
    showSorterTooltip: false,
    sorter: true,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    minWidth: 164,
    showSorterTooltip: false,
    render: (value: EStatus) => STATUS_OBJECT_STATIC[value] ?? null,
    sorter: true,
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

  const { hasPermission } = useProfile();

  const blockingIds = useMemo(() => {
    if (dataSource?.length) {
      const ids: string[] = [];
      dataSource.forEach((i) => {
        if (i.status === EStatus.INACTIVE && i.id) ids.push(i.id);
      });
      return ids;
    }
    return [];
  }, [dataSource]);

  return (
    <OTable<TAccountManagementRecord>
      rowKey="id"
      columns={columns}
      data={dataSource}
      selectedRowKeys={selectedRowKeys}
      setSelectedRowKeys={setSelectedRowKeys}
      onDeleteRow={
        hasPermission(ROUTES.ACCOUNT.MANAGEMENT.DELETE)
          ? deleteRecord
          : undefined
      }
      onEdit={
        hasPermission(ROUTES.ACCOUNT.MANAGEMENT.EDIT) ? onEdit : undefined
      }
      paginations={paginations}
      sortDirection={sortDirection}
      isCheckboxHidden
      onView={(id, record) => onView?.(id as string, record)}
      onSort={onSort}
      scroll={{ x: 1300 }}
      confirmProps={confirmProps}
      blockingDeleteIds={blockingIds}
      blockingEditIds={blockingIds}
    />
  );
};

export default AccountTable;
