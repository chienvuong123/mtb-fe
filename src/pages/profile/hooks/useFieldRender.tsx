import {
  BLOCKING_NUMBER_PARTERN,
  BLOCKING_VN_SPACE_CHARACTERS_PARTERN,
} from '@constants/regex';
import { INPUT_TYPE, type TFormItem } from '@types';

const useFieldRender = () => {
  const items: TFormItem[] = [
    {
      type: INPUT_TYPE.TEXT,
      label: 'Mã nhân viên',
      name: 'employeeCode',
      inputProps: {
        disabled: true,
      },
      colProps: { span: 8, className: 'fw-500' },
    },
    {
      type: INPUT_TYPE.TEXT,
      label: 'Tên đăng nhập',
      name: 'username',
      inputProps: {
        disabled: true,
      },
      colProps: { span: 8, className: 'fw-500' },
    },
    {
      type: INPUT_TYPE.TEXT,
      label: 'Họ và tên',
      name: 'fullName',
      inputProps: { placeholder: 'Nhập...', maxLength: 100 },
      colProps: { span: 8, className: 'fw-500' },
      rules: [
        { required: true },
        { whitespace: true, message: 'Trường này là bắt buộc' },
      ],
      blockingPattern: BLOCKING_VN_SPACE_CHARACTERS_PARTERN,
    },
    {
      type: INPUT_TYPE.TEXT,
      label: 'Email',
      name: 'email',
      inputProps: { placeholder: 'Nhập...', maxLength: 50 },
      colProps: { span: 8, className: 'fw-500' },
      rules: [
        { required: true },
        { type: 'email', message: 'Định dạng email không hợp lệ' },
      ],
    },
    {
      type: INPUT_TYPE.TEXT,
      label: 'Số điện thoại',
      name: 'phoneNum',
      inputProps: { placeholder: 'Nhập...', maxLength: 10 },
      colProps: { span: 8, className: 'fw-500' },
      rules: [
        { required: true },
        { min: 10, message: 'Số điện thoại không hợp lệ' },
      ],
      blockingPattern: BLOCKING_NUMBER_PARTERN,
    },
    {
      type: INPUT_TYPE.TEXT,
      label: 'Trạng thái',
      name: 'status',
      className: 'green',
      inputProps: {
        placeholder: 'Nhập...',
        readOnly: true,
        className: 'green',
        disabled: true,
      },
      colProps: { span: 8, className: 'fw-500' },
    },
    {
      type: INPUT_TYPE.TEXT,
      label: 'Quyền hệ thống',
      name: 'role',
      inputProps: {
        disabled: true,
        name: 'password',
      },
      colProps: { span: 8, className: 'fw-500' },
    },
    {
      type: INPUT_TYPE.TEXT,
      label: 'Chức vụ',
      name: 'position',
      inputProps: {
        disabled: true,
      },
      colProps: { span: 8, className: 'fw-500' },
    },
    {
      type: INPUT_TYPE.TEXT,
      label: 'Chi nhánh',
      name: 'branch',
      inputProps: {
        disabled: true,
      },
      colProps: { span: 8, className: 'fw-500' },
    },
    {
      type: INPUT_TYPE.TEXT,
      label: 'Phòng',
      name: 'department',
      inputProps: {
        disabled: true,
      },
      colProps: { span: 8, className: 'fw-500' },
    },
    {
      type: INPUT_TYPE.TEXT,
      label: 'Ngày tạo',
      name: 'createdDate',
      inputProps: {
        disabled: true,
        name: 'createdDate',
      },
      colProps: { span: 8, className: 'fw-500' },
    },
  ];

  return { items };
};

export default useFieldRender;
