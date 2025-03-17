import { ASelect, AButton, AInputArea } from '@components/atoms';
import { DATE_SLASH_FORMAT_DDMMYYYY } from '@constants/dateFormat';
import { EControlType } from '@constants/masterData';
import { BLOCKING_NUMBER_PARTERN } from '@constants/regex';
import type { ApproachScriptAttributeDTO, ControlValue } from '@dtos';
import { getValueFromEvent } from '@utils/formHelper';
import {
  Checkbox,
  Switch,
  Radio,
  DatePicker,
  Typography,
  Form,
  Image,
  Input,
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
              className="flex-column"
            />
          </Form.Item>
        );
      case EControlType.SWITCH:
        return (
          <Form.Item
            name={[approachId, data.id, 'attributes']}
            valuePropName="checked"
            noStyle
          >
            <Switch />
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
              className="flex-column dis-flex"
            />
          </Form.Item>
        );
      case EControlType.DATETIME:
        return (
          <Form.Item name={[approachId, data.id, 'attributes']} noStyle>
            <DatePicker
              format={DATE_SLASH_FORMAT_DDMMYYYY}
              placeholder="Chọn ngày"
            />
          </Form.Item>
        );
      case EControlType.NUMBER:
        return (
          <Form.Item
            name={[approachId, data.id, 'attributes']}
            noStyle
            getValueFromEvent={({ target: { value } }) =>
              getValueFromEvent(value, BLOCKING_NUMBER_PARTERN)
            }
          >
            <Input placeholder="Nhập số" className="w-100" />
          </Form.Item>
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
        // TODO: get image from s3
        const image = config as ControlValue<EControlType.IMAGE>;
        return <Image alt={image.src} src={image.src} height={300} />;
      }
      default:
        return (
          <div>
            {typeof config === 'object'
              ? JSON.stringify(config)
              : String(config)}
          </div>
        );
    }
  }, [data.controlType, data.id, data.content, approachId]);

  return (
    <>
      <div
        className="ql-editor"
        dangerouslySetInnerHTML={{ __html: data.description || '' }}
      />
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
