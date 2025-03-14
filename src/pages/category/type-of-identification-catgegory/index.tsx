import { CategoryType } from '@dtos';
import { GenericCategoryPage } from '../components';

const TypeOfIdentificationCategoryPage = () => {
  return (
    <GenericCategoryPage
      categoryKey="type-of-identification"
      categoryType={CategoryType.TYPE_OF_IDENTIFICATION}
      categoryTitle="Loại giấy tờ định danh"
    />
  );
};

export default TypeOfIdentificationCategoryPage;
