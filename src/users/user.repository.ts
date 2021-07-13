import { now } from '../commons/utils/now.date'
import { EntityRepository, Repository } from 'typeorm'
import { GetUserDto } from './dtos/get-user.dto'
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

  async createUser (user: UserEntity): Promise<UserEntity> {
    const newUser = this.create(user)
    newUser.createdAt = now()
    return this.save(newUser)
  }

  async saveUser (updateUser: Partial<UserEntity>): Promise<UserEntity> {
    return this.save(updateUser)
  }

  async removeUser (user: UserEntity): Promise<void> {
    user.deletedAt = now()

    await this.save(user)
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
}
