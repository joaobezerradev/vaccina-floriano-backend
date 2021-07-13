import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { AuthCredentialsDto } from '../auth/dtos/auth-credentials-filter.dto'
import { now } from '../commons/utils/now.date'
import { errorHandler } from '../commons/handlers/error.handler'

import { CreateUserDto } from './dtos/create-user.dto'
import { UserAddressEntity } from './user-address.entity'
import { UserEntity } from './user.entity'
import { UserRoleEnum } from './enums/user-role.enum'
import { UserRepository } from './user.repository'
import { UserMetadataEntity } from './user-metadata.entity'
import { Connection } from 'typeorm'

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly connection:Connection
  ) { }

  async findOne (userId: string): Promise<UserEntity> {
    const foundUser = await this.userRepository.findOne({
      where: {
        deletedAt: null,
        id: userId
      }
    })

    if (!foundUser) {
      throw new NotFoundException(`User with ${userId} not found.`)
    }

    return foundUser
  }

  async create (createUserDto: CreateUserDto): Promise<UserEntity> {
    const {
      name,
      email,
      personPhysicalCard,
      password,
      address,
      metadata
    } = createUserDto

    const foundUser = await this.userRepository.getUser({
      email,
      personPhysicalCard
    })

    if (foundUser) {
      throw new ConflictException('User already exists.')
    }

    const queryRunner = this.connection.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const salt = bcrypt.genSaltSync()
      const passwordHash = bcrypt.hashSync(password, salt)

      const userMetadata = new UserMetadataEntity()
      Object.assign(userMetadata, metadata, { birthDate: now() })

      const userAddress = new UserAddressEntity()
      Object.assign(userAddress, address)

      const user = this.userRepository.create({
        email,
        name,
        personPhysicalCard,
        password: passwordHash,
        role: UserRoleEnum.COMMON,
        userAddress,
        userMetadata
      })

      const newUser = await this.userRepository.save(user)
      await queryRunner.commitTransaction()
      return newUser
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw errorHandler.handle(error)
    } finally {
      await queryRunner.release()
    }
  }

  async validateUserPassword (authCredentialsDto: AuthCredentialsDto): Promise<string | null> {
    const { email, password } = authCredentialsDto

    const user = await this.userRepository.findOne({ email })

    if (user && (await user.validatePassword(password))) {
      return user.email
    }

    return null
  }

  async forgotPassword (user: UserEntity): Promise<void> {
    user.generateSecurityStamp()
    await this.userRepository.save(user)
  }

  async getByEmail (email: string): Promise<UserEntity> {
    return this.userRepository.getUser({
      email
    })
  }

  async getUserBySecurityStamp (securityStamp: string): Promise<UserEntity> {
    return this.userRepository.getUser({ securityStamp })
  }

  async getAll (): Promise<UserEntity[]> {
    return this.userRepository.getAll()
  }

  async save (user:UserEntity):Promise<UserEntity> {
    return this.userRepository.save(user)
  }
}
