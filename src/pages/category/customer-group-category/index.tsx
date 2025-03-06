import { CategoryType } from '@dtos';
import { GenericCategoryPage } from '../components';

const CustomerGroupCategoryPage = () => {
  return (
    <GenericCategoryPage
      categoryKey="customer-group"
      categoryType={CategoryType.CUSTOMER_GROUP}
      categoryTitle="Danh mục nhóm khách hàng"
    />
  );
};

export default CustomerGroupCategoryPage;
