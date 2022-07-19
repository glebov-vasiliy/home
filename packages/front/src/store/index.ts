import { createStore, compose, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from './root/reducers'
import { RootAction, RootState } from './root/types'
import { rootEpics } from './root/epics'
import { BackendConnector } from '../api/socketConnector'
const connector = BackendConnector.Instance

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}
const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState>({
  dependencies: {
    connector,
  },
})
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(epicMiddleware)))
epicMiddleware.run(rootEpics)
export default store
