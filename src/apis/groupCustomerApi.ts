import type {
  GroupCustomerDTO,
  GroupCustomerSearchRequest,
} from 'src/dtos/group-customer';
import { BaseApi } from './baseApi';

class GroupCustomerApi extends BaseApi<
  GroupCustomerDTO,
  GroupCustomerSearchRequest
> {
  constructor() {
    super('/customer-group/v1.0');
  }
}

export const groupCustomerApi = new GroupCustomerApi();
