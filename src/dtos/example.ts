import type {
  BaseEntity,
  BaseResponse,
  BaseSearchParams,
  BaseSearchResponse,
} from './common';

export enum ExampleType {
  PRODUCT = '2',
  SERVICE = 'SERVICE',
}

export interface ExampleDTO extends BaseEntity {
  code: string;
  name: string;
  exampleType: ExampleType;
}

export interface ExampleInsertRequest extends BaseSearchParams {
  example?: string;
}
export interface ExampleSearchRequest extends BaseSearchParams {
  exampleType?: string;
  code?: string;
  name?: string;
}

export type ExampleSearchResponse = BaseResponse<
  BaseSearchResponse<ExampleDTO>
>;

export type ExampleViewResponse = BaseResponse<ExampleDTO>;
