import { Controller, Get } from '@nestjs/common'
import { UnitsService } from './units.service'

@Controller()
export class UnitsController {
  constructor(private readonly unitService: UnitsService) {}

  @Get()
  findAll() {
    return this.unitService.findAll()
  }
}
