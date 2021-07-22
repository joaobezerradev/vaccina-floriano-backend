import { Column, Entity, OneToMany, OneToOne } from 'typeorm'
import { v4 as uuid } from 'uuid'
import * as bcrypt from 'bcrypt'

import { UserRoleEnum } from './enums'
import { BaseEntity } from '../commons/entities/base.entity'
import { UserAddressEntity } from './user-address.entity'
import { UserMetadataEntity } from './user-metadata.entity'
import { AppointmentEntity } from '../appointments/appointment.entity'
import { VaccineEntity } from '../vaccines/vaccine.entity'

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  name: string

  @Column({ unique: true })
  personPhysicalCard: string

  @Column()
  role: UserRoleEnum

  @Column({ unique: true })
  email: string

  @Column({ type: 'timestamp', nullable: true })
  emailConfirmedAt: string | null

  @Column()
  password: string

  @Column('uuid')
  securityStamp = this.generateSecurityStamp()

  @OneToOne(() => UserAddressEntity, userAddresses => userAddresses.user, {
    cascade: ['insert'],
    nullable: true
  })
  userAddress: UserAddressEntity

  @OneToOne(() => UserMetadataEntity, userMetadata => userMetadata.user, {
    cascade: ['insert'],
    nullable: true
  })
  userMetadata: UserMetadataEntity

  @OneToMany(() => AppointmentEntity, appointment => appointment.user)
  appointments: AppointmentEntity[]

  @OneToMany(() => VaccineEntity, vaccine => vaccine.owner)
  vaccines: VaccineEntity[]

  async validatePassword (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password)
  }

  async hashPassword (password: string): Promise<string> {
    const salt = await bcrypt.genSalt()
    return bcrypt.hash(password, salt)
  }

  generateSecurityStamp (): string {
    this.securityStamp = uuid()
    return this.securityStamp
  }
}
