import { AButton } from '@components/atoms';
import { ASegmented } from '@components/atoms/a-segmented';
import { EApproachStatus, type ApproachScriptDTO } from '@dtos';
import { Flex, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { MOCK_CUSTOMER_INFORMATION } from '@mocks/customer';
import { useApproachScriptViewByCustomerQuery } from '@hooks/queries/approachScriptQueries';
import { EControlType } from '@constants/masterData';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import ScenarioScriptContainer from './ScenarioScriptContainer';
import CollectCustomerInformationModal from './CollectCustomerInformationModal';

const statusObject: Record<EApproachStatus, string> = {
  [EApproachStatus.PENDING]: 'Chưa bắt đầu',
  [EApproachStatus.INPROGRESS]: 'Đang triển khai',
  [EApproachStatus.FINISHED]: 'Hoàn thành',
};

const CustomerApproachPreview = () => {
  const { customerId } = useParams();

  const [openModal, setOpenModal] = useState(false);
  const [approach, setApproach] = useState<ApproachScriptDTO | null>();
  const [form] = Form.useForm();

  const { data: approachScriptData } =
    useApproachScriptViewByCustomerQuery(customerId);

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
          },
        }),
        {},
      );

      form.setFieldsValue(initialValues);
    }
  }, [approachScriptData, form]);

  if (!approachScriptData) return null;

  return (
    <div>
      <Flex align="center" justify="space-between" className="mb-16">
        <ASegmented
          size="large"
          options={approachScriptData?.map((x) => ({
            label: `Lần ${x.id}`,
            value: x.id,
          }))}
          onChange={(value) => {
            setApproach(approachScriptData.find((x) => x.id === value) ?? null);
          }}
        />
        <div>
          <p className="mb-4">Trạng thái</p>
          <Input
            value={
              approach?.approachResult?.status
                ? statusObject[
                    approach?.approachResult?.status as EApproachStatus
                  ]
                : ''
            }
            disabled
          />
        </div>
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
