import type { EMediaType } from '@dtos';
import {
  downloadFile,
  formatFileSize,
  getBase64FromFile,
  type FileType,
} from '@utils/fileHelper';
import {
  Button,
  Card,
  Flex,
  Image,
  Typography,
  Upload,
  type FormInstance,
  type NotificationArgsProps,
} from 'antd';
import { useWatch } from 'antd/es/form/Form';
import type { RcFile } from 'antd/es/upload';
import type { ImageProps, UploadProps } from 'antd/lib';
import { useEffect, useState, type FC } from 'react';
import { useNotification } from '@libs/antd';
import type { AnyObject } from 'antd/es/_util/type';
import {
  CloseIcon,
  Download04Icon,
  FileAttachmentIcon,
  UploadCloudIcon,
} from '@assets/icons';
import clsx from 'clsx';
import { AButton } from '../../atoms/a-button';
import { AVideoPlayer, type VideoPlayerProps } from '../../atoms/a-video';
import { AAudioPlayer, type AudioPlayerProps } from '../../atoms/a-audio';

export interface TUploadMultimedia extends UploadProps {
  form?: FormInstance;
  src?: string;
  mediaType: EMediaType;
  loading?: boolean;
  maxSize?: number;
  disabledDownload?: boolean;
}

const MEDIA_ACCEPT_TYPE: Record<EMediaType, string> = {
  VIDEO: '.mp4,.avi,.mov,.mkv,.flv,.wmv,.webm',
  ANIMATED: '.gif,.webp,.apng',
  AUDIO: '.mp3,.wav,.aac,.flac,.ogg,.wma,.m4a',
  DOCUMENT: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt',
  IMAGE: '.jpg,.png,.jpeg,.bmp,.webp,.tiff',
};

const getFileExtension = (filename: string) =>
  filename.split('.').pop()?.toLowerCase();

const handleDownloadFromSrc = async (
  notify: (props: NotificationArgsProps) => void,
  src?: string,
  name?: string,
) => {
  if (src && name) {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      downloadFile(blob, name);
    } catch {
      notify({ type: 'error', message: 'Lỗi khi tải xuống' });
    }
  } else {
    notify({ type: 'error', message: 'Lỗi khi tải xuống' });
  }
};

const mediaTypeComponents: Record<EMediaType, FC> = {
  ANIMATED: ((props: ImageProps) => <Image {...props} />) as FC,
  IMAGE: ((props: ImageProps) => <Image {...props} />) as FC,
  AUDIO: ((props: AudioPlayerProps) => (
    <AAudioPlayer style={{ width: '60%' }} {...props} />
  )) as FC,
  VIDEO: ((props: VideoPlayerProps) => (
    <AVideoPlayer style={{ width: '80%' }} {...props} />
  )) as FC,
  DOCUMENT: (({
    src,
    name = 'file',
    size,
  }: {
    name: string;
    src?: string;
    size?: number;
  }) => {
    const notify = useNotification();
    return (
      <Flex
        justify="space-between"
        className="border-gray-border border-1 rounded-8 pa-8"
        style={{ width: '80%' }}
      >
        <Flex gap={6} align="center">
          <FileAttachmentIcon color="#5c59e8" />
          <div>
            <Typography.Text className="fw-600 dis-block lh-px-18">
              {name}
            </Typography.Text>
            <Typography.Text className="file-name-color fs-12">
              {size ? formatFileSize(size) : null}
            </Typography.Text>
          </div>
        </Flex>
        <Button
          type="text"
          icon={<Download04Icon />}
          onClick={() => handleDownloadFromSrc(notify, src, name)}
        />
      </Flex>
    );
  }) as FC,
};

const initFile = { name: '', size: 0, src: '' };

