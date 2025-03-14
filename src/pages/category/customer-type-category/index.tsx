import { CategoryType } from '@dtos';
import { GenericCategoryPage } from '../components';

const CustomerTypeCategoryPage = () => {
  return (
    <GenericCategoryPage
      categoryKey="customer-type"
      categoryType={CategoryType.CUSTOMER_TYPE}
      categoryTitle="Danh mục loại khách hàng"
    />
  );
};

export default CustomerTypeCategoryPage;
