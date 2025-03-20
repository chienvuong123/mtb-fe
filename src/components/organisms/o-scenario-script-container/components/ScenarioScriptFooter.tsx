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
import { ROUTES } from '@routers/path';
import { handleResetFields } from '@utils/formHelper';
import { useWatch } from 'antd/es/form/Form';
import { transformDataToSubmit } from '../utils';

interface IScenarioScriptFooterProps {
  form: FormInstance;
  approachId: string;
  initialValues?: Record<string, ApproachFormData>;
  isPreview?: boolean;
  calledIds: string[];
  activeId?: string;
}

const ScenarioScriptFooter: FC<IScenarioScriptFooterProps> = ({
  form,
  approachId,
  initialValues,
  isPreview = false,
  calledIds,
  activeId,
}) => {
  const { id: customerId } = useParams();
  const { data: statusOptions } = useCategoryOptionsListQuery({
    categoryTypeCode: CategoryType.CUSTOMER_APPROACH_STATUS,
  });

  const statusId = useWatch([approachId, 'status'], form);
  const approachResultId = useWatch([approachId, 'result'], form);

  const { data: approachResultOptions } = useCategoryOptionsListQuery({
    categoryTypeCode: CategoryType.CUSTOMER_APPROACH_RESULT,
    parentId: statusId,
  });
  const { data: approachDetailOptions } = useCategoryOptionsListQuery({
    categoryTypeCode: CategoryType.CUSTOMER_APPROACH_DETAIL,
    parentId: approachResultId,
  });

  const { data: approachScriptData } =
    useApproachScriptViewByCustomerQuery(customerId);
  const { data: draftLoanLimit } = useCustomerGetDraftLoanLimit(customerId);

  const { mutate: createApproachResult, isPending: saveLoading } =
    useApproachScriptResultMutation();

  const { mutate: forwardBookingInforMutate } =
    useForwardBookingInforMutation();

  const notify = useNotification();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleSave = async () => {
    await form.validateFields();

    try {
      if (!initialValues || !approachScriptData) return;

      const currentValues = form.getFieldsValue(
        form.getFieldsValue([activeId]),
      ) as Record<string, ApproachFormData>;

      if (!currentValues) return;

      const transformedDataArray = transformDataToSubmit(
        currentValues,
        initialValues,
        approachScriptData,
        customerId as string,
        calledIds,
      );

      if (transformedDataArray.length === 0) {
        notify({
          message: 'Lưu thành công',
          type: 'success',
        });
        return;
      }

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
    navigate(ROUTES.CUSTOMER.LIST);
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
      <Form
        form={form}
        layout="vertical"
        className="dis-block h-full"
        disabled={activeId !== approachId}
      >
        <Row gutter={[24, 24]} justify="space-between">
          <Col span={8}>
            <Form.Item
              label="Trạng thái tiếp cận"
              name={[approachId, 'status']}
              rules={[{ required: true }]}
            >
              <ASelect
                options={statusOptions}
                placeholder="Chọn"
                onSelect={() =>
                  handleResetFields(
                    [
                      [approachId, 'result'],
                      [approachId, 'resultDetail'],
                    ],
                    form,
                  )
                }
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Kết quả tiếp cận"
              name={[approachId, 'result']}
              rules={[{ required: true }]}
            >
              <ASelect
                options={approachResultOptions}
                placeholder="Chọn"
                onSelect={() =>
                  handleResetFields([[approachId, 'resultDetail']], form)
                }
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Kết quả tiếp cận chi tiết"
              name={[approachId, 'resultDetail']}
            >
              <ASelect
                options={approachResultId ? approachDetailOptions : []}
                placeholder="Chọn"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Ghi chú" name={[approachId, 'note']}>
              <AInputArea placeholder="Nhập..." maxLength={2000} />
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
            <AButton type="primary" onClick={handleSave} loading={saveLoading}>
              Lưu
            </AButton>
          </Flex>
        </Flex>
      )}
    </div>
  );
};

export default ScenarioScriptFooter;
