import { ActionType } from 'typesafe-actions'
import * as actions from '../actions'
import { BackendConnector } from '../../socketConnector'

export type RootAction = ActionType<typeof actions>

export type MiddlewareDependencies = {
  connector: typeof BackendConnector.Instance
}
