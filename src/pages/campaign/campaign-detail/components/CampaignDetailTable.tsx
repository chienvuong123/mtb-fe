import type { IMPagination } from '@components/molecules/m-pagination/MPagination.type';
import { OTable, type ITable, type TTableKey } from '@components/organisms';
import { AButton } from '@components/atoms';
import { Flex } from 'antd';
import type { OrderDTO, TId } from '@dtos';
import type { ColumnType } from 'antd/es/table';
import type { SorterResult, SortOrder } from 'antd/es/table/interface';
import React, { useState } from 'react';
import type { CampaignScriptDTO } from 'src/dtos/campaign-detail';
import Title from 'antd/lib/typography/Title';
import { useParams } from 'react-router-dom';

const BUTTON_TEXT = {
  ADD: 'Thêm mới',
} as const;

export type TCampaignDetaillRecord = TTableKey & Partial<CampaignScriptDTO>;

interface ICampaignDetailTable {
  dataSource: TCampaignDetaillRecord[];
  paginations: IMPagination;
  sortDirection?: OrderDTO;
  onEdit: ITable<TCampaignDetaillRecord>['onEdit'];
  onSort: (field: string, direction: SortOrder) => void;
  onShowApproachForm: () => void;
}

const columns: ColumnType<TCampaignDetaillRecord>[] = [
  {
    title: 'STT',
    dataIndex: 'index',
    minWidth: 76,
    align: 'center',
    render: (_: unknown, __: unknown, idx: number) => idx + 1,
  },
  {
    title: 'Phương thức tiếp cận',
    dataIndex: 'name',
    minWidth: 326,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Ghi chú',
    dataIndex: 'note',
    minWidth: 428,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Kịch bản tiếp theo',
    dataIndex: 'script',
    minWidth: 326,
    sorter: true,
    showSorterTooltip: false,
  },
];

const CampaignDetailTable: React.FC<ICampaignDetailTable> = ({
  dataSource,
  paginations,
  sortDirection,
  onEdit,
  onSort,
  onShowApproachForm,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const { id: campaignId } = useParams<TId>();

  return (
    <div>
      <Flex justify="between" className=" items-center mb-4" gap="middle">
        <Title level={4} className="mb-24">
          Kế hoạch tiếp cận
        </Title>
        {!campaignId && (
          <AButton
            onClick={onShowApproachForm}
            type="primary"
            variant="filled"
            className="ml-auto"
          >
            {BUTTON_TEXT.ADD}
          </AButton>
        )}
      </Flex>
      <OTable<TCampaignDetaillRecord>
        columns={columns}
        data={dataSource}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        paginations={paginations}
        sortDirection={sortDirection}
        onEdit={onEdit}
        onChange={(_p, _f, s) => {
          const { field, order } = s as SorterResult<TCampaignDetaillRecord>;
          onSort(field as string, order as SortOrder);
        }}
      />
    </div>
  );
};

export default CampaignDetailTable;
