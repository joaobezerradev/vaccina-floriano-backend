import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { BaseEntity } from '../commons/entities/base.entity'
import { UserGender } from './enums'
import { UserEntity } from './user.entity'

@Entity('metadata')
export class UserMetadataEntity extends BaseEntity {
  @Column('uuid')
  userId: string

  @Column()
  gender: UserGender

  @Column()
  birthDate: string

  @Column()
  phone: string

  @Column({ nullable: true, unique: true })
  identityCard: string | null

  @Column()
  motherName: string

  @Column({ nullable: true, unique: true })
  healthCard: string | null

  @OneToOne(() => UserEntity, users => users.userMetadata, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  @JoinColumn()
  user: UserEntity
}
