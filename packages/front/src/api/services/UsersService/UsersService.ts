import { createRequestFetcher } from '../../modules/RequestFetcher'
import axiosInstance from '../../axios/axios'
import * as UserModels from '../../models/UserModels'

interface ILoginRequestData {
  username: string
  password: string
}
interface ILoginResponseData {
  accessToken: string
}
export const login = createRequestFetcher<ILoginResponseData, ILoginRequestData>(UserModels.login, axiosInstance)

interface ICheckResponseData {
  status: boolean
}
export const checkToken = createRequestFetcher<ICheckResponseData>(UserModels.checkToken, axiosInstance)
