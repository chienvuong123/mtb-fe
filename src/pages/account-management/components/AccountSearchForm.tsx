import { OSearchBaseForm } from '@components/organisms';
import { useCategoryOptionsListQuery } from '@hooks/queries';
import { INPUT_TYPE, type CBaseSearch, type TFormItem } from '@types';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useMemo, type FC } from 'react';
import { ROLE_OPTIONS, STATUS_OPTIONS_STATIC } from '@constants/masterData.tsx';
import { CategoryType, type UserDTO } from '@dtos';

const AccountSearchForm: FC<CBaseSearch<UserDTO>> = ({
  initialValues,
  onSearch,
  onClearAll,
  onCreate,
}) => {
  const [form] = useForm();

  const { data: departmentList } = useCategoryOptionsListQuery(
    CategoryType.DEPARTMENT,
  );

  const { data: positionList } = useCategoryOptionsListQuery(
    CategoryType.POSITION,
  );

  const { data: branchList } = useCategoryOptionsListQuery(
    CategoryType.BRANCHES,
  );

  const items = useMemo(() => {
    const formItems: TFormItem[] = [
      {
        type: INPUT_TYPE.TEXT,
        label: 'Mã nhân viên',
        name: 'employeeCode',
        inputProps: { placeholder: 'Nhập...', maxLength: 20 },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Email',
        name: 'email',
        inputProps: { placeholder: 'Nhập...', maxLength: 50 },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Họ và tên',
        name: 'fullName',
        inputProps: { placeholder: 'Nhập...', maxLength: 100 },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Chức vụ',
        name: 'position',
        inputProps: {
          options: positionList,
          showSearch: true,
          filterOption: true,
          placeholder: 'Chọn...',
        },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Quyền hệ thống',
        name: 'role',
        inputProps: {
          options: ROLE_OPTIONS,
          showSearch: true,
          filterOption: true,
          placeholder: 'Chọn...',
        },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Chi nhánh',
        name: 'branch',
        inputProps: {
          options: branchList,
          showSearch: true,
          filterOption: true,
          placeholder: 'Chọn...',
        },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Trạng thái',
        name: 'status',
        inputProps: {
          options: STATUS_OPTIONS_STATIC,
          allowClear: false,
          placeholder: 'Chọn...',
        },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Phòng',
        name: 'department',
        inputProps: {
          options: departmentList,
          showSearch: true,
          filterOption: true,
          placeholder: 'Chọn...',
        },
      },
    ];
    return formItems;
  }, [departmentList, positionList, branchList]);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues, form]);

  return (
    <div>
      <OSearchBaseForm<UserDTO>
        items={items}
        form={form}
        onSearch={onSearch}
        onClearAll={onClearAll}
        onCreate={() => onCreate?.(form.getFieldsValue())}
      />
    </div>
  );
};

export default AccountSearchForm;
