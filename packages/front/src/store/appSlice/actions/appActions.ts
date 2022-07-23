import { createAction, createAsyncAction, createCustomAction } from 'typesafe-actions'
import { ExceptionEvent } from '../../../api/socketConnector/schemas'
import { ChangeLightUnit, Units } from '../types/appState'
import { toast, ToastOptions } from 'react-toastify'
import { Pages } from '../../../enums'

export const appErrorAction = createAction('@@app/error')<ExceptionEvent>()

export const notify = createCustomAction('@@app/notify', (payload: string, meta?: Partial<ToastOptions>) => {
  toast(payload, meta)
  return {
    payload,
    meta,
  }
})

export const init = createAsyncAction('@@app/initRequest', '@@app/initSuccess', '@@app/initFailure')<
  undefined,
  undefined,
  undefined
>()

export const setPage = createAction('@@app/setPage')<Pages>()

export const changeLightUnitAction = createAsyncAction(
  '@@app/changeLightUnitRequest',
  '@@app/changeLightUnitSuccess',
  '@@app/changeLightUnitFailure',
)<ChangeLightUnit, ChangeLightUnit, ChangeLightUnit & ExceptionEvent>()

export const getUnitsAction = createAsyncAction(
  '@@app/getUnitsActionRequest',
  '@@app/getUnitsActionSuccess',
  '@@app/getUnitsActionFailure',
)<undefined, Units, ExceptionEvent>()
