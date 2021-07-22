import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../commons/entities/base.entity'

@Entity('comorbidities')
export class ComorbidityEntity extends BaseEntity {
  @Column()
  type: string
}
