import type { ControlDTO, ControlSearchRequest } from '@dtos';
import { BaseApi } from './baseApi';

class ControlApi extends BaseApi<ControlDTO, ControlSearchRequest> {
  constructor() {
    super('/control/v1.0');
  }
}

export const controlApi = new ControlApi();
