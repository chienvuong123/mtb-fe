import { OBaseForm } from '@components/organisms';
import { STATUS_OPTIONS } from '@constants/masterData';
import { MessageError } from '@constants/message';
import type { MediaCategoryDTO } from '@dtos';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, type FC } from 'react';

interface IMediaInsertForm {
  initialValues?: Partial<MediaCategoryDTO> | null;
  onClose: () => void;
  onSubmit: (values: MediaCategoryDTO) => void;
}

const items: TFormItem[] = [
  {
    type: INPUT_TYPE.TEXT,
    label: 'Mã',
    name: 'code',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Tên',
    name: 'name',
    inputProps: { placeholder: 'Nhập...', maxLength: 100 },
    required: true,
    rules: [{ required: true, message: MessageError.FIELD_REQUIRE }],
  },
  {
    type: INPUT_TYPE.SELECT,
    label: 'Trạng thái',
    name: 'status',
    inputProps: {
      options: STATUS_OPTIONS,
    },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Ngày tạo',
    name: 'createdDate',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Người tạo',
    name: 'createdBy',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Ngày cập nhật',
    name: 'updatedDate',
    inputProps: { disabled: true },
  },
  {
    type: INPUT_TYPE.TEXT,
    label: 'Người cập nhật',
    name: 'updatedBy',
    inputProps: { disabled: true },
  },
];

const MediaInsertForm: FC<IMediaInsertForm> = ({
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
      <OBaseForm<MediaCategoryDTO>
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

export default MediaInsertForm;
