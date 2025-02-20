import type { IMPagination } from '@components/molecules/m-pagination/MPagination.type';
import { OTable, type TTableKey } from '@components/organisms';
import { AButton } from '@components/atoms';
import { Flex } from 'antd';
import type { OrderDTO, TId } from '@dtos';
import type { ColumnType } from 'antd/es/table';
import type { SorterResult, SortOrder } from 'antd/es/table/interface';
import React from 'react';
import Title from 'antd/lib/typography/Title';
import { useParams } from 'react-router-dom';
import type { CategoryScriptDTO } from 'src/dtos/manage-category-detail';
import {
  STATUS_CAMPAIGN_OBJECT,
  type ESalesCampaign,
} from '@constants/masterData';

const BUTTON_TEXT = {
  ADD: 'Thêm mới',
} as const;

export type TCategoryDetaillRecord = TTableKey & Partial<CategoryScriptDTO>;

interface ICategoryDetailTable {
  dataSource: TCategoryDetaillRecord[];
  paginations: IMPagination;
  sortDirection?: OrderDTO;
  onSort: (field: string, direction: SortOrder) => void;
}

const columns: ColumnType<TCategoryDetaillRecord>[] = [
  {
    title: 'STT',
    dataIndex: 'index',
    minWidth: 76,
    align: 'center',
    render: (_: unknown, __: unknown, idx: number) => idx + 1,
  },
  {
    title: 'Mã',
    dataIndex: 'code',
    minWidth: 150,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Category',
    dataIndex: 'name',
    minWidth: 150,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Main Product',
    dataIndex: 'mainProdcut',
    minWidth: 150,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Sub Product',
    dataIndex: 'subProduct',
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
    render: (value: ESalesCampaign) => STATUS_CAMPAIGN_OBJECT[value] ?? null,
  },
  {
    title: 'Thời gian bắt đầu',
    dataIndex: 'startDate',
    minWidth: 150,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Thời gian kết thúc',
    dataIndex: 'endDate',
    minWidth: 150,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'KH tiếp cận',
    dataIndex: 'totalCustomerApproach',
    minWidth: 150,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'KH tham gia',
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
          Category
        </Title>
        {!campaignId && (
          <AButton type="primary" variant="filled" className="ml-auto">
            {BUTTON_TEXT.ADD}
          </AButton>
        )}
      </Flex>
      <OTable<TCategoryDetaillRecord>
        columns={columns}
        data={dataSource}
        isCheckboxHidden
        paginations={paginations}
        sortDirection={sortDirection}
        hideActions
        onChange={(_p, _f, s) => {
          const { field, order } = s as SorterResult<TCategoryDetaillRecord>;
          onSort(field as string, order as SortOrder);
        }}
      />
    </div>
  );
};

export default CampaignDetailTable;
