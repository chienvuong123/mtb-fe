import OFormDetail from '@components/organisms/o-form-detail/OFormDetail';
import React, { useEffect } from 'react';
import type {
  CampaignTargetDTO,
  TCampaignDetailDTO,
  TCampaignDetailSearchForm,
} from 'src/dtos/campaign-detail';
import type { ITable } from '@components/organisms';
import { dayjsToString } from '@utils/dateHelper';
import { useForm } from 'antd/es/form/Form';
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
}

const CampaignDetailSearch: React.FC<ICampaignDetailSearch> = ({
  initialValues,
  dataSource,
  onEdit,
  onDelete,
  isDisabled,
  onShowForm,
  onShowTargetForm,
}) => {
  const [form] = useForm();
  const items = useCampaignFormItems({
    isDisabled,
    onShowForm: onShowForm || (() => {}),
  });

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
    <div className="no-resize border-2 rounded-8 border-gray-border bg-white">
      {form && (
        <OFormDetail<TCampaignDetailSearchForm>
          items={items}
          form={form}
          isViewMode
        />
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
