import { OBaseForm } from '@components/organisms';
import { INPUT_TYPE, type CBaseForm, type TFormItem } from '@types';
import { useEffect, useMemo, type FC } from 'react';
import { type CampaignApproachPlanDTO } from '@dtos';
import { CAMPAIGN_KEY, useQueryApproachScriprtList } from '@hooks/queries';
import type { FormInstance } from 'antd';

interface ICampaignTargetForm extends CBaseForm<CampaignApproachPlanDTO> {
  form: FormInstance;
  formInsert?: FormInstance;
  inactiveIds?: string[];
}

const CampaignApproachForm: FC<ICampaignTargetForm> = ({
  onClose,
  onSubmit,
  initialValues,
  mode,
  form,
  formInsert,
  inactiveIds,
}) => {
  const categoryId = formInsert
    ? formInsert.getFieldValue('categoryId')
    : undefined;
  const { data: approachScriptOptions } = useQueryApproachScriprtList(
    categoryId,
    true,
  );

  const items: TFormItem[] = useMemo(
    () =>
      [
        {
          type: INPUT_TYPE.SELECT,
          label: 'Kịch bản tiếp cận',
          name: 'scriptId',
          inputProps: {
            placeholder: 'Chọn...',
            showSearch: true,
            filterOption: true,
            options: approachScriptOptions?.filter(
              (i) => !inactiveIds?.includes(i.value as string),
            ),
          },
          colProps: { span: 12 },
          required: true,
          rules: [{ required: true }],
        },
        {
          type: INPUT_TYPE.TEXT,
          label: 'Ghi chú',
          inputProps: { placeholder: 'Nhập...', maxLength: 1000 },
          name: 'note',
          colProps: { span: 12 },
        },
      ] as TFormItem[],
    [approachScriptOptions, inactiveIds],
  );

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues, form]);

  return (
    <div>
      <OBaseForm<CampaignApproachPlanDTO>
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

export default CampaignApproachForm;
