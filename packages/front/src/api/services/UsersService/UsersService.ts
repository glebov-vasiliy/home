import { createRequestFetcher } from '../../modules/RequestFetcher'
import axiosInstance from '../../axios/axios'
import * as UserModels from '../../models/UserModels'

interface IAuthServiceResponseData {
  login: string
}

export const login = createRequestFetcher<IAuthServiceResponseData>(UserModels.login, axiosInstance)
