import { ComorbidityEntity } from '../comorbidities/comorbidity.entity'
import { PriorityGroupEntity } from '../priority-groups/priority-group.entity'
import { UserEntity } from '../users/user.entity'
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm'
import { BaseEntity } from '../commons/entities/base.entity'
import { VaccineEntity } from '../vaccines/vaccine.entity'

@Entity('appointments')
export class AppointmentEntity extends BaseEntity {
  @Column({ type: 'timestamp' })
  date: string

  @Column({ nullable: true })
  doseNumber: number | null

  @Column('uuid')
  userId: string

  @ManyToOne(() => UserEntity, user => user.appointments)
  @JoinColumn()
  user: UserEntity

  @Column()
  comorbidityId: string

  @Column({ type: 'timestamp', nullable: true })
  concludeAt: string

  @ManyToOne(() => ComorbidityEntity)
  @JoinColumn()
  comorbidity: ComorbidityEntity

  @Column()
  priorityGroupId: string

  @ManyToOne(() => PriorityGroupEntity)
  @JoinColumn()
  priorityGroup: PriorityGroupEntity

  @Column('uuid')
  vaccineId: string

  @OneToOne(() => VaccineEntity)
  @JoinColumn()
  vaccine: VaccineEntity
}
