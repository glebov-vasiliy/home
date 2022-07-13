import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Unit {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  moduleId: number

  @Column()
  name: string

  @Column()
  type: string

  @Column({ default: 0 })
  isEnabled: boolean
}
