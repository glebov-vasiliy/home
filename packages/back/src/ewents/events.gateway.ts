import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets'
import { Server } from 'socket.io'
import { UnitsService } from '../units/units.service'

@WebSocketGateway(4000, {
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server
  constructor(private readonly unitService: UnitsService) {}

  @SubscribeMessage('CHANGE_LIGHT')
  async handleChangeLight(@MessageBody() data: { id: 5; isEnabled: true }): Promise<WsResponse<unknown>> {
    return this.unitService.updateStatus(data).then((data) => ({ event: 'CHANGE_LIGHT_SUCCESS', data }))
    // return { event: 'exception', data: { status: 'errorString', message: 'message' } }
  }

  @SubscribeMessage('GET_UNITS')
  async handleGetUnits(): Promise<WsResponse<unknown>> {
    return this.unitService.findAll().then((data) => ({ event: 'GET_UNITS_SUCCESS', data }))
  }
}
