// import {
//   Input,
//   ColProps,
//   DatePickerProps,
//   FormItemProps,
//   GetProps,
//   InputNumberProps,
//   InputProps,
//   SelectProps,
//   TimePickerProps,
//   UploadProps,
// } from 'antd';
// import { TextAreaProps } from 'antd/es/input';

// export enum INPUT_TYPE {
//   TEXT,
//   PASSWORD,
//   OTP,
//   SELECT,
//   DATE_PICKER,
//   NUMBER,
//   TEXT_AREA,
//   TIME_PICKER,
//   FILE,
// }

// export type TOTPProps = GetProps<typeof Input.OTP>;
// export type TPasswordProps = GetProps<typeof Input.Password>;

// export type TFormItem = FormItemProps & { colProps?: ColProps } & (
//     | {
//         type: INPUT_TYPE.TEXT;
//         inputProps: InputProps;
//       }
//     | {
//         type: INPUT_TYPE.PASSWORD;
//         inputProps: TPasswordProps;
//       }
//     | {
//         type: INPUT_TYPE.OTP;
//         inputProps: TOTPProps;
//       }
//     | {
//         type: INPUT_TYPE.NUMBER;
//         inputProps: InputNumberProps;
//       }
//     | {
//         type: INPUT_TYPE.SELECT;
//         inputProps: SelectProps;
//       }
//     | {
//         type: INPUT_TYPE.DATE_PICKER;
//         inputProps: DatePickerProps;
//       }
//     | {
//         type: INPUT_TYPE.TEXT_AREA;
//         inputProps: TextAreaProps;
//       }
//     | {
//         type: INPUT_TYPE.TIME_PICKER;
//         inputProps: TimePickerProps;
//       }
//     | {
//         type: INPUT_TYPE.FILE;
//         inputProps: UploadProps;
//       }
//   );
