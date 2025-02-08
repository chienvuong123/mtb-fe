import type { BaseResponse, BaseSearchParams, BaseSearchResponse } from "../common";

export interface OpportunitySellSearchRequest extends BaseSearchParams {
  categoryType?: string;
  code?: string;
  name?: string;
}

export interface OpportunitySellDTO {
    id: string,
    name: string,
    code: string
}

export type IOpportunitySellSearchForm = {
    name: string,
    code: string,
    codeCategory?: string
}

export type OpportunitySellSearchResponse = BaseResponse<
  BaseSearchResponse<OpportunitySellDTO>
>