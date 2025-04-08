import { useEffect, useState, type FC } from 'react';
import type {
  ApproachScriptAttributeDTO,
  ApproachScriptDTO,
  BaseResponse,
} from '@dtos';
import {
  useApproachScriptAddMutation,
  useApproachScriptViewQuery,
} from '@hooks/queries';
import { validationHelper } from '@utils/validationHelper';
import { useNotification } from '@libs/antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@routers/path';
import { EStatus } from '@constants/masterData';
import ScenarioForm from './components/ScenarioForm';

const ScenarioCreatePage: FC = () => {
  const notify = useNotification();
  const navigate = useNavigate();
  const { mutate: addApproachScript } = useApproachScriptAddMutation();

  const [initialData, setInitialData] = useState<{
    scenarioData?: Partial<ApproachScriptDTO>;
    attributeList?: ApproachScriptAttributeDTO[];
  }>({});

  const { id } = useParams();

  const { refetch } = useApproachScriptViewQuery(
    {
      id: id as string,
    },
    { enabled: false },
  );

  const fetchScenario = async () => {
    if (!id) {
      setInitialData({
        scenarioData: {
          status: EStatus.ACTIVE,
        },
      });
      return;
    }

    try {
      const { data } = await refetch();
      const scenario = data as BaseResponse<ApproachScriptDTO>;

      validationHelper(scenario, notify, () => {
        setInitialData({
          scenarioData: scenario.data,
          attributeList: (scenario.data.approachStep || []).map((e) => ({
            ...e,
            content: e?.content ? JSON.parse(e?.content) : '',
            controlCode: e.controlId,
          })),
        });
      });
    } catch {
      notify({
        type: 'error',
        message: 'Đã xảy ra lỗi khi tải dữ liệu kịch bản.',
      });
    }
  };

  useEffect(() => {
    fetchScenario();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      initialData={initialData}
    />
  );
};

export default ScenarioCreatePage;
