export interface ExceptionEvent {
  status: string
  message: string
}

export interface UnitEvent {
  id: number
  name: string
  moduleId?: number
  isEnabled: boolean
}

export interface UnitsEvent {
  units: {
    lightUnits: UnitEvent[]
    driverUnits: UnitEvent[]
  }
}

export interface ChangeLightEvent {
  id: number
  isEnabled: boolean
}
