import type { FC } from 'react';
import { CategoryType } from '@dtos';
import { GenericCategoryPage } from '../components';

const ExpertiseCategoryPage: FC = () => {
  return (
    <GenericCategoryPage
      categoryKey="expertise"
      categoryType={CategoryType.EXPERTISE}
      categoryTitle="Danh mục chuyên môn"
    />
  );
};

export default ExpertiseCategoryPage;
