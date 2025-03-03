import { ForwardArrowIcon } from '@assets/icons';
import { AButton } from '@components/atoms';
import { Flex, Typography } from 'antd';
import type { FC } from 'react';

interface ISellerAssignmentActions {
  totalCustomer: number;
  disabledDivide?: boolean;
  disabledCreate?: boolean;
  onUnlockAll: () => void;
  onDivide: () => void;
  onCreateSeller: () => void;
}

const SellerAsignmentActions: FC<ISellerAssignmentActions> = ({
  totalCustomer,
  disabledCreate,
  disabledDivide,
  onCreateSeller,
  onDivide,
  onUnlockAll,
}) => {
  return (
    <Flex className="my-16" align="end" justify="space-between">
      <div>
        <Typography.Text className="red">
          • &nbsp;Khi ấn khóa dừng chia, Seller sẽ được ấn định số lượng khách
          hàng = 0, không được chia đều số lượng khách.
        </Typography.Text>
        <br />
        <Typography.Text className="red">
          • &nbsp;Các Seller được chia đều số lượng khách, số dư được gán cho
          các Seller đầu tiên trong danh sách
        </Typography.Text>
        <Flex className="mt-20" gap={8}>
          <ForwardArrowIcon />
          <Typography.Text>Tổng khách hàng:</Typography.Text>
          <Typography.Text className="cbg7">{totalCustomer}</Typography.Text>
        </Flex>
      </div>
      <Flex gap={24}>
        <AButton variant="filled" color="primary" onClick={onUnlockAll}>
          Mở khóa tất cả
        </AButton>
        <AButton type="primary" onClick={onDivide} disabled={disabledDivide}>
          Chia đều
        </AButton>
        <AButton
          type="primary"
          onClick={onCreateSeller}
          disabled={disabledCreate}
        >
          Thêm Seller
        </AButton>
      </Flex>
    </Flex>
  );
};

export default SellerAsignmentActions;
