import { createRequestModel } from '../../modules/RequestModel'
import { RequestMethodEnum } from '../../modules/RequestModel/enums'

export const login = createRequestModel({
  method: RequestMethodEnum.GET,
  path: '/api/users/login',
})
