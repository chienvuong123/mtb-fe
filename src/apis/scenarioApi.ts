import type { ScenarioDTO, ScenarioSearchRequest } from '@dtos';
import { BaseApi } from './baseApi';

class ScenarioApi extends BaseApi<ScenarioDTO, ScenarioSearchRequest> {
  constructor() {
    super('/scenario/v1.0');
  }
}

export const scenarioApi = new ScenarioApi();
