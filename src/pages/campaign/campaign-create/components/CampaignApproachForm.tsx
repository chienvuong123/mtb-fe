import { OBaseForm } from '@components/organisms';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useEffect, useMemo, type FC } from 'react';
import { useForm } from 'antd/lib/form/Form';
import type { CampaignScriptDTO } from 'src/dtos/campaign-detail';
import { MOCK_CUSTOMER_OPTIONS } from '@mocks/customer';

interface ICampaignApproachForm {
  isViewMode?: boolean;
  initialValues?: Partial<CampaignScriptDTO> | null;
  onClose: () => void;
  onSubmit: (values: CampaignScriptDTO) => void;
}

const CampaignApproachForm: FC<ICampaignApproachForm> = ({
  onClose,
  onSubmit,
  initialValues,
  isViewMode,
}) => {
  const [form] = useForm();

  const items: TFormItem[] = useMemo(
    () =>
      [
        {
          type: INPUT_TYPE.SELECT,
          label: 'Phương thức tiếp cận',
          inputProps: {
            options: MOCK_CUSTOMER_OPTIONS,
            placeholder: 'Chọn...',
            showSearch: true,
            filterOption: true,
          },
          name: 'name',
        },
        {
          type: INPUT_TYPE.SELECT,
          label: 'Kịch bản tiếp cận',
          name: 'script',
          inputProps: {
            placeholder: 'Chọn...',
            showSearch: true,
            filterOption: true,
            options: MOCK_CUSTOMER_OPTIONS,
          },
        },
        {
          type: INPUT_TYPE.TEXT,
          label: 'Ghi chú',
          inputProps: { placeholder: 'Nhập...', maxLength: 100 },
          name: 'note',
        },
      ] as TFormItem[],
    [],
  );

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues, form]);

  return (
    <div>
      <OBaseForm<CampaignScriptDTO>
        mutationKey=""
        items={items}
        form={form}
        onSubmit={onSubmit}
        isViewMode={isViewMode}
        onClose={() => {
          onClose();
          form.resetFields();
        }}
      />
    </div>
  );
};

export default CampaignApproachForm;
