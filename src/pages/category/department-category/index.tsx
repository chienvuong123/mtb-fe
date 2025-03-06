import type { FC } from 'react';
import { CategoryType } from '@dtos';
import { GenericCategoryPage } from '../components';

const DepartmentCategoryPage: FC = () => {
  return (
    <GenericCategoryPage
      categoryKey="department"
      categoryType={CategoryType.DEPARTMENT}
      categoryTitle="Danh mục phòng ban"
    />
  );
};

export default DepartmentCategoryPage;
