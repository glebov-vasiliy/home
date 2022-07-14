import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import { RequestMethodEnum } from './enums'

export interface IRequestModel {
  method?: string
  path: string
  headers?: AxiosRequestHeaders
}

export type IExtraOptions = Partial<Omit<IRequestModel, 'method' | 'path'>> | null
export type RequestHandlerOptions<T> = { data?: T; options?: IExtraOptions }
export type RequestModelHandler = <T>(params?: RequestHandlerOptions<T>) => AxiosRequestConfig

export const createRequestModel =
  ({ method = RequestMethodEnum.GET, path }: IRequestModel) =>
  <T>(params?: RequestHandlerOptions<T>): AxiosRequestConfig => {
    const { data = {}, options = {} } = params || {}

    return {
      method,
      url: path,
      params: method === 'GET' ? data : null,
      data: method !== 'GET' ? data : null,
      ...options,
    }
  }
