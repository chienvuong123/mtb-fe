import type { FC } from 'react';
import { CategoryType } from '@dtos';
import { GenericCategoryPage } from '../components';

const BranchCategoryPage: FC = () => {
  return (
    <GenericCategoryPage
      categoryKey="branch"
      categoryType={CategoryType.BRANCHES}
      categoryTitle="Danh mục chi nhánh"
    />
  );
};

export default BranchCategoryPage;
