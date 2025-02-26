import {
  OBaseForm,
  ODrawer,
  OTable,
  type IDrawer,
  type TTableKey,
} from '@components/organisms';
import type { AssignmentSellerItemDTO } from '@dtos';
import { SELLER_KEY, useSellerBlankQuery } from '@hooks/queries';
import { Form } from 'antd';
import type { ColumnType } from 'antd/es/table';
import { useMemo, useState, type FC } from 'react';
import { INPUT_TYPE } from '@types';

interface ISellerAddFormDrawer {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: string[]) => void;
  drawerProps?: IDrawer;
}

const columns: ColumnType<AssignmentSellerItemDTO & TTableKey>[] = [
  {
    title: 'Tài khoản seller',
    dataIndex: 'email',
    width: 283,
  },
  {
    title: 'Tên seller',
    dataIndex: 'sellerName',
    width: 200,
  },
];

const SellerAddFormDrawer: FC<ISellerAddFormDrawer> = ({
  open,
  drawerProps,
  onClose,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [keyword, setKeyword] = useState('');

  const { data: dataRes } = useSellerBlankQuery(keyword, open);
  const dataList = useMemo(() => {
    if (!dataRes?.data) return [];

    return dataRes?.data?.map((i) => ({ ...i, key: i.sellerId }));
  }, [dataRes?.data]);

  const handleCancel = () => {
    setSelectedRowKeys([]);
    form.resetFields();
    onClose();
  };

  const handleSearch = ({ keyword: insertKeyword }: { keyword: string }) => {
    setKeyword(insertKeyword);
  };

  return (
    <ODrawer
      title="Thêm Seller"
      open={open}
      onClose={handleCancel}
      width={687}
      {...drawerProps}
    >
      <OBaseForm
        mutationKey={SELLER_KEY}
        form={form}
        onSubmit={handleSearch}
        items={[
          {
            type: INPUT_TYPE.TEXT,
            label: 'Thêm Seller',
            name: 'keyword',
            inputProps: { placeholder: 'Nhập...' },
            colProps: { span: 24 },
          },
        ]}
        saveBtnProps={{
          htmlType: 'button',
          onClick: () => onSubmit(selectedRowKeys),
        }}
      >
        <OTable
          columns={columns}
          data={dataList}
          hideActions
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          className="mt-16"
        />
      </OBaseForm>
    </ODrawer>
  );
};

export default SellerAddFormDrawer;
