import type { EStatus } from '@constants/masterData';
import type {
  BaseEntity,
  BaseResponse,
  BaseSearchParams,
  BaseSearchResponse,
} from './common';
import type { CategoryDTO } from './category';
import type { AttributeDTO } from './attribute';

export interface ScenarioDTO extends BaseEntity {
  code: string;
  name: string;
  status: EStatus;
  description: string;
  categoryId?: string;
  category?: CategoryDTO;
  attributes?: AttributeDTO[];
}

export interface ScenarioAddRequest extends Partial<ScenarioDTO> {
  reqNo: string;
}

export interface ScenarioEditRequest extends Partial<ScenarioDTO> {
  reqNo: string;
}

export interface ScenarioSearchRequest extends BaseSearchParams {
  code?: string;
  name?: string;
  // category: { code: string; name: string };
  categoryCode?: string;
  categoryName?: string;
}

export type ScenarioSearchResponse = BaseResponse<
  BaseSearchResponse<ScenarioDTO>
>;
export type ScenarioViewResponse = BaseResponse<ScenarioDTO>;
