import { Command, Event } from './enums'

export enum ConnectorEvent {
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
}

export type FeedEvent = ConnectorEvent | Event

export const FeedEvent = {
  ...ConnectorEvent,
  ...Event,
}

export interface FeedMessage<T = unknown> {
  type: FeedEvent
  payload?: T
}

export interface CommandMessage<T = unknown> {
  type: Command
  payload?: T
}
