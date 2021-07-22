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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: string

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: string | null
}
