import { AButton } from '@components/atoms';
import { ASegmented } from '@components/atoms/a-segmented';
import { CategoryType, type ApproachScriptDTO } from '@dtos';
import { Flex, Form, Input, Rate, Typography } from 'antd';
import { useEffect, useRef, useState, useMemo } from 'react';
import { useApproachScriptViewByCustomerQuery } from '@hooks/queries/approachScriptQueries';
import { useParams } from 'react-router-dom';
import { useCategoryOptionsListQuery } from '@hooks/queries';
import { ScenarioScriptContainer } from '@components/organisms';
import CollectCustomerInformationModal from './CollectCustomerInformationModal';
import { getInitialValues } from '../utils';

const CustomerApproachPreview = ({ calledIds }: { calledIds: string[] }) => {
  const { id: customerId } = useParams();

  const [openModal, setOpenModal] = useState(false);
  const [approach, setApproach] = useState<ApproachScriptDTO | null>();
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState({});

  const { data: approachScriptData } =
    useApproachScriptViewByCustomerQuery(customerId);
  const { data: statusOptions } = useCategoryOptionsListQuery(
    CategoryType.CUSTOMER_APPROACH_STATUS,
  );

  const isFistInitFlag = useRef(true);

  const segmentOptions = useMemo(() => {
    return (
      approachScriptData?.map((x, index) => ({
        label: index === 0 ? 'Kịch bản demo' : `Lần ${index + 1}`,
        value: x.id,
      })) ?? []
    );
  }, [approachScriptData]);

  useEffect(() => {
    if (approachScriptData && statusOptions?.length) {
      const initValue = getInitialValues(approachScriptData, statusOptions);
      setInitialValues(initValue);
      if (isFistInitFlag.current) {
        setApproach(approachScriptData[0]);
        form.setFieldsValue(initValue);
        isFistInitFlag.current = false;
      }
    }
  }, [approachScriptData, form, statusOptions]);

  if (!approachScriptData || !approach) return null;

  const isFirstApproach = approachScriptData[0].id === approach.id;

  return (
    <div>
      <Form.Provider>
        <Flex align="center" justify="space-between" className="mb-16">
          <ASegmented
            size="large"
            options={segmentOptions}
            value={approach?.id}
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
              <Flex gap={8} vertical>
                <Typography.Text>
                  Khách hàng đánh giá chiến dịch
                </Typography.Text>
                <Form.Item name={[approach?.id, 'rate']} noStyle>
                  <Rate
                    style={{
                      fontSize: 38,
                    }}
                  />
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
            <ScenarioScriptContainer
              form={form}
              approach={approach}
              initialValues={initialValues}
              isFirstApproach={isFirstApproach}
              calledIds={calledIds}
            />
          )}
        </div>
      </Form.Provider>
      <CollectCustomerInformationModal
        open={openModal}
        onCancel={() => setOpenModal(false)}
      />
    </div>
  );
};

export default CustomerApproachPreview;
