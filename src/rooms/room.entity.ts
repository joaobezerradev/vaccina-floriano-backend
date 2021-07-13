import { VaccineEntity } from '../vaccines/vaccine.entity'
import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from '../commons/entities/base.entity'
import { ShiftEnum } from './enums/shift.enum'

@Entity('rooms')
export class RoomEntity extends BaseEntity {
  @Column()
  name: string

  @Column()
  street: string

  @Column()
  neighborhood: string

  @Column()
  shift: ShiftEnum

  @OneToMany(() => VaccineEntity, vaccine => vaccine.room)
  vaccines: VaccineEntity[]
}
