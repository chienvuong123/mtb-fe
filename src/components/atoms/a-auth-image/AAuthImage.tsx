import React, { memo } from 'react';
import { Image, type ImageProps } from 'antd';
import FallbackImage from '@assets/images/fallback_img.png';
import { useMultimediaResourceQuery } from '@hooks/queries';

const AAuthImage: React.FC<ImageProps> = ({
  src,
  preview = true,
  ...props
}) => {
  const { data: resourceSrc } = useMultimediaResourceQuery(src ?? '');

  return (
    <Image
      src={resourceSrc?.url}
      preview={preview}
      fallback={FallbackImage}
      {...props}
    />
  );
};

export default memo(AAuthImage);
