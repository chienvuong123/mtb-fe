import { OBaseForm } from '@components/organisms';
import { EStatus, STATUS_OPTIONS_WITHOUT_ALL } from '@constants/masterData';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, type FC } from 'react';
import type { CategoryDTO } from '@dtos';
import { formatDate } from '@utils/dateHelper';
import { useProfile } from '@stores';
import { ACCEPTING_FULL_ALPHA_NUMERIC_SPACE_PATTERN } from '@constants/regex';

export interface GenericCategoryInsertFormProps {
  onSubmit?: (values: CategoryDTO) => void;
  onClose?: () => void;
  mutationKey?: string;
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
    rules: [
      { required: true },
      {
        pattern: ACCEPTING_FULL_ALPHA_NUMERIC_SPACE_PATTERN,
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

export const GenericCategoryInsertForm: FC<GenericCategoryInsertFormProps> = ({
  onClose,
  onSubmit,
  mutationKey = 'category',
}) => {
  const [form] = useForm();

  const { user } = useProfile();

  useEffect(() => {
    if (user?.username) {
      form.setFieldsValue({
        code: undefined,
        name: '',
        status: EStatus.ACTIVE,
        createdBy: user?.username,
        updatedBy: user?.username,
        createdDate: formatDate(),
        updatedDate: formatDate(),
      });
    }
  }, [form, user?.username]);

  return (
    <div>
      <OBaseForm<CategoryDTO>
        mutationKey={mutationKey}
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
