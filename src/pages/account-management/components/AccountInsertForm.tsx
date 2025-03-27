import { OBaseForm } from '@components/organisms';
import { ERole, STATUS_OPTIONS_WITHOUT_ALL } from '@constants/masterData';
import {
  BLOCKING_NUMBER_PARTERN,
  BLOCKING_VN_SPACE_CHARACTERS_PARTERN,
} from '@constants/regex';
import { CategoryType, type UserDTO } from '@dtos';
import {
  ACCOUNT_MANAGEMENT_KEY,
  useCategoryOptionsListQuery,
} from '@hooks/queries';
import { INPUT_TYPE, type CBaseForm, type TFormItem } from '@types';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useMemo, type FC } from 'react';

const AccountInsertForm: FC<CBaseForm<UserDTO>> = ({
  onClose,
  onSubmit,
  initialValues,
  mode,
}) => {
  const [form] = useForm();

  const { data: departmentList } = useCategoryOptionsListQuery({
    categoryTypeCode: CategoryType.DEPARTMENT,
  });

  const { data: positionList } = useCategoryOptionsListQuery({
    categoryTypeCode: CategoryType.POSITION,
  });

  const { data: branchList } = useCategoryOptionsListQuery({
    categoryTypeCode: CategoryType.BRANCHES,
  });

  const items = useMemo(() => {
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (mode !== 'edit') {
        const usernameValue = e.target.value.replace(/@.*|[^a-zA-Z0-9]/g, '');
        form.setFieldValue('username', usernameValue);
      }
    };

    return [
      {
        type: INPUT_TYPE.TEXT,
        label: 'Mã nhân viên',
        name: 'employeeCode',
        rules: [{ required: true }],
        inputProps: {
          maxLength: 20,
          placeholder: 'Nhập...',
        },
        colProps: { span: 12 },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Tên đăng nhập',
        name: 'username',
        inputProps: {
          placeholder: 'Nhập...',
          readOnly: true,
        },
        rules: [{ required: true }],
        colProps: { span: 12 },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Họ và tên',
        name: 'fullName',
        inputProps: {
          maxLength: 100,
          placeholder: 'Nhập...',
        },
        rules: [{ required: true }],
        blockingPattern: BLOCKING_VN_SPACE_CHARACTERS_PARTERN,
        colProps: { span: 12 },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Email',
        name: 'email',
        inputProps: {
          maxLength: 50,
          placeholder: 'Nhập...',
          onChange: handleEmailChange,
        },
        rules: [
          { required: true },
          { type: 'email', message: 'Email không hợp lệ' },
        ],
        colProps: { span: 12 },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Số điện thoại',
        name: 'phoneNum',
        inputProps: {
          placeholder: 'Nhập...',
          maxLength: 10,
        },
        rules: [
          { required: true },
          { min: 10, message: 'Số điện thoại không hợp lệ' },
        ],
        blockingPattern: BLOCKING_NUMBER_PARTERN,
        colProps: { span: 12 },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Quyền hệ thống',
        name: 'role',
        inputProps: {
          options: Object.values(ERole).map((role) => ({
            label: role,
            value: role,
          })),
          showSearch: true,
          filterOption: true,
          placeholder: 'Chọn...',
        },
        rules: [{ required: true }],
        colProps: { span: 12 },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Trạng thái',
        name: 'status',
        inputProps: {
          options: STATUS_OPTIONS_WITHOUT_ALL,
          allowClear: false,
          placeholder: 'Chọn...',
        },
        rules: [{ required: true }],
        colProps: { span: 12 },
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
        colProps: { span: 12 },
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
        colProps: { span: 12 },
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
        colProps: { span: 12 },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Người tạo',
        name: 'createdBy',
        inputProps: {
          disabled: true,
          name: 'createdBy',
          placeholder: 'Nhập...',
        },
        colProps: { span: 12 },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Ngày tạo',
        name: 'createdDate',
        inputProps: {
          disabled: true,
          name: 'createdDate',
          placeholder: 'Chọn ngày...',
        },
        colProps: { span: 12 },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Người cập nhật',
        name: 'updatedBy',
        inputProps: {
          disabled: true,
          name: 'updatedBy',
          placeholder: 'Nhập...',
        },
        colProps: { span: 12 },
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Ngày cập nhật',
        name: 'updatedDate',
        inputProps: {
          disabled: true,
          name: 'updatedDate',
          placeholder: 'Chọn ngày...',
        },
        colProps: { span: 12 },
      },
    ] as TFormItem[];
  }, [positionList, branchList, departmentList, mode, form]) as TFormItem[];

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
      return;
    }
    form.resetFields();
  }, [initialValues, form, mode]);

  return (
    <div>
      <OBaseForm<UserDTO>
        mutationKey={ACCOUNT_MANAGEMENT_KEY}
        items={items}
        isViewMode={mode === 'view'}
        form={form}
        onSubmit={
          mode === 'add'
            ? onSubmit
            : (values) => {
                onSubmit({
                  ...values,
                  id: initialValues?.id || '',
                });
              }
        }
        onClose={() => {
          onClose?.();
          form.resetFields();
        }}
      />
    </div>
  );
};

export default AccountInsertForm;
