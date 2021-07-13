import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../commons/entities/base.entity'

@Entity('priorityGroups')
export class PriorityGroupEntity extends BaseEntity {
  @Column()
  message: string
}
