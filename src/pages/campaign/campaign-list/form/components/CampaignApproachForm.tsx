import { OBaseForm } from '@components/organisms';
import { INPUT_TYPE, type CBaseForm, type TFormItem } from '@types';
import { useEffect, useMemo, type FC } from 'react';
import { CategoryType, type CampaignApproachPlanDTO } from '@dtos';
import {
  useCategoryOptionsListQuery,
  useQueryApproachScriprtList,
} from '@hooks/queries';
import type { FormInstance } from 'antd';

interface ICampaignTargetForm extends CBaseForm<CampaignApproachPlanDTO> {
  form: FormInstance;
}

const CampaignApproachForm: FC<ICampaignTargetForm> = ({
  onClose,
  onSubmit,
  initialValues,
  mode,
  form,
}) => {
  const { data: approachOptions } = useCategoryOptionsListQuery({
    categoryTypeCode: CategoryType.APPROACH,
  });
  const { data: approachScriptOptions } = useQueryApproachScriprtList(true);

  const items: TFormItem[] = useMemo(
    () =>
      [
        {
          type: INPUT_TYPE.SELECT,
          label: 'Phương thức tiếp cận',
          inputProps: {
            options: approachOptions,
            placeholder: 'Chọn...',
            showSearch: true,
            filterOption: true,
          },
          name: 'approach',
          colProps: { span: 12 },
          required: true,
          rules: [{ required: true }],
        },
        {
          type: INPUT_TYPE.SELECT,
          label: 'Kịch bản tiếp cận',
          name: 'scriptId',
          inputProps: {
            placeholder: 'Chọn...',
            showSearch: true,
            filterOption: true,
            options: approachScriptOptions,
          },
          colProps: { span: 12 },
          required: true,
          rules: [{ required: true }],
        },
        {
          type: INPUT_TYPE.TEXT,
          label: 'Ghi chú',
          inputProps: { placeholder: 'Nhập...', maxLength: 100 },
          name: 'note',
          colProps: { span: 12 },
        },
      ] as TFormItem[],
    [approachScriptOptions, approachOptions],
  );

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues, form]);

  return (
    <div>
      <OBaseForm<CampaignApproachPlanDTO>
        mutationKey=""
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
