import { type FC } from 'react';
import type { ApproachScriptDTO } from '@dtos';
import { useApproachScriptAddMutation } from '@hooks/queries';
import { validationHelper } from '@utils/validationHelper';
import { useNotification } from '@libs/antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@routers/path';
import { EStatus } from '@constants/masterData';
import ScenarioForm from './components/ScenarioForm';

const ScenarioCreatePage: FC = () => {
  const notify = useNotification();
  const navigate = useNavigate();
  const { mutate: addApproachScript } = useApproachScriptAddMutation();

  const handleSubmit = (scenarioData: Partial<ApproachScriptDTO>) => {
    addApproachScript(scenarioData, {
      onSuccess: (response) => {
        validationHelper(response, notify, () => {
          notify({
            message: 'Lưu thành công',
            type: 'success',
          });
          navigate(ROUTES.SCENARIO.LIST);
        });
      },
    });
  };

  return (
    <ScenarioForm
      title="Tạo mới kịch bản"
      onSubmit={handleSubmit}
      initialData={{
        scenarioData: {
          status: EStatus.ACTIVE,
        },
      }}
    />
  );
};

export default ScenarioCreatePage;
