import type { FC } from 'react';
import { EMediaType } from '@dtos';
import { GenericMultimediaPage } from '../components';

const MultimediaAnimatedPage: FC = () => {
  return (
    <GenericMultimediaPage mediaType={EMediaType.ANIMATED} title="hình động" />
  );
};

export default MultimediaAnimatedPage;
