import { OTable } from '@components/organisms';
import { DATE_SLASH_FORMAT_DDMMYYYY } from '@constants/dateFormat';
import { EStatusCampaign, STATUS_CAMPAIGN_OBJECT } from '@constants/masterData';
import { ROUTES } from '@routers/path';
import { useProfile } from '@stores';
import type { CBaseTable } from '@types';
import type { ColumnType } from 'antd/lib/table';
import dayjs from 'dayjs';
import React, { useEffect, useState, type Key } from 'react';
import type { ManagerCategoryDTO } from 'src/dtos/manage-category';

export type TCategoryTableRecord = Partial<ManagerCategoryDTO>;

const columns: ColumnType<TCategoryTableRecord>[] = [
  {
    title: 'Mã',
    dataIndex: 'code',
    minWidth: 76,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Category',
    dataIndex: 'name',
    minWidth: 199,
    sorter: true,
    showSorterTooltip: false,
    ellipsis: true,
  },
  {
    title: 'Sản phẩm chính',
    dataIndex: 'mainProductName',
    minWidth: 156,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Sản phẩm phụ',
    dataIndex: 'subProductName',
    minWidth: 200,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    minWidth: 172,
    sorter: true,
    showSorterTooltip: false,
    render: (value: EStatusCampaign) => STATUS_CAMPAIGN_OBJECT[value] ?? null,
  },
  {
    title: 'Thời gian bắt đầu',
    dataIndex: 'startDate',
    minWidth: 139,
    sorter: true,
    showSorterTooltip: false,
    render: (value: string) => dayjs(value).format(DATE_SLASH_FORMAT_DDMMYYYY),
  },
  {
    title: 'Thời gian kết thúc',
    dataIndex: 'endDate',
    minWidth: 139,
    sorter: true,
    showSorterTooltip: false,
    render: (value: string) => dayjs(value).format(DATE_SLASH_FORMAT_DDMMYYYY),
  },
  {
    title: 'KH tiếp cận',
    dataIndex: 'participatingCustomers',
    minWidth: 118,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'KH tham gia',
    dataIndex: 'totalCustomers',
    minWidth: 111,
    sorter: true,
    showSorterTooltip: false,
  },
];

const CategoryTable: React.FC<CBaseTable<TCategoryTableRecord>> = ({
  dataSource,
  paginations,
  sortDirection,
  onEdit,
  onDelete,
  onView,
  onSort,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const { hasPermission } = useProfile();
  const [blockingEditIds, setBlockingEditIds] = useState<string[]>([]);
  const [blockingDeleteIds, setBlockingDeleteIds] = useState<string[]>([]);

  const deleteRecord = (key: Key) => {
    onDelete?.(key as string);
  };

  useEffect(() => {
    if (dataSource?.length) {
      const blockEditIds: string[] = [];
      const blockDeleteIds: string[] = [];
      dataSource.every((i) => {
        if (!i.id) return false;

        if (i.status === EStatusCampaign.ENDED) {
          blockEditIds.push(i.id);
          blockDeleteIds.push(i.id);
        }

        if (i.status === EStatusCampaign.INPROGRESS) {
          blockDeleteIds.push(i.id);
        }
        return true;
      });
      setBlockingEditIds(blockEditIds);
      setBlockingDeleteIds(blockDeleteIds);
    }
  }, [dataSource]);

  return (
    <OTable<TCategoryTableRecord>
      isCheckboxHidden
      rowKey="id"
      columns={columns}
      data={dataSource}
      selectedRowKeys={selectedRowKeys}
      onDeleteRow={
        hasPermission(ROUTES.CAMPAIGN.CATEGORY.DELETE)
          ? deleteRecord
          : undefined
      }
      onEdit={hasPermission(ROUTES.CAMPAIGN.CATEGORY.EDIT) ? onEdit : undefined}
      setSelectedRowKeys={setSelectedRowKeys}
      paginations={paginations}
      sortDirection={sortDirection}
      scroll={{ x: 1575 }}
      onView={(id) => onView?.(id as string)}
      onSort={onSort}
      confirmProps={{
        title: 'Xóa Category',
      }}
      blockingEditIds={blockingEditIds}
      blockingDeleteIds={blockingDeleteIds}
    />
  );
};

export default CategoryTable;
