import { combineReducers } from 'redux'
import { appReducer } from '../../appSlice/reducers/appReducer'
import { userReducer } from '../../userSlice/reducers/userReducer'

export const rootReducer = combineReducers({
  appState: appReducer,
  userState: userReducer,
})
