import { useState, type Dispatch, type FC, type SetStateAction } from 'react';
import { Flex, type UploadFile } from 'antd';
import Title from 'antd/lib/typography/Title';
import { AButton } from '@components/atoms';
import { ExportIcon, ImportIcon } from '@assets/icons';
import { useIsMutating } from '@tanstack/react-query';
import { OUploadPopup, type IUploadPopup } from '../o-upload-popup';

interface ITitleBlock {
  title: React.ReactNode;
  children?: React.ReactNode;
  popupProps?: IUploadPopup;
  showImport?: boolean;
  showExport?: boolean;
  exportLoading?: boolean;
  onExport?: () => void;
  onImport?: (
    file: UploadFile[],
    setProgressPercent?: Dispatch<SetStateAction<number>>,
    setError?: Dispatch<SetStateAction<boolean | string>>,
    resetPopup?: () => void,
    resetField?: () => void,
  ) => void;
  onDownloadEg?: IUploadPopup['onDownloadEg'];
}

const OTitleBlock: FC<ITitleBlock> = ({
  title,
  children,
  popupProps,
  showImport,
  showExport = true,
  exportLoading,
  onImport,
  onExport,
  onDownloadEg,
}) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [error, setError] = useState<boolean | string>(false);

  const isMutating = useIsMutating();

  const {
    modalProps,
    onDownloadEg: download,
    ...otherPopupProps
  } = popupProps ?? {};

  const resetPopup = () => {
    setShowPopup(false);
    setProgressPercent(0);
    setError(false);
  };

  return (
    <>
      <OUploadPopup
        modalProps={{
          open: showPopup,
          onCancel: (e) => {
            modalProps?.onCancel?.(e);
            resetPopup();
          },
          ...modalProps,
        }}
        showError={error}
        setError={setError}
        progress={progressPercent}
        setProgress={setProgressPercent}
        onSubmit={(file, resetField) =>
          onImport?.(file, setProgressPercent, setError, resetPopup, resetField)
        }
        onDownloadEg={onDownloadEg ?? download}
        disabled={isMutating > 0}
        {...otherPopupProps}
      />

      <Flex justify="space-between" className="mb-14">
        <Title level={3} className="mb-0">
          {title}
        </Title>
        <Flex gap={16}>
          {showImport && (
            <AButton
              variant="filled"
              color="primary"
              icon={<ImportIcon />}
              onClick={() => setShowPopup(true)}
            >
              Import
            </AButton>
          )}
          {showExport && (
            <AButton
              variant="filled"
              color="primary"
              icon={<ExportIcon />}
              onClick={onExport}
              loading={exportLoading}
            >
              Export
            </AButton>
          )}
          {children}
        </Flex>
      </Flex>
    </>
  );
};

export default OTitleBlock;
