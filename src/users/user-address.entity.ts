import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { BaseEntity } from '../commons/entities/base.entity'
import { UserEntity } from './user.entity'

@Entity('address')
export class UserAddressEntity extends BaseEntity {
  @Column('uuid')
  userId: string

  @Column()
  stateName: string

  @Column()
  cityName: string

  @Column()
  zipCode: string

  @Column()
  neighborhood: string

  @Column()
  street: string

  @Column({ nullable: true })
  complement: string | null

  @Column()
  number: string

  @OneToOne(() => UserEntity, users => users.userAddress, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
  })
  @JoinColumn()
  user: UserEntity
}
