/* eslint-disable class-methods-use-this */
import type { AssetDTO, BaseResponse } from '@dtos';
import { apiRequest } from './apiClient';

const ASSET_ENDPOINT = '/asset';

class AssetApi {
  async getCategoryOptionsList() {
    return apiRequest<BaseResponse<AssetDTO[]>>({
      url: `${ASSET_ENDPOINT}/category/v1.0/get-all`,
      method: 'GET',
    });
  }

  async getCompanyOptionsList({ categoryCode }: { categoryCode: string }) {
    return apiRequest<BaseResponse<AssetDTO[]>>({
      url: `${ASSET_ENDPOINT}/company/v1.0/search?categoryCode=${categoryCode}`,
      method: 'GET',
    });
  }

  async getModelOptionsList({
    companyAssetCode,
    categoryAssetCode,
  }: {
    companyAssetCode: string;
    categoryAssetCode: string;
  }) {
    return apiRequest<BaseResponse<AssetDTO[]>>({
      url: `${ASSET_ENDPOINT}/model/v1.0/search?companyAssetCode=${companyAssetCode}&categoryAssetCode=${categoryAssetCode}`,
      method: 'GET',
    });
  }

  async getYearOptionsList({
    companyAssetCode,
    categoryAssetCode,
    modelAssetCode,
  }: {
    companyAssetCode: string;
    categoryAssetCode: string;
    modelAssetCode: string;
  }) {
    return apiRequest<BaseResponse<AssetDTO[]>>({
      url: `${ASSET_ENDPOINT}/year/v1.0/search?companyAssetCode=${companyAssetCode}&categoryAssetCode=${categoryAssetCode}&modelAssetCode=${modelAssetCode}`,
      method: 'GET',
    });
  }

  async getNameOptionsList({
    companyAssetCode,
    categoryAssetCode,
    modelAssetCode,
    yearCode,
  }: {
    companyAssetCode: string;
    categoryAssetCode: string;
    modelAssetCode: string;
    yearCode: string;
  }) {
    return apiRequest<BaseResponse<AssetDTO[]>>({
      url: `${ASSET_ENDPOINT}/name/v1.0/search?companyAssetCode=${companyAssetCode}&categoryAssetCode=${categoryAssetCode}&modelAssetCode=${modelAssetCode}&yearCode=${yearCode}`,
      method: 'GET',
    });
  }
}

export const assetApi = new AssetApi();
