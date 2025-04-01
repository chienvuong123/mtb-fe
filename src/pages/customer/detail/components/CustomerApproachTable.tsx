import { OTable } from '@components/organisms';
import { DATE_SLASH_FORMAT_DDMMYYYY_HHMMSS } from '@constants/dateFormat';
import { CategoryType, type ApproachScriptDTO } from '@dtos';
import {
  useCategoryOptionsListQuery,
  useApproachScriptViewByCustomerQuery,
} from '@hooks/queries';
import { getOptionLabel } from '@utils/objectHelper';
import type { ColumnType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useEffect, type FC } from 'react';
import { useParams } from 'react-router-dom';

export type TApproachScriptRecord = Partial<ApproachScriptDTO>;

const CustomerApproachTable: FC<{
  calledIds: string[];
  setCalledIds: React.Dispatch<React.SetStateAction<string[]>>;
  activeId?: string;
  setActiveId?: React.Dispatch<React.SetStateAction<string | undefined>>;
}> = ({ calledIds, activeId, setActiveId, setCalledIds }) => {
  const { id: customerId } = useParams();

  const { data: approachScriptData } =
    useApproachScriptViewByCustomerQuery(customerId);

  const { data: approachResultOptions } = useCategoryOptionsListQuery({
    categoryTypeCode: CategoryType.CUSTOMER_APPROACH_RESULT,
  });

  const { data: approachDetailOptions } = useCategoryOptionsListQuery({
    categoryTypeCode: CategoryType.CUSTOMER_APPROACH_DETAIL,
  });

  const columns: ColumnType<TApproachScriptRecord>[] = [
    {
      title: 'Lần tiếp cận số',
      dataIndex: 'index',
      minWidth: 80,
      render: (_: unknown, __: unknown, idx: number) => idx + 1,
    },
    {
      title: 'Ngày',
      dataIndex: ['approachResult', 'updatedDate'],
      minWidth: 120,
      render: (value) => {
        if (!value) {
          return '';
        }
        return dayjs(value).format(DATE_SLASH_FORMAT_DDMMYYYY_HHMMSS);
      },
    },
    {
      title: 'Phương thức tiếp cận',
      dataIndex: 'approach',
      minWidth: 160,
    },
    {
      title: 'Ghi chú',
      dataIndex: ['approachResult', 'note'],
      minWidth: 164,
    },
    {
      title: 'Kịch bản tiếp cận',
      dataIndex: 'name',
      minWidth: 164,
    },
    {
      title: 'Kết quả tiếp cận',
      dataIndex: ['approachResult', 'result'],
      minWidth: 164,
      render: (value) => getOptionLabel(approachResultOptions, value),
    },
    {
      title: 'Kết quả tiếp cận chi tiết',
      dataIndex: ['approachResult', 'resultDetail'],
      minWidth: 164,
      render: (value) => getOptionLabel(approachDetailOptions, value),
    },
    {
      title: 'Seller',
      dataIndex: 'sellerName',
      minWidth: 164,
    },
  ];

  useEffect(() => {
    if (approachScriptData) {
      const ids = approachScriptData
        .filter((i) => i.approachResult?.called)
        .map((i) => i.id);
      setCalledIds(ids);

      const findActiveId =
        approachScriptData.filter((i) => !i.approachResult?.called)?.[0]?.id ||
        'pass-all';

      setActiveId?.(findActiveId);
    }
  }, [approachScriptData, setCalledIds, setActiveId]);

  return (
    <OTable<TApproachScriptRecord>
      columns={columns}
      data={approachScriptData || []}
      selectedRowKeys={calledIds}
      setSelectedRowKeys={setCalledIds}
      rowSelection={{
        getCheckboxProps: (record) => ({
          className: 'table-form-checkbox px-15',
          disabled: record.id ? activeId !== record.id : false,
        }),
      }}
      hideActions
      rowKey="id"
    />
  );
};

export default CustomerApproachTable;
