import { OTable } from '@components/organisms';
import { AButton } from '@components/atoms';
import { Flex } from 'antd';
import type { ColumnType } from 'antd/es/table';
import Title from 'antd/lib/typography/Title';
import React, { useState, type Key } from 'react';
import { CategoryType, type CampaignTargetDTO } from '@dtos';
import type { CBaseTable } from '@types';
import { useCategoryOptionsListQuery } from '@hooks/queries';

const BUTTON_TEXT = {
  ADD: 'Thêm mới',
} as const;

export interface ICampaignTargetDetailTable
  extends CBaseTable<CampaignTargetDTO> {
  onShowTargetForm?: () => void;
  showAddButton?: boolean;
}

const columns: ColumnType<CampaignTargetDTO>[] = [
  {
    title: 'Tên mục tiêu',
    dataIndex: 'name',
    minWidth: 213,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Giá trị mục tiêu',
    dataIndex: 'value',
    minWidth: 213,
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Đơn vị',
    dataIndex: 'unit',
    minWidth: 213,
    sorter: true,
    showSorterTooltip: false,
    render: (_, record) => {
      return record.unitName;
    },
  },
];

const CampaignTargetDetailTable: React.FC<ICampaignTargetDetailTable> = ({
  dataSource,
  showAddButton,
  onDelete,
  onEdit,
  onShowTargetForm,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const deleteRecord = (key: Key) => {
    if (onDelete) {
      onDelete(key as string);
    }
  };

  const { data: unitCalculationOptions } = useCategoryOptionsListQuery({
    categoryTypeCode: CategoryType.UNIT_OF_CALCULATION,
  });

  const mappedDataSource = dataSource.map((item) => {
    const matchedApproachOption = unitCalculationOptions?.find(
      (option) => option.value === item.unit,
    );

    return {
      ...item,
      unitName: matchedApproachOption?.label,
    };
  });

  return (
    <div className="px-40 py-28">
      <Flex justify="between" className=" items-center mb-4" gap="middle">
        <Title level={4} className="mb-24">
          Mục tiêu
        </Title>
        {!showAddButton && (
          <AButton
            onClick={onShowTargetForm}
            type="primary"
            variant="filled"
            className="ml-auto"
          >
            {BUTTON_TEXT.ADD}
          </AButton>
        )}
      </Flex>
      <OTable<CampaignTargetDTO>
        rowKey="id"
        columns={columns}
        data={mappedDataSource}
        onEdit={onEdit}
        onDeleteRow={deleteRecord}
        isCheckboxHidden={showAddButton}
        hideActions={showAddButton}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      />
    </div>
  );
};

export default CampaignTargetDetailTable;
