import { INPUT_TYPE, type TFormItem } from '@types';
import { OSearchBaseForm } from '@components/organisms';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useMemo, type FC } from 'react';
import { STATUS_OPTIONS } from '@constants/masterData';
import { BLOCKING_NUMBER_PARTERN } from '@constants/regex';
import type { TBranchSearchForm } from 'src/dtos/branch';

interface IBranchSearchForm {
  initialValues?: TBranchSearchForm;
  onSearch: (values: TBranchSearchForm) => void;
  onClearAll?: () => void;
  onCreate?: () => void;
}

const BranchSearchForm: FC<IBranchSearchForm> = ({
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
        },
        blockingPattern: BLOCKING_NUMBER_PARTERN,
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
    [],
  );

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues, form]);

  return (
    <div>
      <OSearchBaseForm<TBranchSearchForm>
        items={items}
        form={form}
        onSearch={onSearch}
        onClearAll={onClearAll}
        onCreate={onCreate}
      />
    </div>
  );
};

export default BranchSearchForm;
