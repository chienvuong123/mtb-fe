import React, { useMemo, type Key } from 'react';
import { Table, Form } from 'antd';
import { type ColumnsType } from 'antd/es/table';
import { PlusIcon } from '@assets/icons';
import { type TableRowSelection } from 'antd/es/table/interface';

import './styles.scss';
import { AButton } from '@components/atoms';
import { MEditableCell, MPagination } from '@components/molecules';
import clsx from 'clsx';
import {
  type EditableColumnType,
  type FixedType,
  type ITableForm,
  type TTableKey,
} from './OTableForm.type';
import TableActions from './TableActions';

const OTableForm = <T extends object & TTableKey>({
  data,
  form,
  editingKey,
  columns,
  selectedRowKeys,
  hideActions,
  showCreateBtn,
  paginations,
  setEditingKey,
  onCreate,
  onDeleteRow,
  onSubmitSave,
  onCancelSave,
  setSelectedRowKeys,
  onView,
}: ITableForm<T>) => {
  const edit = React.useCallback(
    (record: T) => {
      form.setFieldsValue({ ...record });
      setEditingKey?.(record.key as string);
    },
    [form, setEditingKey],
  );

  const cancel = React.useCallback(() => {
    setEditingKey?.(null);
    onCancelSave?.();
  }, [setEditingKey, onCancelSave]);

  const save = React.useCallback(
    async (key: Key) => {
      try {
        const row = (await form.validateFields()) as T;
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);
        if (index > -1) {
          newData[index] = { ...newData[index], ...row };
          onSubmitSave?.(row, newData);
          setEditingKey?.(null);
        }
      } catch (err) {
        console.error('Save failed:', err);
      }
    },
    [form, data, onSubmitSave, setEditingKey],
  );

  const mergedColumns = useMemo(() => {
    const transformColumns: EditableColumnType<T>[] = [
      ...columns,
      ...(hideActions
        ? []
        : [
            {
              title: 'Thao tác',
              dataIndex: 'actions',
              render: (_: unknown, record: T) => (
                <TableActions
                  record={record}
                  editable={record.key === editingKey}
                  onSave={save}
                  onCancel={cancel}
                  onEdit={edit}
                  onView={onView}
                  onDelete={(id) => onDeleteRow?.(id)}
                  editingKey={editingKey ?? null}
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
                  disabled={editingKey !== null}
                />
              ),
              dataIndex: 'create',
              width: 40,
              fixed: 'right' as FixedType,
            },
          ]
        : []),
    ];

    return transformColumns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: T) => ({
          record,
          inputType: col.inputType,
          inputProps: col.inputProps,
          rules: col.rules,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: record.key === editingKey,
        }),
      };
    }) as ColumnsType<T>;
  }, [
    columns,
    hideActions,
    showCreateBtn,
    editingKey,
    save,
    cancel,
    edit,
    onView,
    onDeleteRow,
    onCreate,
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

  const components = {
    body: {
      cell: MEditableCell,
    },
  };

  return (
    <>
      <Form form={form} component={false}>
        <Table<T>
          className={clsx('o-table', { 'with-pagination': !!paginations })}
          components={components}
          bordered={false}
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={false}
          rowSelection={rowSelection}
          scroll={{ x: 'max-content' }}
        />
      </Form>
      {paginations && <MPagination {...paginations} />}
    </>
  );
};

export default OTableForm;
