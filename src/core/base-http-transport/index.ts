import { ClassConstructor, plainToInstance } from 'class-transformer';
import { isRequestError } from 'core/base-http-transport/guards';
import type {
  TDeserializeArrayReturn,
  TDeserializeReturn,
  TRequestError,
  TResponse,
} from './types';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const apiBaseURL = process.env.REACT_APP_API_URL;

export abstract class BaseHttpTransport {
  protected readonly basePath: string;

  protected constructor(basePath: string) {
    this.basePath = basePath;
  }

  protected get(path: string, params?: object) {
    return this.request({ method: 'GET', url: path, params });
  }

  protected post(path: string, data?: unknown) {
    return this.request({ method: 'POST', url: path, data });
  }

  protected deserialize<T>(model: ClassConstructor<T>): TDeserializeReturn<T> {
    return (response: TResponse<T>): T => plainToInstance(model, response.data);
  }

  protected deserializeArray<T>(
    model: ClassConstructor<T>
  ): TDeserializeArrayReturn<T> {
    return (response: TResponse<Array<unknown>>): Array<T> =>
      Array.isArray(response.data)
        ? response.data.map((data) => plainToInstance(model, data))
        : [];
  }

  private request(config: AxiosRequestConfig) {
    return axios({
      withCredentials: true,
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      baseURL: `${apiBaseURL}/api/`,
      ...config,
    })
      .then((response: AxiosResponse) => response)
      .catch((error: AxiosError<TRequestError>) => {
        if (error.response && isRequestError(error.response?.data)) {
          return Promise.reject(error.response?.data);
        }

        return Promise.reject({
          message: error.message,
          statusCode: error.code,
        });
      });
  }
}
