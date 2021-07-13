import { BaseEntity } from '../commons/entities/base.entity'
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm'
import { RoomEntity } from '../rooms/room.entity'
import { AppointmentEntity } from '../appointments/appointment.entity'
import { UserEntity } from '../users/user.entity'

@Entity('vaccines')
export class VaccineEntity extends BaseEntity {
  @Column()
  day: Date

  @Column()
  name: string

  @Column()
  batch: string

  @Column()
  note: string

  @Column({ nullable: true })
  applyAt: Date | null

  @Column('uuid', { nullable: true })
  ownerId: string | null

  @Column('uuid')
  roomId: string

  @ManyToOne(() => RoomEntity)
  room: RoomEntity

  @OneToOne(() => AppointmentEntity, appointment => appointment.vaccine)
  appointment: AppointmentEntity

  @ManyToOne(() => UserEntity, user => user.vaccines)
  owner: UserEntity
}
