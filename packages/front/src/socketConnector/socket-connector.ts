import { Observable, Subject, fromEvent } from 'rxjs'
import { switchMap, map, tap } from 'rxjs/operators'
import { io, Socket } from 'socket.io-client'
import { ManagerOptions } from 'socket.io-client/build/esm/manager'
import { SocketOptions } from 'socket.io-client/build/esm/socket'

export interface SocketMessage {
  type: string
  payload?: unknown
}

export class SocketConnector {
  public connect$: Observable<Socket>
  public disconnect$: Observable<unknown>
  public connected = false
  private socket$: Subject<Socket>
  private socket: Socket | undefined

  constructor() {
    this.socket$ = new Subject()
    this.connect$ = this.socket$.pipe(
      switchMap((socket) => {
        return fromEvent(socket, 'connect').pipe(
          tap(() => (this.connected = true)),
          map(() => socket),
        )
      }),
    )
    this.disconnect$ = this.socket$.pipe(
      switchMap((socket) => {
        return fromEvent(socket, 'disconnect').pipe(tap(() => (this.connected = false)))
      }),
    )
  }

  public connect(url: string, options?: Partial<ManagerOptions & SocketOptions>): void {
    this.socket = io(url, options)
    this.socket$.next(this.socket)
  }

  public disconnect(): void {
    this.socket && this.socket.disconnect()
  }

  public socketListen(event: string): Observable<unknown> {
    return this.connect$.pipe(
      switchMap((socket) =>
        fromEvent(socket, event).pipe(map((data: SocketMessage) => ({ type: event, payload: data }))),
      ),
    )
  }

  public socketSend(observable$: Observable<SocketMessage>): void {
    this.connect$
      .pipe(switchMap((socket) => observable$.pipe(map((data) => ({ socket, data })))))
      .subscribe(({ socket, data }) => {
        if (socket.connected) {
          socket.emit(data.type, data.payload)
        }
      })
  }
}
