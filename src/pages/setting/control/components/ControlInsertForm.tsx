import { OBaseForm } from '@components/organisms';
import { CONTROL_TYPE_OPTIONS } from '@constants/masterData';
import type { ControlDTO } from '@dtos';
import { CONTROL_TYPE } from '@hooks/queries';
import { INPUT_TYPE, type CBaseForm, type TFormItem } from '@types';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, type FC } from 'react';

const items: TFormItem[] = [
  {
    type: INPUT_TYPE.TEXT,
    label: 'Tên',
    name: 'name',
    inputProps: { placeholder: 'Nhập...', maxLength: 50 },

    required: true,
    rules: [{ required: true }],
    colProps: { span: 12 },
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Loại control',
    name: 'type',
    inputProps: {
      options: CONTROL_TYPE_OPTIONS,
    },
    colProps: { span: 12 },
    rules: [{ required: true }],
  },
];

const ControlInsertForm: FC<CBaseForm<ControlDTO>> = ({
  onClose,
  onSubmit,
  initialValues,
  mode,
}) => {
  const [form] = useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues, form]);

  return (
    <div>
      <OBaseForm<ControlDTO>
        mutationKey={CONTROL_TYPE}
        items={items}
        form={form}
        onSubmit={onSubmit}
        onClose={() => {
          onClose?.();
          form.resetFields();
        }}
        isViewMode={mode === 'view'}
      />
    </div>
  );
};

export default ControlInsertForm;
