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
  EDITOR = 'BLOCK_OF_TEXT',
  SELECT = 'COMBO_BOX',
  RADIO = 'RADIO_BUTTON_GROUP',
  CHECKBOX = 'CHECKBOX_LIST',
  IMAGE = 'IMAGE',
  DATETIME = 'DATE_PICKER',
  TEXT = 'TEXT',
  NUMBER = 'NUMBER_STEPPER',
  SWITCH = 'ON_OFF_SWITCH',
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
    label: <Typography.Text className="green">Đang diễn ra</Typography.Text>,
  },
  {
    value: EStatusCampaign.PENDING,
    label: <Typography.Text className="info">Chưa diễn ra</Typography.Text>,
  },
  {
    value: EStatusCampaign.ENDED,
    label: <Typography.Text className="red">Đã diễn ra</Typography.Text>,
  },
];

export const STATUS_SALES_OPPORTUNITIES_OPTIONS = [
  {
    value: ESalesOpportunities.DISBURSED,
    label: <Typography.Text className="green">Đã giải ngân</Typography.Text>,
  },
  {
    value: ESalesOpportunities.OPPORTUNITY_TO_SELL,
    label: (
      <Typography.Text className="info">Đã tạo cơ hội bán</Typography.Text>
    ),
  },
  {
    value: ESalesOpportunities.CANCELED,
    label: <Typography.Text className="red">Đã hủy</Typography.Text>,
  },
];
const optionElementWrapper = (label: string, element: JSX.Element) => (
  <Space>
    <div style={{ width: '100px' }}>{label}:</div>
    <Flex className="pointer-events-none">{element}</Flex>
  </Space>
);

export const STATUS_CAMPAIGN_OBJECT: Record<EStatusCampaign, ReactNode> = {
  [EStatusCampaign.INPROGRESS]: <ATag color="green">Đang diễn ra</ATag>,
  [EStatusCampaign.PENDING]: <ATag color="blue">Chưa diễn ra</ATag>,
  [EStatusCampaign.ENDED]: <ATag color="red">Đã diễn ra</ATag>,
};

export const STATUS_CUSTOMER_OBJECT: Record<EApproachStatus, ReactNode> = {
  [EApproachStatus.PENDING]: 'Chưa bắt đầu',
  [EApproachStatus.INPROGRESS]: 'Đang triển khai',
  [EApproachStatus.FINISHED]: 'Hoàn thành',
};

export const GENDER_OBJECT: Record<EGender, ReactNode> = {
  [EGender.MAN]: 'Nam',
  [EGender.WOMEN]: 'Nữ',
  [EGender.OTHER]: 'Giới tính khác',
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
