import type {
  ExampleDTO,
  ExampleSearchRequest,
  ExampleInsertRequest,
} from '@dtos';
import { BaseApi } from './baseApi';

class ExampleApi extends BaseApi<
  ExampleDTO,
  ExampleInsertRequest,
  ExampleSearchRequest
> {
  constructor() {
    super('/example/v1.0');
  }

  // define or override other apis
}

export const exampleApi = new ExampleApi();
