import React, { useMemo } from 'react';
import { Table, Form } from 'antd';
import { type ColumnsType } from 'antd/es/table';
import { PlusIcon } from '@assets/icons';
import { type TableRowSelection } from 'antd/es/table/interface';

import './styles.scss';
import { AButton } from '@components/atoms';
import { MEditableCell } from '@components/molecules';
import {
  type EditableColumnType,
  type FixedType,
  type ITableForm,
} from './OTableForm.type';
import TableActions from './TableActions';

const OTableForm = <T extends object & { key: string }>({
  data,
  form,
  editingKey,
  columns,
  selectedRowKeys,
  hideActions,
  showCreateBtn,
  setEditingKey,
  onAddNewRow,
  onDeleteRow,
  onSubmitSave,
  onCancelSave,
  setSelectedRowKeys,
  onView,
}: ITableForm<T>) => {
  const edit = React.useCallback(
    (record: T) => {
      form.setFieldsValue({ ...record });
      setEditingKey(record.key);
    },
    [form, setEditingKey],
  );

  const cancel = React.useCallback(() => {
    setEditingKey(null);
    onCancelSave();
  }, [setEditingKey, onCancelSave]);

  const save = React.useCallback(
    async (key: string) => {
      try {
        const row = (await form.validateFields()) as T;
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);
        if (index > -1) {
          newData[index] = { ...newData[index], ...row };
          onSubmitSave(row, newData);
          setEditingKey(null);
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
                  onDelete={onDeleteRow}
                  editingKey={editingKey}
                />
              ),
            },
          ]),
      ...(showCreateBtn
        ? [
            {
              title: (
                <AButton
                  onClick={onAddNewRow}
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
    onAddNewRow,
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
    <Form form={form} component={false}>
      <Table<T>
        style={{ border: '1px solid #E0E2E7', borderRadius: 8 }} // FIXME: will be fixed
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
  );
};

export default OTableForm;
