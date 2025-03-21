import type { FC } from 'react';
import { EMediaType } from '@dtos';
import { GenericMultimediaPage } from '../components';

const MultimediaImagePage: FC = () => {
  return (
    <GenericMultimediaPage mediaType={EMediaType.IMAGE} title="hình ảnh" />
  );
};

export default MultimediaImagePage;
