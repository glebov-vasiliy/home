import { Controller, Get } from '@nestjs/common'
import { UnitsService } from './units.service'

@Controller()
export class UnitsController {
  constructor(private readonly userService: UnitsService) {}

  @Get()
  findAll() {
    return this.userService.findAll()
  }
}
