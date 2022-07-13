import { LoadingStateEnum } from '../../enums'
import { UnitEvent } from '../../socketConnector/schemas'

export type AppState = {
  init: boolean
} & Units

export type Units = {
  lightUnits: Unit[]
  driverUnits: Unit[]
}

export type Unit = UnitEvent & {
  loadingState: LoadingStateEnum
}

export type ChangeLightUnit = Pick<Unit, 'id' | 'isEnabled'>

export type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]
