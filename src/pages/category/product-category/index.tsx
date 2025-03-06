import type { FC } from 'react';
import { CategoryType } from '@dtos';
import { GenericCategoryPage } from '../components';

const ProductCategoryPage: FC = () => {
  return (
    <GenericCategoryPage
      categoryKey="product"
      categoryType={CategoryType.PRODUCT}
      categoryTitle="Danh mục sản phẩm"
    />
  );
};

export default ProductCategoryPage;
