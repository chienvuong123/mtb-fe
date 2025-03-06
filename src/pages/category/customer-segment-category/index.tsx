import type { FC } from 'react';
import { CategoryType } from '@dtos';
import { GenericCategoryPage } from '../components';

const CustomerSegmentCategoryPage: FC = () => {
  return (
    <GenericCategoryPage
      categoryKey="customer-segment"
      categoryType={CategoryType.CUSTOMER_SEGMENT}
      categoryTitle="Danh mục phân khúc khách hàng"
    />
  );
};

export default CustomerSegmentCategoryPage;
