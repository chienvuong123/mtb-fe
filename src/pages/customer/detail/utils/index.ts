import { DATE_SLASH_FORMAT_DDMMYYYY } from '@constants/dateFormat';
import { EControlType } from '@constants/masterData';
import type {
  CustomerCollectFormDTO,
  BaseAntdOptionType,
  CustomerCollectInfoDTO,
  ApproachScriptDTO,
  ApproachScriptAttributeDTO,
  ApproachFormData,
} from '@dtos';
import { getOptionLabel } from '@utils/objectHelper';
import dayjs from 'dayjs';

const formatAddressString = (
  province: string,
  district: string,
  ward: string,
) => {
  return `${province} - ${district} - ${ward}`;
};

export const mapFormDataToDTO = (
  formData: CustomerCollectFormDTO,
  options: {
    identityOptions?: BaseAntdOptionType[];
    jobOptions?: BaseAntdOptionType[];
    proofOptions?: BaseAntdOptionType[];
    maritalStatusOptions?: BaseAntdOptionType[];
    provinceOptions?: BaseAntdOptionType[];
    districtOptions?: BaseAntdOptionType[];
    wardOptions?: BaseAntdOptionType[];
    currentProvinceOptions?: BaseAntdOptionType[];
    currentDistrictOptions?: BaseAntdOptionType[];
    currentWardOptions?: BaseAntdOptionType[];
    assetCategoryOptions?: BaseAntdOptionType[];
    assetCompanyOptions?: BaseAntdOptionType[];
    assetModelOptions?: BaseAntdOptionType[];
    assetYearOptions?: BaseAntdOptionType[];
    assetNameOptions?: BaseAntdOptionType[];
  },
): CustomerCollectInfoDTO => {
  const {
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
  } = options;

  const residenceProvinceName = getOptionLabel(
    provinceOptions,
    formData.residenceProvinceCode,
  );
  const residenceDistrictName = getOptionLabel(
    districtOptions,
    formData.residenceDistrictCode,
  );
  const residenceWardName = getOptionLabel(
    wardOptions,
    formData.residenceWardCode,
  );

  const currentProvinceName = getOptionLabel(
    currentProvinceOptions,
    formData.currentProvinceCode,
  );
  const currentDistrictName = getOptionLabel(
    currentDistrictOptions,
    formData.currentDistrictCode,
  );
  const currentWardName = getOptionLabel(
    currentWardOptions,
    formData.currentWardCode,
  );

  return {
    ...formData,
    typeOfIdName: getOptionLabel(identityOptions, formData.typeOfIdCode),
    jobName: getOptionLabel(jobOptions, formData.jobCode),
    incomeProofName: getOptionLabel(proofOptions, formData.incomeProofCode),
    customerMaritalStatusName: getOptionLabel(
      maritalStatusOptions,
      formData.customerMaritalStatusCode,
    ),
    residenceProvinceName,
    residenceDistrictName,
    residenceWardName,
    currentProvinceName,
    currentDistrictName,
    currentWardName,
    assetCategoryName: getOptionLabel(
      assetCategoryOptions,
      formData.assetCategoryCode,
    ),
    assetCompanyName: getOptionLabel(
      assetCompanyOptions,
      formData.assetCompanyCode,
    ),
    assetModelName: getOptionLabel(assetModelOptions, formData.assetModelCode),
    assetInfoName: getOptionLabel(assetNameOptions, formData.assetInfoCode),
    assetYearName: getOptionLabel(assetYearOptions, formData.assetYearCode),
    tenor: formData.tenor ? `${formData.tenor}M` : '',
    averageTransaction: Number(formData.averageTransaction),
    countOfTransaction: Number(formData.countOfTransaction),
    averageCreditAmt: Number(formData.averageCreditAmt),
    averageDebitAmt: Number(formData.averageDebitAmt),
    averageCasa: Number(formData.averageCasa),
    averageSalary: Number(formData.averageSalary),
    countOfSalary: Number(formData.countOfSalary),
    numberOfChildren: Number(formData.numberOfChildren),
    averageCreditMonth: Number(formData.averageCreditMonth),
    averageDebitMonth: Number(formData.averageDebitMonth),
    residenceAddress: formatAddressString(
      residenceProvinceName,
      residenceDistrictName,
      residenceWardName,
    ),
    currentAddress: formatAddressString(
      currentProvinceName,
      currentDistrictName,
      currentWardName,
    ),
    issueDate: dayjs(formData.issueDate).format(DATE_SLASH_FORMAT_DDMMYYYY),
    paperIssueDate: dayjs(formData.paperIssueDate).format(
      DATE_SLASH_FORMAT_DDMMYYYY,
    ),
    appDate: dayjs(formData.appDate).format(DATE_SLASH_FORMAT_DDMMYYYY),
  };
};

export const mapDraftToFormData = (dto: CustomerCollectInfoDTO) => {
  return {
    ...dto,
    issueDate: dto.issueDate
      ? dayjs(dto.issueDate, DATE_SLASH_FORMAT_DDMMYYYY)
      : undefined,
    paperIssueDate: dto.paperIssueDate
      ? dayjs(dto.paperIssueDate, DATE_SLASH_FORMAT_DDMMYYYY)
      : undefined,
    appDate: dto.appDate
      ? dayjs(dto.appDate, DATE_SLASH_FORMAT_DDMMYYYY)
      : undefined,
    tenor: dto.tenor?.toString()?.replace('M', ''),
    averageTransaction: dto.averageTransaction?.toString(),
    countOfTransaction: dto.countOfTransaction?.toString(),
    averageCreditAmt: dto.averageCreditAmt?.toString(),
    averageDebitAmt: dto.averageDebitAmt?.toString(),
    averageCasa: dto.averageCasa?.toString(),
    averageSalary: dto.averageSalary?.toString(),
    countOfSalary: dto.countOfSalary?.toString(),
    numberOfChildren: dto.numberOfChildren?.toString(),
    averageCreditMonth: dto.averageCreditMonth?.toString(),
    averageDebitMonth: dto.averageDebitMonth?.toString(),
  };
};

export const getInitialValues = (
  approachScriptData: ApproachScriptDTO[],
  statusOptions: BaseAntdOptionType[],
) => {
  const getStepResult = (step: ApproachScriptAttributeDTO) => {
    if (step.controlType === EControlType.CHECKBOX) {
      return step.approachResultStep?.result?.split(',');
    }
    if (step.controlType === EControlType.DATETIME) {
      return step.approachResultStep?.result
        ? dayjs(step.approachResultStep.result)
        : undefined;
    }
    return step.approachResultStep?.result;
  };

  const processApproachStep = (step: ApproachScriptAttributeDTO) => ({
    [step.id]: {
      attributes: getStepResult(step),
      note: step.approachResultStep?.note,
    },
  });

  const processApproachScript = (approachScript: ApproachScriptDTO) => ({
    [approachScript.id]: {
      ...approachScript.approachStep.reduce(
        (stepAcc, step) => ({
          ...stepAcc,
          ...processApproachStep(step),
        }),
        {},
      ),
      result: approachScript.approachResult?.result,
      resultDetail: approachScript.approachResult?.resultDetail,
      rate: approachScript.approachResult?.rate,
      note: approachScript.approachResult?.note,
      status: approachScript.approachResult?.status || statusOptions[0].value,
      rateCampaign: approachScript.approachResult?.rateCampaign,
    },
  });

  const initialValues = approachScriptData.reduce(
    (acc, approachScript) => ({
      ...acc,
      ...processApproachScript(approachScript),
    }),
    {},
  );

  return initialValues as Record<string, ApproachFormData>;
};
