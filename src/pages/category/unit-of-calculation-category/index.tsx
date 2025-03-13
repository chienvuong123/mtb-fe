import { CategoryType } from '@dtos';
import { GenericCategoryPage } from '../components';

const UnitofCalculationCategoryPage = () => {
  return (
    <GenericCategoryPage
      categoryKey="unit-of-calculation"
      categoryType={CategoryType.UNIT_OF_CALCULATION}
      categoryTitle="Danh mục đơn vị tính"
    />
  );
};

export default UnitofCalculationCategoryPage;
