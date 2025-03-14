import { CategoryType } from '@dtos';
import {
  useF88OptionsListQuery,
  useAssetCategoryOptionsListQuery,
  useAssetCompanyOptionsListQuery,
  useAssetModelOptionsListQuery,
  useAssetYearOptionsListQuery,
  useAssetNameOptionsListQuery,
  useLocationOptionsListQuery,
  useCustomerCheckLoanLimit,
  useCustomerViewQuery,
  useCustomerGetDraftLoanLimit,
  CUSTOMER_KEY,
  useForwardBookingInforMutation,
} from '@hooks/queries';
import { INPUT_TYPE, type TFormItem } from '@types';
import { Form, Typography } from 'antd';
import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { CustomerCollectFormDTO } from 'src/dtos/customer-collect-info';
import { useParams } from 'react-router-dom';
import { DATE_SLASH_FORMAT_DDMMYYYY } from '@constants/dateFormat';
import { BLOCKING_NUMBER_PARTERN } from '@constants/regex';
import { validationHelper } from '@utils/validationHelper';
import { useNotification } from '@libs/antd';
import { useQueryClient } from '@tanstack/react-query';
import { CloseIcon, PlusIcon } from '@assets/icons';
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
    'assetYearCode',
    'assetInfoCode',
  ],
  assetCompanyCode: ['assetModelCode', 'assetYearCode', 'assetInfoCode'],
  assetModelCode: ['assetYearCode', 'assetInfoCode'],
  assetYearCode: ['assetInfoCode'],
  residenceProvinceCode: ['residenceDistrictCode', 'residenceWardCode'],
  residenceDistrictCode: ['residenceWardCode'],
  currentProvinceCode: ['currentDistrictCode', 'currentWardCode'],
  currentDistrictCode: ['currentWardCode'],
} as const;

