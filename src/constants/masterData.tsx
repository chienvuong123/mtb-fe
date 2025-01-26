import { Typography } from 'antd';

export enum ECategoryType {
  PRODUCT = '2',
}

export enum EStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export const STATUS_OPTIONS = [
  {
    value: EStatus.ACTIVE,
    label: <Typography.Text className="green">Hoạt động</Typography.Text>,
  },
  {
    value: EStatus.INACTIVE,
    label: <Typography.Text className="red">Không hoạt động</Typography.Text>,
  },
];
