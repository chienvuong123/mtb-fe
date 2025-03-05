import type { IMPagination } from '@components/molecules';
import { OTable } from '@components/organisms';
import { AButton } from '@components/atoms';
import { Flex } from 'antd';
import type { OrderDTO, TId } from '@dtos';
import type { ColumnType } from 'antd/es/table';
import type { SorterResult, SortOrder } from 'antd/es/table/interface';
import React from 'react';
import Title from 'antd/lib/typography/Title';
import { useParams } from 'react-router-dom';
import type { CategoryScriptDTO } from 'src/dtos/manage-category-detail';
import { EStatusCampaign, STATUS_CAMPAIGN_OBJECT } from '@constants/masterData';
import { DATE_SLASH_FORMAT_DDMMYYYY } from '@constants/dateFormat';
import dayjs from 'dayjs';

const BUTTON_TEXT = {
  ADD: 'Thêm mới',
} as const;

export type TCategoryDetaillRecord = Partial<CategoryScriptDTO>;

interface ICategoryDetailTable {
  dataSource: TCategoryDetaillRecord[];
  paginations: IMPagination;
  sortDirection?: OrderDTO;
  onSort: (field: string, direction: SortOrder) => void;
}

const columns: ColumnType<TCategoryDetaillRecord>[] = [
  {
    title: 'Mã Campaign',
    dataIndex: 'code',
    minWidth: 150,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Tên Campaign',
    dataIndex: 'name',
    minWidth: 150,
    sorter: true,
    showSorterTooltip: false,
    ellipsis: true,
  },
  {
    title: 'Chi nhánh triển khai',
    dataIndex: 'branches',
    minWidth: 150,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    minWidth: 150,
    sorter: true,
    showSorterTooltip: false,
    render: (value: EStatusCampaign) => STATUS_CAMPAIGN_OBJECT[value] ?? null,
  },
  {
    title: 'Thời gian bắt đầu',
    dataIndex: 'startDate',
    minWidth: 150,
    sorter: true,
    showSorterTooltip: false,
    render: (value: string) => dayjs(value).format(DATE_SLASH_FORMAT_DDMMYYYY),
  },
  {
    title: 'Thời gian kết thúc',
    dataIndex: 'endDate',
    minWidth: 150,
    sorter: true,
    showSorterTooltip: false,
    render: (value: string) => dayjs(value).format(DATE_SLASH_FORMAT_DDMMYYYY),
  },
  {
    title: 'Tổng số khách hàng',
    dataIndex: 'totalCustomerParticipating',
    minWidth: 150,
    sorter: true,
    showSorterTooltip: false,
  },
];

const CampaignDetailTable: React.FC<ICategoryDetailTable> = ({
  dataSource,
  paginations,
  sortDirection,
  onSort,
}) => {
  const { id: campaignId } = useParams<TId>();

  return (
    <div>
      <Flex justify="between" className=" items-center mb-4" gap="middle">
        <Title level={4} className="mb-24">
          Campaign
        </Title>
        {!campaignId && (
          <AButton type="primary" variant="filled" className="ml-auto">
            {BUTTON_TEXT.ADD}
          </AButton>
        )}
      </Flex>
      <OTable<TCategoryDetaillRecord>
        rowKey="id"
        columns={columns}
        data={dataSource}
        isCheckboxHidden
        paginations={paginations}
        sortDirection={sortDirection}
        hideActions
        scroll={{ x: 1575 }}
        onChange={(_p, _f, s) => {
          const { field, order } = s as SorterResult<TCategoryDetaillRecord>;
          onSort(field as string, order as SortOrder);
        }}
      />
    </div>
  );
};

export default CampaignDetailTable;
