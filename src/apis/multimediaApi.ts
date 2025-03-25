// /multimedia
import type {
  BaseResponse,
  MultimediaDTO,
  MultimediaSearchRequest,
} from '@dtos';
import type { AxiosRequestConfig } from 'axios';
import { BaseApi } from './baseApi';
import { apiRequestAll, apiRequestFile } from './apiClient';

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

  async getResource(src: string) {
    const response = await apiRequestAll<BaseResponse<string>>({
      url: `${this.endpoint}/resource/${src}`,
      responseType: 'blob',
      timeout: Infinity,
    });
    const contentDisposition = response.headers['content-disposition'];
    let filename = 'downloaded-file';

    if (contentDisposition) {
      const match = contentDisposition.match(/filename="?(.+?)"?$/);
      if (match) {
        // eslint-disable-next-line prefer-destructuring
        filename = match[1];
      }
    }
    return {
      data: response.data,
      filename,
    };
  }
}

export const multimediaApi = new MultimediaApi();
