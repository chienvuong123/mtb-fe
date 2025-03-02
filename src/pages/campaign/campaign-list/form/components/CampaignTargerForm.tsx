import { OBaseForm } from '@components/organisms';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useEffect, type FC } from 'react';
import { useForm } from 'antd/lib/form/Form';
import type { CampaignTargetDTO } from 'src/dtos/campaign-detail';
import { MOCK_CUSTOMER_OPTIONS } from '@mocks/customer';

interface ICampaignTargetForm {
  isViewMode?: boolean;
  initialValues?: Partial<CampaignTargetDTO> | null;
  onClose: () => void;
  onSubmit?: (values: CampaignTargetDTO) => void;
}

const items: TFormItem[] = [
  {
    type: INPUT_TYPE.SELECT,
    label: 'Tên mục tiêu',
    inputProps: {
      options: MOCK_CUSTOMER_OPTIONS,
      placeholder: 'Chọn...',
      showSearch: true,
      filterOption: true,
    },
    name: 'name',
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Giá trị mục tiêu',
    name: 'value',
    inputProps: { placeholder: 'Nhập...', maxLength: 100 },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Đơn vị',
    inputProps: {
      options: MOCK_CUSTOMER_OPTIONS,
      placeholder: 'Chọn...',
      showSearch: true,
      filterOption: true,
    },
    name: 'unit',
  },
];

const CampaignTargetForm: FC<ICampaignTargetForm> = ({
  onClose,
  onSubmit,
  initialValues,
  isViewMode,
}) => {
  const [form] = useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues, form]);

  return (
    <div>
      <OBaseForm<CampaignTargetDTO>
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

export default CampaignTargetForm;
