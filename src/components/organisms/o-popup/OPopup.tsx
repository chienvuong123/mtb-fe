import React, { useState, type ReactNode } from 'react';
import { AButton, AModal } from '@components/atoms';
import { Flex, Typography } from 'antd';

import './OPopup.scss';

interface IOPopup {
  title: string;
  description: string | ReactNode;
  cancelText?: string;
  okText: string;
  isOpen: boolean;
  onClose: () => void;
  onOkModal?: () => void;
  children: React.ReactElement;
}

const OPopup: React.FC<IOPopup> = ({
  title,
  description,
  cancelText,
  okText,
  isOpen,
  onClose,
  onOkModal,
  children,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleCancel = () => {
    onClose();
    setIsClicked(false);
  };

  const handleOk = () => {
    onOkModal?.();
    handleCancel();
  };

  const handleClickChildren = () => {
    setIsClicked(true);
  };

  const open = isOpen || isClicked;

  return (
    <>
      {React.cloneElement(children, { onClick: handleClickChildren })}

      <AModal
        open={open}
        onCancel={handleCancel}
        footer={null}
        closeIcon={null}
        className="o-modal"
        centered
      >
        <Flex justify="center" align="center" vertical>
          <Typography.Title level={3} className="fw-500">
            {title}
          </Typography.Title>
          <Typography.Title level={5} className="mt-7 mb-24 fs-16 fw-400">
            {description}
          </Typography.Title>
          <Flex justify="center" align="center" gap={16}>
            {cancelText && (
              <AButton
                className="w-183"
                variant="filled"
                color="geekblue"
                onClick={handleCancel}
              >
                {cancelText}
              </AButton>
            )}
            <AButton
              className="w-183"
              color="purple"
              variant="solid"
              onClick={handleOk}
            >
              {okText}
            </AButton>
          </Flex>
        </Flex>
      </AModal>
    </>
  );
};

export default OPopup;
