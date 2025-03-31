import { CategoryType } from '@dtos';
import { GenericCategoryPage } from '../components';

const MbIdentificationCategoryPage = () => {
  return (
    <GenericCategoryPage
      categoryKey="mb-identification"
      categoryType={CategoryType.MB_IDENTIFICATION}
      categoryTitle="Loại giấy tờ định danh"
    />
  );
};

export default MbIdentificationCategoryPage;
