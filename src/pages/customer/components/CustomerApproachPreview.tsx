import { AButton } from '@components/atoms';
import { ASegmented } from '@components/atoms/a-segmented';
import { EApproachStatus, type CustomerApproachDTO } from '@dtos';
import { Flex, Input } from 'antd';
import { useState, type FC } from 'react';
import ScenarioScriptContainer from './ScenarioScriptContainer';

interface ICustomerApproachPreview {
  data: CustomerApproachDTO[];
}

const statusObject: Record<EApproachStatus, string> = {
  [EApproachStatus.PENDING]: 'Chưa bắt đầu',
  [EApproachStatus.INPROGRESS]: 'Đang triển khai',
  [EApproachStatus.FINISHED]: 'Hoàn thành',
};

const CustomerApproachPreview: FC<ICustomerApproachPreview> = ({ data }) => {
  const [approach, setApproach] = useState<CustomerApproachDTO | null>(data[0]);
  return (
    <div>
      <Flex align="center" justify="space-between" className="mb-16">
        <ASegmented
          size="large"
          options={data.map((x) => ({
            label: `Lần ${x.id}`,
            value: x.id,
          }))}
          onChange={(value) => {
            setApproach(data.find((x) => x.id === value) ?? null);
          }}
        />
        <div>
          <p className="mb-4">Trạng thái</p>
          <Input
            value={approach?.status ? statusObject[approach.status] : ''}
            disabled
          />
        </div>
      </Flex>
      <div className="border-2 rounded-8 border-gray-border bg-white pa-24">
        <Flex align="center" justify="space-between" className="mb-16">
          <div>
            <p className="mb-4">Seller</p>
            <Input value={approach?.seller?.fullName} disabled />
          </div>
          <AButton type="primary">Thông tin hạn mức</AButton>
        </Flex>
        {approach?.scenario && (
          <ScenarioScriptContainer
            key={approach.id}
            approach={approach}
            scenario={approach?.scenario}
          />
        )}
      </div>
    </div>
  );
};

export default CustomerApproachPreview;
