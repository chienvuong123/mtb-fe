import { OBaseForm } from '@components/organisms';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useEffect, type FC, useMemo } from 'react';
import { useForm, useWatch } from 'antd/lib/form/Form';
import type { TCampaignDetailDTO } from 'src/dtos/campaign-detail';
import { MOCK_CUSTOMER_OPTIONS } from '@mocks/customer';

interface ICampaignDetailForm {
  isViewMode?: boolean;
  initialValues?: Partial<TCampaignDetailDTO> | null;
  onClose: () => void;
  onSubmit: (values: TCampaignDetailDTO) => void;
}

const CampaginDetailForm: FC<ICampaignDetailForm> = ({
  onClose,
  onSubmit,
  initialValues,
  isViewMode,
}) => {
  const [form] = useForm();

  const categoryId = useWatch('categoryId', form);

  const formItems = useMemo(() => {
    const items: TFormItem[] = [
      {
        type: INPUT_TYPE.SELECT,
        label: 'Mã Category',
        name: 'categoryId',
        inputProps: { options: [] },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Mã Campaign',
        inputProps: {
          options: MOCK_CUSTOMER_OPTIONS,
          disabled: !categoryId,
          placeholder: 'Chọn...',
          showSearch: true,
          filterOption: true,
        },
        name: 'campaignId',
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Mã Nhóm',
        name: 'groupId',
        required: true,
        rules: [{ required: true }],
        inputProps: { maxLength: 30 },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Tên Nhóm',
        name: 'groupName',
        required: true,
        rules: [{ required: true }],
        inputProps: { maxLength: 100 },
      },
    ] as TFormItem[];

    return isViewMode
      ? items.map((i) => ({
          ...i,
          inputProps: {
            ...i.inputProps,
            disabled: i.type === INPUT_TYPE.SELECT,
            readOnly: true,
          },
        }))
      : items;
  }, [isViewMode, categoryId]) as TFormItem[];

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues, form]);

  return (
    <div>
      <OBaseForm<TCampaignDetailDTO>
        mutationKey=""
        items={formItems}
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

export default CampaginDetailForm;
