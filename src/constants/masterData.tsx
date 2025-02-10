import { ControlImageIcon } from '@assets/icons';
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

export enum EStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
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
}

export enum ESalesOpportunities {
  DISBURSED = 'DISBURSED',
  OPPORTUNITY_TO_SELL = 'OPPORTUNITY_TO_SELL',
  CANCELED = "CANCELED"
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

const optionElementWrapper = (label: string, element: JSX.Element) => (
  <Space>
    <div style={{ width: '100px' }}>{label}:</div>
    <Flex className="pointer-events-none">{element}</Flex>
  </Space>
);

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
