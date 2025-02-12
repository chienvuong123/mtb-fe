import React, { useMemo, useState, type Key } from 'react';
import { Table } from 'antd';
import { PlusIcon } from '@assets/icons';
import type { TableRowSelection } from 'antd/es/table/interface';

import './styles.scss';
import { AButton } from '@components/atoms';
import type { TableProps, ColumnType } from 'antd/es/table';
import { MPagination } from '@components/molecules';
import clsx from 'clsx';
import type { OrderDTO } from '@dtos';
import { SORT_ORDER_FOR_CLIENT } from '@constants/masterData';
import type { FixedType, ITableForm, TTableKey } from './OTableForm.type';
import TableActions from './TableActions';
import { OModalConfirm } from '../o-modal';

export interface ITable<T>
  extends Omit<TableProps<T>, 'columns'>,
    Omit<
      ITableForm<T>,
      | 'form'
      | 'editingKey'
      | 'setEditingKey'
      | 'onSubmitSave'
      | 'onCancelSave'
      | 'columns'
    > {
  columns: ColumnType<T>[];
  sortDirection?: OrderDTO;
  onEdit?: (record: T) => void;
}

const OTable = <T extends object & TTableKey>({
  data,
  columns,
  selectedRowKeys,
  hideActions,
  showCreateBtn,
  paginations,
  sortDirection,
  onCreate,
  onEdit,
  onDeleteRow,
  onView,
  setSelectedRowKeys,
  ...props
}: ITable<T>) => {
  const [showModal, setShowModal] = useState(false);
  const [recordKey, setRecordKey] = useState<Key | null>(null);

  const transformColumns = useMemo(() => {
    const columnsWithSort = sortDirection
      ? columns.map((col) => {
          if (
            col.dataIndex === sortDirection.field &&
            sortDirection.direction
          ) {
            return {
              ...col,
              sortOrder: SORT_ORDER_FOR_CLIENT[sortDirection.direction] ?? null,
            };
          }
          return col;
        })
      : columns;

    return [
      ...columnsWithSort,
      ...(hideActions
        ? []
        : [
            {
              title: 'Thao tác',
              dataIndex: 'actions',
              render: (_: unknown, record: T) => (
                <TableActions
                  record={record}
                  editable={false}
                  onEdit={onEdit}
                  onView={onView}
                  onDelete={(key) => {
                    setShowModal(true);
                    setRecordKey(key);
                  }}
                  editingKey={null}
                />
              ),
            },
          ]),
      ...(showCreateBtn
        ? [
            {
              title: (
                <AButton
                  onClick={onCreate}
                  type="primary"
                  icon={<PlusIcon />}
                />
              ),
              dataIndex: 'create',
              width: 40,
              fixed: 'right' as FixedType,
            },
          ]
        : []),
    ];
  }, [
    columns,
    hideActions,
    showCreateBtn,
    sortDirection,
    onCreate,
    onEdit,
    onView,
  ]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys?.(newSelectedRowKeys as string[]);
  };

  const rowSelection: TableRowSelection<T> = {
    selectedRowKeys,
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
      />
      <Table<T>
        className={clsx('o-table', { 'with-pagination': !!paginations })}
        bordered={false}
        dataSource={data}
        columns={transformColumns}
        rowClassName="editable-row"
        pagination={false}
        rowSelection={rowSelection}
        scroll={{ x: 'max-content' }}
        locale={{ emptyText: 'Không có dữ liệu' }}
        {...props}
      />
      {paginations && <MPagination {...paginations} />}
    </>
  );
};

export default OTable;