export const useCollectInforController = (opened?: boolean) => {
  const [form] = Form.useForm<CustomerCollectFormDTO>();

  // watch
  const assetCategoryCode = Form.useWatch(['assetCategoryCode'], form);
  const assetCompanyCode = Form.useWatch(['assetCompanyCode'], form);
  const assetModelCode = Form.useWatch(['assetModelCode'], form);
  const assetYearCode = Form.useWatch(['assetYearCode'], form);
  const assetInfoCode = Form.useWatch(['assetInfoCode'], form);
  const residenceProvinceCode = Form.useWatch(['residenceProvinceCode'], form);
  const residenceDistrictCode = Form.useWatch(['residenceDistrictCode'], form);
  const currentProvinceCode = Form.useWatch(['currentProvinceCode'], form);
  const currentDistrictCode = Form.useWatch(['currentDistrictCode'], form);

  const { data: identityOptions } = useF88OptionsListQuery(
    CategoryType.MB_IDENTIFICATION,
  );
  const { data: jobOptions } = useF88OptionsListQuery(CategoryType.F88_JOB);
  const { data: debtRepaymentMethodOptions } = useF88OptionsListQuery(
    CategoryType.F88_DEBT_REPAYMENT_METHOD,
  );
  const { data: maritalStatusOptions } = useF88OptionsListQuery(
    CategoryType.F88_MARITAL_STATUS,
  );
  const { data: proofOptions } = useF88OptionsListQuery(CategoryType.F88_PROOF);
  const { data: genderOptions } = useF88OptionsListQuery(
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
    assetYearCode,
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

  const { mutate: forwardBookingInforMutate } =
    useForwardBookingInforMutation();

  const [showPhone, setShowPhone] = useState({
    mobileNumber1: false,
    mobileNumber2: false,
  });

  const handleAddPhone = () => {
    setShowPhone((pre) => ({
      mobileNumber1: true,
      mobileNumber2: pre.mobileNumber1,
    }));
  };

  const fillByResidence = useCallback(() => {
    form.setFieldValue(
      'currentProvinceCode',
      form.getFieldValue('residenceProvinceCode'),
    );
    form.setFieldValue(
      'currentDistrictCode',
      form.getFieldValue('residenceDistrictCode'),
    );
    form.setFieldValue(
      'currentWardCode',
      form.getFieldValue('residenceWardCode'),
    );
    form.setFieldValue(
      'currentAddressDetails',
      form.getFieldValue('detailedAddressInformation'),
    );
  }, [form]);

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
        name: 'genderName',
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
        inputProps: { placeholder: 'Nhập...', maxLength: 10, disabled: true },
        rules: [{ required: true }],
        colProps: { span: 12 },
        blockingPattern: BLOCKING_NUMBER_PARTERN,
        surfixButton: {
          icon: <PlusIcon color="#5E6371" />,
          type: 'text',
          disabled: showPhone.mobileNumber1 && showPhone.mobileNumber2,
          onClick: handleAddPhone,
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Số điện thoại 2',
        name: 'mobileNumber1',
        inputProps: { placeholder: 'Nhập...', maxLength: 10 },
        colProps: { span: 12 },
        blockingPattern: BLOCKING_NUMBER_PARTERN,
        hidden: !showPhone.mobileNumber1,
        surfixButton: {
          icon: <CloseIcon />,
          type: 'text',
          disabled: showPhone.mobileNumber2,
          onClick: () => {
            setShowPhone((pre) => ({ ...pre, mobileNumber1: false }));
            form.setFieldValue('mobileNumber2', undefined);
          },
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Số điện thoại 3',
        name: 'mobileNumber2',
        inputProps: { placeholder: 'Nhập...', maxLength: 10 },
        colProps: { span: 12 },
        blockingPattern: BLOCKING_NUMBER_PARTERN,
        hidden: !showPhone.mobileNumber2,
        surfixButton: {
          icon: <CloseIcon />,
          type: 'text',
          onClick: () => {
            setShowPhone((pre) => ({ ...pre, mobileNumber2: false }));
            form.setFieldValue('mobileNumber2', undefined);
          },
        },
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
        type: INPUT_TYPE.TEXT,
        label: 'Địa chỉ chi tiết',
        name: 'detailedAddressInformation',
        inputProps: {
          placeholder: 'Nhập...',
        },
        colProps: { span: 24 },
      },
      {
        type: INPUT_TYPE.LABEL,
        inputProps: {
          label: (
            <>
              Địa chỉ nơi ở hiện tại
              <Typography.Text
                className="text-main1 ml-8 cursor-pointer"
                style={{ textDecoration: 'underline' }}
                onClick={fillByResidence}
              >
                Lấy thông tin địa chỉ thường trú
              </Typography.Text>
            </>
          ),
        },
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
          filterOption: true,
          showSearch: true,
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
        label: 'Địa chỉ chi tiết',
        name: 'currentAddressDetails',
        inputProps: {
          placeholder: 'Nhập...',
        },
        colProps: { span: 24 },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Thời điểm mở App',
        name: 'appDate',
        inputProps: {
          readOnly: true,
          disabled: true,
        },
        colProps: { span: 12 },
        getValueProps: (value) => {
          return {
            value: dayjs(value).format(DATE_SLASH_FORMAT_DDMMYYYY),
          };
        },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Cấp độ eKYC/KYC tại MB',
        name: 'ekycLevel',
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
          filterOption: true,
          showSearch: true,
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
          filterOption: true,
          showSearch: true,
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
          filterOption: true,
          showSearch: true,
        },
        rules: [{ required: true }],
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Năm sản xuất',
        name: 'assetYearCode',
        inputProps: {
          placeholder: 'Chọn',
          options: assetYearOptions,
          disabled: !assetModelCode,
          filterOption: true,
          showSearch: true,
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
          disabled: !assetYearCode,
          filterOption: true,
          showSearch: true,
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
          maxDate: dayjs(),
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
        // rules: [{ required: true }],
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
          disabled: true,
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
          disabled: true,
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
        inputProps: { placeholder: 'Chọn', maxDate: dayjs(), disabled: true },
        rules: [{ required: true }],
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Nghề nghiệp',
        name: 'jobCode',
        inputProps: {
          placeholder: 'Chọn',
          options: jobOptions,
          filterOption: true,
          showSearch: true,
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
          filterOption: true,
          showSearch: true,
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
        blockingPattern: BLOCKING_NUMBER_PARTERN,
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
        label: 'Thời hạn khách hàng muốn vay (Tháng)',
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
    assetYearCode,
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
    showPhone,
    form,
    fillByResidence,
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
  const { mutate: checkLoanLimitMutation, isPending: loading } =
    useCustomerCheckLoanLimit();

  const { data: customerQueryData } = useCustomerViewQuery({
    id: customerId as string,
  });
  const customerData = customerQueryData?.data;
  const { data: draftLoanLimit, refetch: refectchLoanLimit } =
    useCustomerGetDraftLoanLimit(customerId);
  const notify = useNotification();
  const queryClient = useQueryClient();

  const saveDraft = async () => {
    const formData = form.getFieldsValue(true);

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
      assetYearOptions,
      assetNameOptions,
    });

    checkLoanLimitMutation(
      { ...collectInfo, saveDraft: true },
      {
        onSuccess: (data) => {
          validationHelper(data, notify, () => {
            refectchLoanLimit();
            notify({
              type: 'success',
              message: 'Cập nhật thông tin thành công',
            });
          });
        },
      },
    );
  };

  const checkLoanLimit = async () => {
    await form.validateFields();
    const formData = form.getFieldsValue(true);

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
      assetYearOptions,
      assetNameOptions,
    });

    checkLoanLimitMutation(collectInfo, {
      onSuccess: (d) => {
        validationHelper(d, notify, () => {
          notify({
            type: 'success',
            message: 'Check hạn mức thành công',
          });
        });
        queryClient.invalidateQueries({
          queryKey: [CUSTOMER_KEY, 'draft-loan-limit', customerId],
        });
      },
    });
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

  const handleFillInitialValues = useCallback(() => {
    const baseFormData = {
      customerName: customerData?.name,
      genderName: customerData?.genderCategory?.name,
      genderCode: customerData?.genderCategory?.code,
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
      customerId: customerData?.id,
      orderId: customerData?.orderId,
      campaignId: customerData?.campaignId,
      typeOfIdCode: customerData?.identnDocTypeCategory?.code,
      issueDate: customerData?.identnDocIssueDate,
    };

    const draftFormData = draftLoanLimit?.data
      ? mapDraftToFormData(draftLoanLimit.data)
      : {};

    if (draftLoanLimit?.data?.mobileNumber1)
      setShowPhone((pre) => ({ ...pre, mobileNumber1: true }));
    if (draftLoanLimit?.data?.mobileNumber2)
      setShowPhone((pre) => ({ ...pre, mobileNumber2: true }));

    form.setFieldsValue({
      ...baseFormData,
      ...draftFormData,
    });
  }, [form, customerData, draftLoanLimit]);

  useEffect(() => {
    if (genderOptions && opened) {
      handleFillInitialValues();
    }
  }, [handleFillInitialValues, genderOptions, opened]);

  return {
    form,
    firstItems,
    secondItems,
    thirdItems,
    loanLimit: Number(draftLoanLimit?.data?.finalMaxLoan ?? 0),
    loading,
    handleFormValuesChange,
    saveDraft,
    checkLoanLimit,
    forwardBookingInfor,
  };
};
