import { RootState } from '../../root/types'
import { RequestStateEnum } from '../../../enums'

export const requestSelector = ({ userState }: RootState): RequestStateEnum => userState.requestState
export const authSelector = ({ userState }: RootState): boolean => userState.auth
