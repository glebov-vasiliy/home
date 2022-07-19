import { requestState } from '../../appSlice/types/appState'

export type UserState = {
  auth: boolean
} & requestState
