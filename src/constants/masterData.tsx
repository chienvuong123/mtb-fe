import { ControlImageIcon } from '@assets/icons';
import { ATag } from '@components/atoms';
import { EApproachStatus } from '@dtos';
import {
  Checkbox,
  DatePicker,
  Flex,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
  Switch,
  Typography,
} from 'antd';
import type { SortOrder } from 'antd/es/table/interface';
import type { ReactNode } from 'react';

export enum EStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ALL = 'ALL',
}

export enum EStatusCampaign {
  INPROGRESS = 'INPROGRESS',
  PENDING = 'PENDING',
  ENDED = 'ENDED',
}

export enum EGender {
  MAN = '0',
  WOMEN = '1',
  OTHER = '2',
}

export enum ESalesCampaign {
  DISBURSED = 'DISBURSED',
  OPPORTUNITY_TO_SELL = 'OPPORTUNITY_TO_SELL',
  CANCELED = 'CANCELED',
}

export enum ERole {
  ADMIN = 'ADMIN',
  SELLER = 'SELLER',
  CAMPAIGN_MANAGER = 'CAMPAIGN_MANAGER',
  SALE_LEADER = 'SALE_LEADER',
}

export enum EControlType {
  EDITOR = 'EDITOR',
  SELECT = 'SELECT',
  RADIO = 'RADIO',
  CHECKBOX = 'CHECKBOX',
  IMAGE = 'IMAGE',
  DATETIME = 'DATETIME',
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  SWITCH = 'SWITCH',
  LINK = 'LINK',
  BUTTON = 'BUTTON',
}

export enum ESalesOpportunities {
  DISBURSED = 'DISBURSED',
  OPPORTUNITY_TO_SELL = 'OPPORTUNITY_TO_SELL',
  CANCELED = 'CANCELED',
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

export const APPROACH_STATUS_OPTIONS = [
  {
    value: EApproachStatus.PENDING,
    label: 'Chưa bắt đầu',
  },
  {
    value: EApproachStatus.INPROGRESS,
    label: 'Đang triển khai',
  },
  {
    value: EApproachStatus.FINISHED,
    label: 'Hoàn thành',
  },
];

export const STATUS_CAMPAIGN_OPTIONS = [
  {
    value: EStatusCampaign.INPROGRESS,
    label: <Typography.Text className="green">Đang triển khai</Typography.Text>,
  },
  {
    value: EStatusCampaign.PENDING,
    label: <Typography.Text className="info">Chưa bắt đầu</Typography.Text>,
  },
  {
    value: EStatusCampaign.ENDED,
    label: <Typography.Text className="red">Kết thúc</Typography.Text>,
  },
];

export const GENDER_OPTIONS = [
  {
    value: EGender.MAN,
    label: 'Nam',
  },
  {
    value: EGender.WOMEN,
    label: 'Nữ',
  },
];

const optionElementWrapper = (label: string, element: JSX.Element) => (
  <Space>
    <div style={{ width: '100px' }}>{label}:</div>
    <Flex className="pointer-events-none">{element}</Flex>
  </Space>
);

export const STATUS_CAMPAIGN_OBJECT: Record<ESalesCampaign, ReactNode> = {
  [ESalesCampaign.DISBURSED]: <ATag color="green">Đang triển khai</ATag>,
  [ESalesCampaign.OPPORTUNITY_TO_SELL]: <ATag color="blue">Chưa bắt đầu</ATag>,
  [ESalesCampaign.CANCELED]: <ATag color="red">Kết thúc</ATag>,
};

export const CONTROL_ELEMENTS = {
  TEXT: <Input size="small" placeholder="Nhập..." />,
  SELECT: <Select size="small" placeholder="Chọn giá trị..." />,
  RADIO: <Radio checked />,
  CHECKBOX: <Checkbox checked />,
  IMAGE: <ControlImageIcon height={32} />,
  DATETIME: <DatePicker placeholder="Chọn ngày tháng năm" />,
  NUMBER: <InputNumber value={1} />,
  SWITCH: <Switch checked />,
  LINK: <Typography.Link>Link</Typography.Link>,
  EDITOR: <Input.TextArea size="small" rows={1} />,
};

export const CONTROL_TYPE_OPTIONS = [
  {
    value: 'TEXT',
    label: optionElementWrapper('Text', CONTROL_ELEMENTS.TEXT),
  },
  {
    value: 'SELECT',
    label: optionElementWrapper('Select', CONTROL_ELEMENTS.SELECT),
  },
  {
    value: 'RADIO',
    label: optionElementWrapper('Radio', CONTROL_ELEMENTS.RADIO),
  },
  {
    value: 'CHECKBOX',
    label: optionElementWrapper('Checkbox', CONTROL_ELEMENTS.CHECKBOX),
  },
  {
    value: 'IMAGE',
    label: optionElementWrapper('Hình ảnh', CONTROL_ELEMENTS.IMAGE),
  },
  {
    value: 'DATETIME',
    label: optionElementWrapper('Ngày tháng', CONTROL_ELEMENTS.DATETIME),
  },
  {
    value: 'NUMBER',
    label: optionElementWrapper('Số', CONTROL_ELEMENTS.NUMBER),
  },
  {
    value: 'SWITCH',
    label: optionElementWrapper('Switch', CONTROL_ELEMENTS.SWITCH),
  },
  {
    value: 'LINK',
    label: optionElementWrapper('Liên kết', CONTROL_ELEMENTS.LINK),
  },
  {
    value: 'EDITOR',
    label: optionElementWrapper('Trình soạn thảo', CONTROL_ELEMENTS.EDITOR),
  },
];

export const SORT_ORDER_FOR_SERVER: Record<string, string> = {
  ascend: 'asc',
  descend: 'desc',
};

export const SORT_ORDER_FOR_CLIENT: Record<string, SortOrder> = {
  asc: 'ascend',
  desc: 'descend',
};
