import { OTable } from '@components/organisms';
import { AButton } from '@components/atoms';
import { Flex } from 'antd';
import { CategoryType, type CampaignApproachPlanDTO } from '@dtos';
import type { ColumnType } from 'antd/es/table';
import React, { useState, type Key } from 'react';
import Title from 'antd/lib/typography/Title';
import type { CBaseTable } from '@types';
import {
  useCategoryOptionsListQuery,
  useQueryApproachScriprtList,
} from '@hooks/queries';

const BUTTON_TEXT = {
  ADD: 'Thêm mới',
} as const;

export interface ICampaignApproachDetailTable
  extends CBaseTable<CampaignApproachPlanDTO> {
  onShowApproachForm?: () => void;
  showAddButton?: boolean;
}

const columns: ColumnType<CampaignApproachPlanDTO>[] = [
  {
    title: 'Phương thức tiếp cận',
    dataIndex: 'approach',
    minWidth: 326,
    sorter: true,
    showSorterTooltip: false,
    render: (_, record) => {
      return record.approachName;
    },
  },
  {
    title: 'Ghi chú',
    dataIndex: 'note',
    minWidth: 428,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Kịch bản tiếp cận',
    dataIndex: 'script',
    minWidth: 326,
    sorter: true,
    showSorterTooltip: false,
    render: (_, record) => {
      return record.scriptName;
    },
  },
];

const CampaignApproachDetailTable: React.FC<ICampaignApproachDetailTable> = ({
  dataSource,
  showAddButton,
  onEdit,
  onShowApproachForm,
  onDelete,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const deleteRecord = (key: Key) => {
    if (onDelete) {
      onDelete(key as string);
    }
  };

  const { data: approachOptions } = useCategoryOptionsListQuery({
    categoryTypeCode: CategoryType.APPROACH,
  });
  const { data: approachScriptOptions } = useQueryApproachScriprtList();

  const mappedDataSource = dataSource.map((item) => {
    const matchedApproachOption = approachScriptOptions?.find(
      (option) => option.value === item.scriptId,
    );

    const matchedApproach = approachOptions?.find(
      (option) => option.value === item.approach,
    );

    return {
      ...item,
      scriptName: matchedApproachOption?.label,
      approachName: matchedApproach?.label,
    };
  });

  return (
    <div>
      <Flex justify="between" className=" items-center mb-4" gap="middle">
        <Title level={4} className="mb-24">
          Kế hoạch tiếp cận
        </Title>
        {!showAddButton && (
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
      <OTable<CampaignApproachPlanDTO>
        rowKey="id"
        columns={columns}
        data={mappedDataSource}
        onDeleteRow={deleteRecord}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        isCheckboxHidden={showAddButton}
        hideActions={showAddButton}
        onEdit={onEdit}
      />
    </div>
  );
};

export default CampaignApproachDetailTable;
