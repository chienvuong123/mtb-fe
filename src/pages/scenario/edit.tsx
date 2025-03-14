/* eslint-disable import/order */
import { useState, useEffect, type FC } from 'react';
import type { ApproachScriptAttributeDTO, ApproachScriptDTO } from '@dtos';
import {
  useApproachScriptEditMutation,
  useApproachScriptViewQuery,
} from '@hooks/queries';
import { validationHelper } from '@utils/validationHelper';
import { useNotification } from '@libs/antd';
import { useNavigate, useParams } from 'react-router-dom';
import ScenarioForm from './components/ScenarioForm';

const ScenarioEditPage: FC = () => {
  const [initialData, setInitialData] = useState<{
    scenarioData?: ApproachScriptDTO;
    attributeList?: ApproachScriptAttributeDTO[];
  }>({});

  const notify = useNotification();
  const navigate = useNavigate();
  const { id: scenarioId } = useParams<{ id: string }>();

  const { mutate: editApproachScript } = useApproachScriptEditMutation();
  const { data: scenario, isLoading } = useApproachScriptViewQuery({
    id: scenarioId as string,
  });

  const handleSubmit = (scenarioData: Partial<ApproachScriptDTO>) => {
    editApproachScript(
      {
        id: scenarioId as string,
        ...scenarioData,
      },
      {
        onSuccess: (response) => {
          validationHelper(response, notify, () => {
            notify({
              message: 'Cập nhật thành công',
              type: 'success',
            });
            navigate('/scenario/list');
          });
        },
      },
    );
  };

  useEffect(() => {
    if (scenario?.data) {
      setInitialData({
        scenarioData: scenario.data,
        attributeList: (scenario.data.approachStep || []).map((e) => ({
          ...e,
          content: JSON.parse(e.content || ''),
          controlCode: e.controlId,
        })),
      });
    }
  }, [scenario]);

  if (isLoading) {
    return null;
  }

  return (
    <ScenarioForm
      title="Chỉnh sửa kịch bản"
      initialData={initialData}
      onSubmit={handleSubmit}
    />
  );
};

export default ScenarioEditPage;
