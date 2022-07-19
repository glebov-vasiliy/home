import axios, { AxiosRequestConfig } from 'axios'
import { Constants } from '../../constants'

const options: AxiosRequestConfig = {
  withCredentials: true,
  baseURL: Constants.backendUrl,
  responseType: 'json',
}

const axiosInstance = axios.create(options)

export default axiosInstance
