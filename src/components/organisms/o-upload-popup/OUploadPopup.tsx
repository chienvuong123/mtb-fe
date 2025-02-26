import { AButton } from '@components/atoms';
import {
  Modal,
  Typography,
  type ModalProps,
  Flex,
  Divider,
  Upload,
  Form,
} from 'antd';
import clsx from 'clsx';
import { type Dispatch, type FC, type SetStateAction } from 'react';

import './style.scss';
import { SheetIcon, UploadCloudIcon } from '@assets/icons';
import type { DraggerProps, UploadFile } from 'antd/lib';
import { useForm, useWatch } from 'antd/es/form/Form';
import type { UploadChangeParam } from 'antd/es/upload';
import { MSingleFileProgress } from '@components/molecules';

export interface IUploadPopup {
  modalProps: ModalProps;
  draggerProps?: DraggerProps;
  children?: React.ReactNode;
  requiredText?: string | boolean;
  progress?: number;
  showError?: boolean | string;
  disabled?: boolean;
  onSubmit?: (file: UploadFile[], resetField?: () => void) => void;
  onDownloadEg?: () => void;
  onCancelImport?: () => void;
  setError?: Dispatch<SetStateAction<boolean | string>>;
  setProgress?: Dispatch<SetStateAction<number>>;
}

type TUpload = { file: UploadFile[] };

const OUploadPopup: FC<IUploadPopup> = ({
  requiredText = 'Yêu cầu định dạng .xlsx',
  modalProps,
  draggerProps,
  progress,
  showError,
  disabled,
  onSubmit,
  onDownloadEg,
  onCancelImport,
  setError,
  setProgress,
}) => {
  const {
    className: modalClassName,
    title,
    centered = true,
    okText = 'Tiếp tục',
    cancelText = 'Huỷ',
    footer = null,
    closable = false,
    width = 547,
    onCancel,
    ...otherModalProps
  } = modalProps;

  const { ...otherDraggerProps } = draggerProps ?? {};

  const [form] = useForm();
  const fileList = useWatch('file', form);

  const handleChange = (info: UploadChangeParam<UploadFile>) => {
    const latestFile = info.fileList.slice(-1);

    form.setFieldsValue({ file: latestFile });
    setError?.(false);
    setProgress?.(0);
  };

  const handleResetForm = () => {
    setError?.(false);
    onCancelImport?.();
    form.resetFields();
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    onCancel?.(e);
    onCancelImport?.();
    handleResetForm();
    setError?.(false);
  };

  const handleSubmit = (values: TUpload) => {
    onSubmit?.(values?.file, form.resetFields);
    setError?.(false);
  };

  return (
    <Modal
      title={null}
      centered={centered}
      okText={null}
      cancelText={null}
      footer={footer}
      closable={closable}
      width={width}
      className={clsx('upload-popup', modalClassName)}
      {...otherModalProps}
    >
      <Form<TUpload> form={form} onFinish={handleSubmit}>
        <Typography className="upload-title fs-16 dis-block w-full">
          {title}
        </Typography>
        <Divider className="ma-0" />

        <div className="mt-32 px-24">
          <Form.Item name="file">
            <Upload.Dragger
              height={150}
              multiple={false}
              action="/upload.do"
              fileList={fileList}
              beforeUpload={() => false}
              onChange={handleChange}
              accept=".xlsx"
              showUploadList={false}
              disabled={disabled}
              {...otherDraggerProps}
            >
              <UploadCloudIcon />
              <Typography className="dis-block mt-16 fs-16">
                Click or drag file to this area to upload
              </Typography>
            </Upload.Dragger>
          </Form.Item>

          {requiredText && (
            <>
              <Typography.Text className="dis-block fs-16 my-20 required-text">
                {requiredText}
              </Typography.Text>
              {fileList?.length && (
                <div className="mb-20">
                  <MSingleFileProgress
                    error={showError}
                    percent={progress}
                    file={fileList?.[0]}
                    disabledRemove={disabled}
                    onRemove={handleResetForm}
                  />
                </div>
              )}

              <Divider className="ma-0" />
              <Typography.Text
                color="#9D9D9D"
                className="dis-block fs-16 my-20"
              >
                Tải template
              </Typography.Text>
              <AButton icon={<SheetIcon />} onClick={onDownloadEg}>
                Tải về
              </AButton>
            </>
          )}
        </div>

        <Divider className="ma-0 mt-32" />
        <Flex gap={16} className="px-24 py-14" justify="end">
          <AButton
            type="text"
            className="w-115 fw-600 fs-14"
            variant="filled"
            color="primary"
            onClick={handleCancel}
          >
            {cancelText}
          </AButton>
          <AButton
            type="primary"
            htmlType="submit"
            className="w-115 fw-600 fs-14"
            disabled={!fileList?.length || disabled}
          >
            {okText}
          </AButton>
        </Flex>
      </Form>
    </Modal>
  );
};

export default OUploadPopup;
