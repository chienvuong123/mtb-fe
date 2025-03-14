import { OSearchBaseForm } from '@components/organisms';
import { STATUS_OPTIONS } from '@constants/masterData';
import type { ScenarioSearchRequest } from '@dtos';
import { useQueryCategoryList } from '@hooks/queries';
import { useProfile } from '@stores';
import { INPUT_TYPE, type CBaseSearch, type TFormItem } from '@types';
import { useForm } from 'antd/es/form/Form';
import { useMemo, type FC } from 'react';

const ScenarioSearchForm: FC<CBaseSearch<ScenarioSearchRequest>> = ({
  onSearch,
  onCreate,
  onClearAll,
}) => {
  const [form] = useForm();
  const { isAdmin, isCampaignManager, isSeller } = useProfile();

  const { data: categoryList } = useQueryCategoryList(true);

  const items = useMemo(() => {
    const formItems: TFormItem[] = [
      ...(isSeller
        ? []
        : [
            {
              type: INPUT_TYPE.SELECT,
              label: 'Category',
              name: 'categoryId',
              inputProps: {
                placeholder: 'Chọn',
                options: categoryList,
                showSearch: true,
                filterOption: true,
              },
            } as const,
          ]),
      {
        type: INPUT_TYPE.TEXT,
        label: 'Mã kịch bản',
        name: 'code',
        inputProps: { title: 'Mã', placeholder: 'Nhập...', maxLength: 20 },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Tên kịch bản',
        name: 'name',
        inputProps: { placeholder: 'Nhập...', maxLength: 100 },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Trạng thái',
        name: 'status',
        inputProps: {
          placeholder: 'Chọn',
          options: STATUS_OPTIONS,
        },
      },
    ];
    return formItems;
  }, [categoryList, isSeller]);

  return (
    <div>
      <OSearchBaseForm<ScenarioSearchRequest>
        items={items}
        form={form}
        onCreate={isAdmin || isCampaignManager ? onCreate : undefined}
        onSearch={onSearch}
        onClearAll={onClearAll}
      />
    </div>
  );
};

export default ScenarioSearchForm;
