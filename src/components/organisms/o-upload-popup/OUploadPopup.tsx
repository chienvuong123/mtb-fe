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
import { useState, type FC } from 'react';

import './style.scss';
import { SheetIcon, UploadCloudIcon } from '@assets/icons';
import type { DraggerProps, UploadFile } from 'antd/lib';
import { useForm } from 'antd/es/form/Form';
import type { UploadChangeParam } from 'antd/es/upload';

interface IUploadPopup {
  modalProps: ModalProps;
  draggerProps?: DraggerProps;
  children?: React.ReactNode;
  requiredText?: string | boolean;
  onSubmit: (file: UploadFile) => void;
  onDowloadEg?: () => void;
}

const OUploadPopup: FC<IUploadPopup> = ({
  requiredText = 'Yêu cầu định dạng .xlsx',
  modalProps,
  draggerProps,
  onSubmit,
  onDowloadEg,
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

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange = (info: UploadChangeParam<UploadFile>) => {
    const latestFile = info.fileList.slice(-1);
    setFileList(latestFile);

    form.setFieldsValue({ file: latestFile });
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
      <Form form={form} onFinish={(value) => onSubmit(value?.file)}>
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
              <Divider className="ma-0" />
              <Typography.Text
                color="#9D9D9D"
                className="dis-block fs-16 my-20"
              >
                Tải template
              </Typography.Text>
              <AButton icon={<SheetIcon />} onClick={onDowloadEg}>
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
            onClick={onCancel}
          >
            {cancelText}
          </AButton>
          <AButton
            type="primary"
            htmlType="submit"
            className="w-115 fw-600 fs-14"
          >
            {okText}
          </AButton>
        </Flex>
      </Form>
    </Modal>
  );
};

export default OUploadPopup;
