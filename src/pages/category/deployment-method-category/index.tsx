import { CategoryType } from '@dtos';
import { GenericCategoryPage } from '../components';

const DeploymentMethodCategoryPage = () => {
  return (
    <GenericCategoryPage
      categoryKey="deployment-method"
      categoryType={CategoryType.DEPLOYMENT_METHOD}
      categoryTitle="Danh mục phương thức triển khai"
    />
  );
};

export default DeploymentMethodCategoryPage;
