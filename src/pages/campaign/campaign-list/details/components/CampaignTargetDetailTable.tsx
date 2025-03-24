import { OTable } from '@components/organisms';
import { AButton } from '@components/atoms';
import { Flex, Typography } from 'antd';
import type { ColumnType } from 'antd/es/table';
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
  hideAddButton?: boolean;
}

const handleSort = (a?: string, b?: string) =>
  a && b ? a.localeCompare(b) : 0;

const columns: ColumnType<CampaignTargetDTO>[] = [
  {
    title: 'Tên mục tiêu',
    dataIndex: 'name',
    minWidth: 213,
    sorter: (a, b) => handleSort(a.name, b.name),
    showSorterTooltip: false,
  },
  {
    title: 'Giá trị mục tiêu',
    dataIndex: 'value',
    minWidth: 213,
    sorter: (a, b) => handleSort(a.value, b.value),
    showSorterTooltip: false,
  },
  {
    title: 'Đơn vị',
    dataIndex: 'unitName',
    minWidth: 213,
    width: 213,
    showSorterTooltip: false,
    sorter: (a, b) => handleSort(a.unitName, b.unitName),
  },
];

const CampaignTargetDetailTable: React.FC<ICampaignTargetDetailTable> = ({
  dataSource,
  hideAddButton,
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
    <div className="py-16">
      <Flex justify="between" className=" items-center mb-16" gap="middle">
        <Typography.Text className="fs-14 fw-500">Mục tiêu</Typography.Text>
        {!hideAddButton && (
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
        isCheckboxHidden
        hideActions={hideAddButton}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        confirmProps={{ title: 'Xoá mục tiêu' }}
        scroll={{ x: 1400 }}
      />
    </div>
  );
};

export default CampaignTargetDetailTable;
