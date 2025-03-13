import { OFormDetail } from '@components/organisms';
import React, { useEffect } from 'react';
import { useForm } from 'antd/lib/form/Form';
import type {
  TCategoryDetailDTO,
  TCategoryDetailSearchForm,
} from 'src/dtos/manage-category-detail';
import dayjs from 'dayjs';
import '../index.scss';
import { useCategoryFormItems } from '../../hooks';

interface ICategoryDetailSearch {
  initialValues?: Partial<TCategoryDetailDTO>;
  isDisabled: boolean;
}

const CampaignDetailSearch: React.FC<ICategoryDetailSearch> = ({
  initialValues,
  isDisabled,
}) => {
  const [form] = useForm();
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
