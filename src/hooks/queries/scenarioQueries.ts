import { scenarioApi } from '@apis';
import type { ScenarioDTO, ScenarioSearchRequest } from '@dtos';
import { createBaseQueryHooks } from './baseQueries';

export const {
  useSearchQuery: useScenarioSearchQuery,
  useViewQuery: useScenarioViewQuery,
  useAddMutation: useScenarioAddMutation,
  useEditMutation: useScenarioEditMutation,
  useRemoveMutation: useScenarioRemoveMutation,
} = createBaseQueryHooks<ScenarioDTO, ScenarioSearchRequest>(
  'scenarios',
  scenarioApi,
);
