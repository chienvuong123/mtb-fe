import { AButton } from '@components/atoms';
import { Modal, Typography, type ModalProps, Flex } from 'antd';
import clsx from 'clsx';
import type { FC } from 'react';

import './styles.scss';

export interface IModalConfirm extends ModalProps {
  content?: string;
}

const OModalConfirm: FC<IModalConfirm> = ({
  title = 'Xoá danh mục',
  content = 'Bạn có chắc muốn xóa?',
  centered = true,
  okText = 'Xác nhận',
  cancelText = 'Huỷ',
  footer = null,
  closable = false,
  width = 447,
  className,
  onCancel,
  onOk,
  ...props
}) => {
  const oClassName = clsx('o-modal-confirm', className);

  return (
    <Modal
      title={null}
      centered={centered}
      okText={null}
      cancelText={null}
      footer={footer}
      closable={closable}
      width={width}
      className={oClassName}
      {...props}
    >
      <Typography.Title className="fs-24 dis-block w-full text-center mb-7">
        {title}
      </Typography.Title>
      <Typography.Text className="fs-16 dis-block w-full text-center">
        {content}
      </Typography.Text>
      <Flex gap={16} className="mt-24">
        <AButton type="text" className="w-183 bg-light" onClick={onCancel}>
          {cancelText}
        </AButton>
        <AButton
          type="primary"
          color="red"
          className="w-183 bg-red"
          onClick={onOk}
        >
          {okText}
        </AButton>
      </Flex>
    </Modal>
  );
};

export default OModalConfirm;
