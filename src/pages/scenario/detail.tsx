import { type FC } from 'react';

import './index.scss';
import { useParams } from 'react-router-dom';
import { useApproachScriptViewQuery } from '@hooks/queries';
import { ScenarioScriptContainer } from '@components/organisms';
import { Form } from 'antd';

const ScenarioDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: scenario } = useApproachScriptViewQuery({
    id: id as string,
  });

  const [form] = Form.useForm();

  if (!scenario) return null;

  return (
    <div className="mt-28 border-2 rounded-8 border-gray-border bg-white pa-24">
      <p className="mb-40 fs-24 fw-500 cbg7">Bản xem trước</p>
      <ScenarioScriptContainer
        isLastApproach={false}
        form={form}
        approach={scenario.data}
        isPreview
      />
    </div>
  );
};

export default ScenarioDetailPage;
