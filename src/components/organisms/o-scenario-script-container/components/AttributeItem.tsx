import { ASelect, AButton, AInputArea } from '@components/atoms';
import { DATE_SLASH_FORMAT_DDMMYYYY } from '@constants/dateFormat';
import { EControlType } from '@constants/masterData';
import type { ApproachScriptAttributeDTO, ControlValue } from '@dtos';
import {
  Checkbox,
  Switch,
  Radio,
  DatePicker,
  InputNumber,
  Typography,
  Form,
  Image,
} from 'antd';
import { type FC, useMemo } from 'react';

const AttributeItem: FC<{
  data: ApproachScriptAttributeDTO;
  approachId: string;
}> = ({ data, approachId }) => {
  const content = useMemo(() => {
    let config: ControlValue<EControlType>;
    try {
      config = (
        data.content ? JSON.parse(data.content || '') : ''
      ) as ControlValue<EControlType>;
    } catch (e) {
      config = data.content || '';
      console.warn(e);
    }

    switch (data.controlType) {
      case EControlType.CHECKBOX:
        return (
          <Form.Item name={[approachId, data.id, 'attributes']} noStyle>
            <Checkbox.Group
              options={(
                config as ControlValue<EControlType.CHECKBOX>
              ).options?.map((val, idx) => ({
                label: val,
                value: String(idx),
              }))}
            />
          </Form.Item>
        );
      case EControlType.SWITCH:
        return (
          <Form.Item name={[approachId, data.id, 'attributes']} noStyle>
            <Switch
              checkedChildren={
                (config as ControlValue<EControlType.SWITCH>).options?.[0] ??
                'Có'
              }
              unCheckedChildren={
                (config as ControlValue<EControlType.SWITCH>).options?.[1] ??
                'Không'
              }
            />
          </Form.Item>
        );
      case EControlType.SELECT:
        return (
          <Form.Item name={[approachId, data.id, 'attributes']} noStyle>
            <ASelect
              placeholder="Chọn"
              style={{ maxWidth: '600px' }}
              options={(
                config as ControlValue<EControlType.SELECT>
              ).options?.map((val, idx) => ({
                label: val,
                value: String(idx),
              }))}
            />
          </Form.Item>
        );
      case EControlType.RADIO:
        return (
          <Form.Item name={[approachId, data.id, 'attributes']} noStyle>
            <Radio.Group
              options={(
                config as ControlValue<EControlType.RADIO>
              ).options?.map((val, idx) => ({
                label: val,
                value: String(idx),
              }))}
            />
          </Form.Item>
        );
      case EControlType.DATETIME:
        return (
          <Form.Item name={[approachId, data.id, 'attributes']} noStyle>
            <DatePicker format={DATE_SLASH_FORMAT_DDMMYYYY} />
          </Form.Item>
        );
      case EControlType.NUMBER:
        return (
          <Form.Item name={[approachId, data.id, 'attributes']} noStyle>
            <InputNumber placeholder="Nhập số" />
          </Form.Item>
        );
      case EControlType.LINK:
        return (
          <a href={config.toString()} target="_blank" rel="noreferrer">
            {config.toString()}
          </a>
        );
      case EControlType.BUTTON: {
        const button = config as ControlValue<EControlType.BUTTON>;
        return (
          <AButton
            type="primary"
            href={button.link}
            target="_blank"
            rel="noreferrer"
          >
            {button.title}
          </AButton>
        );
      }
      case EControlType.IMAGE: {
        const image = config as ControlValue<EControlType.IMAGE>;
        return <Image alt={image.title} src={image.src} height={300} />;
      }
      default:
        return config as string;
    }
  }, [data.controlType, data.id, data.content, approachId]);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: data.description || '' }} />
      <div className="mt-8">{content}</div>
      {data?.haveNote && (
        <div className="mt-8">
          <Typography.Text>Ghi chú</Typography.Text>
          <Form.Item name={[approachId, data.id, 'note']} noStyle>
            <AInputArea
              placeholder="Nhập..."
              maxLength={1000}
              showCount={{
                formatter: ({ count, maxLength }) => `(${count}/${maxLength})`,
              }}
              autoSize={{ minRows: 2 }}
            />
          </Form.Item>
        </div>
      )}
    </>
  );
};

export default AttributeItem;
