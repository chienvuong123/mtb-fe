import type { PageableObject } from '../common';

export enum ControlType {
  EDITOR = 'EDITOR',
  SELECT = 'SELECT',
  RADIO = 'RADIO',
  CHECKBOX = 'CHECKBOX',
  IMAGE = 'IMAGE',
  DATETIME = 'DATETIME',
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  SWITCH = 'SWITCH',
  LINK = 'LINK',
}

export type ControlDTO = {
  createdDate: string;
  createdBy: string;
  updatedDate: string;
  updatedBy: string;
  id: string;
  code: string;
  name: string;
  status: string;
  controlType: string;
};

export type ControlSearch = {
  code?: string;
  name?: string;
  pageNumber: number;
  pageSize: number;
  pageable?: PageableObject;
};

export type ControlUpsertRequest = ControlDTO & {
  id?: string;
};

export type CMResponseControlDTO = {
  reqNo: string;
  errorCode: string;
  errorDesc: string;
  data: ControlDTO | boolean;
};

export type CMResponseControlsDTO = {
  reqNo: string;
  errorCode: string;
  errorDesc: string;
  data: {
    content: ControlDTO[];
    page: number;
    size: number;
  };
};

export type TControlSearchForm = { code: string; name: string };
