import { AButton, ASelect } from '@components/atoms';
import { ATextArea } from '@components/atoms/a-textarea';
import { APPROACH_STATUS_OPTIONS, STATUS_OPTIONS } from '@constants/masterData';
import { type CustomerApproachDTO } from '@dtos';
import { Flex, Rate, Typography } from 'antd';
import { type FC } from 'react';

interface IScenarioScriptFooterProps {
  approach?: CustomerApproachDTO;
}

const ScenarioScriptFooter: FC<IScenarioScriptFooterProps> = ({ approach }) => {
  return (
    <Flex gap={24} vertical className="mt-24">
      <Flex gap={24} justify="space-between" align="flex-end">
        <Flex gap={8} style={{ width: 140 }} vertical>
          <Typography.Text>Trạng thái</Typography.Text>
          <ASelect options={STATUS_OPTIONS} placeholder="Chọn" />
        </Flex>
        <Flex gap={8} style={{ width: 140 }} vertical>
          <Typography.Text>Kết quả tiếp cận</Typography.Text>
          <ASelect options={APPROACH_STATUS_OPTIONS} placeholder="Chọn" />
        </Flex>
        <AButton type="primary">Chuyển thông tin booking</AButton>
        <Flex gap={8} vertical>
          <Typography.Text>Khách hàng đánh giá chiến dịch</Typography.Text>
          <Rate
            style={{
              fontSize: 38,
            }}
            defaultValue={approach?.rating}
          />
        </Flex>
        <Flex gap={8} flex={1} vertical>
          <Typography.Text>Ghi chú</Typography.Text>
          <ATextArea
            placeholder="Nhập..."
            maxLength={100}
            showCount={{
              formatter: ({ count, maxLength }) => `(${count}/${maxLength})`,
            }}
            autoSize={{ minRows: 1, maxRows: 1 }}
          />
        </Flex>
      </Flex>
      <Flex gap={24} justify="end">
        <AButton>Hủy</AButton>
        <AButton type="primary">Lưu</AButton>
      </Flex>
    </Flex>
  );
};

export default ScenarioScriptFooter;
