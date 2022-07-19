import * as Actions from '../../root/actions'
import { createReducer } from 'typesafe-actions'
import { RootAction } from '../../root/types'
import { RequestStateEnum } from '../../../enums'
import { AppState } from '../types/appState'

export const initialState: AppState = {
  init: false,
  wsHubConnected: false,
  lightUnits: [],
  driverUnits: [],
}

export const appReducer = createReducer<AppState, RootAction>(initialState)
  .handleAction(Actions.init.success, (state) => ({
    ...state,
    init: true,
  }))
  .handleAction(Actions.getUnitsAction.success, (state, { payload }) => ({
    ...state,
    lightUnits: payload.lightUnits,
    driverUnits: payload.driverUnits,
  }))
  .handleAction(Actions.changeLightUnitAction.request, (state, { payload: { id } }) => ({
    ...state,
    lightUnits: [...state.lightUnits].map((unit) => ({
      ...unit,
      requestState: unit.id === id ? RequestStateEnum.LOADING : unit.requestState,
    })),
  }))
  .handleAction(Actions.changeLightUnitAction.success, (state, { payload: { id, isEnabled } }) => ({
    ...state,
    lightUnits: [...state.lightUnits].map((unit) => ({
      ...unit,
      isEnabled: unit.id === id ? isEnabled : unit.isEnabled,
      requestState: unit.id === id ? RequestStateEnum.SUCCESS : unit.requestState,
    })),
  }))
  .handleAction(Actions.changeLightUnitAction.failure, (state, { payload: { id } }) => ({
    ...state,
    lightUnits: [...state.lightUnits].map((unit) => ({
      ...unit,
      requestState: unit.id === id ? RequestStateEnum.ERROR : unit.requestState,
    })),
  }))
  .handleAction(Actions.loginAction.request, (state) => ({
    ...state,
    requestState: RequestStateEnum.LOADING,
  }))
  .handleAction(Actions.wsHubConnected, (state) => ({
    ...state,
    wsHubConnected: true,
  }))
  .handleAction(Actions.wsHubDisconnected, (state) => ({
    ...state,
    wsHubConnected: false,
  }))
