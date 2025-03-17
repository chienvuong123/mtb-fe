import type { SalesOpportunitiesDTO } from 'src/dtos/sales-opportunities';

export const convertInitValues = (
  initValues: SalesOpportunitiesDTO,
): Partial<SalesOpportunitiesDTO> => {
  const convertData = {
    key: initValues.id,
    orderId: initValues?.orderId,
    categoryName: `${initValues?.categoryCampaign?.code} - ${initValues?.categoryCampaign?.name}`,
    campaignName: `${initValues?.campaign?.code} - ${initValues?.campaign?.name}`,
    customerCode: initValues?.customer?.code,
    customerName: initValues?.customer?.name,
    mobilePhone: initValues?.mobilePhone,
    customerEmail: initValues?.customer?.email,
    birthDate: initValues?.customer?.birthday,
    gender: initValues?.customer?.genderCategory?.name,
    profession: initValues?.customer?.jobCategory?.name,
    customerSegment: initValues?.customer?.customerSegment?.name,
    cusGroupName: initValues?.customer?.customerGroup?.name,
    branch: initValues?.customer?.branchCategory?.name,
    seller: initValues?.customer?.sellerEntity?.name,
    address: initValues?.customer?.address,
    identityCard: initValues?.customer?.identityCard,
    identnDocType: initValues?.customer?.identnDocTypeCategory?.name,
    status: initValues?.statusDtl?.name,
    limitAmount: initValues?.limitAmount,
    assetName: initValues?.assetNameDtl?.name,
    categoryAssetName: initValues?.categoryAssetDtl?.name,
    loanStatusDtl: initValues?.loanStatusDtl,
    mbOpportunityStt: initValues?.mbOpportunityStt,
    quickOfferStatus: initValues?.quickOfferStatus,
    mobilePhone2: initValues?.mobilePhone2,
    mobilePhone3: initValues?.mobilePhone3,
    customerApproachStatus: initValues?.customerApproachStatusDtl.name,
  } as Partial<SalesOpportunitiesDTO>;

  return convertData;
};
