import { CategoryType } from '@dtos';
import {
  useCategoryOptionsListQuery,
  useAssetCategoryOptionsListQuery,
  useAssetCompanyOptionsListQuery,
  useAssetModelOptionsListQuery,
  useAssetYearOptionsListQuery,
  useAssetNameOptionsListQuery,
  useLocationOptionsListQuery,
  useCustomerCheckLoanLimit,
  useCustomerViewQuery,
  useCustomerGetDraftLoanLimit,
} from '@hooks/queries';
import { INPUT_TYPE, type TFormItem } from '@types';
import { Form, message } from 'antd';
import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type {
  CustomerCollectFormDTO,
  CustomerCollectInfoDTO,
} from 'src/dtos/customer-collect-info';
import { useParams } from 'react-router-dom';
import { DATE_SLASH_FORMAT_DDMMYYYY } from '@constants/dateFormat';
import { mapDraftToFormData, mapFormDataToDTO } from '../utils';

interface FieldChangeInfo {
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
  warnings?: string[];
  name: string[];
  validated?: boolean;
  value?: string | number | boolean;
}

const FIELD_DEPENDENCIES = {
  assetCategoryCode: [
    'assetCompanyCode',
    'assetModelCode',
    'assetYear',
    'assetInfoCode',
  ],
  assetCompanyCode: ['assetModelCode', 'assetYear', 'assetInfoCode'],
  assetModelCode: ['assetYear', 'assetInfoCode'],
  assetYear: ['assetInfoCode'],
  residenceProvinceCode: ['residenceDistrictCode', 'residenceWardCode'],
  residenceDistrictCode: ['residenceWardCode'],
  currentProvinceCode: ['currentDistrictCode', 'currentWardCode'],
  currentDistrictCode: ['currentWardCode'],
} as const;

