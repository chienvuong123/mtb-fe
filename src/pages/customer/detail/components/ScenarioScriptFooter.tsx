import { AButton, AInputArea, ASelect } from '@components/atoms';
import { CategoryType } from '@dtos';
import { useCategoryOptionsListQuery } from '@hooks/queries';
import {
  APPROACH_SCRIPT_KEY,
  useApproachScriptResultMutation,
  useApproachScriptViewByCustomerQuery,
} from '@hooks/queries/approachScriptQueries';
import { useNotification } from '@libs/antd';
import { useQueryClient } from '@tanstack/react-query';
import { isEqual } from '@utils/objectHelper';
import { validationHelper } from '@utils/validationHelper';
import { Flex, Form, Rate, Typography, type FormInstance } from 'antd';
import { type FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface StepValue {
  attributes?: number | boolean | Array<number>;
  note?: string;
}
export interface ApproachData {
  status: string;
  approachStatus: string;
  rate?: number;
  note?: string;
  [key: string]: StepValue | string | number | undefined;
}

interface IScenarioScriptFooterProps {
  form: FormInstance;
  approachId: string;
  initialValues: Record<string, ApproachData>;
}

const ScenarioScriptFooter: FC<IScenarioScriptFooterProps> = ({
  form,
  approachId,
  initialValues,
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

  const notify = useNotification();
  const queryClient = useQueryClient();

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
              customerId: customerId as string,
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
      createApproachResult(transformedDataArray, {
        onSuccess: (d) => {
          validationHelper(d, notify, () => {
            notify({
              message: 'Lưu thành công',
              type: 'success',
            });
          });
          queryClient.invalidateQueries({
            queryKey: [APPROACH_SCRIPT_KEY, 'view-by-customer', customerId],
          });
        },
      });
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(`/customer/list`);
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
      <Flex gap={24} justify="flex-end">
        <AButton variant="filled" color="primary" onClick={handleCancel}>
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
