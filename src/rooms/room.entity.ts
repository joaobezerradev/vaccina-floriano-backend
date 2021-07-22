import { VaccineEntity } from '../vaccines/vaccine.entity'
import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from '../commons/entities/base.entity'

@Entity('rooms')
export class RoomEntity extends BaseEntity {
  @Column()
  name: string

  @Column()
  street: string

  @Column()
  neighborhood: string

  @OneToMany(() => VaccineEntity, vaccine => vaccine.room)
  vaccines: VaccineEntity[]
}
