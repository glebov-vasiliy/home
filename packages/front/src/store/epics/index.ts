import { combineEpics } from 'redux-observable'
import appEpics from './appEpics'
import wsHubEpics from './wsHubEpics'

export const rootEpics = combineEpics(...Object.values(appEpics), ...Object.values(wsHubEpics))
