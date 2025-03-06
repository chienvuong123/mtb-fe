import type { FC } from 'react';
import { CategoryType } from '@dtos';
import { GenericCategoryPage } from '../components';

const PositionCategoryPage: FC = () => {
  return (
    <GenericCategoryPage
      categoryKey="positon"
      categoryType={CategoryType.POSITION}
      categoryTitle="Danh mục chức vụ"
    />
  );
};

export default PositionCategoryPage;
