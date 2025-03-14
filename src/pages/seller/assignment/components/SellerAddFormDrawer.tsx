import {
  OBaseForm,
  ODrawer,
  OTable,
  type IDrawer,
} from '@components/organisms';
import type { AssignmentSellerItemDTO } from '@dtos';
import { SELLER_KEY, useSellerBlankQuery } from '@hooks/queries';
import { Form } from 'antd';
import type { ColumnType } from 'antd/es/table';
import { useState, type FC } from 'react';
import { INPUT_TYPE } from '@types';

interface ISellerAddFormDrawer {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: string[], reset: () => void) => void;
  drawerProps?: IDrawer;
  campaignId: string;
}

const columns: ColumnType<AssignmentSellerItemDTO>[] = [
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
  campaignId,
}) => {
  const [form] = Form.useForm();

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [keyword, setKeyword] = useState('');

  const { data: dataRes } = useSellerBlankQuery({ keyword, campaignId }, open);

  const handleCancel = () => {
    setSelectedRowKeys([]);
    setKeyword('');
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
          onClick: () => onSubmit(selectedRowKeys, handleCancel),
        }}
        onClose={handleCancel}
      >
        <OTable
          rowKey="sellerId"
          hideIndexColumn
          columns={columns}
          data={dataRes?.data ?? []}
          hideActions
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          className="mt-16"
          scroll={{ y: undefined }}
        />
      </OBaseForm>
    </ODrawer>
  );
};

export default SellerAddFormDrawer;
