import { Connection, EntityRepository, Repository } from 'typeorm'
import { GetUserDto } from './dtos/get-user.dto'
import { UserRoleEnum } from './enums'
import { UserEntity } from './user.entity'

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async getAll (): Promise<UserEntity[]> {
    return this.find({
      where: {
        deletedAt: null
      }
    })
  }

  async saveUser (updateUser: Partial<UserEntity>): Promise<UserEntity> {
    return this.save(updateUser)
  }

  async getUser (getUserDto: GetUserDto): Promise<UserEntity> {
    const {
      id,
      email,
      personPhysicalCard,
      securityStamp
    } = getUserDto

    return this.findOne({
      where: [
        { id, deletedAt: null },
        { email, deletedAt: null },
        { personPhysicalCard, deletedAt: null },
        { securityStamp, deletedAt: null }
      ]
    })
  }

  getCommonUsers ():Promise<UserEntity[]> {
    return this.find({
      where: {
        role: UserRoleEnum.COMMON
      }
    })
  }

  getConnection (): Connection {
    return this.manager.connection
  }
}
