import { OTable } from '@components/organisms';
import { DATE_SLASH_FORMAT_DDMMYYYY } from '@constants/dateFormat';
import { EStatusCampaign, STATUS_CAMPAIGN_OBJECT } from '@constants/masterData';
import { ROUTES } from '@routers/path';
import { useProfile } from '@stores';
import type { CBaseTable } from '@types';
import type { ColumnType } from 'antd/lib/table';
import dayjs from 'dayjs';
import React, { useMemo, useState, type Key } from 'react';
import type { CampaignDTO } from 'src/dtos/campaign';

const columns: ColumnType<CampaignDTO>[] = [
  {
    title: 'Mã Campaign',
    dataIndex: 'code',
    minWidth: 76,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Tên Campaign',
    dataIndex: 'name',
    minWidth: 185,
    sorter: true,
    showSorterTooltip: false,
    ellipsis: true,
  },
  {
    title: 'Mã Category',
    dataIndex: 'categoryCode',
    minWidth: 107,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Tên Category',
    dataIndex: 'categoryName',
    minWidth: 107,
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
    title: 'Khách hàng tiếp cận',
    dataIndex: 'totalCustomerApproach',
    minWidth: 118,
    sorter: true,
    showSorterTooltip: false,
    ellipsis: false,
  },
  {
    title: 'Khách hàng tham gia',
    dataIndex: 'totalCustomerParticipating',
    minWidth: 111,
    sorter: true,
    showSorterTooltip: false,
    ellipsis: false,
  },
];

const CampaignTable: React.FC<CBaseTable<CampaignDTO>> = ({
  dataSource,
  paginations,
  sortDirection,
  onEdit,
  onDelete,
  onView,
  onSort,
  onList,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const { hasPermission } = useProfile();

  const deleteRecord = (key: Key) => {
    onDelete?.(key as string);
  };

  const blockingEditIds = useMemo(() => {
    if (dataSource?.length) {
      const ids: string[] = [];
      dataSource.forEach((i) => {
        if (i.status === EStatusCampaign.ENDED) ids.push(i.id);
      });
      return ids;
    }
    return [];
  }, [dataSource]);

  const blockingDeleteIds = useMemo(() => {
    if (dataSource?.length) {
      const ids: string[] = [];
      dataSource.forEach((i) => {
        if (
          i.status === EStatusCampaign.ENDED ||
          i.status === EStatusCampaign.INPROGRESS
        )
          ids.push(i.id);
      });
      return ids;
    }
    return [];
  }, [dataSource]);

  return (
    <OTable<CampaignDTO>
      rowKey="id"
      isCheckboxHidden
      columns={columns}
      data={dataSource}
      selectedRowKeys={selectedRowKeys}
      onDeleteRow={
        hasPermission(ROUTES.CAMPAIGN.DELETE) ? deleteRecord : undefined
      }
      onEdit={hasPermission(ROUTES.CAMPAIGN.EDIT) ? onEdit : undefined}
      onList={(id) => onList?.(id as string)}
      setSelectedRowKeys={setSelectedRowKeys}
      paginations={paginations}
      sortDirection={sortDirection}
      scroll={{ x: 1575 }}
      onView={(id) => onView?.(id as string)}
      onSort={onSort}
      blockingEditIds={blockingEditIds}
      blockingDeleteIds={blockingDeleteIds}
    />
  );
};

export default CampaignTable;
