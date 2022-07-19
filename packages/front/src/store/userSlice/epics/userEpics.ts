import { catchError, filter, from, map, of } from 'rxjs'
import { Epic } from 'redux-observable'
import { MiddlewareDependencies, RootAction, RootState } from '../../root/types'
import { isActionOf } from 'typesafe-actions'
import { switchMap } from 'rxjs/operators'
import { loginAction } from '../../root/actions'
import { UsersService } from '../../../api/services'

export const onLoginEpic: Epic<RootAction, RootAction, RootState, MiddlewareDependencies> = (action$) => {
  return action$.pipe(
    filter(isActionOf([loginAction.request])),
    switchMap(({ payload }) => {
      return from(UsersService.login({ data: { ...payload } })).pipe(
        map(({ accessToken }) => {
          if (accessToken) {
            localStorage.setItem('accessToken', accessToken)
            return loginAction.success()
          }
          throw new Error('No access token')
        }),
        catchError((error) => {
          localStorage.removeItem('accessToken')
          return of(loginAction.failure(error))
        }),
      )
    }),
  )
}

export default [onLoginEpic]
