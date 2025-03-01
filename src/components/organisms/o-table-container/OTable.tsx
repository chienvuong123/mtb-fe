import { Table } from 'antd';
import type { TableRowSelection } from 'antd/es/table/interface';
import React, { useMemo, useState, type Key } from 'react';

import { MPagination } from '@components/molecules';
import { SORT_ORDER_FOR_CLIENT } from '@constants/masterData';
import type { ColumnType } from 'antd/es/table';
import clsx from 'clsx';
import { getTableIndex } from '@pages/category/utils';
import { OModalConfirm } from '../o-modal';
import type { FixedType, ITable } from './OTabletype';
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
  tableRowKey,
  onEdit,
  onDeleteRow,
  onView,
  onCall,
  setSelectedRowKeys,
  ...props
}: ITable<T>) => {
  const [showModal, setShowModal] = useState(false);
  const [recordKey, setRecordKey] = useState<Key | null>(null);

  const transformColumns: ColumnType<T>[] = useMemo(() => {
    const columnsWithSort: ColumnType<T>[] = sortDirection
      ? columns.map((col) => {
          const transformDirection =
            sortDirection && sortDirection.field?.includes('.')
              ? {
                  field: sortDirection.field.split('.'),
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
                      onEdit={onEdit}
                      onView={onView}
                      onCall={onCall}
                      onDelete={
                        onDeleteRow &&
                        ((key: Key) => {
                          setRecordKey(key);
                          setShowModal(true);
                        })
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
    onDeleteRow,
    onEdit,
    onView,
    onCall,
  ]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys?.(newSelectedRowKeys as string[]);
  };

  const rowSelection: TableRowSelection<T> = {
    selectedRowKeys,
    columnWidth: 73,
    onChange: onSelectChange,
    getCheckboxProps: () => ({
      className: 'table-form-checkbox px-15',
    }),
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
        className={clsx('o-table', { 'with-pagination': !!paginations })}
        bordered={false}
        dataSource={data}
        columns={transformColumns}
        rowClassName="editable-row"
        pagination={false}
        rowSelection={!isCheckboxHidden ? rowSelection : undefined}
        scroll={{ x: 'max-content' }}
        locale={{ emptyText: 'Không có dữ liệu' }}
        rowKey={tableRowKey || ((record) => record[rowKey] as Key)}
        {...props}
      />
      {paginations && <MPagination {...paginations} />}
    </>
  );
};

export default OTable;
