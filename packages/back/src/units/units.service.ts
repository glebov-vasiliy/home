import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Unit } from './units.entity'

@Injectable()
export class UnitsService {
  constructor(
    @InjectRepository(Unit)
    private unitsRepository: Repository<Unit>,
  ) {}

  async findAll(): Promise<{ units: Record<string, Array<Unit>> }> {
    const lightUnits = await this.unitsRepository.find({ where: [{ type: 'lightUnit' }] })
    const driverUnits = await this.unitsRepository.find({ where: [{ type: 'driverUnit' }] })
    const tempSensors = await this.unitsRepository.find({ where: [{ type: 'tempSensor' }] })

    return { units: { lightUnits, driverUnits, tempSensors } }
  }

  async updateStatus({ id, isEnabled }): Promise<Unit> {
    await this.unitsRepository.update(
      {
        id,
      },
      {
        isEnabled,
      },
    )
    return this.unitsRepository.findOne({
      select: ['id', 'isEnabled'],
      where: [{ id: id }],
    })
  }

  // async remove(id: string): Promise<void> {
  //   await this.unitsRepository.delete(id)
  // }
}
