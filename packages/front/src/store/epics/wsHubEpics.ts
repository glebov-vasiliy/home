import { Epic } from 'redux-observable'
import { MiddlewareDependencies, RootAction } from '../types'
import { RootState } from '../reducers'
import { filter, map, merge, of } from 'rxjs'
import { isActionOf } from 'typesafe-actions'
import * as actions from '../actions/wshub'
import { ConnectorEvent } from '../../socketConnector'
import { switchMap } from 'rxjs/operators'
import { init } from '../actions'

export const SubscriptionEpic: Epic<RootAction, RootAction, RootState, MiddlewareDependencies> = (
  action$,
  state$,
  { connector },
) => {
  return action$.pipe(
    filter(isActionOf(init.request)),
    switchMap(() => {
      return merge(
        of(actions.wsHubSubscribed()),
        connector.observableForEvent(ConnectorEvent.CONNECTED).pipe(map(actions.wsHubConnected)),
        connector.observableForEvent(ConnectorEvent.DISCONNECTED).pipe(map(actions.wsHubDisconnected)),
      )
    }),
  )
}

export default [SubscriptionEpic]
