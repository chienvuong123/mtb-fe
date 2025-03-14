import type { ApproachScriptDTO } from '@dtos';
import { INPUT_TYPE, type TFormItem } from '@types';
import { useMemo, type FC } from 'react';
import { useQueryCategoryList } from '@hooks/queries';
import type { FormInstance } from 'antd/lib';
import { STATUS_OPTIONS_WITHOUT_ALL } from '@constants/masterData';
import { OFormDetail } from '@components/organisms';

interface IScenarioInsertForm {
  form: FormInstance<ApproachScriptDTO>;
}

const ScenarioInsertForm: FC<IScenarioInsertForm> = ({ form }) => {
  const { data: categoryList } = useQueryCategoryList(true);

  const items = useMemo(() => {
    const configItems: TFormItem[] = [
      {
        type: INPUT_TYPE.SELECT,
        label: 'Category',
        name: 'category',
        inputProps: {
          placeholder: 'Chọn',
          options: categoryList,
        },
        rules: [{ required: true }],
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Tên kịch bản',
        name: 'name',
        inputProps: { placeholder: 'Nhập...' },
        rules: [{ required: true }],
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Mô tả',
        name: 'desc',
        inputProps: { placeholder: 'Nhập...' },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Trạng thái',
        name: 'status',
        inputProps: {
          placeholder: 'Chọn',
          options: STATUS_OPTIONS_WITHOUT_ALL,
        },
        rules: [{ required: true }],
      },
    ];

    return configItems;
  }, [categoryList]);

  return (
    <div className="border-2 rounded-8 border-gray-border bg-white">
      <OFormDetail<ApproachScriptDTO> items={items} form={form} />
    </div>
  );
};

export default ScenarioInsertForm;
