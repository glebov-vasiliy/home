import { AxiosInstance } from 'axios'
import { RequestHandlerOptions, RequestModelHandler } from '../RequestModel'

export const createRequestFetcher =
  <GResponseData = Record<string, unknown>, GRequestData = Record<string, unknown>>(
    requestModelHandler: RequestModelHandler,
    axios: AxiosInstance,
  ) =>
  (params?: RequestHandlerOptions<GRequestData>) =>
    axios(requestModelHandler({ ...params })).then((res) => res.data as GResponseData)
