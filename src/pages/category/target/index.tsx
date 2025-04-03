import { CategoryType } from '@dtos';
import { GenericCategoryPage } from '../components';

const ApproachCategoryPage = () => {
  return (
    <GenericCategoryPage
      categoryKey="target"
      categoryType={CategoryType.TARGET}
      categoryTitle="Danh mục mục tiêu"
    />
  );
};

export default ApproachCategoryPage;
