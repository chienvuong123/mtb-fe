import { AButton, ASelect } from '@components/atoms';
import { ASegmented } from '@components/atoms/a-segmented';
import { CategoryType, type ApproachScriptDTO } from '@dtos';
import { Flex, Form, Input, Rate, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { MOCK_CUSTOMER_INFORMATION } from '@mocks/customer';
import { useApproachScriptViewByCustomerQuery } from '@hooks/queries/approachScriptQueries';
import { EControlType } from '@constants/masterData';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useCategoryOptionsListQuery } from '@hooks/queries';
import ScenarioScriptContainer from './ScenarioScriptContainer';
import CollectCustomerInformationModal from './CollectCustomerInformationModal';

const CustomerApproachPreview = () => {
  const { customerId } = useParams();

  const [openModal, setOpenModal] = useState(false);
  const [approach, setApproach] = useState<ApproachScriptDTO | null>();
  const [form] = Form.useForm();

  const { data: approachScriptData } =
    useApproachScriptViewByCustomerQuery(customerId);
  const { data: statusOptions } = useCategoryOptionsListQuery(
    CategoryType.CUSTOMER_APPROACH_STATUS,
  );

  useEffect(() => {
    if (approachScriptData) setApproach(approachScriptData[0]);
  }, [approachScriptData]);

  useEffect(() => {
    // TODO: refactor
    if (approachScriptData) {
      const initialValues = approachScriptData.reduce(
        (acc, approachScript) => ({
          ...acc,
          [approachScript.id]: {
            ...approachScript.approachStep.reduce((stepAcc, step) => {
              const result = (() => {
                if (step.controlType === EControlType.CHECKBOX) {
                  return step.approachResultStep?.result.split(',');
                }
                if (step.controlType === EControlType.DATETIME) {
                  return step.approachResultStep?.result
                    ? dayjs(step.approachResultStep.result)
                    : undefined;
                }
                return step.approachResultStep?.result;
              })();
              return {
                ...stepAcc,
                [step.id]: {
                  attributes: result,
                  note: step.approachResultStep?.note,
                },
              };
            }, {}),
            result: approachScript.approachResult?.result,
            resultDetail: approachScript.approachResult?.resultDetail,
            rate: approachScript.approachResult?.rate,
            note: approachScript.approachResult?.note,
            // TODO: fix default value
            status: approachScript.approachResult?.status || '01',
            rateCampaign: approachScript.approachResult?.rateCampaign,
          },
        }),
        {},
      );

      form.setFieldsValue(initialValues);
    }
  }, [approachScriptData, form]);

  if (!approachScriptData || !approach) return null;

  return (
    <div>
      <Form.Provider>
        <Flex align="center" justify="space-between" className="mb-16">
          <ASegmented
            size="large"
            options={approachScriptData?.map((x) => ({
              label: `Lần ${x.id}`,
              value: x.id,
            }))}
            onChange={(value) => {
              setApproach(
                approachScriptData.find((x) => x.id === value) ?? null,
              );
            }}
          />
          <Form form={form}>
            <Flex gap={24}>
              <Flex vertical gap={8}>
                <Typography.Text>Đánh giá chiến dịch</Typography.Text>
                <Form.Item name={[approach?.id, 'rateCampaign']} noStyle>
                  <Rate
                    style={{
                      fontSize: 38,
                    }}
                  />
                </Form.Item>
              </Flex>
              <Flex vertical gap={8} style={{ width: 300 }}>
                <Typography.Text>Trạng thái tiếp cận</Typography.Text>
                <Form.Item name={[approach?.id, 'status']} noStyle>
                  <ASelect options={statusOptions} placeholder="Chọn" />
                </Form.Item>
              </Flex>
            </Flex>
          </Form>
        </Flex>
        <div className="border-2 rounded-8 border-gray-border bg-white pa-24">
          <Flex align="center" justify="space-between" className="mb-16">
            <div>
              <p className="mb-4">Seller</p>
              <Input value={approach?.sellerName} disabled />
            </div>
            <AButton onClick={() => setOpenModal(true)} type="primary">
              Thông tin hạn mức
            </AButton>
          </Flex>
          {approach?.approachStep && (
            <ScenarioScriptContainer form={form} approach={approach} />
          )}
        </div>
      </Form.Provider>
      <CollectCustomerInformationModal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        // TODO: Add onOk
        // onOk={() => setOpenModal(false)}
        data={MOCK_CUSTOMER_INFORMATION}
      />
    </div>
  );
};

export default CustomerApproachPreview;
