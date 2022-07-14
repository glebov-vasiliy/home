import { catchError, EMPTY, filter, from, map, of } from 'rxjs'
import { Epic } from 'redux-observable'
import { MiddlewareDependencies, RootAction } from '../types'
import { RootState } from '../reducers'
import { isActionOf } from 'typesafe-actions'
import * as actions from '../actions/appActions'
import * as actionsWsHub from '../actions/wshub'
import { switchMap } from 'rxjs/operators'
import { getUnitsAction } from '../actions'
import { changeLightUnitAction } from '../actions'
import { notify } from '../actions'
import { appErrorAction } from '../actions'
import { UnitsEvent } from '../../api/socketConnector/schemas'
import { LoadingStateEnum } from '../../enums'
import { Entries, Units } from '../types/appState'
import { loginAction } from '../actions'
import { AuthService } from '../../api/services'

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
      if (!process.env['NX_WS_HUB_URL']) return of(actions.init.failure())
      connector.connect(process.env['NX_WS_HUB_URL'])
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
                acc: (acc[key] = value.map((unit) => ({ ...unit, loadingState: LoadingStateEnum.SUCCESS }))),
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

export const onLoginEpic: Epic<RootAction, RootAction, RootState, MiddlewareDependencies> = (action$) => {
  return action$.pipe(
    filter(isActionOf([loginAction.request])),
    switchMap(({ payload }) => {
      return from(AuthService.login({ data: { ...payload } })).pipe(
        map((payload) => loginAction.success(payload)), // TODO make types for payload
        catchError(({ status, message }) => of(loginAction.failure({ status, message }))),
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
  onLoginEpic,
]
