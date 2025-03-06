import { OBaseForm } from '@components/organisms';
import { EStatus, STATUS_OPTIONS } from '@constants/masterData';
import type { CategoryDTO } from '@dtos';
import { MEDIA_CATEGORY_KEY } from '@hooks/queries/useMediaCategoryQueries';
import { INPUT_TYPE, type CBaseForm, type TFormItem } from '@types';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, type FC } from 'react';

const items: TFormItem[] = [
  {
    type: INPUT_TYPE.TEXT,
    label: 'Mã',
    name: 'code',
    inputProps: { disabled: true },
    colProps: { span: 12 },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Tên',
    name: 'name',
    inputProps: { placeholder: 'Nhập...', maxLength: 100 },
    required: true,
    rules: [{ required: true }],
    colProps: { span: 12 },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Trạng thái',
    name: 'status',
    inputProps: {
      options: STATUS_OPTIONS.filter((option) => option.value !== EStatus.ALL),
      allowClear: false,
    },
    colProps: { span: 12 },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Ngày tạo',
    name: 'createdDate',
    inputProps: { disabled: true },
    colProps: { span: 12 },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Người tạo',
    name: 'createdBy',
    inputProps: { disabled: true },
    colProps: { span: 12 },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Ngày cập nhật',
    name: 'updatedDate',
    inputProps: { disabled: true },
    colProps: { span: 12 },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Người cập nhật',
    name: 'updatedBy',
    inputProps: { disabled: true },
    colProps: { span: 12 },
  },
];

const CustomerSegmentInsertForm: FC<CBaseForm<Partial<CategoryDTO>>> = ({
  onClose,
  onSubmit,
  initialValues,
}) => {
  const [form] = useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues, form]);

  return (
    <div>
      <OBaseForm<CategoryDTO>
        mutationKey={MEDIA_CATEGORY_KEY}
        items={items}
        form={form}
        onSubmit={onSubmit}
        onClose={() => {
          onClose?.();
          form.resetFields();
        }}
      />
    </div>
  );
};

export default CustomerSegmentInsertForm;
