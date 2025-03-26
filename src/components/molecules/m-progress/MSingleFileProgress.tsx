import { CancelCircle, FileAttachmentIcon } from '@assets/icons';
import { AButton } from '@components/atoms';
import { formatFileSize } from '@utils/fileHelper';
import {
  Flex,
  Progress,
  Typography,
  type ProgressProps,
  type UploadFile,
} from 'antd';
import type { FC } from 'react';

interface TSingleFileProgress extends ProgressProps {
  file?: UploadFile;
  disabledRemove?: boolean;
  error?: boolean | string;
  onRemove?: (name?: string) => void;
}

const MSingleFileProgress: FC<TSingleFileProgress> = ({
  file,
  percent = 0,
  disabledRemove,
  error,
  onRemove,
}) => {
  return (
    <div className="pa-16 border-1 border-gray-border rounded-8">
      <Flex justify="space-between">
        <Flex gap={6}>
          <FileAttachmentIcon color="#5c59e8" />
          <div>
            <Typography.Text className="fw-600 dis-block lh-px-18">
              {file?.name}
            </Typography.Text>
            {error ? (
              <Typography.Text className="red fs-12">
                Upload failed
              </Typography.Text>
            ) : (
              <Typography.Text className="file-name-color fs-12">
                {file?.size ? formatFileSize(file?.size) : null}
              </Typography.Text>
            )}
          </div>
        </Flex>
        <AButton
          icon={<CancelCircle />}
          type="text"
          disabled={disabledRemove}
          onClick={() => onRemove?.(file?.name)}
        />
      </Flex>
      {percent > 0 && (
        <Progress
          percent={percent}
          strokeColor="#5c59e8"
          showInfo={percent !== 100}
        />
      )}
    </div>
  );
};

export default MSingleFileProgress;
