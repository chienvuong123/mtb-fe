import OFormDetail from '@components/organisms/o-form-detail/OFormDetail';
import React, { useEffect } from 'react';
import { dayjsToString } from '@utils/dateHelper';
import type { FormInstance } from 'antd';
import type {
  TCategoryDetailDTO,
  TCategoryDetailSearchForm,
} from 'src/dtos/manage-category-detail';
import '../index.scss';
import { useCategoryFormItems } from '../hook/CategoryDetailSearchForm';

interface ICategoryDetailSearch {
  initialValues?: Partial<TCategoryDetailDTO>;
  isDisabled: boolean;
  form: FormInstance;
}

const CampaignDetailSearch: React.FC<ICategoryDetailSearch> = ({
  initialValues,
  isDisabled,
  form,
}) => {
  const items = useCategoryFormItems({ isDisabled });

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        startDate: initialValues?.startDate
          ? dayjsToString(initialValues.startDate)
          : undefined,
        endDate: initialValues?.endDate
          ? dayjsToString(initialValues.endDate)
          : undefined,
      });
    }
  }, [initialValues, form]);

  return (
    <div className="category-detail-search border-2 rounded-8 border-gray-border bg-white">
      <OFormDetail<TCategoryDetailSearchForm>
        items={items}
        form={form}
        isViewMode
      />
    </div>
  );
};

export default CampaignDetailSearch;
