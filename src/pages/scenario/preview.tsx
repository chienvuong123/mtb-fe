import { type FC } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useApproachScriptViewQuery } from '@hooks/queries';
import { OActionFooter, ScenarioScriptContainer } from '@components/organisms';
import { Form } from 'antd';
import { PATH_SEGMENT, ROUTES } from '@routers/path';
import { useProfile } from '@stores';

const ScenarioPreviewPage: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: scenario } = useApproachScriptViewQuery({
    id: id as string,
  });
  const { hasPermission } = useProfile();

  const [form] = Form.useForm();

  const handleBack = () => {
    if (hasPermission(ROUTES.SCENARIO.DETAIL)) {
      navigate(`${ROUTES.SCENARIO.ROOT}/${PATH_SEGMENT.DETAIL}/${id}`);
    } else {
      navigate(ROUTES.SCENARIO.LIST);
    }
  };

  if (!scenario) return null;

  return (
    <div className="mt-28 border-2 rounded-8 border-gray-border bg-white pa-24">
      <p className="mb-40 fs-24 fw-500 cbg7">Bản xem trước</p>
      <ScenarioScriptContainer
        isFirstApproach={false}
        form={form}
        approach={scenario.data}
        isPreview
      />
      <OActionFooter onBack={handleBack} />
    </div>
  );
};

export default ScenarioPreviewPage;
