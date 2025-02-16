import { MOCK_SCENARIOS } from '@mocks/scenario';
import type { CampaignDTO } from '../dtos/campaign';
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

export const MOCK_CAMPAIGN: CampaignDTO = {
  id: 'camp-001',
  code: 'CAMP-2023-001',
  name: 'Q3 Marketing Campaign',
  status: 'ACTIVE',
  approachPlans: [MOCK_APPROACH_PLAN],
  createdDate: '2023-07-01T00:00:00Z',
  createdBy: 'system',
  updatedDate: '2023-07-01T00:00:00Z',
  updatedBy: 'system',
};
