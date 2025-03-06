import type { FC } from 'react';
import { CategoryType } from '@dtos';
import { GenericCategoryPage } from '../components';

const MediaCategoryPage: FC = () => {
  return (
    <GenericCategoryPage
      categoryKey="media"
      categoryType={CategoryType.MEDIA}
      categoryTitle="Danh mục loại phương tiện"
    />
  );
};

export default MediaCategoryPage;