export const useCollectInforController = (
  data?: Partial<CustomerCollectInfoDTO>,
) => {
  const [form] = Form.useForm<CustomerCollectFormDTO>();

  // watch
  const assetCategoryCode = Form.useWatch(['assetCategoryCode'], form);
  const assetCompanyCode = Form.useWatch(['assetCompanyCode'], form);
  const assetModelCode = Form.useWatch(['assetModelCode'], form);
  const assetYear = Form.useWatch(['assetYear'], form);
  const assetInfoCode = Form.useWatch(['assetInfoCode'], form);
  const residenceProvinceCode = Form.useWatch(['residenceProvinceCode'], form);
  const residenceDistrictCode = Form.useWatch(['residenceDistrictCode'], form);
  const currentProvinceCode = Form.useWatch(['currentProvinceCode'], form);
  const currentDistrictCode = Form.useWatch(['currentDistrictCode'], form);

  const { data: identityOptions } = useCategoryOptionsListQuery(
    CategoryType.F88_IDENTIFICATION,
  );
  const { data: jobOptions } = useCategoryOptionsListQuery(
    CategoryType.F88_JOB,
  );
  const { data: debtRepaymentMethodOptions } = useCategoryOptionsListQuery(
    CategoryType.F88_DEBT_REPAYMENT_METHOD,
  );
  const { data: maritalStatusOptions } = useCategoryOptionsListQuery(
    CategoryType.F88_MARITAL_STATUS,
  );
  const { data: proofOptions } = useCategoryOptionsListQuery(
    CategoryType.F88_PROOF,
  );
  const { data: genderOptions } = useCategoryOptionsListQuery(
    CategoryType.F88_GENDER,
  );

  const { data: assetCategoryOptions } = useAssetCategoryOptionsListQuery();
  const { data: assetCompanyOptions } = useAssetCompanyOptionsListQuery({
    assetCategoryCode,
  });
  const { data: assetModelOptions } = useAssetModelOptionsListQuery({
    assetCompanyCode,
    assetCategoryCode,
  });
  const { data: assetYearOptions } = useAssetYearOptionsListQuery({
    assetCompanyCode,
    assetCategoryCode,
    assetModelCode,
  });
  const { data: assetNameOptions } = useAssetNameOptionsListQuery({
    assetCompanyCode,
    assetCategoryCode,
    assetModelCode,
    assetYear,
  });

  const { data: provinceOptions } = useLocationOptionsListQuery();
  const { data: districtOptions } = useLocationOptionsListQuery(
    residenceProvinceCode,
  );
  const { data: wardOptions } = useLocationOptionsListQuery(
    residenceDistrictCode,
  );
  const { data: currentProvinceOptions } = useLocationOptionsListQuery();
  const { data: currentDistrictOptions } =
    useLocationOptionsListQuery(currentProvinceCode);
  const { data: currentWardOptions } =
    useLocationOptionsListQuery(currentDistrictCode);

  const { firstItems, secondItems, thirdItems } = useMemo(() => {
    const basicItems: TFormItem[] = [
      {
        type: INPUT_TYPE.TEXT,
        label: 'Họ và tên khách hàng',
        name: 'customerName',
        inputProps: { readOnly: true, disabled: true },
        colProps: { span: 12 },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Giới tính',
        name: 'genderCode',
        inputProps: {
          readOnly: true,
          disabled: true,
        },
        colProps: { span: 12 },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Ngày tháng năm sinh',
        name: 'dateOfBirth',
        inputProps: { readOnly: true, disabled: true },
        colProps: { span: 12 },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Số điện thoại',
        name: 'mobileNumber',
        inputProps: { placeholder: 'Nhập...', maxLength: 10, type: 'number' },
        rules: [{ required: true }],
        colProps: { span: 12 },
      },
      {
        type: INPUT_TYPE.LABEL,
        inputProps: { label: 'Địa chỉ thường trú' },
        colProps: { span: 24 },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Tỉnh/thành phố',
        name: 'residenceProvinceCode',
        inputProps: {
          placeholder: 'Chọn',
          options: provinceOptions,
          filterOption: true,
          showSearch: true,
        },
        colProps: { span: 8 },
        rules: [{ required: true }],
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Quận/huyện',
        name: 'residenceDistrictCode',
        inputProps: {
          placeholder: 'Chọn',
          options: districtOptions,
          disabled: !residenceProvinceCode,
          filterOption: true,
          showSearch: true,
        },
        colProps: { span: 8 },
        rules: [{ required: true }],
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Xã/phường',
        name: 'residenceWardCode',
        inputProps: {
          placeholder: 'Chọn',
          options: wardOptions,
          disabled: !residenceDistrictCode,
          filterOption: true,
          showSearch: true,
        },
        colProps: { span: 8 },
        rules: [{ required: true }],
      },
      {
        type: INPUT_TYPE.LABEL,
        inputProps: { label: 'Địa chỉ nơi ở hiện tại' },
        colProps: { span: 24 },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Tỉnh/thành phố',
        name: 'currentProvinceCode',
        inputProps: {
          placeholder: 'Chọn',
          options: currentProvinceOptions,
          filterOption: true,
          showSearch: true,
        },
        colProps: { span: 8 },
        rules: [{ required: true }],
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Quận/huyện',
        name: 'currentDistrictCode',
        inputProps: {
          placeholder: 'Chọn',
          options: currentDistrictOptions,
          disabled: !currentProvinceCode,
        },
        colProps: { span: 8 },
        rules: [{ required: true }],
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Xã/phường',
        name: 'currentWardCode',
        inputProps: {
          placeholder: 'Chọn',
          options: currentWardOptions,
          disabled: !currentDistrictCode,
          filterOption: true,
          showSearch: true,
        },
        colProps: { span: 8 },
        rules: [{ required: true }],
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Thời điểm mở App',
        name: 'appDate',
        inputProps: {
          readOnly: true,
          disabled: true,
        },
        colProps: { span: 8 },
        getValueProps: (value) => {
          return {
            value: dayjs(value).format(DATE_SLASH_FORMAT_DDMMYYYY),
          };
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Số tháng có phát sinh nợ/có liên tiếp',
        name: 'countOfTransaction',
        inputProps: { readOnly: true, disabled: true },
        colProps: { span: 8 },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Cấp độ eKYC/KYC tại MB',
        name: 'ekycLevel',
        inputProps: { readOnly: true, disabled: true },
        colProps: { span: 8 },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Số lượng giao dịch trung bình/tháng trong 3 tháng gần nhất',
        name: 'averageTransaction',
        inputProps: { readOnly: true, disabled: true },
        colProps: { span: 12 },
      },
      {
        type: INPUT_TYPE.CURRENCY,
        label: 'Số tiền giao dịch trung bình/tháng trong 3 tháng gần nhất',
        name: 'averageCreditAmt',
        inputProps: {
          readOnly: true,
          disabled: true,
        },
        colProps: { span: 12 },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Số tháng có phát sinh giao dịch Có liên tiếp',
        name: 'averageCreditMonth',
        inputProps: { readOnly: true, disabled: true },
        colProps: { span: 12 },
      },
      {
        type: INPUT_TYPE.CURRENCY,
        label:
          'Số tiền giao dịch phát sinh Nợ trung bình/tháng trong 3 tháng gần nhất',
        name: 'averageDebitAmt',
        inputProps: { readOnly: true, disabled: true },
        colProps: { span: 12 },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Số tháng có phát sinh giao dịch Nợ liên tiếp',
        name: 'averageDebitMonth',
        inputProps: { readOnly: true, disabled: true },
        colProps: { span: 12 },
      },
      {
        type: INPUT_TYPE.CURRENCY,
        label: 'Số dư CASA bình quân 3 tháng gần nhất',
        name: 'averageCasa',
        inputProps: { readOnly: true, disabled: true },
        colProps: { span: 12 },
      },
      {
        type: INPUT_TYPE.CURRENCY,
        label:
          'Lương trả qua tài khoản MB (trung bình/tháng trong 3 tháng gần nhất)',
        name: 'averageSalary',
        inputProps: { readOnly: true, disabled: true },
        colProps: { span: 12 },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Số tháng nhận lương liên tiếp',
        name: 'countOfSalary',
        inputProps: { readOnly: true, disabled: true },
        colProps: { span: 12 },
      },
    ];
    const assetItems: TFormItem[] = [
      {
        type: INPUT_TYPE.SELECT,
        label: 'Loại tài sản',
        name: 'assetCategoryCode',
        inputProps: {
          placeholder: 'Chọn',
          options: assetCategoryOptions,
        },
        rules: [{ required: true }],
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Hãng sản xuất',
        name: 'assetCompanyCode',
        inputProps: {
          placeholder: 'Chọn',
          options: assetCompanyOptions,
          disabled: !assetCategoryCode,
        },
        rules: [{ required: true }],
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Dòng sản xuất',
        name: 'assetModelCode',
        inputProps: {
          placeholder: 'Chọn',
          options: assetModelOptions,
          disabled: !assetCompanyCode,
        },
        rules: [{ required: true }],
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Năm sản xuất',
        name: 'assetYear',
        inputProps: {
          placeholder: 'Chọn',
          options: assetYearOptions,
          disabled: !assetModelCode,
        },
        rules: [{ required: true }],
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Tên tài sản',
        name: 'assetInfoCode',
        inputProps: {
          placeholder: 'Chọn',
          options: assetNameOptions,
          disabled: !assetYear,
        },
        colProps: { span: 24 },
        rules: [{ required: true }],
      },
      {
        type: INPUT_TYPE.DATE_PICKER,
        label: 'Ngày cấp đăng ký xe',
        name: 'paperIssueDate',
        inputProps: {
          placeholder: 'Chọn',
          disabled: !assetInfoCode,
        },
        rules: [{ required: true }],
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Đăng ký xe/Cà vẹt',
        name: 'assetInfoValue',
        inputProps: {
          placeholder: 'Nhập...',
          disabled: !assetInfoCode,
          maxLength: 50,
        },
        rules: [{ required: true }],
      },
    ];

    const bankItems: TFormItem[] = [
      {
        type: INPUT_TYPE.SELECT,
        label: 'Loại giấy tờ định danh',
        name: 'typeOfIdCode',
        inputProps: {
          placeholder: 'Chọn',
          options: identityOptions,
        },
        rules: [{ required: true }],
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Số giấy tờ định danh',
        name: 'personalId',
        inputProps: {
          placeholder: 'Nhập...',
          maxLength: 20,
        },
        getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => {
          return e.target.value.replace(/[^a-zA-Z0-9]/g, '');
        },
        rules: [{ required: true }],
      },
      {
        type: INPUT_TYPE.DATE_PICKER,
        label: 'Ngày cấp',
        name: 'issueDate',
        inputProps: { placeholder: 'Chọn', maxDate: dayjs() },
        rules: [{ required: true }],
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Nghề nghiệp',
        name: 'jobCode',
        inputProps: {
          placeholder: 'Chọn',
          options: jobOptions,
        },
        rules: [{ required: true }],
      },
      {
        type: INPUT_TYPE.CURRENCY,
        label: 'Thu nhập trung bình/tháng',
        name: 'averageMonthlyIncome',
        inputProps: {
          placeholder: 'Nhập...',
        },
        rules: [{ required: true }],
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Hình thức chứng minh thu nhập',
        name: 'incomeProofCode',
        inputProps: {
          placeholder: 'Chọn',
          options: proofOptions,
        },
        rules: [{ required: true }],
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Tình trạng hôn nhân',
        name: 'customerMaritalStatusCode',
        inputProps: {
          placeholder: 'Chọn',
          options: maritalStatusOptions,
        },
        rules: [{ required: true }],
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Số người trực tiếp phải nuôi dưỡng',
        name: 'numberOfChildren',
        inputProps: { placeholder: 'Nhập...' },
        rules: [{ required: true }],
        getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value.replace(/[^0-9]/g, '');
          return value;
        },
      },
      {
        type: INPUT_TYPE.CURRENCY,
        label: 'Số tiền khách hàng muốn vay',
        name: 'loanMoney',
        inputProps: { placeholder: 'Nhập...' },
        rules: [{ required: true }],
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Phương thức trả nợ gốc',
        name: 'paymentMethod',
        inputProps: {
          placeholder: 'Chọn',
          options: debtRepaymentMethodOptions,
        },
        rules: [{ required: true }],
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Thời hạn khách hàng muốn vay',
        name: 'tenor',
        inputProps: {
          placeholder: 'Nhập...',
        },
        getValueFromEvent: (e: React.ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value.replace(/^0+|[^0-9]/g, '');
          return value;
        },
        rules: [{ required: true }],
      },
    ];

    return {
      firstItems: basicItems,
      secondItems: assetItems,
      thirdItems: bankItems,
    };
  }, [
    identityOptions,
    jobOptions,
    debtRepaymentMethodOptions,
    maritalStatusOptions,
    proofOptions,
    assetCategoryOptions,
    assetCompanyOptions,
    assetModelOptions,
    assetYearOptions,
    assetNameOptions,
    assetCategoryCode,
    assetCompanyCode,
    assetModelCode,
    assetYear,
    provinceOptions,
    districtOptions,
    wardOptions,
    currentProvinceOptions,
    currentDistrictOptions,
    currentWardOptions,
    residenceProvinceCode,
    residenceDistrictCode,
    currentProvinceCode,
    currentDistrictCode,
    assetInfoCode,
  ]);

  const handleFormValuesChange = useCallback(
    (changedValues: FieldChangeInfo[]) => {
      const changedField = changedValues[0]?.name[0];
      if (!changedField) return;

      const fieldsToReset =
        FIELD_DEPENDENCIES[changedField as keyof typeof FIELD_DEPENDENCIES];
      if (fieldsToReset) {
        const resetValues = fieldsToReset.reduce(
          (acc, field) => ({
            ...acc,
            [field]: undefined,
          }),
          {},
        );
        form.setFieldsValue(resetValues);
      }
    },
    [form],
  );

  const { customerId } = useParams();
  const [loanLimit, setLoanLimit] = useState<number | undefined>(undefined);
  const { mutate: checkLoanLimitMutation, isPending: loading } =
    useCustomerCheckLoanLimit();

  // TODO: integrate with api
  const { data: customerData } = useCustomerViewQuery({
    id: 'cc3069d3-0bfc-4eb2-b2e7-f0b3a5197eae',
  });
  const { data: draftLoanLimit } = useCustomerGetDraftLoanLimit(customerId);

  const saveDraft = async () => {
    const formData = form.getFieldsValue();

    const collectInfo = mapFormDataToDTO(formData, {
      identityOptions,
      jobOptions,
      proofOptions,
      maritalStatusOptions,
      provinceOptions,
      districtOptions,
      wardOptions,
      currentProvinceOptions,
      currentDistrictOptions,
      currentWardOptions,
      assetCategoryOptions,
      assetCompanyOptions,
      assetModelOptions,
      assetNameOptions,
    });

    checkLoanLimitMutation(
      { ...collectInfo, saveDraft: true },
      {
        onSuccess: () => {
          message.success('Save draft successfully');
        },
        onError: () => {
          message.error('Save draft failed');
        },
      },
    );
  };

  const checkLoanLimit = async () => {
    await form.validateFields();
    const formData = form.getFieldsValue();

    const collectInfo = mapFormDataToDTO(formData, {
      identityOptions,
      jobOptions,
      proofOptions,
      maritalStatusOptions,
      provinceOptions,
      districtOptions,
      wardOptions,
      currentProvinceOptions,
      currentDistrictOptions,
      currentWardOptions,
      assetCategoryOptions,
      assetCompanyOptions,
      assetModelOptions,
      assetNameOptions,
    });

    checkLoanLimitMutation(collectInfo, {
      onSuccess: (res) => {
        setLoanLimit(Number(res.data.customerLimit));
      },
      onError: () => {
        setLoanLimit(0);
        message.error('Không tìm thấy thông tin khách hàng');
      },
    });
  };

  useEffect(() => {
    if (draftLoanLimit?.data) {
      const formData = mapDraftToFormData(draftLoanLimit.data);
      form.setFieldsValue(formData as unknown as CustomerCollectFormDTO);
    }
    if (data && genderOptions) {
      form.setFieldsValue({
        customerName: customerData?.name,
        genderCode: customerData?.genderCategory?.name,
        dateOfBirth: customerData?.birthday,
        mobileNumber: customerData?.phone,
        appDate: customerData?.activeAppTime,
        countOfTransaction: customerData?.transationTime?.toString(),
        ekycLevel: customerData?.levelKyc?.toString(),
        averageTransaction: customerData?.transationAverage?.toString(),
        averageCreditAmt: customerData?.crAmountAverage,
        averageCreditMonth: customerData?.crAmountTime?.toString(),
        averageDebitAmt: customerData?.drAmountAverage,
        averageDebitMonth: customerData?.drAmountTime?.toString(),
        averageCasa: customerData?.casaAverage,
        averageSalary: customerData?.salaryAverage,
        countOfSalary: customerData?.salaryTime?.toString(),
        personalId: customerData?.identityCard,
      });
    }
  }, [data, form, genderOptions, customerData, draftLoanLimit]);

  return {
    form,
    firstItems,
    secondItems,
    thirdItems,
    loanLimit,
    loading,
    handleFormValuesChange,
    saveDraft,
    checkLoanLimit,
  };
};
