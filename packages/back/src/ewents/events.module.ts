import { Module } from '@nestjs/common'
import { EventsGateway } from './events.gateway'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Unit } from '../units/units.entity'
import { UnitsService } from '../units/units.service'

@Module({
  imports: [TypeOrmModule.forFeature([Unit])],
  providers: [EventsGateway, UnitsService],
})
export class EventsModule {}
