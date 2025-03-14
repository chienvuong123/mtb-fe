import { OFormDetail } from '@components/organisms';
import React, { useEffect } from 'react';
import type { ITable } from '@components/organisms';
import dayjs from 'dayjs';
import type { FormInstance } from 'antd/lib';
import type {
  CampaignTargetDTO,
  TCampaignDetailDTO,
  TCampaignDetailSearchForm,
} from '@dtos';
import CampaignTargetDetailTable from './CampaignTargetDetailTable';
import type { TCampaignDetaillRecord } from './CampaignDetailTable';
import { useCampaignFormItems } from '../hooks';

interface ICampaignDetailSearch {
  initialValues?: Partial<TCampaignDetailDTO>;
  dataSource?: CampaignTargetDTO[];
  onEdit?: ITable<TCampaignDetaillRecord>['onEdit'];
  onDelete?: (id: string) => void;
  isDisabled: boolean;
  onShowForm?: () => void;
  onShowTargetForm?: () => void;
  form?: FormInstance;
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
  const items = useCampaignFormItems({
    isDisabled,
    onShowForm: onShowForm || (() => {}),
  });

  useEffect(() => {
    if (initialValues && form) {
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
    <div className="no-resize border-2 rounded-8 border-gray-border bg-white">
      {form && (
        <OFormDetail<TCampaignDetailSearchForm> items={items} form={form} />
      )}
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
