import { OBaseForm } from '@components/organisms';
import { STATUS_OPTIONS } from '@constants/masterData';
import { MEDIA_CATEGORY_KEY } from '@hooks/queries/useMediaCategoryQueries';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useMemo, type FC } from 'react';
import type { PositionCategoryDTO } from 'src/dtos/position';

interface IPositionEditForm {
  isViewMode?: boolean;
  initialValues?: Partial<PositionCategoryDTO> | null;
  onClose: () => void;
  onSubmit: (values: PositionCategoryDTO) => void;
}

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
      options: STATUS_OPTIONS,
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

const PositionEditForm: FC<IPositionEditForm> = ({
  onClose,
  onSubmit,
  initialValues,
  isViewMode,
}) => {
  const [form] = useForm();

  const formItems = useMemo(
    () =>
      isViewMode
        ? items.map((i) => ({
            ...i,
            inputProps: {
              ...i.inputProps,
              disabled: i.type === INPUT_TYPE.SELECT,
              readOnly: true,
            },
          }))
        : items,
    [isViewMode],
  ) as TFormItem[];

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues, form]);

  return (
    <div>
      <OBaseForm<PositionCategoryDTO>
        mutationKey={MEDIA_CATEGORY_KEY}
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

export default PositionEditForm;
