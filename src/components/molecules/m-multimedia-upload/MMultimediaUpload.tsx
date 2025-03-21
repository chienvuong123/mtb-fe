import type { EMediaType } from '@dtos';
import {
  downloadFile,
  getBase64FromFile,
  type FileType,
} from '@utils/fileHelper';
import { Card, Image, Typography, Upload, type FormInstance } from 'antd';
import { useWatch } from 'antd/es/form/Form';
import type { RcFile } from 'antd/es/upload';
import type { ImageProps, UploadProps } from 'antd/lib';
import { useEffect, useState, type FC } from 'react';
import { useNotification } from '@libs/antd';
import type { AnyObject } from 'antd/es/_util/type';
import { CloseIcon, UploadCloudIcon } from '@assets/icons';
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
}

const MEDIA_ACCEPT_TYPE: Record<EMediaType, string> = {
  VIDEO: '.mp4,.avi,.mov,.mkv,.flv,.wmv,.webm',
  ANIMATED: '.gif,.webp,.apng,.mng',
  AUDIO: '.mp3,.wav,.aac,.flac,.ogg,.wma,.m4a',
  DOCUMENT: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt',
  IMAGE: '.jpg,.png,.jpeg,.bmp,.webp,.tiff',
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
  DOCUMENT: (({ src, name = 'file' }: { name: string; src?: string }) => (
    <Typography.Text
      className="text-main1 ml-8 cursor-pointer"
      style={{ textDecoration: 'underline' }}
      onClick={async () => {
        if (src) {
          const response = await fetch(src);
          const blob = await response.blob();
          downloadFile(blob, name);
        }
      }}
    >
      Tải xuống để xem
    </Typography.Text>
  )) as FC,
};

const MMultimediaUpload: FC<TUploadMultimedia> = ({
  className,
  accept,
  form,
  name,
  disabled,
  mediaType,
  loading,
  maxSize = 5,
  ...props
}) => {
  const file = useWatch(name, form);
  const [previewImage, setPreviewImage] = useState('');

  const notify = useNotification();

  useEffect(() => {
    if (typeof file === 'string') {
      setPreviewImage(file);
      return;
    }

    const { fileList } = file ?? {};
    if (fileList?.[0]) {
      const newFile = fileList?.[0];
      if (!newFile.url && !newFile.preview) {
        getBase64FromFile(newFile.originFileObj as FileType).then((res) => {
          newFile.preview = res;
          setPreviewImage(newFile.url || (newFile.preview as string));
        });
      }
      return;
    }

    setPreviewImage('');
  }, [file]);

  const handleRemoveImage = () => {
    form?.setFieldValue(name, undefined);
  };

  const handleBeforeUpload = (fileUpload: RcFile) => {
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
      loading={loading}
    >
      {previewImage ? (
        <div className="w-full h-full dis-flex jc-center pos-relative">
          {!disabled && (
            <AButton
              type="text"
              icon={<CloseIcon />}
              className="pos-absolute top-0 right-0 z-10"
              onClick={handleRemoveImage}
            />
          )}
          <Component
            src={previewImage || ''}
            name={form?.getFieldValue('filename') ?? 'filename'}
          />
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
            Hỗ trợ định dạng{' '}
            {MEDIA_ACCEPT_TYPE[mediaType].split(',').join(', ')} files
          </Typography>
        </>
      )}
    </Card>
  );
};

export default MMultimediaUpload;
