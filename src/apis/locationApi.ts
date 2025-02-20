/* eslint-disable class-methods-use-this */
import type { BaseOptionListDTO, BaseResponse } from '@dtos';
import { apiRequest } from './apiClient';

const ENDPOINT = '/locations/v1.0';

class LocationApi {
  async getLocationOptionsList({ parentCode = '0' }: { parentCode?: string }) {
    return apiRequest<BaseResponse<BaseOptionListDTO[]>>({
      url: `${ENDPOINT}/search?parentCode=${parentCode}`,
      method: 'GET',
    });
  }
}

export const locationApi = new LocationApi();
