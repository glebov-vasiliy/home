import { createRequestFetcher } from '../../modules/RequestFetcher'
import axiosInstance from '../../axios/axios'
import * as AuthModel from '../../models/AuthModel/AuthModel'

interface IAuthServiceResponseData {
  login: string
}

export const login = createRequestFetcher<IAuthServiceResponseData>(AuthModel.login, axiosInstance)
