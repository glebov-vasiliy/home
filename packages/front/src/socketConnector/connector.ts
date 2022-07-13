import { Observable, Subject, take } from 'rxjs'
import { filter, map, timeout } from 'rxjs/operators'
import { SocketConnector, SocketMessage } from './socket-connector'
import * as schemas from './schemas'

import { Command, Event } from './enums'
import { FeedMessage, CommandMessage, FeedEvent } from './connector-types'
import { ChangeLightUnit } from '../store/types/appState'
import { ChangeLightEvent, UnitsEvent } from './schemas'

export class BackendConnector {
  private static instance: BackendConnector
  private readonly socketConnector: SocketConnector
  private readonly sendSubject: Subject<CommandMessage>
  private consumerSubject: Subject<FeedMessage>
  private constructor() {
    this.sendSubject = new Subject()
    this.consumerSubject = new Subject()
    this.socketConnector = new SocketConnector()
    this.subscribeEventHandlers()
    this.socketConnector.socketSend(this.sendSubject as Observable<SocketMessage>)
    this.socketConnector.connect$.subscribe(() => {
      this.consumerSubject.next({ type: FeedEvent.CONNECTED })
    })
    this.socketConnector.disconnect$.subscribe(() => this.consumerSubject.next({ type: FeedEvent.DISCONNECTED }))

    // this.consumerSubject.subscribe((e) => console.log('! - consumerSubject', e))
    // this.sendSubject.subscribe((e) => console.log('! - sendSubject', e))
  }

  private subscribeEventHandlers(): void {
    const onEvent = this.socketConnector.socketListen.bind(this.socketConnector)
    Object.values(Event).forEach((event: string) => {
      onEvent(event).subscribe((value) => this.consumerSubject.next(value as FeedMessage))
    })
  }

  public static get Instance(): BackendConnector {
    return this.instance || (this.instance = new this())
  }

  public connect(socketUrl: string) {
    this.socketConnector.connect(socketUrl, {
      transports: ['websocket'],
      forceNew: false,
    })
    return this.socketConnector.connect$
  }

  public disconnect(): void {
    this.socketConnector.disconnect()
  }

  public observableForEvent<T>(type: FeedEvent): Observable<T> {
    return this.consumerSubject.asObservable().pipe(
      filter((message: FeedMessage) => type === message.type),
      map((message: FeedMessage) => message.payload as T),
    )
  }

  private sendRequest<T>(command: Command, event: Event, payload?: T, timeoutMs = 10000): Observable<T> {
    return new Observable((observer) => {
      const timeoutError: schemas.ExceptionEvent = {
        status: 'TimeoutError',
        message: `No response for change light in ${timeoutMs} milliseconds`,
      }
      const subscription = this.observableForEvent<T>(event)
        .pipe(timeout(timeoutMs), take(1))
        .subscribe(
          (value) => {
            exceptSubscription.unsubscribe()
            observer.next(value)
            observer.complete()
          },
          () => {
            exceptSubscription.unsubscribe()
            return observer.error(timeoutError)
          },
        )
      const exceptSubscription = this.observableForEvent(Event.EXCEPTION)
        .pipe()
        .subscribe((value) => {
          subscription.unsubscribe()
          return observer.error(value)
        })
      this.sendSubject.next({ type: command, payload })
    })
  }

  public getUnits() {
    return this.sendRequest<schemas.UnitsEvent>(Command.GET_UNITS, Event.GET_UNITS_SUCCESS)
  }
  public changeLightUnit(payload: ChangeLightEvent) {
    return this.sendRequest<schemas.ChangeLightEvent>(Command.CHANGE_LIGHT, Event.CHANGE_LIGHT_SUCCESS, payload)
  }
}
