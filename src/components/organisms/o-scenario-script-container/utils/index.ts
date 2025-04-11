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
  called: boolean;
}

const arraysEqualWithSet = (a: string[], b: string[]) =>
  a.length === b.length && new Set(a).size === new Set([...a, ...b]).size;

const getChangedSteps = (
  approachData: ApproachFormData,
  initialValue: ApproachFormData,
  oldApproachResultSteps: ApproachScriptAttributeDTO[],
  isCalledChange: boolean,
): ApproachResultStep[] => {
  const excludedKeys = [
    'result',
    'resultDetail',
    'rate',
    'note',
    'status',
    'rateCampaign',
    'called',
    'campaignScriptId',
  ];

  return Object.entries(approachData)
    .filter(([key]) => !excludedKeys.includes(key))
    .filter(([key, value]) => {
      const initial = initialValue?.[key] as ApproachStepFormValue;
      const current = value as ApproachStepFormValue;

      return (
        !isEqual(initial?.attributes, current.attributes) ||
        initial?.note !== current.note ||
        isCalledChange
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
  calledIds?: string[],
): ApproachResult => {
  return {
    id: oldApproachResult?.approachResult?.id,
    customerId,
    campaignScriptId,
    result: approachData?.result?.toString() || '',
    resultDetail: approachData?.resultDetail?.toString() || '',
    rate: approachData?.rate?.toString() || '',
    note: approachData?.note?.toString() || '',
    status: approachData?.status?.toString() || '',
    rateCampaign: approachData?.rateCampaign?.toString() || '',
    called: Boolean(calledIds?.includes(campaignScriptId)),
  };
};

export const transformDataToSubmit = (
  currentValues: Record<string, ApproachFormData>,
  initialValues: Record<string, ApproachFormData>,
  approachScriptData: ApproachScriptDTO[],
  customerId: string,
  calledIds: string[],
) => {
  const calledSteps = Object.values(initialValues)
    .filter((i) => Boolean(i.called))
    .map((i) => i.campaignScriptId);

  const isCalledChange = !arraysEqualWithSet(
    calledIds,
    calledSteps as string[],
  );

  return Object.entries(currentValues)
    .map(([campaignScriptId, approachData]) => {
      const oldApproachResult = approachScriptData?.find(
        (i) => i.id === campaignScriptId,
      );
      const oldApproachResultSteps = oldApproachResult?.approachStep || [];
      const initialValue = initialValues[campaignScriptId];

      const changedSteps = getChangedSteps(
        approachData,
        initialValue,
        oldApproachResultSteps,
        isCalledChange,
      );

      const approachResult = createApproachResult(
        approachData,
        customerId,
        initialValue.campaignScriptId,
        oldApproachResult,
        calledIds,
      );

      const initialApproachResult = createApproachResult(
        initialValue,
        customerId,
        initialValue.campaignScriptId,
        oldApproachResult,
        calledIds,
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
