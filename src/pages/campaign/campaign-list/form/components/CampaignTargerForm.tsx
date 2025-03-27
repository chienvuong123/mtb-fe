import { OBaseForm } from '@components/organisms';
import { INPUT_TYPE, type CBaseForm, type TFormItem } from '@types';
import { useEffect, useMemo, type FC } from 'react';
import { CategoryType, type CampaignTargetDTO } from '@dtos';
import { CAMPAIGN_KEY, useCategoryOptionsListQuery } from '@hooks/queries';
import type { FormInstance } from 'antd';

interface ICampaignTargetForm extends CBaseForm<CampaignTargetDTO> {
  form: FormInstance;
}

const CampaignTargetForm: FC<ICampaignTargetForm> = ({
  onClose,
  onSubmit,
  initialValues,
  mode,
  form,
}) => {
  const { data: unitCalculationOptions } = useCategoryOptionsListQuery({
    categoryTypeCode: CategoryType.UNIT_OF_CALCULATION,
  });

  const items: TFormItem[] = useMemo(
    () =>
      [
        {
          type: INPUT_TYPE.TEXT,
          label: 'Tên mục tiêu',
          inputProps: {
            placeholder: 'Chọn...',
            maxLength: 50,
          },
          name: 'name',
          colProps: { span: 12 },
          required: true,
          rules: [{ required: true }],
        },
        {
          type: INPUT_TYPE.TEXT,
          label: 'Giá trị mục tiêu',
          name: 'value',
          inputProps: { placeholder: 'Nhập...', maxLength: 100 },
          colProps: { span: 12 },
          required: true,
          rules: [{ required: true }],
        },
        {
          type: INPUT_TYPE.SELECT,
          label: 'Đơn vị',
          inputProps: {
            options: unitCalculationOptions,
            placeholder: 'Chọn...',
            showSearch: true,
            filterOption: true,
          },
          name: 'unit',
          colProps: { span: 12 },
          required: true,
          rules: [{ required: true }],
        },
      ] as TFormItem[],
    [unitCalculationOptions],
  );

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues, form]);

  return (
    <div>
      <OBaseForm<CampaignTargetDTO>
        mutationKey={CAMPAIGN_KEY}
        items={items}
        form={form}
        onSubmit={onSubmit}
        isViewMode={mode === 'view'}
        onClose={() => {
          onClose?.();
          form.resetFields();
        }}
      />
    </div>
  );
};

export default CampaignTargetForm;
