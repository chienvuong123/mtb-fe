import { type EditableCellInputProps } from '@components/organisms';
import { useFormItems } from '@hooks';
import { Form } from 'antd';
import type { Rule } from 'antd/es/form';
import { INPUT_TYPE } from '@types';

export interface EditableCellProps<T>
  extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title?: string;
  record: T;
  index: number;
  rules?: Rule[];
}
export type TEditableCell<T> = EditableCellProps<T> & EditableCellInputProps;

const MEditableCell = <T extends object>({
  editing,
  dataIndex,
  inputType,
  inputProps,
  children,
  rules,
  ...restProps
}: TEditableCell<T>) => {
  const { getFormItem } = useFormItems();

  const inputNode = getFormItem(inputType ?? INPUT_TYPE.TEXT, inputProps);
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item name={dataIndex} style={{ margin: 0 }} rules={rules}>
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
export default MEditableCell;
