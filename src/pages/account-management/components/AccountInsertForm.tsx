import { ACCOUNT_MANAGEMENT_KEY } from '@apis';
import { OBaseForm } from '@components/organisms';
import { ERole, STATUS_OPTIONS } from '@constants/masterData';
import {
  BLOCKING_NUMBER_PARTERN,
  BLOCKING_VN_SPACE_CHARACTERS_PARTERN,
} from '@constants/regex';
import { CategoryType, type UserDTO } from '@dtos';
import { useCategoryOptionsListQuery } from '@hooks/queries';
import { INPUT_TYPE, type CBaseForm, type TFormItem } from '@types';
import { useForm } from 'antd/es/form/Form';
import clsx from 'clsx';
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

  const { data: expertiseList } = useCategoryOptionsListQuery({
    categoryTypeCode: CategoryType.EXPERTISE,
  });

  const items = useMemo(
    () =>
      (
        [
          {
            type: INPUT_TYPE.TEXT,
            label: 'Mã nhân viên',
            name: 'employeeCode',
            rules: [{ required: true }],
            inputProps: {
              maxLength: 20,
              placeholder: 'Nhập...',
            },
          },
          {
            type: INPUT_TYPE.TEXT,
            label: 'Tên đăng nhập',
            name: 'username',
            inputProps: {
              placeholder: 'Nhập...',
            },
            rules: [{ required: true }],
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
          },
          {
            type: INPUT_TYPE.TEXT,
            label: 'Email',
            name: 'email',
            inputProps: {
              maxLength: 50,
              placeholder: 'Nhập...',
            },
            rules: [
              { required: true },
              { type: 'email', message: 'Email không hợp lệ' },
            ],
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
          },
          {
            type: INPUT_TYPE.SELECT,
            label: 'Trạng thái',
            name: 'status',
            inputProps: {
              options: STATUS_OPTIONS,
              allowClear: false,
              placeholder: 'Chọn...',
              initialValue: STATUS_OPTIONS[0].value,
            },
            rules: [{ required: true }],
          },
          {
            type: INPUT_TYPE.SELECT,
            label: 'Chuyên môn',
            name: 'expertise',
            inputProps: {
              options: expertiseList,
              showSearch: true,
              filterOption: true,
              placeholder: 'Chọn...',
            },
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
            rules: [{ required: true }],
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
            rules: [{ required: true }],
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
            rules: [{ required: true }],
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
          },
        ] as TFormItem[]
      ).map((i) => {
        const item: TFormItem = { ...i };
        if (mode === 'view') {
          return {
            ...item,
            colProps: { span: 12 },
            inputProps: {
              ...item.inputProps,
              className: clsx('pointer-events-none', item.className),
              readOnly: true,
            },
          };
        }
        return item;
      }),
    [mode, departmentList, positionList, branchList, expertiseList],
  ) as TFormItem[];

  useEffect(() => {
    if (initialValues && (mode === 'view' || mode === 'edit')) {
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
