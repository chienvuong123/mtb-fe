// /multimedia
import type {
  BaseResponse,
  MultimediaDTO,
  MultimediaSearchRequest,
} from '@dtos';
import type { AxiosRequestConfig } from 'axios';
import { BaseApi } from './baseApi';
import { apiRequest, apiRequestFile } from './apiClient';

const getFormData = ({
  id,
  file,
  code,
  name,
  type,
  description,
  categoryCampaignId,
}: MultimediaDTO) => {
  const formData = new FormData();
  if (file) formData.append('file', file);
  if (categoryCampaignId)
    formData.append('categoryCampaignId', categoryCampaignId);
  if (id) formData.append('id', id);
  formData.append('code', code);
  formData.append('type', type as string);
  formData.append('name', name);
  formData.append('description', description);

  return formData;
};

class MultimediaApi extends BaseApi<MultimediaDTO, MultimediaSearchRequest> {
  constructor() {
    super('/multimedia/v1.0');
  }

  add(data: MultimediaDTO, config?: AxiosRequestConfig) {
    return apiRequestFile<BaseResponse<boolean>>({
      url: `${this.endpoint}/add`,
      method: 'POST',
      data: getFormData(data),
      ...config,
    });
  }

  edit(data: MultimediaDTO, config?: AxiosRequestConfig) {
    return apiRequestFile<BaseResponse<boolean>>({
      url: `${this.endpoint}/edit`,
      method: 'POST',
      data: getFormData(data),
      ...config,
    });
  }

  getResource(src: string) {
    return apiRequest<BaseResponse<string>>({
      url: `${this.endpoint}/resource/${src}`,
      responseType: 'blob',
    });
  }
}

export const multimediaApi = new MultimediaApi();
