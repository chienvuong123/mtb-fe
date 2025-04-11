import { OBaseForm } from '@components/organisms';
import { GROUP_CUSTOMER_KEY } from '@hooks/queries';
import type { FormInstance } from 'antd';
import { type FC } from 'react';
import type { ManagerCategoryDTO } from '@dtos';
import type { CBaseForm } from '@types';
import { useCategoryFormItems } from '../hooks';

export interface ICategoryInsertForm extends CBaseForm<ManagerCategoryDTO> {
  isDisabled: boolean;
  form: FormInstance;
}

const CategoryInsertForm: FC<ICategoryInsertForm> = ({
  onClose,
  onSubmit,
  initialValues,
  mode,
  isDisabled,
  form,
}) => {
  const items = useCategoryFormItems({ isDisabled, form, mode, initialValues });

  return (
    <div>
      <OBaseForm<ManagerCategoryDTO>
        mutationKey={GROUP_CUSTOMER_KEY}
        items={items}
        isViewMode={mode === 'view'}
        form={form}
        onSubmit={onSubmit}
        onClose={() => {
          onClose?.();
          form.resetFields();
        }}
      />
    </div>
  );
};

export default CategoryInsertForm;
