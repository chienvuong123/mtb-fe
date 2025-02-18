import type { BaseEntity } from './common';

export interface AssetDTO extends BaseEntity {
  code: string;
  name: string;
  active: boolean;
}
