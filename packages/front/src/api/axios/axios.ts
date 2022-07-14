import axios, { AxiosRequestConfig } from 'axios'

const options: AxiosRequestConfig = {
  withCredentials: true,
  baseURL: process.env['NX_BACKEND_URL'],
  responseType: 'json',
}

const axiosInstance = axios.create(options)

export default axiosInstance
