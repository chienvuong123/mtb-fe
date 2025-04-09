import { OBaseForm } from '@components/organisms';
import { DATE_HYPHEN_FORMAT_YYYYMMDD } from '@constants/dateFormat';
import { ERole, ROLE_OPTIONS, STATUS_OPTIONS } from '@constants/masterData';
import {
  BLOCKING_ALPHA_NUMERIC_COMMA_PATTERN,
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

const SellerInsertForm: FC<CBaseForm<UserDTO>> = ({
  onClose,
  onSubmit,
  initialValues,
  mode,
}) => {
  const [form] = useForm();
  const startDate = useWatch('startDate', form);
  const endDate = useWatch('endDate', form);

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
        inputProps: {
          maxLength: 20,
          placeholder: 'Nhập...',
          disabled: mode !== 'add',
        },
        colProps: { span: 6 },
        rules: [{ required: true }],
        blockingPattern: BLOCKING_CHARACTERS_PARTERN,
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Tên đăng nhập',
        name: 'username',
        inputProps: {
          placeholder: 'Tự sinh theo email',
          maxLength: 50,
          readOnly: true,
        },
        colProps: { span: 6 },
        rules: [{ required: true }],
        blockingPattern: BLOCKING_ALPHA_NUMERIC_COMMA_PATTERN,
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Họ và tên',
        name: 'fullName',
        inputProps: {
          maxLength: 100,
          placeholder: 'Nhập...',
        },
        colProps: { span: 6 },
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
          onChange: handleEmailChange,
        },
        colProps: { span: 6 },
        rules: [
          { required: true },
          { type: 'email', message: 'Email không hợp lệ' },
        ],
        normalize: (value: string) => value.trim(),
      },
      {
        type: INPUT_TYPE.TEXT,
        label: 'Số điện thoại',
        name: 'phoneNum',
        inputProps: {
          placeholder: 'Nhập...',
          maxLength: 10,
        },
        colProps: { span: 6 },
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
          options: ROLE_OPTIONS,
          placeholder: 'Chọn...',
          defaultValue: ERole.SELLER,
          disabled: true,
        },
        colProps: { span: 6 },
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
          disabled: true,
        },
        colProps: { span: 6 },
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
    form,
    expertiseList,
    positionList,
    branchList,
    departmentList,
    mode,
    startDate,
    endDate,
    initialValues?.memberMb,
  ]) as TFormItem[];

  useEffect(() => {
    if (initialValues) {
      let sDate;
      if (initialValues?.startDate) {
        sDate = dayjs(initialValues.startDate);
      } else if (mode === 'add') {
        sDate = dayjs();
      } else {
        sDate = undefined;
      }

      form.setFieldsValue({
        ...initialValues,
        startDate: sDate,
        endDate: initialValues?.endDate
          ? dayjs(initialValues.endDate)
          : undefined,
        role: ERole.SELLER,
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

export default SellerInsertForm;
