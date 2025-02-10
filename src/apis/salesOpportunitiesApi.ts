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
    // super('/opportunity/v1.0');
    super('https://67a813ae203008941f691560.mockapi.io');
  }
}

export const salesOpportunitiesApi = new SalesOpportunities();
