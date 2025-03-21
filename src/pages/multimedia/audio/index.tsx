import type { FC } from 'react';
import { EMediaType } from '@dtos';
import { GenericMultimediaPage } from '../components';

const MultimediaAudioPage: FC = () => {
  return (
    <GenericMultimediaPage mediaType={EMediaType.AUDIO} title="âm thanh" />
  );
};

export default MultimediaAudioPage;
