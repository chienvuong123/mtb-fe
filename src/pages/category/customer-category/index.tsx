import type { FC } from 'react';
import { CategoryType } from '@dtos';
import { GenericCategoryPage } from '../components';

const CustomerCategoryPage: FC = () => {
  return (
    <GenericCategoryPage
      categoryKey="customers"
      categoryType={CategoryType.CUSTOMERS}
      categoryTitle="Danh mục khách hàng"
    />
  );
};

export default CustomerCategoryPage;
