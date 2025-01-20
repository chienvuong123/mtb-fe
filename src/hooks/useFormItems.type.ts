// import type {
//   ColProps,
//   DatePickerProps,
//   FormItemProps,
//   InputNumberProps,
//   InputProps,
//   SelectProps,
//   TimePickerProps,
//   UploadProps,
// } from 'antd';
// import type { TextAreaProps } from 'antd/es/input';

// export enum INPUT_TYPE {
//   TEXT,
//   PASSWORD,
//   SELECT,
//   DATE_PICKER,
//   NUMBER,
//   TEXT_AREA,
//   TIME_PICKER,
//   FILE,
// }

// export type TFormItem = FormItemProps & { colProps?: ColProps } & (
//     | {
//         type: INPUT_TYPE.TEXT;
//         inputProps: InputProps;
//       }
//     | {
//         type: INPUT_TYPE.PASSWORD;
//         inputProps: InputProps;
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
