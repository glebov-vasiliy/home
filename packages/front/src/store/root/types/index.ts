import { ActionType } from 'typesafe-actions'
import * as actions from '../actions'
import { BackendConnector } from '../../../api/socketConnector'
import { AppState } from '../../appSlice/types/appState'
import { UserState } from '../../userSlice/types/userState'

export type RootAction = ActionType<typeof actions>

export type MiddlewareDependencies = {
  connector: typeof BackendConnector.Instance
}

export type RootState = {
  appState: AppState
  userState: UserState
}
