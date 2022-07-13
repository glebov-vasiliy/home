import { AppState } from '../types/appState'
import * as Actions from '../actions'
import { createReducer } from 'typesafe-actions'
import { RootAction } from '../types'
import { LoadingStateEnum } from '../../enums'

export const initialState: AppState = {
  init: false,
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
      loadingState: unit.id === id ? LoadingStateEnum.LOADING : unit.loadingState,
    })),
  }))
  .handleAction(Actions.changeLightUnitAction.success, (state, { payload: { id, isEnabled } }) => ({
    ...state,
    lightUnits: [...state.lightUnits].map((unit) => ({
      ...unit,
      isEnabled: unit.id === id ? isEnabled : unit.isEnabled,
      loadingState: unit.id === id ? LoadingStateEnum.SUCCESS : unit.loadingState,
    })),
  }))
  .handleAction(Actions.changeLightUnitAction.failure, (state, { payload: { id } }) => ({
    ...state,
    lightUnits: [...state.lightUnits].map((unit) => ({
      ...unit,
      loadingState: unit.id === id ? LoadingStateEnum.ERROR : unit.loadingState,
    })),
  }))
