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
      inputProps: { placeholder: 'Nhập...' },
      colProps: { span: 8, className: 'fw-500' },
    },
    {
      type: INPUT_TYPE.TEXT,
      label: 'Email',
      name: 'email',
      inputProps: { placeholder: 'Nhập...' },
      colProps: { span: 8, className: 'fw-500' },
    },
    {
      type: INPUT_TYPE.TEXT,
      label: 'Số điện thoại',
      name: 'phoneNum',
      inputProps: { placeholder: 'Nhập...', type: 'number' },
      colProps: { span: 8, className: 'fw-500' },
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
