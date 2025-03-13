import { AButton, AInputArea, ASelect } from '@components/atoms';
import { CategoryType, type ApproachFormData } from '@dtos';
import {
  CUSTOMER_KEY,
  useCategoryOptionsListQuery,
  useCustomerGetDraftLoanLimit,
  useForwardBookingInforMutation,
} from '@hooks/queries';
import {
  APPROACH_SCRIPT_KEY,
  useApproachScriptResultMutation,
  useApproachScriptViewByCustomerQuery,
} from '@hooks/queries/approachScriptQueries';
import { useNotification } from '@libs/antd';
import { useQueryClient } from '@tanstack/react-query';
import { validationHelper } from '@utils/validationHelper';
import { Col, Flex, Form, Row, type FormInstance } from 'antd';
import { type FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { transformDataToSubmit } from '../utils';

interface IScenarioScriptFooterProps {
  form: FormInstance;
  approachId: string;
  initialValues?: Record<string, ApproachFormData>;
  isPreview?: boolean;
  calledIds: string[];
}

const ScenarioScriptFooter: FC<IScenarioScriptFooterProps> = ({
  form,
  approachId,
  initialValues,
  isPreview = false,
  calledIds,
}) => {
  const { customerId } = useParams();
  const { data: approachResultOptions } = useCategoryOptionsListQuery(
    CategoryType.CUSTOMER_APPROACH_RESULT,
  );
  const { data: approachDetailOptions } = useCategoryOptionsListQuery(
    CategoryType.CUSTOMER_APPROACH_DETAIL,
  );
  const { data: statusOptions } = useCategoryOptionsListQuery(
    CategoryType.CUSTOMER_APPROACH_STATUS,
  );
  const { data: approachScriptData } =
    useApproachScriptViewByCustomerQuery(customerId);
  const { data: draftLoanLimit } = useCustomerGetDraftLoanLimit(customerId);

  const { mutate: createApproachResult } = useApproachScriptResultMutation();

  const { mutate: forwardBookingInforMutate } =
    useForwardBookingInforMutation();

  const notify = useNotification();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleSave = async () => {
    await form.validateFields();

    try {
      if (!initialValues || !approachScriptData) return;
      const currentValues = form.getFieldsValue(true) as Record<
        string,
        ApproachFormData
      >;

      const transformedDataArray = transformDataToSubmit(
        currentValues,
        initialValues,
        approachScriptData,
        customerId as string,
        calledIds,
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
          queryClient.invalidateQueries({
            queryKey: [CUSTOMER_KEY, 'draft-loan-limit', customerId],
          });
        },
      });
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleCancel = () => {
    navigate(`/customer/list`);
  };

  const forwardBookingInfor = () => {
    forwardBookingInforMutate(customerId as string, {
      onSuccess: (d) => {
        validationHelper(d, notify, () => {
          notify({
            message: 'Chuyển thông tin booking thành công',
            type: 'success',
          });
        });
      },
    });
  };

  return (
    <div className="mt-24">
      <Form form={form} layout="vertical" className="dis-block h-full">
        <Row gutter={[24, 24]} justify="space-between">
          <Col span={8}>
            <Form.Item
              label="Trạng thái tiếp cận"
              name={[approachId, 'status']}
              rules={[{ required: true }]}
            >
              <ASelect options={statusOptions} placeholder="Chọn" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Kết quả tiếp cận"
              name={[approachId, 'result']}
              rules={[{ required: true }]}
            >
              <ASelect options={approachResultOptions} placeholder="Chọn" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Kết quả tiếp cận chi tiết"
              name={[approachId, 'resultDetail']}
            >
              <ASelect options={approachDetailOptions} placeholder="Chọn" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Ghi chú" name={[approachId, 'note']}>
              <AInputArea
                placeholder="Nhập..."
                maxLength={2000}
                showCount={{
                  formatter: ({ count, maxLength }) =>
                    `(${count}/${maxLength})`,
                }}
                autoSize={{ minRows: 3, maxRows: 1 }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      {!isPreview && (
        <Flex justify="space-between" style={{ marginTop: 100 }}>
          <AButton
            type="primary"
            onClick={forwardBookingInfor}
            disabled={Boolean(!draftLoanLimit?.data?.finalMaxLoan)}
          >
            Chuyển thông tin booking
          </AButton>
          <Flex gap={24} justify="flex-end">
            <AButton variant="filled" color="primary" onClick={handleCancel}>
              Hủy
            </AButton>
            <AButton type="primary" onClick={handleSave}>
              Lưu
            </AButton>
          </Flex>
        </Flex>
      )}
    </div>
  );
};

export default ScenarioScriptFooter;
