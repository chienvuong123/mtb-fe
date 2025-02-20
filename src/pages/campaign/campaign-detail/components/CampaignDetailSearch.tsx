import OFormDetail from '@components/organisms/o-form-detail/OFormDetail';
import React, { useEffect } from 'react';
import type {
  CampaignTargetDTO,
  TCampaignDetailDTO,
  TCampaignDetailSearchForm,
} from 'src/dtos/campaign-detail';
import type { TMediaRecord } from '@pages/category/media-category/components/MediaTable';
import type { ITable } from '@components/organisms';
import { dayjsToString } from '@utils/dateHelper';
import type { FormInstance } from 'antd';
import CampaignTargetDetailTable from './CampaignTargetDetailTable';
import '../index.scss';
import { useCampaignFormItems } from '../hook/CampaignDetailSearchFrom';

interface ICampaignDetailSearch {
  initialValues?: Partial<TCampaignDetailDTO>;
  dataSource?: CampaignTargetDTO[];
  onEdit: ITable<TMediaRecord>['onEdit'];
  onDelete: (id: string) => void;
  isDisabled: boolean;
  onShowForm: () => void;
  onShowTargetForm: () => void;
  form: FormInstance;
}

const CampaignDetailSearch: React.FC<ICampaignDetailSearch> = ({
  initialValues,
  dataSource,
  onEdit,
  onDelete,
  isDisabled,
  onShowForm,
  onShowTargetForm,
  form,
}) => {
  const items = useCampaignFormItems({ isDisabled, onShowForm });

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
    <div className="border-2 rounded-8 border-gray-border bg-white">
      <OFormDetail<TCampaignDetailSearchForm>
        items={items}
        form={form}
        isViewMode
      />
      <hr className="border-t border-[#EAEAEA] mx-40" />
      <CampaignTargetDetailTable
        dataSource={dataSource || []}
        onEdit={onEdit}
        onDelete={onDelete}
        onShowTargetForm={onShowTargetForm}
      />
    </div>
  );
};

export default CampaignDetailSearch;
