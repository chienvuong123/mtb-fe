import { AButton } from '@components/atoms';
import { useFormItems } from '@hooks/index';
import type { TFormItem } from '@types';
import { trimObjectValues } from '@utils/objectHelper';
import { Divider, Flex, Form, type FormInstance, Typography } from 'antd';
import { useMemo } from 'react';

interface ISearchBaseForm<T> {
  items: TFormItem[];
  form: FormInstance<T>;
  onSearch: (values: T) => void;
  onClearAll?: () => void;
}

const BUTTON_TEXT = {
  CLEAR: 'Bỏ lọc',
  SEARCH: 'Tìm kiếm',
};

const OSearchBaseForm = <T extends object>({
  form,
  items,
  onSearch,
  onClearAll,
}: ISearchBaseForm<T>) => {
  const transformItems = useMemo(
    () =>
      items.map(({ label, ...others }) => ({
        label: <Typography className="fw-600 fs-14">{label}</Typography>,
        ...others,
      })),
    [items],
  );

  const { formContent } = useFormItems({
    formItems: transformItems,
    rowProps: { gutter: [14, 17] },
  });

  const handleClear = () => {
    onClearAll?.();
    form.resetFields();
  };

  const handleSearch = (values: T) => {
    onSearch(trimObjectValues(values));
  };

  return (
    <div className="border-2 rounded-8 border-gray-border">
      <Form form={form} onFinish={handleSearch} layout="vertical">
        <div className="pa-24 pb-22">{formContent}</div>
        <Divider className="ma-0" />
        <Flex justify="end" className="py-12 px-24">
          <AButton
            className="w-115"
            onClick={handleClear}
            data-testid="clear-button"
          >
            {BUTTON_TEXT.CLEAR}
          </AButton>
          <AButton
            type="primary"
            className="ml-24 w-115"
            htmlType="submit"
            data-testid="search-button"
          >
            {BUTTON_TEXT.SEARCH}
          </AButton>
        </Flex>
      </Form>
    </div>
  );
};

export default OSearchBaseForm;
