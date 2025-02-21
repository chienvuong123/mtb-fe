import type {
  BaseAntdOptionType,
  CustomerCollectFormDTO,
  CustomerCollectInfoDTO,
} from '@dtos';

const getOptionLabel = (
  options: BaseAntdOptionType[] | undefined,
  value: string | number | undefined,
) => {
  return options?.find((option) => option.value === value)?.label || '';
};

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
    customerId: '1',
    orderId: '1',
    campaignId: '1',
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
    assetYear: Number(formData.assetYear),
    tenor: Number(formData.tenor),
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
  };
};
