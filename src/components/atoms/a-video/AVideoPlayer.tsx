import type { GetProps } from 'antd';
import React, { type VideoHTMLAttributes } from 'react';

export interface VideoPlayerProps
  extends GetProps<VideoHTMLAttributes<HTMLVideoElement>> {
  src: string;
}

const AVideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  controls = true,
  ...props
}) => {
  return (
    <video controls={controls} {...props}>
      <source src={src} />
      <track kind="captions" src="" label="Captions" />
    </video>
  );
};

export default AVideoPlayer;
