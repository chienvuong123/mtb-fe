import { AButton } from '@components/atoms';
import { useFormItems } from '@hooks/index';
import type { TFormItem } from '@types';
import { trimObjectValues } from '@utils/objectHelper';
import { Divider, Flex, Form, type FormInstance, Typography } from 'antd';
import { useMemo } from 'react';

import './styles.scss';
import { getValueFromEvent } from '@utils/formHelper';
import { useProfile } from '@stores';

interface ISearchBaseForm<T> {
  items: TFormItem[];
  form: FormInstance<T>;
  disabledCreate?: boolean;
  searchText?: string;
  onSearch: (values: T) => void;
  onClearAll?: () => void;
  onDeleteAll?: () => void;
  onCreate?: () => void;
}

const BUTTON_TEXT = {
  CLEAR: 'Bỏ lọc',
  SEARCH: 'Tìm kiếm',
  DELETE_ALL: 'Xoá toàn bộ',
  CREATE: 'Thêm mới',
};

const OSearchBaseForm = <T extends object>({
  form,
  items,
  disabledCreate,
  searchText = BUTTON_TEXT.SEARCH,
  onSearch,
  onClearAll,
  onDeleteAll,
  onCreate,
}: ISearchBaseForm<T>) => {
  const { isReporter } = useProfile();

  const transformItems = useMemo(
    () =>
      items.map(({ label, blockingPattern, ...others }) => ({
        label: (
          <Typography.Text ellipsis className="fw-600 fs-14">
            {label}
          </Typography.Text>
        ),
        getValueFromEvent: blockingPattern
          ? (e: React.ChangeEvent<HTMLInputElement>) => {
              return getValueFromEvent(e?.target?.value ?? e, blockingPattern);
            }
          : undefined,
        ...others,
      })),
    [items],
  );

  const { formContent } = useFormItems({
    form,
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
    <div className="border-2 rounded-8 border-gray-border bg-white">
      <Form form={form} onFinish={handleSearch} layout="vertical">
        <div className="pa-24 pb-22">{formContent}</div>
        <Divider className="ma-0" />
        <Flex justify="flex-end" className="py-12 px-24" gap={24}>
          <AButton
            className="clear-button w-115"
            onClick={handleClear}
            data-testid="clear-button"
            variant="filled"
            color="primary"
          >
            {BUTTON_TEXT.CLEAR}
          </AButton>
          {Boolean(onDeleteAll) && (
            <AButton
              className="w-115"
              onClick={onDeleteAll}
              data-testid="clear-button"
              variant="filled"
              color="red"
            >
              {BUTTON_TEXT.DELETE_ALL}
            </AButton>
          )}
          <AButton
            type="primary"
            className="w-115"
            htmlType="submit"
            data-testid="search-button"
          >
            {searchText}
          </AButton>
          {Boolean(onCreate) && !isReporter && (
            <AButton
              type="primary"
              className="w-115"
              htmlType="submit"
              data-testid="search-button"
              onClick={onCreate}
              disabled={disabledCreate}
            >
              {BUTTON_TEXT.CREATE}
            </AButton>
          )}
        </Flex>
      </Form>
    </div>
  );
};

export default OSearchBaseForm;
