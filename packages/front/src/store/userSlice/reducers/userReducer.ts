import * as Actions from '../../root/actions'
import { createReducer } from 'typesafe-actions'
import { RootAction } from '../../root/types'
import { RequestStateEnum } from '../../../enums'
import { UserState } from '../types/userState'

export const initialState: UserState = {
  requestState: RequestStateEnum.IDLE,
  auth: false,
}

export const userReducer = createReducer<UserState, RootAction>(initialState)
  .handleAction(Actions.loginAction.request, (state) => ({
    ...state,
    requestState: RequestStateEnum.LOADING,
  }))
  .handleAction(Actions.loginAction.success, (state) => ({
    ...state,
    requestState: RequestStateEnum.SUCCESS,
    auth: true,
  }))
  .handleAction(Actions.loginAction.failure, (state) => ({
    ...state,
    requestState: RequestStateEnum.ERROR,
    auth: false,
  }))
  .handleAction(Actions.setAuth, (state, { payload }) => ({
    ...state,
    auth: payload,
  }))
  .handleAction(Actions.logout, (state) => ({
    ...state,
    auth: false,
  }))
