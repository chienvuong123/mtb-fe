import { OBaseForm } from '@components/organisms';
import { CONTROL_TYPE_OPTIONS } from '@constants/masterData';
import type { AttributeDTO } from '@dtos';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, type FC } from 'react';

interface IAttributeInsertForm {
  initialValues?: Partial<AttributeDTO> | null;
  onClose: () => void;
  onSubmit: (values: AttributeDTO) => void;
}

const items: TFormItem[] = [
  {
    type: INPUT_TYPE.TEXT,
    label: 'Tên',
    name: 'name',
    inputProps: { placeholder: 'Nhập...', maxLength: 100 },
    required: true,
    rules: [{ required: true }],
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Control',
    name: 'controlType',
    inputProps: {
      options: CONTROL_TYPE_OPTIONS,
    },
  },
];

const AttributeInsertForm: FC<IAttributeInsertForm> = ({
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
      <OBaseForm<AttributeDTO>
        mutationKey="AttributeInsert"
        items={items}
        form={form}
        onSubmit={onSubmit}
        onClose={() => {
          onClose();
          form.resetFields();
        }}
      />
    </div>
  );
};

export default AttributeInsertForm;
