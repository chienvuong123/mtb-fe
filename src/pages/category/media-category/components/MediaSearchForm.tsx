import { INPUT_TYPE, type TFormItem } from '@types';
import { OSearchBaseForm } from '@components/organisms';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useMemo, type FC } from 'react';
import type { TMediaSearchForm } from '@dtos';
import { STATUS_OPTIONS } from '@constants/masterData';
import { handleValidateNumberField } from '@utils/formHelper';

interface IMediaSearchForm {
  initialValues?: TMediaSearchForm;
  onSearch: (values: TMediaSearchForm) => void;
  onClearAll?: () => void;
  onCreate?: () => void;
}

const MediaSearchForm: FC<IMediaSearchForm> = ({
  initialValues,
  onSearch,
  onClearAll,
  onCreate,
}) => {
  const [form] = useForm();

  const items: TFormItem[] = useMemo(
    () => [
      {
        type: INPUT_TYPE.TEXT,
        label: 'Mã',
        name: 'code',
        inputProps: {
          title: 'Mã',
          placeholder: 'Nhập...',
          maxLength: 20,
          onChange: (e) => handleValidateNumberField(e, form, ['code']),
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
    ],
    [form],
  );

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues, form]);

  return (
    <div>
      <OSearchBaseForm<TMediaSearchForm>
        items={items}
        form={form}
        onSearch={onSearch}
        onClearAll={onClearAll}
        onCreate={onCreate}
      />
    </div>
  );
};

export default MediaSearchForm;
