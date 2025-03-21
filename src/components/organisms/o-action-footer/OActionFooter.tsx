import { AButton } from '@components/atoms';
import { Flex } from 'antd';
import type { FC } from 'react';

interface OActionFooterProps {
  onBack?: () => void;
  onCancel?: () => void;
  onSave?: () => void;
}

const OActionFooter: FC<OActionFooterProps> = ({
  onBack,
  onCancel,
  onSave,
}) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 265,
        right: 0,
        zIndex: 1000,
      }}
    >
      <Flex
        justify="space-between"
        className="px-40 py-24 bg-white z-1000 border-t-2 border-gray-border"
      >
        {onBack ? (
          <AButton color="primary" variant="filled" onClick={onBack}>
            Quay lại
          </AButton>
        ) : (
          <div />
        )}
        <Flex gap={16} justify="space-between">
          {onCancel && (
            <AButton color="primary" variant="filled" onClick={onCancel}>
              Hủy
            </AButton>
          )}
          {onSave && (
            <AButton type="primary" onClick={onSave}>
              Lưu
            </AButton>
          )}
        </Flex>
      </Flex>
    </div>
  );
};

export default OActionFooter;
