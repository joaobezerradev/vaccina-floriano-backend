import {
  BaseEntity as TypeOrmBaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'

import { v4 as uuid } from 'uuid'

export abstract class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryColumn('uuid', { primary: true })
  id: string = uuid()

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null
}
