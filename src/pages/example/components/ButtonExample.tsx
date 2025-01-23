import { Download04Icon, Upload05Icon } from '@assets/icons';
import {
  AAlert,
  AInputArea,
  AInputOtp,
  ASelect,
  ATag,
  AButton,
} from '@components/atoms';
import { MPagination } from '@components/molecules';
import { Divider, Flex, Input } from 'antd';
import { useState } from 'react';

const exampleOpt = [
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'Yiminghe', label: 'yiminghe' },
];

const ButtonExample = () => {
  const [paginationConfig, setPaginationConfig] = useState({
    current: 1,
    pageSize: 10,
    total: 100,
  });

  return (
    <>
      <Flex className="mb-24" gap="small" wrap>
        <AButton size="small" type="primary">
          Text
        </AButton>
        <AButton size="small" color="blue" variant="filled">
          Text
        </AButton>
        <AButton size="small" color="green" variant="filled">
          Text
        </AButton>
        <AButton size="small" color="red" variant="filled">
          Text
        </AButton>
      </Flex>
      <Flex className="mb-24" gap="small" wrap>
        <AButton type="primary">Text</AButton>
        <AButton color="blue" variant="filled">
          Text
        </AButton>
        <AButton color="green" variant="filled">
          Text
        </AButton>
        <AButton color="red" variant="filled">
          Text
        </AButton>
      </Flex>
      <Flex className="mb-24" gap="small" wrap>
        <AButton type="primary" icon={<Download04Icon />} />
        <AButton color="primary" variant="filled" icon={<Upload05Icon />} />
      </Flex>
      <Divider />
      {/* Tag */}
      <ATag color="green">Đang triển khai</ATag>
      <ATag color="blue">Chưa bắt đầu</ATag>
      <ATag color="red">Kết thúc</ATag>
      <Divider />
      {/* Alert */}
      <AAlert message="Máy tính đã kết nối với USB Token" type="success" />
      <AAlert message="Máy tính đã kết nối với USB Token" type="error" />
      <AAlert message="Máy tính đã kết nối với USB Token" type="warning" />
      <Divider />
      {/* Input */}
      <Input />
      <AInputOtp length={6} />
      <AInputArea maxLength={100} />
      <ASelect options={exampleOpt} />
      {/* Pagination */}
      <MPagination
        pagination={paginationConfig}
        setPagination={setPaginationConfig}
      />
    </>
  );
};

export default ButtonExample;
