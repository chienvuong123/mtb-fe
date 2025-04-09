import { OBaseForm } from '@components/organisms';
import { DATE_HYPHEN_FORMAT_YYYYMMDD } from '@constants/dateFormat';
import {
  ERole,
  ROLE_OPTIONS,
  STATUS_OPTIONS_WITHOUT_ALL,
} from '@constants/masterData';
import {
  BLOCKING_CHARACTERS_PARTERN,
  BLOCKING_NUMBER_PARTERN,
  BLOCKING_VN_SPACE_CHARACTERS_PARTERN,
} from '@constants/regex';
import { CategoryType, type UserDTO } from '@dtos';
import {
  ACCOUNT_MANAGEMENT_KEY,
  useCategoryOptionsListQuery,
} from '@hooks/queries';
import { INPUT_TYPE, type CBaseForm, type TFormItem } from '@types';
import { useForm, useWatch } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import { useEffect, useMemo, type FC } from 'react';

const AccountInsertForm: FC<CBaseForm<UserDTO>> = ({
  onClose,
  onSubmit,
  initialValues,
  mode,
}) => {
  const [form] = useForm();
  const startDate = useWatch('startDate', form);
  const endDate = useWatch('endDate', form);
  const role = useWatch('role', form);

  const { data: departmentList } = useCategoryOptionsListQuery(
    {
      categoryTypeCode: CategoryType.DEPARTMENT,
    },
    mode !== 'view',
  );

  const { data: positionList } = useCategoryOptionsListQuery(
    {
      categoryTypeCode: CategoryType.POSITION,
    },
    mode !== 'view',
  );

  const { data: branchList } = useCategoryOptionsListQuery(
    {
      categoryTypeCode: CategoryType.BRANCHES,
    },
    mode !== 'view',
  );

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
        colProps: { span: 6 },
        blockingPattern: BLOCKING_CHARACTERS_PARTERN,
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Tên đăng nhập',
        name: 'username',
        inputProps: {
          placeholder: 'Tự sinh theo email',
          readOnly: true,
        },
        rules: [{ required: true }],
        colProps: { span: 6 },
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
        colProps: { span: 6 },
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
        colProps: { span: 6 },
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
        colProps: { span: 6 },
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
          onChange: () => {
            form.setFieldValue('saleManager', undefined);
          },
        },
        rules: [{ required: true }],
        colProps: { span: 6 },
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
        colProps: { span: 6 },
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
        colProps: { span: 6 },
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
        colProps: { span: 6 },
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
        colProps: { span: 6 },
      },
      {
        type: INPUT_TYPE.SELECT,
        label: 'Quản lý',
        name: 'saleManager',
        inputProps: {
          options: [], // TODO: will be fixed
          showSearch: true,
          filterOption: true,
          placeholder: 'Chọn...',
        },
        colProps: { span: 6 },
        hidden: role !== ERole.SELLER,
      },
      {
        type: INPUT_TYPE.CHECKBOX,
        label: 'Nhân sự MB',
        name: 'memberMb',
        colProps: { span: 6 },
        inputProps: {
          checked: mode === 'view' && initialValues?.memberMb,
        },
        valuePropName: 'checked',
      },
      {
        type: INPUT_TYPE.DATE_PICKER,
        label: 'Ngày bắt đầu',
        name: 'startDate',
        inputProps: {
          placeholder: 'Chọn ngày...',
          className: 'date-picker-campaign',
          maxDate: endDate ? dayjs(endDate) : undefined,
        },
        colProps: { span: 6 },
      },
      {
        type: INPUT_TYPE.DATE_PICKER,
        label: 'Ngày kết thúc',
        name: 'endDate',
        inputProps: {
          placeholder: 'Chọn ngày...',
          className: 'date-picker-campaign',
          minDate: startDate,
        },
        colProps: { span: 6 },
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
        colProps: { span: 6 },
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
        colProps: { span: 6 },
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
        colProps: { span: 6 },
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
        colProps: { span: 6 },
      },
    ] as TFormItem[];
  }, [
    positionList,
    branchList,
    departmentList,
    mode,
    form,
    startDate,
    endDate,
    role,
    initialValues?.memberMb,
  ]) as TFormItem[];

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        startDate: initialValues?.startDate
          ? dayjs(initialValues.startDate)
          : undefined,
        endDate: initialValues?.endDate
          ? dayjs(initialValues.endDate)
          : undefined,
      });
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
        onSubmit={({ startDate: start, endDate: end, ...values }) => {
          onSubmit({
            ...values,
            id: initialValues?.id || '',
            startDate: start
              ? dayjs(start).format(DATE_HYPHEN_FORMAT_YYYYMMDD)
              : undefined,
            endDate: end
              ? dayjs(end).format(DATE_HYPHEN_FORMAT_YYYYMMDD)
              : undefined,
          });
        }}
        onClose={() => {
          onClose?.();
          form.resetFields();
        }}
      />
    </div>
  );
};

export default AccountInsertForm;
