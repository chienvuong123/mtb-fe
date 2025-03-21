import type { GetProps } from 'antd';
import React, { type AudioHTMLAttributes } from 'react';

export interface AudioPlayerProps
  extends GetProps<AudioHTMLAttributes<HTMLAudioElement>> {
  src: string;
}

const AAudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  controls = true,
  ...props
}) => {
  return (
    <audio controls={controls} {...props}>
      <source src={src} />
      <track kind="captions" src="" label="Captions" />
    </audio>
  );
};

export default AAudioPlayer;
