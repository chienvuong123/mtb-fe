import { OBaseForm } from '@components/organisms';
import { STATUS_OPTIONS_WITHOUT_ALL } from '@constants/masterData';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useMemo, type FC } from 'react';
import type { CategoryDTO } from '@dtos';
import { formatDate } from '@utils/dateHelper';
import { ACCEPTING_NUMBER_SPACE_COMMA_PATTERN } from '@constants/regex';

export interface GenericCategoryEditFormProps {
  initialValues?: CategoryDTO | null;
  onSubmit?: (values: CategoryDTO) => void;
  onClose?: () => void;
  isViewMode?: boolean;
  mutationKey?: string;
}

const baseItems = [
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
    rules: [
      { required: true },
      {
        pattern: ACCEPTING_NUMBER_SPACE_COMMA_PATTERN,
        message: 'Không được nhập ký tự đặc biệt',
      },
    ],
    colProps: { span: 12 },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Trạng thái',
    name: 'status',
    inputProps: {
      options: STATUS_OPTIONS_WITHOUT_ALL,
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

export const GenericCategoryEditForm: FC<GenericCategoryEditFormProps> = ({
  onClose,
  onSubmit,
  initialValues,
  isViewMode,
  mutationKey = 'category',
}) => {
  const [form] = useForm();

  const items = useMemo(
    () =>
      isViewMode
        ? baseItems.map((i) => ({
            ...i,
            inputProps: {
              ...i.inputProps,
              disabled: i.type === INPUT_TYPE.SELECT,
              readOnly: true,
            },
          }))
        : baseItems,
    [isViewMode],
  ) as TFormItem[];

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        createdDate: formatDate(initialValues.createdDate),
        updatedDate: formatDate(initialValues.updatedDate),
      });
    }
  }, [initialValues, form]);

  return (
    <div>
      <OBaseForm<CategoryDTO>
        mutationKey={mutationKey}
        items={items}
        form={form}
        onSubmit={onSubmit}
        isViewMode={isViewMode}
        onClose={() => {
          onClose?.();
          form.resetFields();
        }}
      />
    </div>
  );
};
