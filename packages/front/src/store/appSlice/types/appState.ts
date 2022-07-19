import { RequestStateEnum } from '../../../enums'
import { UnitEvent } from '../../../api/socketConnector/schemas'

export type AppState = {
  init: boolean
  wsHubConnected: boolean
} & Units

export type Units = {
  lightUnits: Unit[]
  driverUnits: Unit[]
}

export type Unit = UnitEvent & requestState

export type requestState = { requestState: RequestStateEnum }

export type ChangeLightUnit = Pick<Unit, 'id' | 'isEnabled'>

export type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]
