import { combineReducers } from 'redux'
import { appReducer } from './appReducer'
import { AppState } from '../types/appState'

export const rootReducer = combineReducers({
  appState: appReducer,
})

export type RootState = { appState: AppState }
