import { combineEpics } from 'redux-observable'
import appEpics from '../../appSlice/epics/appEpics'
import wsHubEpics from '../../appSlice/epics/wsHubEpics'
import userEpics from '../../userSlice/epics/userEpics'

export const rootEpics = combineEpics(
  ...Object.values(appEpics),
  ...Object.values(wsHubEpics),
  ...Object.values(userEpics),
)
