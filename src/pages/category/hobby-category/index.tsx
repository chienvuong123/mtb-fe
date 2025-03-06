import { CategoryType } from '@dtos';
import { GenericCategoryPage } from '../components';

const HobbyCategoryPage = () => {
  return (
    <GenericCategoryPage
      categoryKey="hobby"
      categoryType={CategoryType.HOBBY}
      categoryTitle="Danh mục sở thích"
    />
  );
};

export default HobbyCategoryPage;
