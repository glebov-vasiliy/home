import { createRequestModel } from '../../modules/RequestModel'
import { RequestMethodEnum } from '../../modules/RequestModel/enums'

export const login = createRequestModel({
  method: RequestMethodEnum.GET,
  path: '/api/auth/login',
})

export const signup = createRequestModel({
  method: RequestMethodEnum.POST,
  path: '/api/users/signup',
})

export const checkToken = createRequestModel({
  method: RequestMethodEnum.GET,
  path: '/api/auth/check-token',
})
