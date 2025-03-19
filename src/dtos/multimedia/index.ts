import type { UploadFile } from 'antd';
import type { BaseEntity, BaseSearchParams } from '../common';

export enum EMediaType {
  image = 'IMAGE',
  audio = 'AUDIO',
  video = 'VIDEO',
  document = 'DOCUMENT',
  animated = 'ANIMATED',
}
export interface MultimediaDTO extends Omit<BaseEntity, 'status'> {
  name: string;
  code: string;
  description: string;
  type?: EMediaType;
  content: string;
  url: string;
  file?: File;
  categoryCampaignId?: string;

  fileUpload?: UploadFile;
}

export interface MultimediaSearchRequest extends BaseSearchParams {
  code?: string;
  name?: string;
  type: EMediaType;
}
