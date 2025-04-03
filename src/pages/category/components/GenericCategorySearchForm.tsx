import { INPUT_TYPE, type TFormItem } from '@types';
import { OSearchBaseForm } from '@components/organisms';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, type FC } from 'react';
import { STATUS_OPTIONS } from '@constants/masterData';
import type { CategoryDTO } from '@dtos';
import { useProfile } from '@stores';
import { useLocation } from 'react-router-dom';

export interface GenericCategorySearchFormProps {
  initialValues?: Partial<CategoryDTO>;
  onSearch?: (values: Partial<CategoryDTO>) => void;
  onClearAll?: () => void;
  onCreate?: () => void;
}

const items: TFormItem[] = [
  {
    type: INPUT_TYPE.TEXT,
    label: 'Mã',
    name: 'code',
    inputProps: {
      title: 'Mã',
      placeholder: 'Nhập...',
      maxLength: 20,
    },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Tên',
    name: 'name',
    inputProps: { placeholder: 'Nhập...', maxLength: 100 },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Trạng thái',
    name: 'status',
    inputProps: {
      options: STATUS_OPTIONS,
      allowClear: false,
    },
  },
];

export const GenericCategorySearchForm: FC<GenericCategorySearchFormProps> = ({
  initialValues,
  onSearch,
  onClearAll,
  onCreate,
}) => {
  const [form] = useForm();
  const { hasPermission } = useProfile();

  const { pathname } = useLocation();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues, form]);

  const handleSearch = (values: Partial<CategoryDTO>) => {
    onSearch?.(values);
  };

  return (
    <div>
      <OSearchBaseForm
        items={items}
        form={form}
        onSearch={handleSearch}
        onClearAll={onClearAll}
        onCreate={hasPermission(pathname) ? onCreate : undefined}
      />
    </div>
  );
};
