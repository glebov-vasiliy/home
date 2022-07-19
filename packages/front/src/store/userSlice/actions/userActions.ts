import { createAction, createAsyncAction } from 'typesafe-actions'
import { ExceptionEvent } from '../../../api/socketConnector/schemas'

export const loginAction = createAsyncAction(
  '@@user/loginActionRequest',
  '@@user/loginActionSuccess',
  '@@user/loginActionFailure',
)<{ username: string; password: string }, undefined, ExceptionEvent>()

export const setAuth = createAction('@@user/setAuth')<boolean>()
