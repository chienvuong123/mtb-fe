import type {
  CMResponseProductCategoryDTO,
  CMResponseCategoryDTO,
  ProductCategorySearch,
  ProductCategoryUpsertRequest,
} from '@dtos';
import axiosInstance from '@utils/axiosInstance';
import { type AxiosResponse } from 'axios';

const categoryPath = '/category/v1.0';

const getCategoryTypes = async (reqNo: string) => {
  const res: AxiosResponse<CMResponseProductCategoryDTO> =
    await axiosInstance.get(`${categoryPath}/category-types`, {
      params: { reqNo },
    });
  return res.data;
};

const getListProduct = async (data: ProductCategorySearch) => {
  const res: AxiosResponse<CMResponseCategoryDTO> = await axiosInstance.get(
    `${categoryPath}/search`,
    { params: data },
  );
  return res.data;
};

const getProductDetails = async () => {
  const res = await axiosInstance.post(`${categoryPath}/view`);
  return res.data;
};
const updateProduct = async (data: ProductCategoryUpsertRequest) => {
  const res: AxiosResponse<CMResponseProductCategoryDTO> =
    await axiosInstance.post(`${categoryPath}/edit`, data);
  return res.data;
};
const createProduct = async (data: ProductCategoryUpsertRequest) => {
  const res: AxiosResponse<CMResponseProductCategoryDTO> =
    await axiosInstance.post(`${categoryPath}/add`, data);
  return res.data;
};
const deleteProduct = async (id: number) => {
  const res: AxiosResponse<CMResponseProductCategoryDTO> =
    await axiosInstance.post(`${categoryPath}/remove`, {
      reqNo: '123',
      id,
    });
  return res.data;
};

export {
  getCategoryTypes,
  getListProduct,
  getProductDetails,
  updateProduct,
  createProduct,
  deleteProduct,
};
