import { Controller, UseGuards, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { JwtAuthGuard } from '../autch/jwt-auth.guard'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  getData() {
    return this.appService.getData()
  }
}
