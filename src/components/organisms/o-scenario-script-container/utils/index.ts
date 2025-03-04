import type {
  ApproachFormData,
  ApproachScriptAttributeDTO,
  ApproachScriptDTO,
  ApproachStepFormValue,
} from '@dtos';
import { isEqual } from '@utils/objectHelper';

interface ApproachResultStep {
  id?: string;
  approachStepId: string;
  result: string;
  note: string;
}

interface ApproachResult {
  id?: string;
  customerId: string;
  campaignScriptId: string;
  result: string;
  resultDetail: string;
  rate: string;
  note: string;
  status: string;
  rateCampaign: string;
}

const getChangedSteps = (
  approachData: ApproachFormData,
  initialValue: ApproachFormData,
  oldApproachResultSteps: ApproachScriptAttributeDTO[],
): ApproachResultStep[] => {
  return Object.entries(approachData)
    .filter(([key]) => !Number.isNaN(Number(key)))
    .filter(([key, value]) => {
      const initial = initialValue?.[key] as ApproachStepFormValue;
      const current = value as ApproachStepFormValue;

      return (
        !isEqual(initial?.attributes, current.attributes) ||
        initial?.note !== current.note
      );
    })
    .map(([approachStepId, value]) => {
      const oldApproachResultStep = oldApproachResultSteps.find(
        (i) => i.approachResultStep?.approachStepId === approachStepId,
      );
      return {
        id: oldApproachResultStep?.approachResultStep?.id,
        approachStepId,
        result: (value as ApproachStepFormValue).attributes?.toString() || '',
        note: (value as ApproachStepFormValue).note || '',
      };
    });
};

const createApproachResult = (
  approachData: ApproachFormData,
  customerId: string,
  campaignScriptId: string,
  oldApproachResult?: ApproachScriptDTO,
): ApproachResult => {
  return {
    id: oldApproachResult?.approachResult?.id,
    customerId,
    campaignScriptId,
    result: String(approachData.result ?? ''),
    resultDetail: String(approachData.resultDetail ?? ''),
    rate: approachData.rate?.toString() || '',
    note: approachData.note?.toString() || '',
    status: approachData.status?.toString() || '',
    rateCampaign: approachData.rateCampaign?.toString() || '',
  };
};

export const transformDataToSubmit = (
  currentValues: Record<string, ApproachFormData>,
  initialValues: Record<string, ApproachFormData>,
  approachScriptData: ApproachScriptDTO[],
  customerId: string,
) => {
  return Object.entries(currentValues)
    .map(([campaignScriptId, approachData]) => {
      const oldApproachResult = approachScriptData?.find(
        (i) => i.campaignScriptId === campaignScriptId,
      );
      const oldApproachResultSteps = oldApproachResult?.approachStep || [];
      const initialValue = initialValues[campaignScriptId];

      const changedSteps = getChangedSteps(
        approachData,
        initialValue,
        oldApproachResultSteps,
      );

      const approachResult = createApproachResult(
        approachData,
        customerId,
        campaignScriptId,
        oldApproachResult,
      );

      const initialApproachResult = createApproachResult(
        initialValue,
        customerId,
        campaignScriptId,
        oldApproachResult,
      );

      const hasChanges =
        !isEqual(approachResult, initialApproachResult) ||
        changedSteps.length > 0;

      return hasChanges
        ? {
            approachResult,
            approachResultStep: changedSteps,
          }
        : null;
    })
    .filter((e) => e !== null);
};
