import { INPUT_TYPE, type TFormItem } from '@types';
import { OSearchBaseForm } from '@components/organisms';
import { useForm } from 'antd/es/form/Form';
import { useEffect, type FC } from 'react';
import type { TProductSearchForm } from '@dtos';
import { STATUS_OPTIONS } from '@constants/masterData';
import { useProfile } from '@stores';

interface IProductSearchForm {
  initialValues?: TProductSearchForm;
  onSearch: (values: TProductSearchForm) => void;
  onClearAll?: () => void;
  onCreate?: () => void;
}

const items: TFormItem[] = [
  {
    type: INPUT_TYPE.TEXT,
    label: 'Mã',
    name: 'code',
    inputProps: { title: 'Mã', placeholder: 'Nhập...', maxLength: 20 },
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

const ProductSearchForm: FC<IProductSearchForm> = ({
  initialValues,
  onSearch,
  onClearAll,
  onCreate,
}) => {
  const [form] = useForm();
  const { isAdmin, isCampaignManager } = useProfile();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues, form]);

  return (
    <div>
      <OSearchBaseForm<TProductSearchForm>
        items={items}
        form={form}
        onSearch={onSearch}
        onClearAll={onClearAll}
        onCreate={isAdmin || isCampaignManager ? onCreate : undefined}
      />
    </div>
  );
};

export default ProductSearchForm;
