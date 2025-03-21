import type { FC } from 'react';
import { EMediaType } from '@dtos';
import { GenericMultimediaPage } from '../components';

const MultimediaDocumentPage: FC = () => {
  return (
    <GenericMultimediaPage mediaType={EMediaType.DOCUMENT} title="văn bản" />
  );
};

export default MultimediaDocumentPage;