const MMultimediaUpload: FC<TUploadMultimedia> = ({
  className,
  accept,
  form,
  name,
  disabled,
  mediaType,
  loading,
  disabledDownload,
  maxSize = 5,
  ...props
}) => {
  const file = useWatch(name, form);
  const [fileInfo, setFileInfo] = useState(initFile);

  const notify = useNotification();

  const allowedFiles = MEDIA_ACCEPT_TYPE[mediaType].split(',').join(', ');

  useEffect(() => {
    if (typeof file === 'string') {
      setFileInfo({
        name: form?.getFieldValue('filename') ?? 'filename',
        src: file,
        size: form?.getFieldValue('fileSize') ?? 0,
      });

      return;
    }

    const { fileList } = file ?? {};
    if (fileList?.[0]) {
      const newFile = fileList?.[0];
      if (!newFile.url && !newFile.preview) {
        getBase64FromFile(newFile.originFileObj as FileType).then((res) => {
          newFile.preview = res;
          setFileInfo({
            name: newFile?.name ?? 'filename',
            src: newFile.url || (newFile.preview as string),
            size: newFile?.size ?? 0,
          });
        });
      }
      return;
    }

    setFileInfo(initFile);
  }, [file, form]);

  const handleRemoveImage = () => {
    form?.setFieldValue(name, undefined);
    form?.validateFields();
  };

  const handleBeforeUpload = (fileUpload: RcFile) => {
    const allowedExtensions = MEDIA_ACCEPT_TYPE[mediaType]
      .split(',')
      .map((ext) => ext.replace('.', '').toLowerCase());
    const fileExt = getFileExtension(fileUpload.name);

    if (!fileExt || !allowedExtensions.includes(fileExt)) {
      notify({
        type: 'error',
        message: `File không đúng định dạng: ${allowedFiles}`,
      });
      return Upload.LIST_IGNORE;
    }

    const max = maxSize * 1024 * 1024;
    if (fileUpload.size > max) {
      notify({
        type: 'error',
        message: `File quá lớn! Vui lòng chọn file nhỏ hơn ${maxSize}MB.`,
      });
      return Upload.LIST_IGNORE;
    }

    return true;
  };

  const Component = mediaTypeComponents[mediaType] as FC<AnyObject>;

  return (
    <Card
      className="w-full h-full jc-center"
      title="Xem trước"
      classNames={{ title: 'fs-16 fw-500' }}
      rootClassName={clsx({
        'border-validate': !!form?.getFieldError(name)?.length,
      })}
      style={{ minHeight: 217 }}
      loading={loading}
    >
      {fileInfo.src ? (
        <div className="w-full h-full dis-flex jc-center pos-relative">
          <div className="pos-absolute top-0 right-0 z-10">
            <Flex vertical gap={8}>
              {!disabled && (
                <AButton
                  type="text"
                  icon={<CloseIcon />}
                  onClick={handleRemoveImage}
                />
              )}
              {!disabledDownload && (
                <AButton
                  icon={<Download04Icon color="#fff" />}
                  onClick={() =>
                    handleDownloadFromSrc(
                      notify,
                      fileInfo.src,
                      form?.getFieldValue('filename'),
                    )
                  }
                />
              )}
            </Flex>
          </div>
          <Component {...fileInfo} />
        </div>
      ) : (
        <>
          <Upload.Dragger
            name="files"
            accept={MEDIA_ACCEPT_TYPE[mediaType] ?? accept}
            className={clsx('upload-container', className)}
            height={150}
            listType="picture-card"
            maxCount={1}
            disabled={disabled}
            beforeUpload={handleBeforeUpload}
            {...props}
          >
            <UploadCloudIcon />
            <Typography
              className="fs-16 fw-400 mt-16"
              style={{ color: '#484848' }}
            >
              Click or drag file to this area to upload
            </Typography>
          </Upload.Dragger>
          <Typography
            className="fs-16 fw-400 mt-20"
            style={{ color: '#9D9D9D' }}
          >
            Hỗ trợ định dạng {allowedFiles} files
          </Typography>
        </>
      )}
    </Card>
  );
};

export default MMultimediaUpload;
