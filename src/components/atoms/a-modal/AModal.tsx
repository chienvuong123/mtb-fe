import React from 'react';
import { Modal, type ModalProps } from 'antd';
import clsx from 'clsx';

interface IAModal extends ModalProps {
  className?: string;
  children: React.ReactNode;
}

const AModal: React.FC<IAModal> = ({ className, children, ...props }) => {
  const classAntd = clsx('a-modal', className);
  return (
    <Modal className={classAntd} {...props}>
      {children}
    </Modal>
  );
};

export default AModal;
