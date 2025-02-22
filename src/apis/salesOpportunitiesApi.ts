import type {
  SalesOpportunitiesDTO,
  SalesOpportunitiesSearchRequest,
} from 'src/dtos/sales-opportunities';
import { BaseApi } from './baseApi';

class SalesOpportunities extends BaseApi<
  SalesOpportunitiesDTO,
  SalesOpportunitiesSearchRequest
> {
  constructor() {
    super('/sales-opportunity/v1.0');
  }
}

export const salesOpportunitiesApi = new SalesOpportunities();
