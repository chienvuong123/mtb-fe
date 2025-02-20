import { AButton } from '@components/atoms';
import { ACollapseForm } from '@components/atoms/a-collapse-form';
import { GENDER_OPTIONS } from '@constants/masterData';
import useFormItems from '@hooks/useFormItems';
import { MOCK_JOBS } from '@mocks/customer';
import { INPUT_TYPE, type TFormItem } from '@types';
import { formatMoney } from '@utils/stringHelper';
import { Flex, Form, Modal, Spin, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import type { FormInstance } from 'antd/lib';
import { useEffect, useMemo, useState, type FC } from 'react';
import type { CustomerCollectInfoDTO } from 'src/dtos/customer-collect-info';
import './CollectCustomerInformationModal.scss';

interface ICollectCustomerInformationForm {
  data?: CustomerCollectInfoDTO;
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
}

interface ICollectInfoForm {
  items: TFormItem[];
  form: FormInstance<CustomerCollectInfoDTO>;
}

const CollectInfoForm = ({ form, items }: ICollectInfoForm) => {
  const transformItems = useMemo(
    () =>
      items.map(({ label, ...others }) => ({
        label: (
          <Typography.Text ellipsis className="fw-600 fs-14">
            {label}
          </Typography.Text>
        ),
        ...others,
      })),
    [items],
  );

  const { formContent } = useFormItems({
    formItems: transformItems,
    rowProps: { gutter: [16, 20] },
  });

  return (
    <Form form={form} layout="vertical">
      <div>{formContent}</div>
    </Form>
  );
};

const LimitLoanAmountCard: FC<{ loanLimit?: number; loading?: boolean }> = ({
  loanLimit,
  loading,
}) => {
  return (
    <Flex
      vertical
      justify="center"
      align="center"
      className="limit-loan-amount-card"
    >
      {loading ? (
        <>
          <Spin size="large" spinning />
          <span className="mt-12">Đang check hạn mức</span>
        </>
      ) : (
        <>
          <span>Hạn mức được phép vay</span>
          <Typography.Title className="mt-12 text-primary" level={3}>
            {formatMoney(loanLimit ?? 0)}đ
          </Typography.Title>
        </>
      )}
    </Flex>
  );
};

const CollectCustomerInformationModal: FC<ICollectCustomerInformationForm> = ({
  data,
  open,
  onCancel,
  onOk,
}) => {
  const [form] = useForm();
  const [loanLimit, setLoanLimit] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const { firstItems, secondItems, thirdItems } = useMemo(() => {
    const basicItems: TFormItem[] = [
      {
        type: INPUT_TYPE.TEXT,
        label: 'Họ và tên khách hàng',
        name: 'fullName',
        inputProps: { placeholder: 'Nhập...', maxLength: 100 },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Giới tính',
        name: 'gender',
        inputProps: { placeholder: 'Chọn', options: GENDER_OPTIONS },
      },
      {
        type: INPUT_TYPE.DATE_PICKER,
        label: 'Ngày tháng năm sinh',
        name: 'birthday',
        inputProps: { placeholder: 'Chọn' },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Số điện thoại',
        name: 'phone',
        inputProps: { placeholder: 'Nhập...', maxLength: 10 },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Địa chỉ thường trú',
        name: 'address',
        inputProps: { placeholder: 'Nhập...', maxLength: 100 },
      },
      {
        type: INPUT_TYPE.NUMBER,
        label: 'Số tiền muốn vay',
        name: 'loanAmount',
        inputProps: { placeholder: 'Nhập...' },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Thời điểm mở App',
        name: 'appOpenTime',
        inputProps: {
          placeholder: 'Chọn',
          options: [
            { label: 'Sáng', value: 'morning' },
            { label: 'Trưa', value: 'noon' },
            { label: 'Chiều', value: 'afternoon' },
            { label: 'Tối', value: 'evening' },
          ],
        },
      },
      {
        type: INPUT_TYPE.NUMBER,
        label: 'Số lượng giao dịch trung bình/tháng trong 3 tháng gần nhất',
        name: 'averageTransactions',
        inputProps: { placeholder: 'Nhập...' },
      },
      {
        type: INPUT_TYPE.NUMBER,
        label: 'Số tiền giao dịch trung bình/tháng trong 3 tháng gần nhất',
        name: 'averageTransactionAmount',
        inputProps: { placeholder: 'Nhập...' },
      },
      {
        type: INPUT_TYPE.NUMBER,
        label: 'Số dư CASA bình quân 3 tháng gần nhất',
        name: 'averageCasaBalance',
        inputProps: { placeholder: 'Nhập...' },
      },
      {
        type: INPUT_TYPE.NUMBER,
        label:
          'Lương trả qua tài khoản MB (trung bình/tháng trong 3 tháng gần nhất)',
        name: 'salaryViaMB',
        inputProps: { placeholder: 'Nhập...' },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Cấp độ EKYC/KYC tại MB',
        name: 'ekycLevel',
        inputProps: {
          placeholder: 'Chọn',
          options: [
            { label: 'Cấp độ 1', value: 1 },
            { label: 'Cấp độ 2', value: 2 },
            { label: 'Cấp độ 3', value: 3 },
          ],
        },
      },
    ];
    const assetItems: TFormItem[] = [
      {
        type: INPUT_TYPE.SELECT,
        label: 'Loại tài sản',
        name: 'assetType',
        inputProps: {
          placeholder: 'Chọn',
          options: [
            { label: 'Ô tô', value: 'car' },
            { label: 'Nhà', value: 'house' },
            { label: 'Đất', value: 'land' },
            { label: 'Khác', value: 'other' },
          ],
        },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Hãng sản xuất',
        name: 'manufacturer',
        // MANUFACTURER_OPTIONS
        inputProps: { placeholder: 'Chọn', options: [] },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Dòng sản xuất',
        name: 'productionLine',
        // PRODUCTION_LINE_OPTIONS
        inputProps: { placeholder: 'Chọn', options: [] },
      },
      {
        type: INPUT_TYPE.NUMBER,
        label: 'Năm sản xuất',
        name: 'manufacturingYear',
        inputProps: { placeholder: 'Nhập...' },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Tên tài sản',
        name: 'assetName',
        inputProps: { placeholder: 'Nhập...' },
        colProps: { span: 24 },
      },
    ];
    const bankItems: TFormItem[] = [
      {
        type: INPUT_TYPE.SELECT,
        label: 'Loại giấy tờ định danh',
        name: 'identityType',
        inputProps: {
          placeholder: 'Chọn',
          options: ['CCCD', 'Hộ chiếu'].map((val) => ({
            label: val,
            value: val,
          })),
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Số giấy tờ định danh',
        name: 'identityNumber',
        inputProps: { placeholder: 'Nhập...' },
      },
      {
        type: INPUT_TYPE.DATE_PICKER,
        label: 'Ngày cấp',
        name: 'issueDate',
        inputProps: { placeholder: 'Chọn' },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Nghề nghiệp',
        name: 'job',
        //
        inputProps: {
          placeholder: 'Chọn',
          options: MOCK_JOBS.map((job) => ({ label: job, value: job })),
        },
      },
      {
        type: INPUT_TYPE.NUMBER,
        label: 'Thu nhập trung bình/tháng',
        name: 'monthlyIncome',
        inputProps: { placeholder: 'Nhập...' },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Hình thức chứng minh thu nhập',
        name: 'incomeVerificationMethod',
        inputProps: {
          placeholder: 'Chọn',
          options: ['Bảng lương', 'Hóa đơn', 'Hợp đồng'].map((val) => ({
            label: val,
            value: val,
          })),
        },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Tình trạng hôn nhân',
        name: 'maritalStatus',
        inputProps: {
          placeholder: 'Chọn',
          options: [
            { label: 'Độc thân', value: 'single' },
            { label: 'Đã kết hôn', value: 'married' },
            { label: 'Ly hôn', value: 'divorced' },
            { label: 'Góa', value: 'widowed' },
          ],
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Số người trực tiếp phải nuôi dưỡng',
        name: 'dependents',
        inputProps: { placeholder: 'Nhập...' },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Địa chỉ nơi ở hiện tại',
        name: 'currentAddress',
        inputProps: { placeholder: 'Chọn' },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Thời gian KH muốn vay',
        name: 'loanDuration',
        inputProps: {
          placeholder: 'Chọn',
          options: [
            { label: '12 tháng', value: 12 },
            { label: '24 tháng', value: 24 },
            { label: '36 tháng', value: 36 },
            { label: '48 tháng', value: 48 },
            { label: '60 tháng', value: 60 },
          ],
        },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Phương thức trả nợ gốc',
        name: 'principalRepaymentMethod',
        inputProps: {
          placeholder: 'Chọn',
          options: [
            { label: 'Định kỳ', value: 'Định kỳ' },
            { label: 'Tùy ý', value: 'Tùy ý' },
          ],
        },
      },
      {
        type: INPUT_TYPE.DATE_PICKER,
        label: 'Ngày cấp ĐKX/Cà vẹt',
        name: 'vehicleRegistrationDate',
        inputProps: { placeholder: 'Chọn' },
      },
    ];

    return {
      firstItems: basicItems,
      secondItems: assetItems,
      thirdItems: bankItems,
    };
  }, []);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({ ...data });
    }
  }, [data, form]);

  const checkLoanLimit = async () => {
    setLoading(true);
    try {
      // Call API to check loan limit
      // const res = await checkLoanLimitAPI(form.getFieldsValue());
      // setLoanLimit(res.data.loanLimit);
      // Delay 3s to test
      await new Promise((resolve) => {
        setTimeout(resolve, 3000);
      });
      setLoanLimit(100000000);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const saveDraft = async () => {
    try {
      // Call API to save draft
      // await saveDraftAPI(form.getFieldsValue());
      onOk();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      className="collect-customer-information-modal"
      width={1100}
      style={{ top: 20, bottom: 20 }}
      open={open}
      onCancel={onCancel}
      closeIcon={null}
      footer={[
        <AButton color="primary" variant="filled" onClick={saveDraft}>
          Lưu nháp
        </AButton>,
        <AButton type="primary" onClick={checkLoanLimit}>
          Check hạn mức
        </AButton>,
      ]}
    >
      <ACollapseForm
        bordered={false}
        expandIconPosition="end"
        defaultActiveKey={[1, 2, 3, 4]}
        style={{ background: 'transparent' }}
        items={[
          {
            key: 1,
            label: 'Nhóm thông tin 1',
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
            label: 'Nhóm thông tin 2',
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
            label: 'Nhóm thông tin 3',
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
    </Modal>
  );
};

export default CollectCustomerInformationModal;
