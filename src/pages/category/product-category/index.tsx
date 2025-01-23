import { Drawer } from 'antd';
import { useState } from 'react';
import './index.scss';
import Title from 'antd/lib/typography/Title';
import ProductTable from './components/ProductTable';
import ProductSearchForm from './components/ProductSearchForm';
import ProductInsertForm from './components/ProductInsertForm';

const ProductCategoryPage = () => {
  const [showInsertForm, setShowInsertForm] = useState<boolean>(false);
  return (
    <div className="pt-32">
      <Title level={3} className="mb-24">
        Danh mục Product
      </Title>
      <ProductSearchForm data={[]} />
      <div className="mt-24" />
      <ProductTable />

      {/* <Button onClick={() => setShowInsertForm(true)}>Open</Button> */}
      <Drawer
        title="Tạo mới"
        onClose={() => setShowInsertForm(false)}
        open={showInsertForm}
        width={1025}
        maskClosable={false}
        classNames={{ body: 'pa-0', header: 'py-22 px-40 fs-16 fw-500' }}
      >
        <ProductInsertForm
          onClose={() => setShowInsertForm(false)}
          //   initialValues={{}} for edit mode
        />
      </Drawer>
    </div>
  );
};

export default ProductCategoryPage;
