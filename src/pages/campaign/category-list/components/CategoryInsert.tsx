import { OBaseForm } from '@components/organisms';
import { GROUP_CUSTOMER_KEY } from '@hooks/queries/groupCustomerQueries';
import type { FormInstance } from 'antd';
import dayjs from 'dayjs';
import { useEffect, type FC } from 'react';
import type { ManagerCategoryDTO } from 'src/dtos/manage-category';
import { useCategoryFormItems } from '../hooks';

interface ICategoryInsertForm {
  onClose: () => void;
  onSubmit: (values: Partial<ManagerCategoryDTO>) => void;
  mode: 'add' | 'view';
  initialValues?: Partial<ManagerCategoryDTO> | null;
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
  const items = useCategoryFormItems({ isDisabled, form });

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        startDate: initialValues?.startDate
          ? dayjs(initialValues.startDate)
          : undefined,
        endDate: initialValues?.endDate
          ? dayjs(initialValues.endDate)
          : undefined,
      });
    }
  }, [initialValues, form]);
  return (
    <div>
      <OBaseForm<ManagerCategoryDTO>
        mutationKey={GROUP_CUSTOMER_KEY}
        items={items}
        isViewMode={mode === 'view'}
        form={form}
        onSubmit={onSubmit}
        onClose={() => {
          onClose();
          form.resetFields();
        }}
      />
    </div>
  );
};

export default CategoryInsertForm;
