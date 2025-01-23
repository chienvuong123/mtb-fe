import { type EditableColumnType, OTableForm } from '@components/organisms';
import { INPUT_TYPE } from '@types';
import { Form } from 'antd';
import dayjs from 'dayjs';
import { type FC, useState } from 'react';

type TRecordType = {
  key: string;
  index: number;
  code: string;
  name: string;
  status: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
};

const dummmyData: TRecordType[] = [
  {
    index: 1,
    code: 'SP001',
    key: '1',
    name: 'Bob',
    status: 1,
    createdAt: '2024-06-17',
    createdBy: 'User3',
    updatedAt: '2024-09-14',
    updatedBy: 'User3',
  },
  {
    index: 2,
    code: 'SP001',
    key: '2',
    name: 'Charlie',
    status: 1,
    createdAt: '2024-04-09',
    createdBy: 'System',
    updatedAt: '2024-08-20',
    updatedBy: 'System',
  },
  {
    index: 3,
    code: 'SP001',
    key: '3',
    name: 'Eve',
    status: 1,
    createdAt: '2024-01-25',
    createdBy: 'System',
    updatedAt: '2024-08-19',
    updatedBy: 'User2',
  },
  {
    index: 4,
    code: 'SP001',
    key: '4',
    name: 'Alice',
    status: 1,
    createdAt: '2024-09-21',
    createdBy: 'User1',
    updatedAt: '2024-12-16',
    updatedBy: 'User2',
  },
  {
    index: 5,
    code: 'SP001',
    key: '5',
    name: 'Alice',
    status: 1,
    createdAt: '2024-10-24',
    createdBy: 'System',
    updatedAt: '2025-01-09',
    updatedBy: 'User1',
  },
  {
    index: 6,
    code: 'SP001',
    key: '6',
    name: 'Charlie',
    status: 2,
    createdAt: '2024-02-03',
    createdBy: 'User2',
    updatedAt: '2025-01-02',
    updatedBy: 'User2',
  },
  {
    index: 7,
    code: 'SP001',
    key: '7',
    name: 'Julia',
    status: 1,
    createdAt: '2024-08-16',
    createdBy: 'User3',
    updatedAt: '2024-11-28',
    updatedBy: 'Admin',
  },
  {
    index: 8,
    code: 'SP001',
    key: '8',
    name: 'Charlie',
    status: 1,
    createdAt: '2024-07-16',
    createdBy: 'Admin',
    updatedAt: '2024-10-30',
    updatedBy: 'Admin',
  },
  {
    index: 9,
    code: 'SP001',
    key: '9',
    name: 'David',
    status: 2,
    createdAt: '2024-12-26',
    createdBy: 'System',
    updatedAt: '2024-11-22',
    updatedBy: 'Admin',
  },
  {
    code: 'SP001',
    index: 10,

    key: '10',
    name: 'Alice',
    status: 2,
    createdAt: '2024-04-12',
    createdBy: 'Admin',
    updatedAt: '2024-12-24',
    updatedBy: 'User3',
  },
];

const columns: EditableColumnType<TRecordType>[] = [
  {
    title: 'STT',
    dataIndex: 'index',
    minWidth: 76,
    align: 'center',
  },
  {
    title: 'Mã',
    dataIndex: 'code',
    editable: true,
    inputType: INPUT_TYPE.TEXT,
    minWidth: 104,
    rules: [{ required: true, message: `Please input code!` }],
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    editable: true,
    inputType: INPUT_TYPE.TEXT,
    minWidth: 213,
    rules: [{ required: true, message: `Please input name!` }],
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    editable: true,
    inputType: INPUT_TYPE.SELECT,
    minWidth: 164,
    inputProps: {
      options: [
        { value: 1, label: 'Status 1' },
        { value: 2, label: 'Status 2' },
      ],
    },
    rules: [{ required: true, message: `Please input status!` }],
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    minWidth: 164,
  },
  {
    title: 'Người tạo',
    dataIndex: 'createdBy',
    minWidth: 164,
  },
  {
    title: 'Ngày cập nhật',
    dataIndex: 'updatedAt',
    minWidth: 164,
  },
  {
    title: 'Người cập nhật',
    dataIndex: 'updatedBy',
    minWidth: 164,
  },
];

const ProductTable: FC = () => {
  const [dataSource, setDataSource] = useState<TRecordType[]>(dummmyData);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const [form] = Form.useForm();

  const addNewRow = () => {
    const newRecord: TRecordType = {
      key: `INSERT_${new Date().toString()}`,
      index: 0,
      code: '',
      name: '',
      status: 1,
      createdAt: dayjs().format('YYYY-MM-DD'),
      updatedAt: dayjs().format('YYYY-MM-DD'),
      createdBy: 'You',
      updatedBy: 'You',
    };
    setDataSource([newRecord, ...dataSource]);
    setEditingKey(newRecord.key);
    form.setFieldsValue(newRecord);
  };

  const deleteRecord = (key: string) => {
    setDataSource(dataSource.filter((item) => item.key !== key));
  };

  const handleSave = async (values: TRecordType, data: TRecordType[]) => {
    try {
      console.log(values, data);
      setDataSource(data);
    } catch (e: unknown) {
      console.log(e);
    }
  };

  const handleCancel = () => {
    setDataSource((pre) => pre.filter((item) => !item.key.includes('INSERT_')));
  };

  return (
    <OTableForm<TRecordType>
      columns={columns}
      data={dataSource}
      form={form}
      editingKey={editingKey}
      selectedRowKeys={selectedRowKeys}
      onAddNewRow={addNewRow}
      onDeleteRow={deleteRecord}
      setEditingKey={setEditingKey}
      onSubmitSave={handleSave}
      onCancelSave={handleCancel}
      setSelectedRowKeys={setSelectedRowKeys}
      showCreateBtn
    />
  );
};

export default ProductTable;
