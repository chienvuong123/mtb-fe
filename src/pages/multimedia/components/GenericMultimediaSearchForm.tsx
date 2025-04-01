import { INPUT_TYPE, type TFormItem, type CBaseSearch } from '@types';
import { OSearchBaseForm } from '@components/organisms';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useMemo, type FC } from 'react';
import { useProfile } from '@stores';
import type { MultimediaDTO } from '@dtos';
import { useQueryCategoryList } from '@hooks/queries';
import { ROUTES } from '@routers/path';

const MultimediaSearchForm: FC<CBaseSearch<MultimediaDTO>> = ({
  initialValues,
  onSearch,
  onClearAll,
  onCreate,
}) => {
  const [form] = useForm();
  const { hasPermission } = useProfile();

  const { data: categoryList } = useQueryCategoryList();

  const items: TFormItem[] = useMemo(
    () =>
      [
        {
          type: INPUT_TYPE.SELECT,
          label: 'Category',
          name: 'categoryCampaignId',
          inputProps: {
            placeholder: 'Chọn...',
            showSearch: true,
            filterOption: true,
            options: categoryList,
          },
        },
        {
          type: INPUT_TYPE.TEXT,
          label: 'Mã đa phương tiện',
          name: 'code',
          inputProps: { placeholder: 'Nhập...', maxLength: 20 },
        },
        {
          type: INPUT_TYPE.TEXT,
          label: 'Tên đa phương tiện',
          name: 'name',
          inputProps: { placeholder: 'Nhập...', maxLength: 100 },
        },
      ] as TFormItem[],
    [categoryList],
  );

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues, form]);

  return (
    <div>
      <OSearchBaseForm<MultimediaDTO>
        items={items}
        form={form}
        onSearch={onSearch}
        onClearAll={onClearAll}
        onCreate={
          hasPermission(ROUTES.MULTIMEDIA.CREATE) ? onCreate : undefined
        }
      />
    </div>
  );
};

export default MultimediaSearchForm;
