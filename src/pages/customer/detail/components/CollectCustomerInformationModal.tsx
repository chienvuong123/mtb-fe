import { AButton } from '@components/atoms';
import { ACollapseForm } from '@components/atoms/a-collapse-form';
import { Flex, Form, Modal } from 'antd';
import { type FC } from 'react';
import './CollectCustomerInformationModal.scss';
import { useIsMutating } from '@tanstack/react-query';
import { CUSTOMER_KEY } from '@hooks/queries';
import { CollectInfoForm } from './CollectInfoForm';
import { LimitLoanAmountCard } from './LimitLoanAmountCard';
import { useCollectInforController } from '../hooks/useCollectInforController';

interface ICollectCustomerInformationForm {
  open: boolean;
  onCancel: () => void;
}

const CollectCustomerInformationModal: FC<ICollectCustomerInformationForm> = ({
  open,
  onCancel,
}) => {
  const {
    form,
    firstItems,
    secondItems,
    thirdItems,
    loanLimit,
    loading,
    handleFormValuesChange,
    saveDraft,
    checkLoanLimit,
    forwardBookingInfor,
  } = useCollectInforController(open);

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const mutating = useIsMutating({ mutationKey: [CUSTOMER_KEY] });

  return (
    <Modal
      className="collect-customer-information-modal"
      width={1100}
      style={{ top: 20, bottom: 20 }}
      open={open}
      onCancel={handleCancel}
      footer={[
        <Flex justify="space-between">
          <AButton color="primary" variant="filled" onClick={handleCancel}>
            Đóng
          </AButton>
          <Flex gap={14}>
            <AButton
              color="primary"
              variant="filled"
              onClick={saveDraft}
              loading={mutating > 0}
            >
              Lưu nháp
            </AButton>
            <AButton
              type="primary"
              onClick={checkLoanLimit}
              loading={mutating > 0}
            >
              Check hạn mức
            </AButton>
            <AButton
              type="primary"
              onClick={forwardBookingInfor}
              disabled={Boolean(!loanLimit)}
            >
              Chuyển thông tin booking
            </AButton>
          </Flex>
        </Flex>,
      ]}
    >
      <Form.Provider
        onFormChange={(_, { changedFields }) =>
          handleFormValuesChange(changedFields)
        }
      >
        <ACollapseForm
          bordered={false}
          expandIconPosition="end"
          defaultActiveKey={[1, 2, 3, 4]}
          style={{ background: 'transparent' }}
          items={[
            {
              key: 1,
              label: 'Nhóm thông tin khách hàng',
              children: <CollectInfoForm items={firstItems} form={form} />,
              style: {
                marginBottom: 20,
                borderRadius: 12,
                backgroundColor: '#fff',
                overflow: 'hidden',
                border: 'none',
              },
            },
            {
              key: 2,
              label: 'Nhóm thông tin tài sản',
              children: <CollectInfoForm items={secondItems} form={form} />,
              style: {
                marginBottom: 20,
                borderRadius: 12,
                backgroundColor: '#fff',
                overflow: 'hidden',
                border: 'none',
              },
            },
            {
              key: 3,
              label: 'Nhóm thông tin vay',
              children: <CollectInfoForm items={thirdItems} form={form} />,
              style: {
                marginBottom: 20,
                borderRadius: 12,
                backgroundColor: '#fff',
                overflow: 'hidden',
                border: 'none',
              },
            },
            {
              key: 4,
              label: 'Hạn mức vay',
              children: (
                <LimitLoanAmountCard loanLimit={loanLimit} loading={loading} />
              ),
              style: {
                marginBottom: 20,
                borderRadius: 12,
                backgroundColor: '#fff',
                overflow: 'hidden',
                border: 'none',
              },
            },
          ]}
        />
      </Form.Provider>
    </Modal>
  );
};

export default CollectCustomerInformationModal;
