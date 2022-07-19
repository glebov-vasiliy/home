import { Units } from '../types/appState'
import { RootState } from '../../root/types'

export const initSelector = ({ appState }: RootState): boolean => appState.init
export const lightUnitsSelector = ({ appState }: RootState): Units['lightUnits'] => appState.lightUnits
export const driverUnitsSelector = ({ appState }: RootState): Units['driverUnits'] => appState.driverUnits
