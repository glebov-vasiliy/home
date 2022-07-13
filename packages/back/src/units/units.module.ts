import { Module } from '@nestjs/common'
import { UnitsController } from './units.controller'
import { UnitsService } from './units.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Unit } from './units.entity'

@Module({
  controllers: [UnitsController],
  providers: [UnitsService],
  imports: [TypeOrmModule.forFeature([Unit])],
})
export class UnitsModule {}
