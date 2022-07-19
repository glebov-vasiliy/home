import { catchError, EMPTY, filter, from, map, of } from 'rxjs'
import { Epic } from 'redux-observable'
import { MiddlewareDependencies, RootAction, RootState } from '../../root/types'
import { isActionOf } from 'typesafe-actions'
import * as actions from '../actions/appActions'
import * as actionsWsHub from '../actions/wshub'
import { switchMap } from 'rxjs/operators'
import { getUnitsAction, loginAction, setAuth } from '../../root/actions'
import { changeLightUnitAction } from '../../root/actions'
import { notify } from '../../root/actions'
import { appErrorAction } from '../../root/actions'
import { UnitsEvent } from '../../../api/socketConnector/schemas'
import { RequestStateEnum } from '../../../enums'
import { Entries, Units } from '../types/appState'
import { UsersService } from '../../../api/services'
import { createAuthHeader } from '../../../api/utils'
import { Constants } from '../../../constants'

export const onAppErrorEpic: Epic<RootAction, RootAction, RootState, MiddlewareDependencies> = (action$) =>
  action$.pipe(
    filter(isActionOf(actions.appErrorAction)),
    switchMap(({ payload: { status, message } }) => {
      notify(`${status}: ${message}`, { type: 'error' })
      return EMPTY
    }),
  )

export const initEpic: Epic<RootAction, RootAction, RootState, MiddlewareDependencies> = (
  action$,
  state$,
  { connector },
) =>
  action$.pipe(
    filter(isActionOf(actions.init.request)),
    switchMap(() => {
      const { wsHubConnected } = state$.value.appState

      return from(UsersService.checkToken({ options: { headers: createAuthHeader() } })).pipe(
        map(({ status }) => {
          !wsHubConnected && connector.connect(Constants.wsUrl)
          return setAuth(status)
        }),
        catchError((error) => {
          wsHubConnected && connector.disconnect()
          localStorage.removeItem('accessToken')
          return of(setAuth(false))
        }),
      )
    }),
  )

export const onLoginSuccessEpic: Epic<RootAction, RootAction, RootState, MiddlewareDependencies> = (
  action$,
  state$,
  { connector },
) =>
  action$.pipe(
    filter(isActionOf(loginAction.success)),
    switchMap(() => {
      const { wsHubConnected } = state$.value.appState
      !wsHubConnected && connector.connect(Constants.wsUrl)
      return EMPTY
    }),
  )

export const onWsHubConnectedEpic: Epic<RootAction, RootAction, RootState, MiddlewareDependencies> = (action$) =>
  action$.pipe(
    filter(isActionOf([actionsWsHub.wsHubConnected])),
    map(() => getUnitsAction.request()),
  )

export const initSuccessEpic: Epic<RootAction, RootAction, RootState, MiddlewareDependencies> = (action$) => {
  return action$.pipe(
    filter(isActionOf([getUnitsAction.success])),
    map(() => actions.init.success()),
  )
}

export const onGetUnitsActionEpic: Epic<RootAction, RootAction, RootState, MiddlewareDependencies> = (
  action$,
  state$,
  { connector },
) => {
  return action$.pipe(
    filter(isActionOf([getUnitsAction.request])),
    switchMap(() => {
      return connector.getUnits().pipe(
        map(({ units }) => {
          // TODO may be move to mappers
          return getUnitsAction.success(
            (Object.entries(units) as Entries<UnitsEvent['units']>).reduce(
              (acc, [key, value]) => ({
                ...acc,
                acc: (acc[key] = value.map((unit) => ({ ...unit, requestState: RequestStateEnum.SUCCESS }))),
              }),
              units,
            ) as Units,
          )
        }),
        catchError((error) => {
          return of(appErrorAction(error), getUnitsAction.failure(error))
        }),
      )
    }),
  )
}

export const changeLightUnitEpic: Epic<RootAction, RootAction, RootState, MiddlewareDependencies> = (
  action$,
  state$,
  { connector },
) => {
  return action$.pipe(
    filter(isActionOf([changeLightUnitAction.request])),
    switchMap(({ payload }) => {
      return connector.changeLightUnit(payload).pipe(
        map((value) => changeLightUnitAction.success(value)),
        catchError((error) => {
          return of(appErrorAction(error), changeLightUnitAction.failure({ ...payload, ...error }))
        }),
      )
    }),
  )
}

export default [
  initEpic,
  initSuccessEpic,
  onWsHubConnectedEpic,
  changeLightUnitEpic,
  onGetUnitsActionEpic,
  onAppErrorEpic,
  onLoginSuccessEpic,
]
