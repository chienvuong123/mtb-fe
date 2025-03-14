import { CategoryType } from '@dtos';
import { GenericCategoryPage } from '../components';

const GenderCategoryPage = () => {
  return (
    <GenericCategoryPage
      categoryKey="gender"
      categoryType={CategoryType.MB_GENDER}
      categoryTitle="Giới tính"
    />
  );
};

export default GenderCategoryPage;
