import { AButton } from '@components/atoms';
import { ACollapse } from '@components/atoms/a-collapse';
import { ASegmented } from '@components/atoms/a-segmented';
import {
  EApproachStatus,
  type CustomerApproachDTO,
  type ScenarioDTO,
} from '@dtos';
import { Flex, Input, theme, Typography } from 'antd';
import { useMemo, useState, type FC } from 'react';

interface ICustomerApproachPreview {
  data: CustomerApproachDTO[];
}

const statusObject: Record<EApproachStatus, string> = {
  [EApproachStatus.PENDING]: 'Chưa bắt đầu',
  [EApproachStatus.INPROGRESS]: 'Đang triển khai',
  [EApproachStatus.FINISHED]: 'Hoàn thành',
};

const ScenarioPreview: FC<{ data: ScenarioDTO }> = ({ data }) => {
  const { token } = theme.useToken();

  const attributeItems = useMemo(() => {
    return data.attributes?.map((attr) => ({
      key: attr.id,
      label: attr.name,
      content: attr.value,
      children: attr.content,
      style: {
        marginBottom: 16,
        borderRadius: token.borderRadiusLG,
        overflow: 'hidden',
        border: 'none',
      },
    }));
  }, [data.attributes, token]);
  return (
    <div>
      <Typography.Title level={4} className="mt-24 mb-16">
        Kịch bản {data.name}
      </Typography.Title>
      <ACollapse
        bordered={false}
        defaultActiveKey={attributeItems?.map((x) => x.key)}
        expandIconPosition="right"
        style={{ background: token.colorBgContainer }}
        items={attributeItems}
      />
    </div>
  );
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
        {approach?.scenario && <ScenarioPreview data={approach?.scenario} />}
      </div>
    </div>
  );
};

export default CustomerApproachPreview;
