import { ArrowDown01RoundIcon } from '@assets/icons';
import { type ApproachFormData, type ApproachScriptDTO } from '@dtos';
import { Divider, Form, Image, theme, Typography } from 'antd';
import { useMemo, useRef, type FC } from 'react';
import type { FormInstance } from 'antd/lib';

import { ACollapse } from '@components/atoms';
import DefaultScenario from '@assets/images/Scenario.png';
import ScenarioScriptFooter from './components/ScenarioScriptFooter';
import AttributeItem from './components/AttributeItem';

const ExpandIcon: FC<{ isActive?: boolean }> = ({ isActive }) => (
  <ArrowDown01RoundIcon rotate={isActive ? '90deg' : 0} />
);

const ScenarioScriptContainer: FC<{
  form: FormInstance;
  approach?: ApproachScriptDTO;
  initialValues?: Record<string, ApproachFormData>;
  isFirstApproach?: boolean;
  isPreview?: boolean;
  calledIds?: string[];
}> = ({
  form,
  approach,
  initialValues,
  isFirstApproach = true,
  isPreview = false,
  calledIds,
}) => {
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
          Kịch bản {approach?.name}
        </Typography.Title>
        {isFirstApproach ? (
          <Image src={DefaultScenario} preview={{ scaleStep: 1, mask: null }} />
        ) : (
          <ACollapse
            bordered={false}
            defaultActiveKey={attributeItems?.map((x) => x.key)}
            expandIconPosition="end"
            expandIcon={ExpandIcon}
            style={{ background: token.colorBgContainer }}
            items={attributeItems}
          />
        )}
        <Divider />
        {!isPreview && (
          <ScenarioScriptFooter
            form={form}
            approachId={approach?.id}
            initialValues={initialValues}
            calledIds={calledIds ?? []}
          />
        )}
      </div>
    </Form>
  );
};

export default ScenarioScriptContainer;
