import { ArrowDown01RoundIcon } from '@assets/icons';
import { type ApproachFormData, type ApproachScriptDTO } from '@dtos';
import { Divider, Flex, Form, Image, theme, Typography } from 'antd';
import { useMemo, useRef, useState, type FC } from 'react';
import type { FormInstance } from 'antd/lib';

import { AButton, ACollapse } from '@components/atoms';
import DefaultScenario from '@assets/images/Scenario.png';
import ScenarioScriptFooter from './components/ScenarioScriptFooter';
import AttributeItem from './components/AttributeItem';

const ExpandIcon: FC<{ isActive?: boolean }> = ({ isActive }) => {
  return (
    <ArrowDown01RoundIcon
      style={{
        rotate: isActive ? '180deg' : '0deg',
        transition: 'rotate 0.2s',
      }}
    />
  );
};

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
  const [activeKeys, setActiveKeys] = useState<string[]>();

  const attributeItems = useMemo(() => {
    const activeKeysArr: string[] = [];
    const result = approach?.approachStep?.map((attr, index) => {
      activeKeysArr.push(attr.id);
      return {
        key: attr.id,
        label: `${index + 1}. ${attr.attributeName}`,
        children: <AttributeItem data={attr} approachId={approach?.id} />,
        style: {
          marginBottom: 16,
          borderRadius: token.borderRadiusLG,
          overflow: 'hidden',
          border: 'none',
        },
      };
    });
    setActiveKeys(activeKeysArr);
    return result;
  }, [approach?.approachStep, approach?.id, token]);

  if (!approach) {
    return null;
  }

  return (
    <Form form={form}>
      <div ref={ref}>
        <Flex gap={14} align="center">
          <Typography.Title level={4} className="mt-24 mb-16">
            Kịch bản {approach?.name}
          </Typography.Title>
          {!isFirstApproach && (
            <AButton
              icon={<ExpandIcon isActive={!!activeKeys?.length} />}
              type="text"
              onClick={() =>
                setActiveKeys((pre) =>
                  pre?.length ? [] : attributeItems?.map((i) => i.key),
                )
              }
            />
          )}
        </Flex>
        {isFirstApproach ? (
          <Image src={DefaultScenario} preview={{ scaleStep: 1, mask: null }} />
        ) : (
          <ACollapse
            bordered={false}
            activeKey={activeKeys}
            expandIconPosition="end"
            expandIcon={ExpandIcon}
            style={{ background: token.colorBgContainer }}
            items={attributeItems}
            onChange={(values) => setActiveKeys(values)}
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
