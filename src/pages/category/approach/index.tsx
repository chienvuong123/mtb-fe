import { CategoryType } from '@dtos';
import { GenericCategoryPage } from '../components';

const ApproachCategoryPage = () => {
  return (
    <GenericCategoryPage
      categoryKey="appoach"
      categoryType={CategoryType.APPROACH}
      categoryTitle="Danh mục phương thức tiếp cận"
    />
  );
};

export default ApproachCategoryPage;
