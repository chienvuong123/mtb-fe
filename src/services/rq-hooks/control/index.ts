import type {
  CMResponseControlDTO,
  CMResponseControlsDTO,
  ControlSearch,
  ControlUpsertRequest,
} from '@dtos';
import { MOCK_CONTROL } from './mock';

// const controlPath = '/control/v1.0';

const getControls = async (data: ControlSearch) => {
  // const res: AxiosResponse<CMResponseControlsDTO> = await axiosInstance.get(
  //   `${controlPath}/search`,
  //   { params: data },
  // );
  // return res.data;
  console.log('data', data);
  return {
    errorCode: '0',
    errorDesc: 'Success',
    reqNo: '123',
    data: {
      content: MOCK_CONTROL,
      page: 1,
      size: MOCK_CONTROL.length,
    },
  } as CMResponseControlsDTO;
};

const getControl = async (id: string) => {
  // const res = await axiosInstance.get(`${controlPath}/view`, {
  //   params: { id },
  // });
  // return res.data;
  return MOCK_CONTROL.find((control) => control.id === id);
};

const updateControl = async (data: ControlUpsertRequest) => {
  // const res: AxiosResponse<CMResponseControlDTO> = await axiosInstance.post(
  //   `${controlPath}/edit`,
  //   data,
  // );
  // return res.data;
  console.log('data', data);

  return {
    errorCode: '0',
    errorDesc: 'Success',
    reqNo: '123',
    data: true,
  } as CMResponseControlDTO;
};
const createControl = async (data: ControlUpsertRequest) => {
  // const res: AxiosResponse<CMResponseControlDTO> = await axiosInstance.post(
  //   `${controlPath}/add`,
  //   data,
  // );
  // return res.data;
  console.log('data', data);

  return {
    errorCode: '0',
    errorDesc: 'Success',
    reqNo: '123',
    data: true,
  } as CMResponseControlDTO;
};
const deleteControl = async (id: string) => {
  // const res: AxiosResponse<CMResponseControlDTO> = await axiosInstance.post(
  //   `${controlPath}/remove`,
  //   {
  //     id,
  //   },
  // );
  // return res.data;
  console.log('data', id);

  return {
    errorCode: '0',
    errorDesc: 'Success',
    reqNo: '123',
    data: true,
  } as CMResponseControlDTO;
};

export { createControl, deleteControl, getControl, getControls, updateControl };
