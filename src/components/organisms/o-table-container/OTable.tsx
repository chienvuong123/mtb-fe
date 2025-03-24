import { Table } from 'antd';
import type {
  SortOrder,
  SorterResult,
  TableRowSelection,
} from 'antd/es/table/interface';
import { useMemo, useState, type Key } from 'react';

import { MPagination } from '@components/molecules';
import { SORT_ORDER_FOR_CLIENT } from '@constants/masterData';
import type { ColumnType } from 'antd/es/table';
import clsx from 'clsx';
import { getTableIndex } from '@pages/category/utils';
import { useIsFetching } from '@tanstack/react-query';
import { OModalConfirm } from '../o-modal';
import type { FixedType, ITable, TColumnType } from './OTabletype';
import './styles.scss';
import TableActions from './TableActions';

const OTable = <T extends object>({
  data,
  columns,
  selectedRowKeys,
  hideActions,
  hideIndexColumn,
  paginations,
  sortDirection,
  confirmProps,
  isCheckboxHidden,
  rowKey,
  rowSelection,
  blockingEditIds,
  blockingDeleteIds,
  tableRowKey,
  onEdit,
  onDeleteRow,
  onView,
  onCall,
  onList,
  onSort,
  setSelectedRowKeys,
  ...props
}: ITable<T>) => {
  const [showModal, setShowModal] = useState(false);
  const [recordKey, setRecordKey] = useState<Key | null>(null);

  const isLoading = useIsFetching();

  const transformColumns: ColumnType<T>[] = useMemo(() => {
    const columnsWithSort: ColumnType<T>[] = sortDirection
      ? columns.map((col) => {
          const transformDirection =
            sortDirection && sortDirection.field?.includes('.')
              ? {
                  field: sortDirection.field?.split('.'),
                  direction: sortDirection.direction,
                }
              : sortDirection;
          if (
            JSON.stringify(col.dataIndex) ===
              JSON.stringify(transformDirection.field) &&
            transformDirection.direction
          ) {
            return {
              ...col,
              sortOrder:
                SORT_ORDER_FOR_CLIENT[transformDirection.direction] ?? null,
            };
          }
          return col;
        })
      : columns;

    return (
      [
        ...(hideIndexColumn
          ? []
          : [
              {
                title: 'STT',
                dataIndex: 'index',
                minWidth: 76,
                width: 112,
                align: 'center',
                render: (_: unknown, __: unknown, idx: number) => {
                  return getTableIndex(
                    idx,
                    paginations?.pagination.current,
                    paginations?.pagination.pageSize,
                  );
                },
              },
            ]),
        ...columnsWithSort,
        ...(hideActions
          ? []
          : [
              {
                title: 'Thao tác',
                dataIndex: 'actions',
                fixed: 'right' as FixedType,
                width: 134,
                align: 'center',
                minWidth: 120,
                render: (_: unknown, record: T) => (
                  <div className="dis-flex jc-center">
                    <TableActions
                      rowKey={rowKey}
                      record={record}
                      editable={false}
                      onEdit={
                        blockingEditIds?.includes(record[rowKey] as string)
                          ? undefined
                          : onEdit
                      }
                      onView={onView}
                      onCall={onCall}
                      onList={onList}
                      onDelete={
                        onDeleteRow &&
                        !blockingDeleteIds?.includes(record[rowKey] as string)
                          ? (key: Key) => {
                              setRecordKey(key);
                              setShowModal(true);
                            }
                          : undefined
                      }
                      editingKey={null}
                    />
                  </div>
                ),
              },
            ]),
      ] as ColumnType<T>[]
    ).map((i) => {
      if (i?.render) return i;
      return { ellipsis: true, ...i };
    });
  }, [
    columns,
    hideActions,
    sortDirection,
    paginations,
    hideIndexColumn,
    rowKey,
    blockingEditIds,
    blockingDeleteIds,
    onDeleteRow,
    onEdit,
    onView,
    onCall,
    onList,
  ]);

  const onSelectChange = (selectedRow: T, selected: boolean) => {
    setSelectedRowKeys?.((pre) => {
      if (selected) {
        return [...pre, selectedRow[rowKey] as string];
      }
      return pre.filter((i) => i !== selectedRow[rowKey]);
    });
  };

  const transformRowSelection: TableRowSelection<T> = {
    selectedRowKeys,
    columnWidth: 73,
    onSelect: onSelectChange,
    getCheckboxProps: () => ({
      className: 'table-form-checkbox px-15',
    }),
    ...rowSelection,
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setRecordKey(null);
  };

  const handleSubmitDelete = () => {
    if (recordKey && onDeleteRow) {
      onDeleteRow(recordKey);
      handleCloseModal();
    }
  };

  return (
    <>
      <OModalConfirm
        open={showModal}
        onCancel={handleCloseModal}
        onClose={handleCloseModal}
        onOk={handleSubmitDelete}
        {...confirmProps}
      />
      <Table<T>
        loading={isLoading > 0}
        className={clsx('o-table', { 'with-pagination': !!paginations })}
        bordered={false}
        dataSource={data}
        columns={transformColumns}
        rowClassName="editable-row"
        pagination={false}
        rowSelection={!isCheckboxHidden ? transformRowSelection : undefined}
        scroll={{ x: 'max-content' }}
        locale={{ emptyText: 'Không có dữ liệu' }}
        rowKey={tableRowKey || ((record) => record[rowKey] as Key)}
        onChange={(_p, _f, s) => {
          const { field, order, column } = s as SorterResult<T>;
          const record = column as TColumnType<T>;
          onSort?.({
            field: record?.sortFieldName ?? (field as string),
            direction: order as SortOrder,
            unicodeSort: record?.unicodeSort,
          });
        }}
        {...props}
      />
      {paginations && <MPagination {...paginations} />}
    </>
  );
};

export default OTable;
