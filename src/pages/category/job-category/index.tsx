import { CategoryType } from '@dtos';
import { GenericCategoryPage } from '../components';

const JobCategoryPage = () => {
  return (
    <GenericCategoryPage
      categoryKey="job"
      categoryType={CategoryType.JOB}
      categoryTitle="Danh mục nghề nghiệp"
    />
  );
};

export default JobCategoryPage;
