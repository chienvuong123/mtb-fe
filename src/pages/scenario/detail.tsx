import Title from 'antd/lib/typography/Title';
import { type FC } from 'react';

import './index.scss';
import { useParams } from 'react-router-dom';

const ScenarioDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="pt-32">
      <Title level={3} className="mb-24">
        Chi tiết kịch bản {id}
      </Title>
    </div>
  );
};

export default ScenarioDetailPage;
