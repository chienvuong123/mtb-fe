import { ArrowDown01RoundIcon } from '@assets/icons';
import { AButton, ASelect } from '@components/atoms';
import { ACollapse } from '@components/atoms/a-collapse';
import { ATextArea } from '@components/atoms/a-textarea';
import { DATE_SLASH_FORMAT_DDMMYYYY } from '@constants/dateFormat';
import { EControlType } from '@constants/masterData';
import {
  type AttributeDTO,
  type ControlValue,
  type CustomerApproachDTO,
  type ScenarioDTO,
} from '@dtos';
import {
  Affix,
  Checkbox,
  DatePicker,
  Divider,
  Image,
  InputNumber,
  Radio,
  Switch,
  theme,
  Typography,
} from 'antd';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FC,
  type ReactNode,
} from 'react';
import ScenarioScriptFooter from './ScenarioScriptFooter';

const AttributeItem: FC<{
  data: AttributeDTO;
  onChange?: (id: string, val: string | number | boolean | string[]) => void;
  onChangeNote?: (id: string, val: string) => void;
}> = ({ data, onChange, onChangeNote }) => {
  const content = useMemo(() => {
    switch (data.controlType) {
      case EControlType.CHECKBOX:
        return (
          <Checkbox.Group
            options={(
              data.config as ControlValue<EControlType.CHECKBOX>
            ).options?.map((val) => ({
              label: val.text,
              value: val.value,
            }))}
            onChange={(value) => onChange?.(data.id, value)}
          />
        );
      case EControlType.SWITCH:
        return (
          <Switch
            checkedChildren={
              (data.config as ControlValue<EControlType.SWITCH>).options?.[0]
                .text ?? 'Có'
            }
            unCheckedChildren={
              (data.config as ControlValue<EControlType.SWITCH>).options?.[1]
                .text ?? 'Không'
            }
            onChange={(value) => onChange?.(data.id, value)}
          />
        );
      case EControlType.SELECT:
        return (
          <ASelect
            placeholder="Chọn"
            style={{ maxWidth: '600px' }}
            options={(
              data.config as ControlValue<EControlType.SELECT>
            ).options?.map((val) => ({
              label: val.text,
              value: val.value,
            }))}
            onChange={(value) => onChange?.(data.id, value)}
          />
        );
      case EControlType.RADIO:
        return (
          <Radio.Group
            options={(
              data.config as ControlValue<EControlType.RADIO>
            ).options?.map((val) => ({
              label: val.text,
              value: val.value,
            }))}
            onChange={(e) => onChange?.(data.id, e.target.value)}
          />
        );
      case EControlType.DATETIME:
        return (
          <DatePicker
            format={DATE_SLASH_FORMAT_DDMMYYYY}
            onChange={(value) => onChange?.(data.id, value.toJSON())}
          />
        );
      case EControlType.NUMBER:
        return (
          <InputNumber
            placeholder="Nhập số"
            onChange={(value) => onChange?.(data.id, value as number)}
          />
        );
      case EControlType.LINK:
        return (
          <a href={data.config.toString()} target="_blank" rel="noreferrer">
            {data.config.toString()}
          </a>
        );
      case EControlType.BUTTON: {
        const button = data.config as ControlValue<EControlType.BUTTON>;
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
        const image = data.config as ControlValue<EControlType.IMAGE>;
        return <Image alt={image.title} src={image.src} height={300} />;
      }
      default:
        return data.config as string;
    }
  }, [data.controlType, data.id, data.config, onChange]);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
      <div className="mt-8">{content}</div>
      {data.haveNote && (
        <div className="mt-8">
          <Typography.Text>Ghi chú</Typography.Text>
          <ATextArea
            placeholder="Nhập..."
            maxLength={100}
            showCount={{
              formatter: ({ count, maxLength }) => `(${count}/${maxLength})`,
            }}
            autoSize={{ minRows: 2 }}
            onChange={(e) => onChangeNote?.(data.id, e.target.value)}
          />
        </div>
      )}
    </>
  );
};

const ExpandIcon: FC<{ isActive?: boolean }> = ({ isActive }) => (
  <ArrowDown01RoundIcon rotate={isActive ? '90deg' : 0} />
);

const AffixWrapper: FC<{ children: ReactNode; affix: boolean }> = ({
  children,
  affix,
}) => {
  if (!affix) {
    return children;
  }
  return <Affix offsetBottom={24}>{children}</Affix>;
};

const ScenarioScriptContainer: FC<{
  scenario: ScenarioDTO;
  approach?: CustomerApproachDTO;
}> = ({ scenario, approach }) => {
  const { token } = theme.useToken();
  const [showAffixFooter, setShowAffixFooter] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const attributeItems = useMemo(() => {
    return scenario.attributes?.map((attr, index) => ({
      key: attr.id,
      label: `${index + 1}. ${attr.attributeName}`,
      children: <AttributeItem data={attr} />,
      style: {
        marginBottom: 16,
        borderRadius: token.borderRadiusLG,
        overflow: 'hidden',
        border: 'none',
      },
    }));
  }, [scenario.attributes, token]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowAffixFooter(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '0px',
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref}>
      <Typography.Title level={4} className="mt-24 mb-16">
        Kịch bản {scenario.name}
      </Typography.Title>
      <ACollapse
        bordered={false}
        defaultActiveKey={attributeItems?.map((x) => x.key)}
        expandIconPosition="end"
        expandIcon={ExpandIcon}
        style={{ background: token.colorBgContainer }}
        items={attributeItems}
      />

      <AffixWrapper affix={showAffixFooter}>
        <div
          className="bg-white"
          style={{ paddingBottom: 24, marginBottom: -24 }}
        >
          <Divider />
          <ScenarioScriptFooter approach={approach} />
        </div>
      </AffixWrapper>
    </div>
  );
};

export default ScenarioScriptContainer;
