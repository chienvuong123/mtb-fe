import type { FC } from 'react';
import { EMediaType } from '@dtos';
import { GenericMultimediaPage } from '../components';

const MultimediaVideoPage: FC = () => {
  return <GenericMultimediaPage mediaType={EMediaType.VIDEO} title="video" />;
};

export default MultimediaVideoPage;
