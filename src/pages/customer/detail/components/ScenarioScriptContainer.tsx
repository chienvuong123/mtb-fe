import { ArrowDown01RoundIcon } from '@assets/icons';
import { EControlType } from '@constants/masterData';
import {
  type ApproachScriptAttributeDTO,
  type ApproachScriptDTO,
  type ControlValue,
} from '@dtos';
import {
  Checkbox,
  DatePicker,
  Divider,
  Form,
  Image,
  InputNumber,
  Radio,
  Switch,
  theme,
  Typography,
} from 'antd';
import { useMemo, useRef, type FC } from 'react';
import type { FormInstance } from 'antd/lib';
import { DATE_SLASH_FORMAT_DDMMYYYY } from '@constants/dateFormat';

import './CollectCustomerInformationModal.scss';
import { AButton, ACollapse, ASelect, AInputArea } from '@components/atoms';
import ScenarioScriptFooter, {
  type ApproachData,
} from './ScenarioScriptFooter';

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
        return (
          <Image
            alt={image.title}
            src={image.src}
            height={300}
            preview={{
              classNames: {
                content: 'control-type-img-content',
                body: 'control-type-img-body',
                wrapper: 'control-type-img-wrapper',
              },
              movable: false,
              // imageRender: (originalNode, { transform, image: img }) => { TODO: will be fixed
              //   // eslint-disable-next-line no-param-reassign
              //   console.log(transform);
              //   return originalNode;
              // },
            }}
          />
        );
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

const ExpandIcon: FC<{ isActive?: boolean }> = ({ isActive }) => (
  <ArrowDown01RoundIcon rotate={isActive ? '90deg' : 0} />
);

const ScenarioScriptContainer: FC<{
  form: FormInstance;
  approach?: ApproachScriptDTO;
  initialValues: Record<string, ApproachData>;
}> = ({ form, approach, initialValues }) => {
  const { token } = theme.useToken();
  const ref = useRef<HTMLDivElement>(null);

  const attributeItems = useMemo(() => {
    return approach?.approachStep?.map((attr, index) => ({
      key: attr.id,
      label: `${index + 1}. ${attr.attributeName}`,
      children: <AttributeItem data={attr} approachId={approach?.id} />,
      style: {
        marginBottom: 16,
        borderRadius: token.borderRadiusLG,
        overflow: 'hidden',
        border: 'none',
      },
    }));
  }, [approach?.approachStep, approach?.id, token]);

  if (!approach) {
    return null;
  }

  return (
    <Form form={form}>
      <div ref={ref}>
        <Typography.Title level={4} className="mt-24 mb-16">
          Kịch bản {approach?.campaignName}
        </Typography.Title>
        <ACollapse
          bordered={false}
          defaultActiveKey={attributeItems?.map((x) => x.key)}
          expandIconPosition="end"
          expandIcon={ExpandIcon}
          style={{ background: token.colorBgContainer }}
          items={attributeItems}
        />
        <Divider />
        <ScenarioScriptFooter
          form={form}
          approachId={approach?.id}
          initialValues={initialValues}
        />
      </div>
    </Form>
  );
};

export default ScenarioScriptContainer;
