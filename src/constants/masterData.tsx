import {
  ControlType10Icon,
  ControlType1Icon,
  ControlType2Icon,
  ControlType3Icon,
  ControlType4Icon,
  ControlType5Icon,
  ControlType6Icon,
  ControlType7Icon,
  ControlType8Icon,
  ControlType9Icon,
} from '@assets/icons';
import { ATag } from '@components/atoms';
import { Flex, Space, Typography } from 'antd';
import type { SortOrder } from 'antd/es/table/interface';
import type { ReactNode } from 'react';

export enum EStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ALL = 'ALL',
}

export enum ERole {
  ADMIN = 'ADMIN',
  SELLER = 'SELLER',
  CAMPAIGN_MANAGER = 'CAMPAIGN_MANAGER',
  SELLER_MANAGER = 'SELLER_MANAGER',
  REPORTER = 'REPORTER',
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

export const STATUS_OPTIONS = [
  {
    value: EStatus.ACTIVE,
    label: <Typography.Text className="green">Đang hoạt động</Typography.Text>,
  },
  {
    value: EStatus.INACTIVE,
    label: <Typography.Text className="red">Không hoạt động</Typography.Text>,
  },
  {
    value: EStatus.ALL,
    label: <Typography.Text>Tất cả</Typography.Text>,
  },
];

export const STATUS_OPTIONS_WITHOUT_ALL = STATUS_OPTIONS.filter(
  (i) => i.value !== EStatus.ALL,
);

const optionElementWrapper = (label: string, element: JSX.Element) => (
  <Space>
    <div style={{ width: '100px' }}>{label}:</div>
    <Flex className="pointer-events-none">{element}</Flex>
  </Space>
);

export const CONTROL_ELEMENTS = {
  BLOCK_OF_TEXT: (
    <Flex gap={16}>
      <ControlType1Icon /> Block of text
    </Flex>
  ),
  COMBO_BOX: (
    <Flex gap={16}>
      <ControlType4Icon /> Combo box
    </Flex>
  ),
  RADIO_BUTTON_GROUP: (
    <Flex gap={16}>
      <ControlType3Icon /> Radio button group
    </Flex>
  ),
  CHECKBOX_LIST: (
    <Flex gap={16}>
      <ControlType2Icon /> Checkbox list
    </Flex>
  ),
  BUTTON: (
    <Flex gap={16}>
      <ControlType5Icon /> Button
    </Flex>
  ),
  DATE_PICKER: (
    <Flex gap={16}>
      <ControlType6Icon /> Date picker
    </Flex>
  ),
  IMAGE: (
    <Flex gap={16}>
      <ControlType7Icon /> Image
    </Flex>
  ),
  ON_OFF_SWITCH: (
    <Flex gap={16}>
      <ControlType8Icon /> On off switch
    </Flex>
  ),
  NUMBER_STEPPER: (
    <Flex gap={16}>
      <ControlType9Icon /> Number stepper
    </Flex>
  ),
  LINK: (
    <Flex gap={16}>
      <ControlType10Icon /> Link
    </Flex>
  ),
};

export const CONTROL_TYPE_OPTIONS = [
  {
    value: 'BLOCK_OF_TEXT',
    label: optionElementWrapper('Text', CONTROL_ELEMENTS.BLOCK_OF_TEXT),
  },
  {
    value: 'COMBO_BOX',
    label: optionElementWrapper('Select', CONTROL_ELEMENTS.COMBO_BOX),
  },
  {
    value: 'RADIO_BUTTON_GROUP',
    label: optionElementWrapper('Radio', CONTROL_ELEMENTS.RADIO_BUTTON_GROUP),
  },
  {
    value: 'CHECKBOX_LIST',
    label: optionElementWrapper('Checkbox', CONTROL_ELEMENTS.CHECKBOX_LIST),
  },
  {
    value: 'IMAGE',
    label: optionElementWrapper('Hình ảnh', CONTROL_ELEMENTS.IMAGE),
  },
  {
    value: 'DATE_PICKER',
    label: optionElementWrapper('Ngày tháng', CONTROL_ELEMENTS.DATE_PICKER),
  },
  {
    value: 'NUMBER_STEPPER',
    label: optionElementWrapper('Số', CONTROL_ELEMENTS.NUMBER_STEPPER),
  },
  {
    value: 'ON_OFF_SWITCH',
    label: optionElementWrapper('Switch', CONTROL_ELEMENTS.ON_OFF_SWITCH),
  },
  {
    value: 'BUTTON',
    label: optionElementWrapper('Nút', CONTROL_ELEMENTS.BUTTON),
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

export const STATUS_OBJECT: Record<EStatus, ReactNode> = {
  [EStatus.ACTIVE]: <ATag color="green">Đang hoạt động</ATag>,
  [EStatus.INACTIVE]: <ATag color="red">Không hoạt động</ATag>,
  [EStatus.ALL]: null,
};

export const EKYC_OPTIONS = [1, 2, 3].map((i) => ({
  label: `Cấp độ ${i}`,
  value: i,
}));
