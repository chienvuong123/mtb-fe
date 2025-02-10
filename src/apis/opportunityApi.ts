import { BaseApi } from './baseApi';
import type { OpportunitySellDTO, OpportunitySellSearchRequest } from 'src/dtos/opportunity';

class OpportunitySellApi extends BaseApi<OpportunitySellDTO, OpportunitySellSearchRequest> {
  constructor() {
    super('/opportunity/v1.0');
  }
}

export const opportunitySellApi = new OpportunitySellApi();
