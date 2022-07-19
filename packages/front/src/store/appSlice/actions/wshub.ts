import { createAction } from 'typesafe-actions'

export const wsHubConnected = createAction('@@wshub/connected')<undefined>()
export const wsHubDisconnected = createAction('@@wshub/disconnected')<undefined>()
export const wsHubSubscribed = createAction('@@wshub/subscribed')<undefined>()
