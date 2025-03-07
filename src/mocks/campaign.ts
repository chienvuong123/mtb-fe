/* eslint-disable import/no-unresolved */
import { MOCK_SCENARIOS } from '@mocks/scenario';
import type { ApproachPlanDTO } from '../dtos/approach-plan';

export const MOCK_APPROACH_PLAN: ApproachPlanDTO = {
  id: 'ap-001',
  code: 'AP-2023-001',
  method: 'Digital Marketing',
  campaignId: 'camp-001',
  status: 'ACTIVE',
  scenario: MOCK_SCENARIOS[0],
  createdDate: '2023-07-01T00:00:00Z',
  createdBy: 'system',
  updatedDate: '2023-07-01T00:00:00Z',
  updatedBy: 'system',
};
