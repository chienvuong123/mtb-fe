import { CategoryType } from '@dtos';
import { GenericCategoryPage } from '../components';

const CampaignTypeCategoryPage = () => {
  return (
    <GenericCategoryPage
      categoryKey="campaign-type"
      categoryType={CategoryType.CAMPAIGN_TYPE}
      categoryTitle="Loại chiến dịch"
    />
  );
};

export default CampaignTypeCategoryPage;
