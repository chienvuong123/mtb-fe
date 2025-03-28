import { OTable } from '@components/organisms';
import { AButton } from '@components/atoms';
import { Flex } from 'antd';
import { CategoryType, type CampaignApproachPlanDTO } from '@dtos';
import type { ColumnType } from 'antd/es/table';
import React, { useMemo, useState, type Key } from 'react';
import Title from 'antd/lib/typography/Title';
import type { CBaseTable } from '@types';
import {
  useCategoryOptionsListQuery,
  useQueryApproachScriprtList,
} from '@hooks/queries';
import type { FormInstance } from 'antd/lib';
import { useWatch } from 'antd/es/form/Form';

const BUTTON_TEXT = {
  ADD: 'Thêm mới',
} as const;

export interface ICampaignApproachDetailTable
  extends CBaseTable<CampaignApproachPlanDTO> {
  onShowApproachForm?: () => void;
  hideAddButton?: boolean;
  form?: FormInstance;
}

const handleSort = (a?: string, b?: string) =>
  a && b ? a.localeCompare(b) : 0;

const columns: ColumnType<CampaignApproachPlanDTO>[] = [
  {
    title: 'Phương thức tiếp cận',
    dataIndex: 'approachName',
    minWidth: 326,
    showSorterTooltip: false,
    sorter: (a, b) => handleSort(a.approachName, b.approachName),
  },
  {
    title: 'Ghi chú',
    dataIndex: 'note',
    minWidth: 428,
    showSorterTooltip: false,
    sorter: (a, b) => handleSort(a.note, b.note),
  },
  {
    title: 'Kịch bản tiếp cận',
    dataIndex: 'scriptName',
    minWidth: 326,
    showSorterTooltip: false,
    sorter: (a, b) => handleSort(a.scriptName, b.scriptName),
  },
];

const CampaignApproachDetailTable: React.FC<ICampaignApproachDetailTable> = ({
  dataSource,
  hideAddButton,
  sortDirection,
  form,
  onEdit,
  onShowApproachForm,
  onDelete,
  onSort,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const deleteRecord = (key: Key) => {
    if (onDelete) {
      onDelete(key as string);
    }
  };
  const categoryId = useWatch('categoryId', form);

  const { data: approachOptions } = useCategoryOptionsListQuery({
    categoryTypeCode: CategoryType.APPROACH,
  });
  const { data: approachScriptOptions } = useQueryApproachScriprtList();

  const mappedDataSource = useMemo(
    () =>
      dataSource.map((item) => {
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
      }),

    [dataSource, approachOptions, approachScriptOptions],
  );

  return (
    <div>
      <Flex justify="between" className=" items-center mb-4" gap="middle">
        <Title level={3} className="mb-16">
          Kế hoạch tiếp cận
        </Title>
        {!hideAddButton && categoryId && (
          <AButton
            onClick={onShowApproachForm}
            type="primary"
            variant="filled"
            className="ml-auto mr-24"
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
        isCheckboxHidden
        hideActions={hideAddButton}
        onEdit={onEdit}
        confirmProps={{ title: 'Xóa kế hoạch tiếp cận' }}
        scroll={{ x: 1500 }}
        onSort={onSort}
        sortDirection={sortDirection}
      />
    </div>
  );
};

export default CampaignApproachDetailTable;
