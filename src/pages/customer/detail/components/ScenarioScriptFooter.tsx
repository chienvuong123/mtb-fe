import { AButton, AInputArea, ASelect } from '@components/atoms';
import { CategoryType } from '@dtos';
import { useCategoryOptionsListQuery } from '@hooks/queries';
import {
  useApproachScriptResultMutation,
  useApproachScriptViewByCustomerQuery,
} from '@hooks/queries/approachScriptQueries';
import { isEqual } from '@utils/objectHelper';
import { Flex, Form, Rate, Typography, type FormInstance } from 'antd';
import { type FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface IScenarioScriptFooterProps {
  form: FormInstance;
  approachId: string;
}

interface StepValue {
  attributes?: number | boolean | Array<number>;
  note?: string;
}

interface ApproachData {
  status: string;
  approachStatus: string;
  rate?: number;
  note?: string;
  [key: string]: StepValue | string | number | undefined;
}

const ScenarioScriptFooter: FC<IScenarioScriptFooterProps> = ({
  form,
  approachId,
}) => {
  const { customerId } = useParams();
  const { data: approachResultOptions } = useCategoryOptionsListQuery(
    CategoryType.CUSTOMER_APPROACH_RESULT,
  );

  const { data: approachDetailOptions } = useCategoryOptionsListQuery(
    CategoryType.CUSTOMER_APPROACH_DETAIL,
  );

  const { data: approachScriptData } =
    useApproachScriptViewByCustomerQuery(customerId);

  const { mutate: createApproachResult } = useApproachScriptResultMutation();

  const [initialValues, setInitialValues] = useState<
    Record<string, ApproachData>
  >({});

  useEffect(() => {
    if (approachScriptData) {
      const initValues = approachScriptData.reduce(
        (acc, approachScript) => ({
          ...acc,
          [approachScript.campaignScriptId]: {
            ...approachScript.approachStep.reduce(
              (stepAcc, step) => ({
                ...stepAcc,
                [step.id]: {
                  attributes:
                    step.controlType === 'CHECKBOX'
                      ? step.approachResultStep?.result?.split(',')
                      : step.approachResultStep?.result,
                  note: step.approachResultStep?.note,
                },
              }),
              {},
            ),
            result: approachScript.approachResult?.result,
            resultDetail: approachScript.approachResult?.resultDetail,
            rate: approachScript.approachResult?.rate,
            note: approachScript.approachResult?.note,
          },
        }),
        {},
      );
      setInitialValues(initValues);
    }
  }, [approachScriptData]);

  const handleSave = async () => {
    try {
      const currentValues = form.getFieldsValue(true) as Record<
        string,
        ApproachData
      >;

      const transformedDataArray = Object.entries(currentValues).map(
        ([campaignScriptId, approachData]) => {
          const oldApproachResult = approachScriptData?.find(
            (i) => i.campaignScriptId === campaignScriptId,
          );
          const oldApproachResultSteps = oldApproachResult?.approachStep || [];
          const initialValue = initialValues[campaignScriptId];

          const changedSteps = Object.entries(approachData)
            .filter(([key]) => !Number.isNaN(Number(key)))
            .filter(([key, value]) => {
              const initial = initialValue?.[key] as StepValue;
              const current = value as StepValue;

              return (
                !isEqual(initial?.attributes, current.attributes) ||
                initial?.note !== current.note
              );
            })
            .map(([approachStepId, value]) => {
              const oldApproachResultStep = oldApproachResultSteps.find(
                (i) => i.approachResultStep?.approachStepId === approachStepId,
              );
              return {
                id: oldApproachResultStep?.approachResultStep?.id,
                approachStepId,
                result: (value as StepValue).attributes?.toString() || '',
                note: (value as StepValue).note || '',
              };
            });

          return {
            approachResult: {
              id: oldApproachResult?.approachResult?.id,
              customerId: 'f6225d34-0303-4965-bd4a-99f699c9d7a4',
              campaignScriptId,
              result: String(approachData.result ?? ''),
              resultDetail: String(approachData.resultDetail ?? ''),
              rate: approachData.rate?.toString() || '',
              note: approachData.note?.toString() || '',
              status: approachData.status?.toString() || '',
              rateCampaign: approachData.rateCampaign?.toString() || '',
            },
            approachResultStep: changedSteps,
          };
        },
      );

      console.log('Transformed data array:', transformedDataArray);
      createApproachResult(transformedDataArray);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };
  return (
    <Flex gap={24} vertical className="mt-24">
      <Flex gap={24} justify="space-between" align="flex-end">
        <Flex gap={8} style={{ width: 140 }} vertical>
          <Typography.Text>Kết quả tiếp cận</Typography.Text>
          <Form.Item name={[approachId, 'result']} noStyle>
            <ASelect options={approachResultOptions} placeholder="Chọn" />
          </Form.Item>
        </Flex>
        <Flex gap={8} style={{ width: 140 }} vertical>
          <Typography.Text>Kết quả tiếp cận chi tiết</Typography.Text>
          <Form.Item name={[approachId, 'resultDetail']} noStyle>
            <ASelect options={approachDetailOptions} placeholder="Chọn" />
          </Form.Item>
        </Flex>
        <AButton type="primary">Chuyển thông tin booking</AButton>
        <Flex gap={8} vertical>
          <Typography.Text>Khách hàng đánh giá chiến dịch</Typography.Text>
          <Form.Item name={[approachId, 'rate']} noStyle>
            <Rate
              style={{
                fontSize: 38,
              }}
            />
          </Form.Item>
        </Flex>
        <Flex gap={8} flex={1} vertical>
          <Typography.Text>Ghi chú</Typography.Text>
          <Form.Item name={[approachId, 'note']} noStyle>
            <AInputArea
              placeholder="Nhập..."
              maxLength={100}
              showCount={{
                formatter: ({ count, maxLength }) => `(${count}/${maxLength})`,
              }}
              autoSize={{ minRows: 1, maxRows: 1 }}
            />
          </Form.Item>
        </Flex>
      </Flex>
      <Flex gap={24} justify="end">
        <AButton variant="filled" color="primary">
          Hủy
        </AButton>
        <AButton type="primary" onClick={handleSave}>
          Lưu
        </AButton>
      </Flex>
    </Flex>
  );
};

export default ScenarioScriptFooter;
